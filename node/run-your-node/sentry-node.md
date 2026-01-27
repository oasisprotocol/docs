# Sentry Node

Source: https://docs.oasis.io/node/run-your-node/sentry-node

This guide provides instructions for a deployment using the Sentry node architecture to protect validator nodes from being directly exposed on the public network.

This guide assumes a setup where an Oasis validator node is only accessible over a private network, with sentry nodes having access to it. The guide does not cover setting this infrastructure up. Knowledge of [Tendermint's Sentry Node architecture](https://forum.cosmos.network/t/sentry-node-architecture-overview/454) is assumed as well.

**Danger**:

This is only an example of a Sentry node deployment, and we take no responsibility for mistakes contained therein. Make sure you understand what you are doing.

## Prerequisites

Before following this guide, make sure you've read the [Prerequisites](https://docs.oasis.io/node/run-your-node/prerequisites/oasis-node.md) and [Running a Node on the Network](https://docs.oasis.io/node/run-your-node/validator-node.md) guides and created your Entity.

## Configuring the Oasis Sentry Node

### Initializing Sentry Node

Sentry node identity keys can be initialized with:

```bash
oasis-node identity init --datadir /node/data
```

### Configuring Sentry Node

An Oasis node can be configured to run as a sentry node by setting the `worker.sentry.enabled` flag. The `tendermint.sentry.upstream_address` flag can be used to configure a list of nodes that will be protected by the sentry node.

An example of full `YAML` configuration of a sentry node is below.

Before using this configuration you should collect the following information to replace the  variables present in the configuration file:

* `{{ external_address }}`: This is the external IP on which sentry node will be reachable.
* `{{ seed_node_address }}`: This the seed node address of the form `ID@IP:port`. You can find the current Oasis Seed Node address in the Network Parameters page ([Mainnet], [Testnet]).

[Mainnet]: https://docs.oasis.io/node/network/mainnet.md

[Testnet]: https://docs.oasis.io/node/network/testnet.md

* `{{ validator_tendermint_id }}`: This is the Tendermint ID (address) of the Oasis validator node that will be protected by the sentry node. This address can be obtained by running:

  ```bash
  oasis-node identity tendermint show-node-address --datadir /node/data
  ```

  on the validator node.

* `{{ validator_private_address }}`: This is the (presumably) private address on which validator should be reachable from the sentry node.

* `{{ validator_sentry_client_grpc_public_key }}`: This is the public TLS key of the Oasis validator node that will be protected by the sentry node. This public key can be obtained by running:

  ```bash
   oasis-node identity show-sentry-client-pubkey --datadir /node/data
  ```

  on the validator node. Note that the above command is only available in `oasis-node` from version 20.8.1 onward.

```yaml
mode: client
common:
    data_dir: /node/data
    log:
        format: JSON
        level:
            cometbft: warn
            cometbft/context: error
            # Per-module log levels. Longest prefix match will be taken. Fallback to
            # "default", if no match.
            default: debug
            # By default logs are output to stdout. If you're running this in docker 
            # keep the default
            #file: /var/log/oasis-node.log
consensus:
    external_address: tcp://{{ external_address }}:26656
    listen_address: tcp://0.0.0.0:26656
    sentry_upstream_addresses:
        - {{ validator_tendermint_id }}@{{ validator_private_address }}:26656
genesis:
    # Path to the genesis file for the current version of the network.
    file: /node/etc/genesis.json
p2p:
    seeds:
        # List of seed nodes to connect to.
        # NOTE: You can add additional seed nodes to this list if you want.
        - {{ seed_node_address }}
sentry:
    # Port used by validator nodes to query sentry node for registry
    # information.
    # IMPORTANT: Only validator nodes protected by the sentry node should have
    # access to this port. This port should not be exposed on the public
    # network.
    control:
        authorized_pubkeys:
            - {{ validator_sentry_client_grpc_public_key }}
        port: 9009
    enabled: true
```

**Tip**:

Multiple sentry nodes can be provisioned following the above steps.

## Configuring the Oasis Validator Node

In this setup the Oasis validator node should not be exposed directly on the public network. The Oasis validator only needs to be able to connect to its sentry nodes, preferably via a private network.

### Initializing Validator Node

**Info**:

If your validator node is already registered and running in a non-sentry setup, this step can be skipped as the Oasis validator will update its address in the Registry automatically once we redeploy it with new configuration.

When you are [initializing a validator node](https://docs.oasis.io/node/run-your-node/validator-node.md#configuration), you should use the sentry node's external address and Consensus ID in the `node.consensus_address` flag. If you are running multiple sentry nodes, you can specify the `node.consensus_address` flag multiple times.

To initialize a validator node with 2 sentry nodes, run the following commands from the `/localhostdir/node` directory:

```bash
export SENTRY1_CONSENSUS_ID=<YOUR_SENTRY1_CONSENSUS_ID_B64>
export SENTRY1_STATIC_IP=<YOUR_SENTRY1_STATIC_IP>
export SENTRY2_CONSENSUS_ID=<YOUR_SENTRY2_CONSENSUS_ID_B64>
export SENTRY2_STATIC_IP=<YOUR_SENTRY2_STATIC_IP>
oasis-node registry node init \
  --signer.backend file \
  --signer.dir /localhostdir/entity \
  --node.consensus_address $SENTRY1_CONSENSUS_ID@$SENTRY1_STATIC_IP:26656 \
  --node.consensus_address $SENTRY2_CONSENSUS_ID@$SENTRY2_STATIC_IP:26656 \
  --node.is_self_signed \
  --node.role validator
```

**Info**:

`SENTRY_CONSENSUS_ID`: This is the Consensus ID of the sentry node in base64 format. This ID can be obtained from `consensus_pub.pem`:

```bash
sed -n 2p /node/data/consensus_pub.pem
```

on the sentry node.

### Configuring the Validator Node

There are some configuration changes needed for the Oasis validator node to enable proxying through its sentry node. Most of these flags should be familiar from the Tendermint sentry node architecture.

Since the validator node will not have an external address, the `consensus.tendermint.core.external_address` flag should be skipped. Similarly, the `consensus.tendermint.p2p.seed` flag can be skipped, as the `oasis-node` won't be directly connecting to any of the seed nodes.

Tendermint Peer Exchange should be disabled on the validator with the `consensus.tendermint.p2p.disable_peer_exchange` flag.

Sentry nodes can also be configured as Tendermint Persistent-Peers with the `consensus.tendermint.p2p.persistent_peer` flag.

In addition to the familiar Tendermint setup above, the node needs to be configured to query sentry nodes for external addresses every time the validator performs a re-registration. This is configured with the `worker.sentry.address` flag.

The `worker.sentry.address` flag is of format: `<pubkey>@ip:port` where:

* `<pubkey>`: Is the sentry node's TLS public key.
* `ip:port`: Is the (private) address of the sentry node's control endpoint.

Putting it all together, an example configuration of a validator node in the sentry node architecture is given below.

Before using this configuration you should collect the following information to replace the `{{ var_name }}` variables present in the configuration file:

* `{{ sentry_node_private_ip }}`: This is the private IP address of the sentry node over which sentry node should be accessible to the validator.

* `{{ sentry_node_grpc_public_key }}`: This is the sentry node's control endpoint TLS public key. This ID can be obtained by running:

  ```bash
   oasis-node identity show-tls-pubkey --datadir /node/data
  ```

  on the sentry node. Note that the above command is only available in `oasis-node` from version 20.8.1 onward.

* `{{ sentry_node_tendermint_id }}`: This is the Tendermint ID (address) of the sentry node that will be configured as a Persistent Peer. This ID can be obtained by running:

  ```bash
  oasis-node identity tendermint show-node-address --datadir /node/data
  ```

  on the sentry node.

* `{{ entity_id }}`: This is node's entity ID from `entity.json`.

```yaml
mode: validator
common:
    data_dir: /node/data
    log:
        format: JSON
        level:
            cometbft: warn
            cometbft/context: error
            # Per-module log levels. Longest prefix match will be taken.
            # Fallback to "default", if no match.
            default: debug
        # By default logs are output to stdout. If you're running this in docker keep
        # the default
        #file: /var/log/oasis-node.log

consensus:
    listen_address: tcp://0.0.0.0:26656
    p2p:
        disable_peer_exchange: true
        persistent_peers:
            - {{ sentry_node_tendermint_id }}@{{ sentry_node_private_ip }}:26656

genesis:
    # Path to the genesis file for the current version of the network.
    file: /node/etc/genesis.json

registration:
    # In order for the node to register itself, the entity ID must be set.
    entity_id: {{ entity_id }}

sentry:
    address:
        - {{ sentry_node_grpc_public_key }}@{{ sentry_node_private_ip }}:9009
```

**Caution**:

Make sure the `consensus` port (default: `26656`) and `p2p.port` (default: `9200`) are exposed and publicly
accessible on the internet (for `TCP` and `UDP` traffic).

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
