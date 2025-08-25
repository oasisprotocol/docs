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

We recommend using `trust_period=288h` (12 days). This way the time required
to verify headers, submit possible misbehavior evidence and penalize nodes
is still less than the debonding period, giving nodes strong incentive not to lie.

### Obtaining Trusted Height and Hash

:::caution

Currently, checkpoints happen approximately once per week. It is important to set
sufficiently old trusted height and hash, so that the network has at least one
checkpoint that is more recent than the configured trust.

:::

We recommend configuring trusted header that is around 10 days old. This way
there will be checkpoints available and the trust will still be shorter than
the debonding period.

To obtain the trusted height and the corresponding block header's hash, use one
of the following options.

:::tip

If using centralized or untrusted sources it is always recommended to
fetch and compare data from multiple sources.

:::

#### Block Explorers

Browse to one of our block explorers (e.g. [Oasis Explorer], [Oasis Scan]) and
obtain the trusted height and hash there:

1. Obtain the block height (10 days old) from the main page, e.g. 4819139.
2. Click on block height's number to view the block's details and obtain its
   hash, e.g. `377520acaf7b8011b95686b548504a973aa414abba2db070b6a85725dec7bd21`.

[Oasis Explorer]: https://explorer.oasis.io/
[Oasis Scan]: https://www.oasisscan.com

#### A Trusted Node

If you have an existing node that you trust, you can use its status output to
retrieve the current block height and hash by running:

```bash
oasis-node control status -a unix:/node/data/internal.sock
```

This will give you output like the following (non-relevant fields omitted):

```json
{
  "software_version": "23.0.5",
  "identity": {
    ...
  },
  "consensus": {
    ...
    "latest_height": 18466200,
    "latest_hash": "9611c81c7e231a281f1de491047a833364f97c38142a80abd65ce41bce123378",
    "latest_time": "2023-11-27T08:31:15Z",
    "latest_epoch": 30760,
    ...
  },
  ...
}
```

the values you need are `latest_height` and `latest_hash`.

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

Assuming blocks happen every 6 seconds, subtract around `140_000` blocks to
get the height that is around 10 days old and query again:

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

#### Oasis CLI

Query our public Oasis node's endpoint using the Oasis CLI and obtain the
trusted height and hash there:

```bash
oasis network status
```

This will give you output like the following (non-relevant fields omitted):

```json
{
  "software_version": "23.0.5",
  "identity": {
    ...
  },
  "consensus": {
    ...
    "latest_height": 18466200,
    "latest_hash": "9611c81c7e231a281f1de491047a833364f97c38142a80abd65ce41bce123378",
    "latest_time": "2023-11-27T08:31:15Z",
    "latest_epoch": 30760,
    ...
  },
  ...
}
```

The values you need are `latest_height` and `latest_hash` .
