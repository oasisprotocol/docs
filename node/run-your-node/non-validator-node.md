# Non-validator Node

Source: https://docs.oasis.io/node/run-your-node/non-validator-node

**Info**:

These instructions are for setting up a *non-validator* node. If you want to run a *validator* node instead, see the [instructions for running a validator node](https://docs.oasis.io/node/run-your-node/validator-node.md). Similarly, if you want to run a *ParaTime* node instead, see the [instructions for running a ParaTime node](https://docs.oasis.io/node/run-your-node/paratime-node.md).

This guide will cover setting up your non-validator node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](https://docs.oasis.io/node/run-your-node/prerequisites.md) chapter and have the Oasis Node binary installed on your systems.

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

The latest genesis file can be found in the Network Parameters page ([Mainnet], [Testnet]). You should download the latest `genesis.json` file and copy it to the `/node/etc` directory we just created.

[Mainnet]: https://docs.oasis.io/node/network/mainnet.md

[Testnet]: https://docs.oasis.io/node/network/testnet.md

## Configuration

**Info**:

This will configure the given node to only follow the consensus layer.

In order to configure the node create the `/node/etc/config.yml` file with the following content:

```yaml
mode: client
common:
    data_dir: /node/data
    log:
        format: JSON
        level:
            cometbft: info
            cometbft/context: error
            default: info

genesis:
    file: /node/etc/genesis.json
p2p:
    # List of seed nodes to connect to.
    # NOTE: You can add additional seed nodes to this list if you want.
    seeds:
        - {{ seed_node_address }}
```

Before using this configuration you should collect the following information to replace the  variables present in the configuration file:

* `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.

  You can find the current Oasis Seed Node address in the Network Parameters page ([Mainnet], [Testnet]).

**Caution**:

Make sure the `consensus` port (default: `26656`) and `p2p.port` (default: `9200`) are exposed and publicly
accessible on the internet (for `TCP` and `UDP` traffic).

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

## See also

* [gRPC proxy for your Oasis node](https://docs.oasis.io/node/grpc.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
