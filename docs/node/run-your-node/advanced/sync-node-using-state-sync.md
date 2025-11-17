# Using State Sync for Quick Bootstrapping

The State Sync is a way to **quickly bootstrap** a **full Oasis node** (either a
[validator node](../validator-node.mdx) or a
[non-validator node](../non-validator-node.mdx)) by initializing it from the
trusted block's header, identified by the trusted height and hash. The node's
trusted state is then securely updated by requesting and verifying a minimal set of
data (checkpoints metadata and chunks) from the P2P network. Internally, it uses
[CometBFT's Light Client protocol] and Merkle proofs to filter out invalid data.

:::info

If you have access to an Oasis node that is synced with the latest height,
another option to speed bootstrapping a new Oasis node is to [copy state from one
node to the other].

:::

:::caution

CometBFT's Light Client protocol requires at least 1 full node to be correct
to be able to [detect and submit evidence for a light client attack].

:::

:::tip

After a successful state sync it is always recommended to check if you see
the same chain as other nodes. This can be done by comparing block hash at
a recent height with sources that you trust: e.g. your own nodes, trusted nodes
from external entity, block explorers, etc.

:::

To configure your node to use the state sync, amend your node's configuration
(i.e. `config.yml`) with (non-relevant fields omitted):

```yaml
... trimmed ...

# Consensus.
consensus:

  ... trimmed ...

  # Enable consensus state sync (i.e. CometBFT light client sync).
  state_sync:
    enabled: true
  # Configure trusted period, height and hash for the light client.
  light_client:
    trust:
      period: {{ trusted_period }}
      height: {{ trusted_height }}
      hash: "{{ trusted_height_hash }}"

... trimmed ...

```

and replace the following variables in the configuration snippet:

* `{{ trusted_period }}`: Trusted period is the duration for which trust remains valid.
* `{{ trusted_height }}`: Trusted height defines the height at which your node should trust the chain.
* `{{ trusted_height_hash }}`: Trusted height hash defines the hash of the block header corresponding to the trusted height.

:::danger

You need to **delete any existing node state** (if it exists), otherwise the
state sync will be skipped. To do that, follow the [Wiping Node State]
instructions.

If existing node state is found and state sync is skipped, you will see
something like the following in your node's logs:

```
{"caller":"full.go:709","level":"info","module":"cometbft","msg":"state sync enabled","ts":"2023-11-16T20:06:58.56502593Z"}
{"caller":"node.go:770","level":"info","module":"cometbft:base","msg":"Found local state with non-zero height, skipping state sync","ts":"2023-11-16T20:06:59.22387592Z"}
```

:::

[CometBFT's Light Client protocol]:
  https://docs.cometbft.com/main/explanation/core/light-client
[copy state from one node to the other]: copy-state-from-one-node-to-the-other.md
[detect and submit evidence for a light client attack]:
  https://docs.cometbft.com/main/explanation/core/light-client#where-to-obtain-trusted-height--hash
[Wiping Node State]: ../maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity

### Obtaining Trusted Period

:::caution

To prevent long-range attacks it is recommended that the light client trust period
is shorter than the debonding period (currently 336 epochs or ~14 days). If you
trust a header older than the debonding period, you risk accepting invalid headers
from nodes that have already withdrawn their stake. Such nodes can no longer be
penalized for their misbehaviour and you may be tricked into following the wrong chain.

:::

To obtain recommended trust period run Oasis CLI's [trust command][oasis-network-trust].

With current consensus parameters, setting `trust_period` to any value between `220-290h`
(9-12 days) is optimal. This way the time required to verify headers, submit possible misbehavior evidence
and penalize nodes is still less than the debonding period, giving remote peers strong incentive not to lie.
Moreover, it enables configuring sufficiently old trust as will be explained in the next section.

[oasis-network-trust]: https://github.com/oasisprotocol/cli/blob/master/docs/network.md#trust

### Obtaining Trusted Height and Hash

It is important to set sufficiently old trust, so that the network has at least one
checkpoint that is more recent than the configured trust. At the same time, for the trust to be valid,
it should not be older than the trust period obtained above.

Currently, checkpoints happen approximately once per week. E.g. assuming a trust period
of 12 days, a 10 days old trust is recommended.

To obtain the trusted height and the corresponding block header's hash, use one
of the following options.

:::tip

If using centralized or untrusted sources it is always recommended to
fetch and compare data from multiple sources.

:::

#### Oasis CLI

If you have Oasis CLI conected to an existing node that you trust, or if your
trust assumptions are fine with using (default) public grpc endpoints (e.g. testnet)
run CLI's [trust command][oasis-network-trust].

#### Block Explorers

Browse to one of our block explorers (e.g. [Oasis Explorer], [Oasis Scan]) and
obtain the trusted height and hash there:

1. Assuming a trust period of 12 days, obtain the block height that is 10 days old from the main page, e.g. 4819139.
2. Click on block height's number to view the block's details and obtain its
   hash, e.g. `377520acaf7b8011b95686b548504a973aa414abba2db070b6a85725dec7bd21`.

[Oasis Explorer]: https://explorer.oasis.io/
[Oasis Scan]: https://www.oasisscan.com

#### Public Rosetta Gateway

First obtain the network's Genesis document's hash (e.g. from the Networks Parameters Page):
- [Mainnet](https://docs.oasis.io/node/mainnet/): `bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55`
- [Testnet](https://docs.oasis.io/node/testnet/): `0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76`

Query our public Rosetta Gateway instance and obtain the latest height by
replacing the `<chain-context>` with the value obtained in the previous step:

```bash
curl -X POST https://rosetta.oasis.io/api/block \
-H "Content-Type: application/json" \
-d '{
    "network_identifier": {
        "blockchain": "Oasis",
        "network": "<chain-context>"
    },
    "block_identifier": {
        "index": 0
    }
}'
```

This will give you output like the following (non-relevant fields omitted):

```json
{
	"block": {
		"block_identifier": {
			"index": 25688638,
			"hash": "3076ae195cfeda09ad49a6c74f6f655bc623e526184f814a842b224bf1846223"
		},
    ...
	}
}
```

Assuming a trust period of 12 days and blocks happening every 6 seconds,
subtract around `140_000` blocks (cca 10 days) and query again:

```bash
curl -X POST https://rosetta.oasis.io/api/block \
-H "Content-Type: application/json" \
-d '{
    "network_identifier": {
        "blockchain": "Oasis",
        "network": "<chain-context>"
    },
    "block_identifier": {
        "index": 25548638
    }
}'
```

The values you need are `index` and `hash`:

```json
{
	"block": {
		"block_identifier": {
			"index": 25548638,
			"hash": "76ac9d6b59e662d024097a07eb65777292ce6a7ebe9aca8bd0caf73e72b06834"
		},
    ...
	}
}
```
