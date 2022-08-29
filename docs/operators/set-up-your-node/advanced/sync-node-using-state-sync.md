# Using State Sync for Quick Bootstraping

The State Sync is a way to **quickly bootstrap** a **full Oasis node** (either a [validator node](../run-validator.md) or a [non-validator node](../run-non-validator.md)) by using [Tendermint's Light Client protocol](https://docs.tendermint.com/v0.35/tendermint-core/light-client.html). It allows one to initialize a node from a trusted height, its corresponding block's header and a trusted validator set (given in the [genesis document](/general/oasis-network/genesis-doc)). It does so by securely updating the node's trusted state by requesting and verifying a minimal set of data from the network's full nodes.

:::info

If you have access to an Oasis Node that is synced with the latest height, another option to speed bootstraping a new Oasis Node is to [copy state from one node to the other](copy-state-from-one-node-to-the-other.md).

:::

:::caution

Tendermint's Light Client protocol requires at least 1 full node to be correct to be able to [detect and submit evidence for a light client attack](https://docs.tendermint.com/v0.35/tendermint-core/light-client.html#security).

:::

To configure your node to use the state sync, amend your node's configuration (i.e. `config.yml`) with (non-relevant fields omitted):

```yaml
... trimmed ...

# Consensus.
consensus:

  ... trimmed ...

  # Tendermint backend configuration.
  tendermint:

    ... trimmed ...

    # Enable consensus state sync (i.e. Tendermint light client sync).
    state_sync:
      enabled: true
      trust_height: {{ trusted_height }}
      trust_hash: "{{ trusted_height_hash }}"
      # List of consensus nodes to use for syncing.
      consensus_node:
        - "{{ node1_grpc_endpoint }}"
        - "{{ node2_grpc_endpoint }}"
        
        .. trimmed ...
        
        - "{{ noden_grpc_endpoint }}"

... trimmed ...

```

and replace the following variables in the configuration snippet:

* `{{ trusted_height }}`: Trusted height defines the height at which your node should trust the chain.
* `{{ trusted_height_hash }}`: Trusted height hash defines the hash of the block header corresponding to the trusted height.
*   `{{ node1_grpc_endpoint }}`, `{{ node2_grpc_endpoint }}` , ...,

    `{{ noden_grpc_endpoint }}`: Addresses of a Oasis Nodes' publicly exposed gRPC endpoints of the form: `xAMjfJDcUFUcwgZGEQuOdux8gAdc+IFEqccB2LHdGjU=@34.86.145.181:9001`.

:::caution

You need to provide publicly exposed gRPC endpoints for **at least 2 different consensus nodes** for the state sync to work.

:::

:::danger

You need to **delete any existing node state** (if it exists), otherwise state sync will be skipped. To do that, follow the [Wiping Node State](../maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity) instructions.

If existing node state is found and state sync is skipped, you will see something like the following in your node's logs:

```
{"caller":"full.go:1233","level":"info","module":"tendermint","msg":"state sync enabled","ts":"2021-06-21T14:40:55.033642763Z"}
{"caller":"node.go:692","level":"info","module":"tendermint:base","msg":"Found local state with non-zero height, skipping state sync","ts":"2021-06-21T14:40:55.838955955Z"}
```

:::

### Obtaining Trusted Height and Hash

To obtain the trusted height and the corresponding block header's hash, use one of the following options.

#### Block Explorers

Browse to one of our block explorers (e.g. [OASIS SCAN](https://www.oasisscan.com), [Oasis Monitor](https://oasismonitor.com)) and obtain the trusted height and hash there:

1. Obtain the current block height from the main page, e.g. 4819139.
2. Click on block height's number to view the block's details and obtain its hash, e.g. `377520acaf7b8011b95686b548504a973aa414abba2db070b6a85725dec7bd21`.

#### A Trusted Node

If you have an existing node that you trust, you can use its status output to retrieve the current block height and hash by running:

```
oasis-node control status -a $ADDR
```

replacing `$ADDR` with the path to your node's internal UNIX socket (e.g. `/srv/oasis/node/internal.sock`).

This will give you output like the following (non-relevant fields omitted):

```json
{
  "software_version": "21.3.1",
  "identity": {
    ...
  },
  "consensus": {
    ...
    "latest_height": 6388075,
    "latest_hash": "d9f57b806917b6d3131925f7c987a785ea90f62b3a6987aedd1abdc371d84403",
    "latest_time": "2021-10-19T12:01:55+02:00",
    "latest_epoch": 10636,
    ...
  },
  ...
}
```

The values you need are `latest_height` and `latest_hash` .

#### Public Rosetta Gateway

Query our public Rosetta Gateway instance and obtain the trusted height and hash there:

1. _TODO._

#### Oasis Node's gRPC Endpoint

Query our public Oasis Node's gRPC endpoint and obtain the trusted height and hash there:

1. _TODO._

### Obtaining Addresses of Oasis Nodes' Publicly Exposed gRPC Endpoints

To find the addresses of Oasis Node's publicly exposed gRPC endpoints, use one of the following options.

#### List Registered Nodes' Descriptors via Oasis CLI from the Local Oasis Node

If you already have a local Oasis Node set up, you can list the descriptors of all registered nodes via Oasis CLI.

You need to search for the nodes that implement the `consensus-rpc` role.

The publicly exposed gRPC endpoint addresses are found under the node descriptor's `tls.addresses` key.

You can list the relevant addresses by running:

```
oasis-node registry node list -v -a $ADDR | \
  jq 'select(.roles | contains("consensus-rpc")) | .tls.addresses'
```

replacing `$ADDR` with the path to your node's internal UNIX socket (e.g. `/srv/oasis/node/internal.sock`).
