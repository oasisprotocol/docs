# Key Manager Node

:::info

These instructions are for setting up a _key manager_ node. Key manager nodes run a special runtime that provides confidentiality to other ParaTimes. If you want to run a _validator_ node instead, see the [instructions for running a validator node](validator-node/README.md). Similarly, if you want to run a _ParaTime_ node instead, see the [instructions for running a ParaTime node](paratime-node.mdx).

:::

:::tip

At time of writing the key manager ParaTime is deployed only on the Testnet to support Cipher and Sapphire ParaTimes, and limited to be run by trustworthy partners.

:::

This guide will cover setting up your key manager node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](prerequisites) and [Run a Non-validator Node](non-validator-node.md) sections and have:

* Oasis Node binary installed on your system and a dedicated non-root user that will run your Oasis Node.
* The chosen top-level `/node/` working directory prepared (feel free to name it as you wish, e.g. `/srv/oasis/`) with:
  * `etc`: This will store the node configuration and genesis file.
  * `data`: This will store the data directory needed by Oasis Node, including your node identity and the blockchain state. The directory permissions should be `rwx------`.
  * `bin`: This will store binaries needed by Oasis Node for running the ParaTimes.
  * `runtimes`: This will store the ParaTime bundles.
* Downloaded or compiled the correct versions of everything according to [Mainnet Network Parameters](../mainnet/README.md):
  * The genesis file copied to `/node/etc/genesis.json`.
  * The binaries needed by Oasis Node for running the ParaTimes copied to `/node/bin/`.
  * The key manager ParaTime bundle (`.orc` extension) copied to `/node/runtimes/`.
* Initialized a new node and updated your entity registration by following the [Register a New Entity or Update Your Entity Registration](paratime-node.mdx#register-a-new-entity-or-update-your-entity-registration) instructions.
  * The entity descriptor file copied to `/node/etc/entity.json`.

:::tip

Reading the rest of the [validator node setup instructions](validator-node/README.md) and [ParaTime node setup instructions](paratime-node.mdx) may also be useful.

:::

### Setting up Trusted Execution Environment (TEE)

The key manager ParaTime requires the use of a TEE. See the [Set up Trusted Execution Environment (TEE)](prerequisites/set-up-trusted-execution-environment-tee.md) doc for instructions on how to set it up before proceeding.

## Configuration

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
    core:
      listen_address: tcp://0.0.0.0:26656

      # The external IP that is used when registering this node to the network.
      # NOTE: If you are using the Sentry node setup, this option should be
      # omitted.
      external_address: tcp://{{ external_address }}:26656

    p2p:
      # List of seed nodes to connect to.
      # NOTE: You can add additional seed nodes to this list if you want.
      seed:
        - "{{ seed_node_address }}"

runtime:
  mode: keymanager
  paths:
    # Path to the key manager ParaTime bundle.
    - "{{ keymanager_runtime_orc_path }}"

  # The following section is required for ParaTimes which are running inside the
  # Intel SGX Trusted Execution Environment.
  sgx:
    loader: /node/bin/oasis-core-runtime-loader

worker:
  registration:
    # In order for the node to register itself, the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /node/etc/entity.json

  keymanager:
    runtime:
      id: "{{ keymanager_runtime_id }}"

  p2p:
    # External P2P configuration.
    port: 20104
    addresses:
      # The external IP that is used when registering this node to the network.
      - "{{ external_address }}:20104"

# The following section is required for ParaTimes which are running inside the
# Intel SGX Trusted Execution Environment.
ias:
  proxy:
    address:
      # List of IAS proxies to connect to.
      # NOTE: You can add additional IAS proxies to this list if you want.
      - "{{ ias_proxy_address }}"
```

Before using this configuration you should collect the following information to replace the `{{ ... }}` variables present in the configuration file:

* `{{ external_address }}`: The external IP you used when registering this node.
* `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.
  * You can find the current Oasis Seed Node address in the [Network Parameters](../mainnet/README.md).
* `{{ keymanager_runtime_orc_path }}`: Path to the key manager [ParaTime bundle](paratime-node.mdx#the-paratime-bundle) of the form `/node/runtimes/foo-paratime.orc`.
  * You can find the current Oasis-supported key manager ParaTime in the [Mainnet Network Paramers](../mainnet/README.md#paratimes).
* `{{ keymanager_runtime_id }}`: Runtime identified for the key manager ParaTime.
  * You can find the current Oasis-supported key manager ParaTime identifiers in the [Mainnet Network Paramers](../mainnet/README.md#paratimes).
* `{{ ias_proxy_address }}`: The IAS proxy address in the form `ID@HOST:port`.
  * You can find the current Oasis IAS proxy address in the [Mainnet Network Parameters](../mainnet/README.md#cipher-paratime).
  * If you want, you can also [run your own IAS proxy](ias-proxy.md).

:::caution

Make sure the `worker.p2p.port` (default: `9200`) port is exposed and publicly
accessible on the internet (for `TCP` traffic).

:::

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
