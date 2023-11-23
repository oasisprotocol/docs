# Sentry Node

This guide provides instructions for a deployment using the Sentry node architecture to protect validator nodes from being directly exposed on the public network.

This guide assumes a setup where an Oasis validator node is only accessible over a private network, with sentry nodes having access to it. The guide does not cover setting this infrastructure up. Knowledge of [Tendermint's Sentry Node architecture](https://forum.cosmos.network/t/sentry-node-architecture-overview/454) is assumed as well.

:::danger

This is only an example of a Sentry node deployment, and we take no responsibility for mistakes contained therein. Make sure you understand what you are doing.

:::

## Prerequisites

Before following this guide, make sure you've read the [Prerequisites](prerequisites/oasis-node.md) and [Running a Node on the Network](validator-node.mdx) guides and created your Entity.

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

[Mainnet]: ../mainnet/README.md
[Testnet]: ../testnet/README.md

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
##
# Oasis Sentry Node Configuration
#
# This file's configurations are derived from the command line args found in the
# root command of the oasis-node binary. For more information execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. So "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node artifacts
# should also be located in this directory (for us this is /node/data)
datadir: /node/data

# Logging.
#
# Per-module log levels are defined below. If you prefer just one unified log
# level, you can use:
#
# log:
#   level: debug
log:
  level:
    # Per-module log levels. Longest prefix match will be taken. Fallback to
    # "default", if no match.
    default: debug
    tendermint: warn
    tendermint/context: error
  format: JSON
  # By default logs are output to stdout. If you're running this in docker keep
  # the default
  #file: /var/log/oasis-node.log

# Path to the genesis file for the current version of the network.
genesis:
  file: /node/etc/genesis.json

# Worker configuration.
worker:
  sentry:
    # Enable sentry node.
    enabled: true
    # Port used by validator nodes to query sentry node for registry
    # information.
    # IMPORTANT: Only validator nodes protected by the sentry node should have
    # access to this port. This port should not be exposed on the public
    # network.
    control:
      port: 9009
      authorized_pubkey:
        - {{ validator_sentry_client_grpc_public_key }}

# Tendermint backend configuration.
consensus:
  tendermint:
    abci:
      prune:
        strategy: keep_n
        # Keep ~1 hour of data since block production is ~1 block every 6 seconds.
        # (3600/6 = 600)
        num_kept: 600
    core:
      listen_address: tcp://0.0.0.0:26656
      external_address: tcp://{{ external_address }}:26656
  
    # List of seed nodes to connect to.
    # NOTE: You can add additional seed nodes to this list if you want.
    p2p:
      seed:
        - "{{ seed_node_address }}"
  
    sentry:
      upstream_address:
        - "{{ validator_tendermint_id }}@{{ validator_private_address }}:26656"
```

:::tip

Multiple sentry nodes can be provisioned following the above steps.

:::

## Configuring the Oasis Validator Node

In this setup the Oasis validator node should not be exposed directly on the public network. The Oasis validator only needs to be able to connect to its sentry nodes, preferably via a private network.

### Initializing Validator Node

:::info

If your validator node is already registered and running in a non-sentry setup, this step can be skipped as the Oasis validator will update its address in the Registry automatically once we redeploy it with new configuration.

:::

When you are [initializing a validator node](validator-node.mdx#initializing-a-node), you should use the sentry node's external address and Consensus ID in the `node.consensus_address` flag. If you are running multiple sentry nodes, you can specify the `node.consensus_address` flag multiple times.

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

:::info

`SENTRY_CONSENSUS_ID`: This is the Consensus ID of the sentry node in base64 format. This ID can be obtained from `consensus_pub.pem`:

```bash
sed -n 2p /node/data/consensus_pub.pem
```

on the sentry node.

:::

### Configuring the Validator Node

There are some configuration changes needed for the Oasis validator node to enable proxying through its sentry node. Most of these flags should be familiar from the Tendermint sentry node architecture.

Since the validator node will not have an external address, the `consensus.tendermint.core.external_address` flag should be skipped. Similarly, the `consensus.tendermint.p2p.seed` flag can be skipped, as the `oasis-node` won't be directly connecting to any of the seed nodes.

Tendermint Peer Exchange should be disabled on the validator with the `consensus.tendermint.p2p.disable_peer_exchange` flag.

Sentry nodes can also be configured as Tendermint Persistent-Peers with the `consensus.tendermint.p2p.persistent_peer` flag.

In addition to the familiar Tendermint setup above, the node needs to be configured to query sentry nodes for external addresses every time the validator preforms a re-registration. This is configured with the `worker.sentry.address` flag.

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

```yaml
##
# Oasis Node Configuration
#
# This file's configurations are derived from the command line args found in
# the root command of the oasis-node binary. For more information execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. So "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node artifacts
# should also be located in this directory (for us this is /node/data)
datadir: /node/data

# Logging.
#
# Per-module log levels are defined below. If you prefer just one unified log
# level, you can use:
#
# log:
#   level: debug
log:
  level:
    # Per-module log levels. Longest prefix match will be taken. Fallback to
    # "default", if no match.
    default: debug
    tendermint: warn
    tendermint/context: error
  format: JSON
  # By default logs are output to stdout. If you're running this in docker keep
  # the default
  #file: /var/log/oasis-node.log

# Path to the genesis file for the current version of the network.
genesis:
  file: /node/etc/genesis.json

# Worker configuration.
worker:
  registration:
    # In order for the node to register itself the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /node/etc/entity.json
  sentry:
    address:
      - "{{ sentry_node_grpc_public_key }}@{{ sentry_node_private_ip }}:9009"

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: True

  # Tendermint backend configuration.
  tendermint:
    abci:
      prune:
        strategy: keep_n
        # Keep ~7 days of data since block production is ~1 block every 6 seconds.
        # (7*24*3600/6 = 100800)
        num_kept: 100800
    core:
      listen_address: tcp://0.0.0.0:26656
    p2p:
      persistent_peer:
        - "{{ sentry_node_tendermint_id }}@{{ sentry_node_private_ip }}:26656"
      disable_peer_exchange: True
```

