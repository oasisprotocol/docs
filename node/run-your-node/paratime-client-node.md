# ParaTime Client Node

Source: https://docs.oasis.io/node/run-your-node/paratime-client-node

This guide will cover setting up your ParaTime client node for the Oasis
Network. This guide assumes some basic knowledge on the use of command line
tools.

## Prerequisites

Make sure you have fulfilled all the requirements outlined in the
[Prerequisites] chapter before proceeding with node configuration.

[Prerequisites]: https://docs.oasis.io/node/run-your-node/paratime-node.md#prerequisites

## Configuration

For the Emerald ParaTime, configuring paths to ParaTime bundles is required.
However, for the Sapphire and Cipher ParaTimes, this setup is optional, as
bundles are automatically downloaded from the [Oasis Bundle Registry].

In order to configure the ParaTime client node, create the `/node/etc/config.yml` file with the following content:

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
    seeds:
      # List of seed nodes to connect to.
      # NOTE: You can add additional seed nodes to this list if you want.
        - {{ seed_node_address }}
runtime:
    # Paths to bundles for ParaTimes without hot-loading support (e.g., Emerald).
    paths:
        - {{ runtime_orc_path }}
    # Runtime configuration for every ParaTime. Mandatory for ParaTimes with
    # hot-loading support (e.g. Sapphire, Cipher).
    runtimes:
        - id: {{ runtime_identifier }}
        # List additional ParaTimes here.
    # The following section is required if at least one ParaTime is running
    # inside the Intel SGX Trusted Execution Environment.
    sgx_loader: /node/bin/oasis-core-runtime-loader
```

Before using the configuration, replace the following variables:

* `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.
  * You can find the current Oasis Seed Node address in the Network Parameters page ([Mainnet], [Testnet]).
* `{{ runtime_orc_path }}`: Path to the [ParaTime bundle](https://docs.oasis.io/node/run-your-node/paratime-node.md#manual-bundle-installation) of the form
  `/node/runtimes/foo-paratime.orc`. See the [Advanced](#advanced) section for more information.
  * You can find the current Oasis-supported ParaTimes in the Network Parameters page ([Mainnet], [Testnet]).
* `{{ runtime_identifier }}`: You can find the runtime identifier in the Network
  Parameters page ([Mainnet], [Testnet]).

**Caution**:

Make sure the `consensus` port (default: `26656`) and `p2p.port` (default: `9200`) are exposed and publicly
accessible on the internet (for `TCP` and `UDP` traffic).

[Oasis Bundle Registry]: https://github.com/oasisprotocol/bundle-registry

[Mainnet]: https://docs.oasis.io/node/network/mainnet.md

[Testnet]: https://docs.oasis.io/node/network/testnet.md

### Stateless Client Node (optional)

**Info**:

Stateless client is still in early stage, and thus not suitable for use cases where you need high availability.

Client node requires sufficient disk space and must wait for state synchronization.
A stateless client node avoids these problems by fetching the state and light blocks via configured gRPC endpoints
(provider node addresses) and using a light client to verify the data against state roots from block headers.
It can be started using the following configuration:

```yaml
mode: client-stateless
# ... sections not relevant are omitted ...
consensus:
    # Light client configuration
    light_client:
        trust:
            # ... sections less relevant are omitted ...
    providers:
        - <node-address-1>
        - <node-address-2>
        # Add more node addresses as needed
```

We recommend configuring a recent trust root (e.g. 1000 blocks old), that is younger than your providers last retained
height, taking their pruning into account.

**Info**:

See the [State Sync](https://docs.oasis.io/node/run-your-node/advanced/sync-node-using-state-sync.md) documentation for more info on configuring trusted
period, height and hash for the light client.

The provider address can be a domain name, IP of a node on the network, or a path to the socket of a local node.
To ensure compatibility, all provider nodes specified must be running the latest version of Oasis Core.

**Note**:

Make sure you allow all the methods listed in [this example](https://docs.oasis.io/node/grpc.md#envoy) in your gRPC proxy for Oasis node.

**Tip**:

You can use `grpc.oasis.io:443` or `grpc.testnet.oasis.io:443` as provider addresses for Mainnet and Testnet.

### TEE ParaTime Client Node (optional)

If your node requires the ability to issue queries that can access confidential
data, start by following the [Configuration](#configuration) section to create
the `/node/etc/config.yml` file. Once the file is set up, add the following
content to the `runtime` part within the `/node/etc/config.yml` file:

```yaml
# ... sections not relevant are omitted ...
runtime:
    # Paths to bundles for ParaTimes without hot-loading support (e.g., Emerald).
    paths:
        - {{ runtime_orc_path }}
    # Configuration for all ParaTimes with hot-loading support
    # (e.g., Sapphire, Cipher)
    runtimes:
        - id: {{ runtime_identifier }}
        # List additional ParaTimes here.
    # The following section is required for ParaTimes which are running inside
    # the Intel SGX Trusted Execution Environment.
    sgx_loader: /node/bin/oasis-core-runtime-loader
```

Before using the configuration, replace the following variables:

* `{{ runtime_orc_path }}`: Path to the [ParaTime bundle](https://docs.oasis.io/node/run-your-node/paratime-node.md#manual-bundle-installation) of the form
  `/node/runtimes/foo-paratime.orc`.
  * You can find the current Oasis-supported ParaTimes in the Network Parameters page ([Mainnet], [Testnet]).
* `{{ runtime_identifier }}`: You can find the runtime identifier in the Network
  Parameters page ([Mainnet], [Testnet]).

### Enabling Expensive Queries (optional)

In case you need to issue runtime queries that may require more resources to
compute (e.g. when running a Web3 Gateway), you need to configure the following
in your node's `/node/etc/config.yml` file:

```yaml
# ... sections not relevant are omitted ...
runtime:
    # Paths to ParaTime bundles for all of the supported ParaTimes.
    paths:
        - {{ runtime_orc_path }}
    # Configuration for all ParaTimes with hot-loading support
    # (e.g., Sapphire, Cipher)
    runtimes:
        - id: {{ runtime_identifier }}
            components: {}
            # ... sections not relevant are omitted ...
            config:
                {{ runtime_id }}:
                    estimate_gas_by_simulating_contracts: true
                    allowed_queries:
                        - all_expensive: true 
```

Before using the configuration, replace the following variables:

* `{{ runtime_orc_path }}`: Path to the [ParaTime bundle](https://docs.oasis.io/node/run-your-node/paratime-node.md#manual-bundle-installation) of the form
  `/node/runtimes/foo-paratime.orc`.
  * You can find the current Oasis-supported ParaTimes in the Network Parameters page ([Mainnet], [Testnet]).
* `{{ runtime_id}}`: You can find the `runtime_id` in the Network Parameters
  chapter ([Mainnet], [Testnet])
* `{{ runtime_identifier }}`: You can find the runtime identifier in the Network
  Parameters page ([Mainnet], [Testnet]).

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

## Advanced

### Set Custom Registry

For instructions on setting up custom bundle registry, please see the
[Custom Bundle Registry] chapter.

[Custom Bundle Registry]: https://docs.oasis.io/node/run-your-node/paratime-node.md#custom-bundle-registry

### Manual Bundle Installation

For instructions on manual bundle installation, please see the
[Manual Bundle Installation] chapter.

[Manual Bundle Installation]: https://docs.oasis.io/node/run-your-node/paratime-node.md#manual-bundle-installation

## See also

* [Oasis Web3 Gateway for your EVM ParaTime](https://docs.oasis.io/node/web3.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
