# Using State Sync for Quick Bootstraping

The State Sync is a way to **quickly bootstrap** a **full Oasis node** (either a
[validator node](../validator-node.mdx) or a
[non-validator node](../non-validator-node.mdx)) by using the
[Tendermint's Light Client protocol]. It allows one to initialize a node from a
trusted height, its corresponding block's header and a trusted validator set
(given in the [genesis document](../../genesis-doc.md)). It does so by securely
updating the node's trusted state by requesting and verifying a minimal set of
data from the network's full nodes.

:::info

If you have access to an Oasis node that is synced with the latest height,
another option to speed bootstraping a new Oasis node is to [copy state from one
node to the other].

:::

:::caution

Tendermint's Light Client protocol requires at least 1 full node to be correct
to be able to [detect and submit evidence for a light client attack].

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
    trust_height: {{ trusted_height }}
    trust_hash: "{{ trusted_height_hash }}"

... trimmed ...

```

and replace the following variables in the configuration snippet:

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

[Tendermint's Light Client protocol]:
  https://docs.tendermint.com/main/tendermint-core/light-client.html
[copy state from one node to the other]: copy-state-from-one-node-to-the-other.md
[detect and submit evidence for a light client attack]:
  https://docs.tendermint.com/main/tendermint-core/light-client.html#where-to-obtain-trusted-height-hash
[Wiping Node State]: ../maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity

### Obtaining Trusted Height and Hash

To obtain the trusted height and the corresponding block header's hash, use one
of the following options.

#### Block Explorers

Browse to one of our block explorers (e.g. [Oasis Scan], [Oasis Monitor]) and
obtain the trusted height and hash there:

1. Obtain the current block height from the main page, e.g. 4819139.
2. Click on block height's number to view the block's details and obtain its
   hash, e.g. `377520acaf7b8011b95686b548504a973aa414abba2db070b6a85725dec7bd21`.

[Oasis Scan]: https://www.oasisscan.com
[Oasis Monitor]: https://oasismonitor.com

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
- mainnet: [bb3d748def55bdfb797a2ac53ee6ee141e54cd2ab2dc2375f4a0703a178e6e55](https://docs.oasis.io/node/mainnet/)
- testnet: [0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76](https://docs.oasis.io/node/testnet/)

Query our public Rosetta Gateway instance and obtain the trusted height and hash
there (replace the `<chain-context>` with the value obtained in the previous step):

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
			"index": 16787439,
			"hash": "443b71d835dbae7ea6233b06280ab596287d5c45f88fa76a71bf6cc52366592e"
		},
    ...
	}
}
```

The values you need are `index` and `hash`.

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
