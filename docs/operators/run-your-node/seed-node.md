# Seed Node

This guide will cover setting up a seed node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites Guide](prerequisites/oasis-node.md) and understand how to use the `oasis-node` binary.

### Creating a Working Directory

We will be creating the following directory structure inside a chosen top-level `/node` (feel free to name your directories however you wish) directory:

* `etc`: This will store the node configuration and genesis file.
* `data`: This will store the data directory needed by the running `oasis-node` binary, including the complete blockchain state.

  The directory permissions should be `rwx------`.

To create the directory structure, use the following command:

```text
mkdir -m700 -p /node/{etc,data}
```

### Copying the Genesis File

The latest genesis file can be found in [Network Parameters](../mainnet/README.md). You should download the latest `genesis.json` file and copy it to the `/node/etc` directory we just created.

## Configuration

:::info

This will configure the given node to only act as a seed node.

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
    mode: seed
```

## Starting the Oasis Node

You can start the node by running the following command:

```bash
oasis-node --config /node/etc/config.yml
```

### Seed node address

To get the seed node Tendermint identity, run the following command:

```bash
oasis-node identity tendermint show-node-address --datadir /node/data/
```

### Share seed node address

Nodes can now use your seed node by specifying it via a configuration flag:

```bash
--consensus.tendermint.p2p.seed <TENDERMINT_ADDRESS>@<EXTERNAL_IP>:26656
```

