---
description: This page describes how to run a ParaTime node on the Oasis Network.
---

# Run a ParaTime Node

{% hint style="info" %}
These instructions are for setting up a _ParaTime_ node which participates in one or more ParaTime compute committees. If you want to run a _ParaTime client_ node instead, see the [instructions for running a ParaTime client node](run-a-paratime-client-node.md). If you want to run a _validator_ node instead, see the [instructions for running a validator node](run-validator.md). Similarly, if you want to run a non-validator node instead, see the [instructions for running a non-validator node](run-non-validator.md).
{% endhint %}

{% hint style="warning" %}
For a production setup, we recommend running the ParaTime compute/storage node separately from the validator node (if you run one).

Running ParaTime and validator nodes as separate Oasis nodes will prevent configuration mistakes and/or (security) issues affecting one node type from affecting the other one.
{% endhint %}

{% hint style="success" %}
If you are looking for some concrete ParaTimes that you can run, see [the list of ParaTimes and their parameters](../../contribute-to-the-network/run-a-paratime-node.md).
{% endhint %}

{% hint style="success" %}
Oasis Core refers to ParaTimes as runtimes internally, so all configuration options will have runtime in their name.
{% endhint %}

This guide will cover setting up your ParaTime compute node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](../prerequisites/) and [Run a Non-validator Node](run-non-validator.md) sections and have:

* Oasis Node binary installed and configured on your system.
* The chosen top-level `/node/` working directory prepared. In addition to `etc` and `data` directories, also prepare the following directories:
  * `bin`: This will store binaries needed by Oasis Node for running the ParaTimes.
  * `runtimes`: This will store the ParaTime binaries and their corresponding signatures (if they are running in a Trusted Execution Environment).

{% hint style="success" %}
Feel free to name your working directory as you wish, e.g. `/srv/oasis/`.

Just make sure to use the correct working directory path in the instructions below.
{% endhint %}

* Genesis file copied to `/node/etc/genesis.json`.

{% hint style="success" %}
Reading the rest of the [validator node setup instructions](run-validator.md) may also be useful.
{% endhint %}

{% hint style="info" %}
To speed up bootstraping your new node, we recommend [copying node's state from your existing node](../advanced/copy-state-from-one-node-to-the-other.md) or [syncing it using state sync](../advanced/sync-node-using-state-sync.md).
{% endhint %}

### Stake Requirements

To be able to register as a ParaTime node on the Oasis Network, you need to have enough tokens staked in your entity's escrow account.

To see the staking requirements for different node roles, use the Oasis CLI tools as described in [Common Staking Info](../../manage-tokens/advanced/oasis-cli-tools/common-staking-info.md).

{% hint style="success" %}
Currently, both the Mainnet and the Testnet require 100 ROSE/TEST for each role type:

```
Staking threshold (entity): ROSE 100.0
Staking threshold (node-validator): ROSE 100.0
Staking threshold (node-compute): ROSE 100.0
Staking threshold (node-storage): ROSE 100.0
Staking threshold (node-keymanager): ROSE 100.0
Staking threshold (runtime-compute): ROSE 100.0
Staking threshold (runtime-keymanager): ROSE 100.0
```
{% endhint %}

To register a node that is both a validator and a ParaTime node, the entity for which the node is registered would need to satisfy the following:

* Entity registration staking threshold (currently 100 tokens),
* Validator node staking threshold (currently 100 tokens),
* Compute node staking threshold (currently 100 tokens),
* Storage node staking threshold (currently 100 tokens).

All together, there would need to be at least 400 tokens staked in your entity's escrow account.

To stake the tokens, use our [Oasis CLI tools](../../manage-tokens/advanced/oasis-cli-tools/delegate-tokens.md).

If everything was set up correctly, you should see something like below when running [Oasis Node Stake Account Info](../../manage-tokens/advanced/oasis-cli-tools/get-account-info.md) command for your entity's account (this is an example for the Testnet):

```bash
Balance:
  Total: 0.0 TEST
  Available: 0.0 TEST

Active Delegations to this Account:
  Total: 20000.0 TEST (20000000000000 shares)
  Delegations:
    - From:   oasis1qrwdwxutpyr9d2m84zh55rzcf99aw0hkts7myvv9
      Amount: 20000.0 TEST (20000000000000 shares)

Stake Accumulator:
  Claims:
    - Name: registry.RegisterEntity
      Staking Thresholds:
        - Global: entity
    - Name: registry.RegisterNode.HG5TB3dbY8gtYBBw/R/cHfPaOpe0vT7W1wu/2rtpk/A=
      Staking Thresholds:
        - Global: node-compute
      Staking Thresholds:
        - Global: node-storage

Nonce: 1
```

{% hint style="info" %}
The stake requirements may differ from ParaTime to ParaTime and are subject to change in the future.
{% endhint %}

### Register a New Entity or Update Your Entity Registration

If you don't have an entity yet, create a new one by following the [Creating Your Entity](run-validator.md#creating-your-entity) instructions.

{% hint style="danger" %}
Everything in this section should be done on the `localhost` as there are sensitive items that will be created.
{% endhint %}

If you will be running the ParaTime on a new Oasis Node, initialize a new node by following the [Initializing a Node](run-validator.md#initializing-a-node) instructions.

Then update your entity descriptor by enumerating paths to all your node's descriptors (existing and new ones) in the `--entity.node.descriptor` flag. For example:

```bash
oasis-node registry entity update \
    ... various signer flags ... \
    --entity.node.descriptor /localhost/node1/node_genesis.json,/localhost/node2/node_genesis.json
```

{% hint style="info" %}
To confirm all nodes are added to your entity descriptor, run:

```bash
cat <PATH-TO-entity.json>
```

and ensure you see all your nodes' IDs under the `"nodes"` list.

For example:

```bash
{
  "v": 2,
  "id": "QTg+ZjubD/36egwByAIGC6lMVBKgqo7xnZPgHVoIKzc=",
  "nodes": [
    "yT1h8/eN0VInQxn3YKcHxvSgGcsjsTSYmdTLZZMBTWI=",
    "HG5TB3dbY8gtYBBw/R/cHfPaOpe0vT7W1wu/2rtpk/A="
  ]
}
```
{% endhint %}

Then generate and submit the new/updated entity descriptor via the entity registration transaction by following the [Generating Entity Registration Transaction](run-validator.md#generating-entity-registration-transaction) instructions.

{% hint style="warning" %}
Make sure your entity descriptor (i.e. `entity.json`) is copied to your online server and saved as `/node/entity/entity.json` to ensure the [node's configuration](run-a-paratime-node.md#configuration) will find it.
{% endhint %}

{% hint style="success" %}
You will [configure the node](run-a-paratime-node.md#configuration) to automatically register for the roles it has enabled (i.e. storage and compute roles) via the `worker.registration.entity` configuration flag.

No manual node registration is necessary.
{% endhint %}

{% hint style="info" %}
ParaTime rewards for running the compute node will be sent to your entity address **inside the ParaTime**. To access the rewards on the consensus layer, you will need to withdraw them first. Read the [Deposit/Withdraw Tokens to/from ParaTime](../../manage-tokens/advanced/oasis-cli-tools/deposit-withdraw-tokens-to-from-paratime.md) chapter to learn more.
{% endhint %}

### The ParaTime Identifier and Binary

In order to run a ParaTime node you need to obtain the following pieces of information first, both of these need to come from a trusted source:

* ****[**The ParaTime Identifier**](https://docs.oasis.dev/oasis-core/high-level-components/index-1/identifiers) is a 256-bit unique identifier of a ParaTime on the Oasis Network. It provides a unique identity to the ParaTime and together with the [genesis document's hash](https://docs.oasis.dev/oasis-core/high-level-components/index/genesis#genesis-documents-hash) serves as a domain separation context for ParaTime transaction and cryptographic commitments.\
  \
  It is usually represented in hexadecimal form, for example:\
  `8000000000000000000000000000000000000000000000000000000000000000`\

* **The ParaTime Binary** contains the executable code that implements the ParaTime itself. It is executed in a sandboxed environment by Oasis Node and its format depends on whether the ParaTime is running in a Trusted Execution Environment (TEE) or not.\
  \
  In the non-TEE case this will be a regular Linux executable (an [ELF binary](https://en.wikipedia.org/wiki/Executable\_and\_Linkable\_Format), usually without an extension) and in the TEE case this will be an [SGXS binary](https://github.com/fortanix/rust-sgx/blob/master/doc/SGXS.md) (usually with a `.sgxs` extension) that describes a secure enclave together with a detached signature of the binary (usually with a `.sig`extension).

{% hint style="danger" %}
Like the genesis document, make sure you obtain these from a trusted source.
{% endhint %}

{% hint style="warning" %}
#### **Compiling the ParaTime Binary from Source Code**

In case you decide to build the ParaTime binary from source yourself, make sure that you follow our [guidelines for deterministic compilation](https://docs.oasis.dev/oasis-sdk/guide/reproducing) to ensure that you receive the exact same binary.

When the ParaTime is running in a TEE, a different binary to what is registered in the consensus layer will not work and will be rejected by the network.
{% endhint %}

### Install Oasis Core Runtime Loader

For ParaTimes running inside [Intel SGX Trusted Execution Environment](run-a-paratime-node.md#setting-up-trusted-execution-environment-tee), you will need to install the Oasis Core Runtime Loader.

The Oasis Core Runtime Loader binary (`oasis-core-runtime-loader`) is part of Oasis Core binary releases, so make sure you download the appropriate version specified the [Network Parameters](../../oasis-network/network-parameters.md) page.

Install it to `bin` subdirectory of your node's working directory, e.g. `/node/bin/oasis-core-runtime-loader`.

### Install ParaTime Binary

For each ParaTime, you need to obtain its binary and install it to `runtimes` subdirectory of your node's working directory.

For ParaTimes running inside a Trusted Execution Environment, you also need to obtain and install the binary's detached signature to this directory.

{% hint style="info" %}
For example, for the [Cipher ParaTime](../../foundation/testnet/#cipher-paratime), you would have to obtain the `cipher-paratime.sgxs` binary and the `cipher-paratime.sig` detached signature and install them to `/node/runtimes/cipher-paratime.sgxs`and `/node/runtimes/cipher-paratime.sig`.
{% endhint %}

### Install Bubblewrap Sandbox (at least version 0.3.3)

ParaTime compute nodes execute ParaTime binaries inside a sandboxed environment provided by [Bubblewrap](https://github.com/containers/bubblewrap). In order to install it, please follow these instructions, depending on your distribution:

{% tabs %}
{% tab title="Ubuntu 18.10+" %}
```bash
sudo apt install bubblewrap
```
{% endtab %}

{% tab title="Fedora" %}
```bash
sudo dnf install bubblewrap
```
{% endtab %}

{% tab title="Other Distributions" %}
On other systems, you can download the latest [source release provided by the Bubblewrap project](https://github.com/containers/bubblewrap/releases) and build it yourself.

Make sure you have the necessary development tools installed on your system and the `libcap` development headers. On Ubuntu, you can install them with:

```bash
sudo apt install build-essential libcap-dev
```

After obtaining the Bubblewrap source tarball, e.g. [bubblewrap-0.4.1.tar.xz](https://github.com/containers/bubblewrap/releases/download/v0.4.1/bubblewrap-0.4.1.tar.xz), run:

```bash
tar -xf bubblewrap-0.4.1.tar.xz
cd bubblewrap-0.4.1
./configure --prefix=/usr
make
sudo make install
```

{% hint style="warning" %}
Note that Oasis Node expects Bubblewrap to be installed under `/usr/bin/bwrap` by default.
{% endhint %}
{% endtab %}
{% endtabs %}

Ensure you have a new enough version by running:

```
bwrap --version
```

{% hint style="warning" %}
Ubuntu 18.04 LTS (and earlier) provide overly-old `bubblewrap`. Follow _Other Distributions_ section on those systems.&#x20;
{% endhint %}

### Setting up Trusted Execution Environment (TEE)

If a ParaTime requires the use of a TEE, then make sure you set up TEE as instructed in the [Set up Trusted Execution Environment (TEE)](../prerequisites/set-up-trusted-execution-environment-tee.md) doc.

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
  supported:
    # List of ParaTimes that the node should support.
    - "{{ runtime_id }}"

  paths:
    # Paths to ParaTime binaries for all of the supported ParaTimes.
    "{{ runtime_id }}": {{ runtime_bin_path }}
  
  # The following section is required for ParaTimes which are running inside the
  # Intel SGX Trusted Execution Environment.
  sgx:
    loader: /node/bin/oasis-core-runtime-loader
    signatures:
      # Paths to ParaTime signatures.
      "{{ runtime_id }}": {{ runtime_sig_path }}

worker:
  registration:
    # In order for the node to register itself, the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /node/entity/entity.json
  
  storage:
    enabled: true
  
  compute:
    enabled: true
  
  client:
    # External gRPC configuration.
    port: 30001
    addresses:
      # The external IP that is used when registering this node to the network.
      - "{{ external_address }}:30001"
  
  p2p:
    # External P2P configuration.
    enabled: true
    port: 30002
    addresses:
      # The external IP that is used when registering this node to the network.
      - "{{ external_address }}:30002"

# The following section is required for ParaTimes which are running inside the
# Intel SGX Trusted Execution Environment.
ias:
  proxy:
    address:
      # List of IAS proxies to connect to.
      # NOTE: You can add additional IAS proxies to this list if you want.
      - "{{ ias_proxy_address }}"
```

Before using this configuration you should collect the following information to replace the  variables present in the configuration file:

* `{{ external_address }}`: The external IP you used when registering this node.
* `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.
  * You can find the current Oasis Seed Node address in the [Network Parameters](../../oasis-network/network-parameters.md).
* `{{ runtime_id }}`: The [ParaTime identifier](run-a-paratime-node.md#the-paratime-identifier-and-binary).
  * You can find the current Oasis-supported ParaTime identifiers in the [Network Paramers](../../foundation/testnet/#paratimes).
* `{{ runtime_bin_path }}`: Path to the [ParaTime binary](run-a-paratime-node.md#the-paratime-identifier-and-binary) of the form `/node/runtimes/foo-paratime.sgxs`.
* `{{ runtime_sig_path }}`: Path to the [ParaTime detached signature](run-a-paratime-node.md#the-paratime-identifier-and-binary) (for ParaTimes that require Intel SGX) of the form `/node/runtimes/foo-paratime.sig`.
* `{{ ias_proxy_address }}`: The IAS proxy address in the form `ID@HOST:port`.
  * You can find the current Oasis IAS proxy address in the [Network Parameters](../../oasis-network/network-parameters.md).
  * If you want, you can also [run your own IAS proxy](run-an-ias-proxy.md).

{% hint style="warning" %}
Make sure the`worker.client.port` (default: `9100`) and `worker.p2p.port` (default: `9200`) ports are exposed and publicly accessible on the internet (for`TCP`traffic).
{% endhint %}

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

## Troubleshooting

See the general [Node troubleshooting](../troubleshooting.md) and [Set up TEE troubleshooting](../prerequisites/set-up-trusted-execution-environment-tee.md#troubleshooting) sections before proceeding with ParaTime node-specific troubleshooting.

### Too Old Bubblewrap Version

Double check your installed `bubblewrap` version, and ensure is at least of version **0.3.3**. Previous versions of this guide did not explicitly mention the required version. For details see the [Install Bubblewrap Sandbox](run-a-paratime-node.md#install-bubblewrap-sandbox-at-least-version-0-3-3) section.

### Stake Requirement

Double check your node entity satisfies the staking requirements for a ParaTime node. For details see the [Stake Requirements](run-a-paratime-node.md#stake-requirements) section.

### Runtime Worker Ports

Make sure the `worker.client.port` (default: `30001`) and `worker.p2p.port` (default: `30002`) ports are exposed and publicly accessible on the internet (for `TCP` traffic). Previous versions of this guide did not explicitly mention this requirement.
