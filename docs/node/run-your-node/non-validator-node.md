# Non-validator Node

:::info

These instructions are for setting up a _non-validator_ node. If you want to run a _validator_ node instead, see the [instructions for running a validator node](validator-node/README.md). Similarly, if you want to run a _ParaTime_ node instead, see the [instructions for running a ParaTime node](paratime-node.mdx).

:::

This guide will cover setting up your non-validator node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](prerequisites) section and have the Oasis Node binary installed on your systems.

### Creating a Working Directory

We will be creating the following directory structure inside a chosen top-level `/node` (feel free to name your directories however you wish) directory:

* `etc`: This will store the node configuration and genesis file.
* `data`: This will store the data directory needed by the running `oasis-node` binary, including the complete blockchain state.

  The directory permissions should be `rwx------`.

To create the directory structure, use the following command:

```bash
mkdir -m700 -p /node/{etc,data}
```

### Copying the Genesis File

The latest genesis file can be found in [Network Parameters](../mainnet/README.md). You should download the latest `genesis.json` file and copy it to the `/node/etc` directory we just created.

## Configuration

:::info

This will configure the given node to only follow the consensus layer.

:::

In order to configure the node create the `/node/etc/config.yml` file with the following content:

```yaml
datadir: /node/data

log:
  level:
    default: info
    tendermint: info
    tendermint/context: error
  format: JSON

genesis:
  file: /node/etc/genesis.json

consensus:
  tendermint:
    p2p:
      # List of seed nodes to connect to.
      # NOTE: You can add additional seed nodes to this list if you want.
      seed:
        - "{{ seed_node_address }}"

```

Before using this configuration you should collect the following information to replace the  variables present in the configuration file:

* `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.

  You can find the current Oasis Seed Node address in the [Network Parameters](../mainnet/README.md).

## Starting the Oasis Node

You can start the node by running the following command:

```bash
oasis-node --config /node/etc/config.yml
```

## Checking Node Status

To ensure that your node is properly connected with the network, you can run the following command after the node has started:

```bash
oasis-node control status -a unix:/node/data/internal.sock
```

