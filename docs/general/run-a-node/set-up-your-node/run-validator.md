---
description: This page describes how to run a validator node on the Oasis Network.
---

# Run a Validator Node

:::info

These instructions are for setting up a _validator_ node. If you want to run a _non-validator_ node instead, see the [instructions on running a non-validator node](run-non-validator.md). Similarly, if you want to run a ParaTime node instead, see the [instructions on running a ParaTime node](run-a-paratime-node.mdx).

:::

This guide will cover setting up your validator node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](../prerequisites/README.mdx) section and have the Oasis Node binary installed on your systems.

### Stake requirements

To become a validator on the Oasis Network, you need to have enough tokens staked in your escrow account. For more details, see the [Stake requirements](../../contribute-to-the-network/run-validator.md#stake-requirements) section of [Run a Validator Node](../../contribute-to-the-network/run-validator.md) doc.

### Systems

This guide assumes that you have two different physical machines that you will use for deployment. These machines are the following:

* Your local system, henceforth called the `localhost`.
* A remote system to run as an Oasis node, henceforth called the `server`.

The reason for this is to ensure protection of the keys used to setup your node. Use of HSMs to store keys is highly recommended.

## Creating Your Entity

:::danger

Everything in this section should be done on the `localhost` as there are sensitive items that will be created.

:::

### Creating a Working Directory

During this entity initialization process, we will create keys and other important artifacts that are necessary for the deployment of nodes on the network. It is important that you save and protect the generated artifacts in this directory if you intend to use them to register your entity and nodes.

Inside `/localhostdir` you should create the following directories:

*   `entity`: This will store your entity. The private contents in this directory are safest if used on a machine kept disconnected from the internet.

    The directory's permissions should be `rwx------`
*   `node`: This will store a node we are calling "node". The name is not important. It simply represents one of your nodes. You can rename it to whatever you wish. The private contents of this directory will be used on the node itself.

    You should initialize this information on a system with access to the entity's private key.

    The directory permissions should be `rwx------`

To create the directory structure, use the following command:

```bash
mkdir -m700 -p {entity,node}
```

### Copying the Genesis File

The latest genesis file can be found in [Network Parameters](../../oasis-network/network-parameters.md). You should download the latest `genesis.json` file, copy it to the working directory and set the following environment variable pointing to its path:

```bash
GENESIS_FILE_PATH=/localhostdir/genesis.json
```

This will be needed later when generating transactions.

### Initializing an Entity

An entity is critical to operating nodes on the network as it controls the stake attached to a given individual or organization on the network. We highly recommend using an HSM or [Ledger](/oasis-core-ledger) device to protect your entity private key.

#### Using a Ledger-based Signer

The Ledger-based signer stores your private keys on your Ledger wallet. It is implemented as an Oasis Core signer plugin.

You will need to set it up as described in the [Setup](/oasis-core-ledger/usage/setup) section of our [Oasis Core Ledger docs](/oasis-core-ledger).

As the entity's private key is stored on your Ledger wallet, you only need to export the entity's public key as described in [Exporting Public Key to Entity](/oasis-core-ledger/usage/entity) section of our [Oasis Core Ledger docs](/oasis-core-ledger).

This will create 1 file in `/localhostdir/entity`:

* `entity.json`: The entity descriptor. This is the JSON of the unsigned information to be sent to the registry application on the network.

:::info

There will be no signed entity descriptor, i.e. `entity_genesis.json`, created yet. It will get created when you'll update the entity descriptor with your signed node descriptor as described in the [Adding the Node to the Entity Descriptor](run-validator.md#adding-the-node-to-the-entity-descriptor) section.

:::

#### Using a File-based Signer

:::danger

We strongly suggest that you do not use any entity that is generated with the file-based signer on the Mainnet.

When using the file-based signer the use of an [offline/air-gapped machine](https://en.wikipedia.org/wiki/Air_gap_\(networking\)) for this purpose is highly recommended. Gaining access to the entity private key can compromise your tokens.

:::

To initialize an entity simply run the following from `/localhostdir/entity`:

```bash
oasis-node registry entity init
```

This will generate three files in `/localhostdir/entity`:

* `entity.pem`: The private key of the entity. **NEVER SHARE THIS AS IT CAN BE USED TO TRANSFER STAKE.**
* `entity.json`: The entity descriptor. This is the JSON of the unsigned information to be sent to the registry application on the network.
* `entity_genesis.json`: This JSON object contains the entity descriptor that has been signed with entity's private key, i.e. `entity.pem`. This is meant to be shared for inclusion in the Genesis block.

### Initializing a Node

A node registers itself to the network when the node starts up. However, in order to validate itself, the entity signs a public key associated with the node. This allows the node registration to happen without the uploading entity's private key to the internet.

:::info

To get the `$ENTITY_ID` needed below check the value of the `id` field in `entity.json`, e.g. with the following content in `entity.json`:

```
{"v":1,"id":"2D5nSE3uFGvp2UkUY3w8OSjnCCYmQX/3JpJ77+aJGUQ="}
```

the entity ID is `2D5nSE3uFGvp2UkUY3w8OSjnCCYmQX/3JpJ77+aJGUQ=`.

:::

To initialize a validator node, take note of the static IP of the server where your node will run, and issue the following commands from the `/localhostdir/node` directory:

```bash
ENTITY_ID=<YOUR-ENTITY-ID>
STATIC_IP=<YOUR-STATIC-IP>
oasis-node registry node init \
  --node.entity_id $ENTITY_ID \
  --node.consensus_address $STATIC_IP:26656 \
  --node.role validator
```

This command will create a validator node's identity so that it can be a self-signed node (this is what allows self-registration).

:::info

There are more options for node initialization that you can explore by running:

```bash
oasis-node registry node init --help
```

The options shown above are just the minimum.

:::

The command will generate the following files:

* `consensus.pem`: The node's consensus private key. **DO NOT SHARE**
* `consensus_pub.pem`: The node's consensus public key.
* `identity.pem`: The node's identity private key. **DO NOT SHARE**
* `identity_pub.pem`: The node's identity public key.
* `node_genesis.json`: The node's details if you wish to include this node in the genesis file of the network.
* `p2p.pem`: The node's private key for libp2p. **DO NOT SHARE**
* `p2p_pub.pem`: The node's public key for libp2p.
* `sentry_client_tls_identity.pem`: The node's TLS private key for communicating with sentry nodes. **DO NOT SHARE**
* `sentry_client_tls_identity_cert.pem`: The node's TLS certificate for communicating with sentry nodes.

### Adding the Node to the Entity Descriptor

Once the node has been initialized, we need to add it to the entity descriptor so that it can properly register itself when the node starts up. The instructions differ based on what kind of signer was used to generate the entity.

* **If using the plugin-based signer,** execute the following command in the `/localhostdir/entity` directory (again this assumes the use of the Ledger signer plugin in which case you will need to then confirm the signing operation on the Ledger device):

```bash
oasis-node registry entity update \
    --signer.backend plugin \
    --signer.plugin.name ledger \
    --signer.plugin.path "$LEDGER_SIGNER_PATH" \
    --signer.plugin.config "wallet_id:$LEDGER_WALLET_ID,index:$LEDGER_INDEX" \
    --entity.node.descriptor /localhostdir/node/node_genesis.json
```

* **If using the file-based signer**, execute the following command in the `/localhostdir/entity` directory:

```bash
oasis-node registry entity update \
  --entity.node.descriptor /localhostdir/node/node_genesis.json
```

This will update the entity descriptor in `entity.json` and subsequently the `entity_genesis.json` file that contains the signed entity descriptor payload.

## Running an Oasis Node on the `server`

### Setting up the Oasis Node's Working Directory

Before we run the node on the `server` we need to ensure that we have a place to store necessary files for the node.

:::info

We will reference the working directory on the `server` as `/serverdir` throughout the documentation.

:::

#### Setting Up the the `/serverdir` Directory

In the `/serverdir` directory we will create the following subdirectories:

* `etc/` - this is to store the configuration
* `node/` - this is to store the node's data
* `node/entity/` - this is to store the public components of the node's entity

You can make this directory structure by executing the following command:

```bash
mkdir -m700 -p /serverdir/{etc,node,node/entity}
```

#### Copying the Node Artifacts from `/localhostdir`

In order for the node registration to work properly, as defined in `/localhostdir/entity.json`, you must copy the node's artifacts you generated in the [Initializing a Node](run-validator.md#initializing-a-node) section. To do so, upload the following files from `/localhostdir/node` to `/serverdir/node` over a secure channel (e.g. SSH):

* `consensus.pem`
* `consensus_pub.pem`
* `identity.pem`
* `identity_pub.pem`
* `p2p.pem`
* `p2p_pub.pem`
* `sentry_client_tls_identity.pem`
* `sentry_client_tls_identity_cert.pem`

After copying, make sure that all these files have `0600` permissions, i.e. only their owner has `read` and `write` permissions.

To do so, run the following command:

```bash
chmod -R 600 /serverdir/node/*.pem
```

:::caution

You may have noticed that some of these files were listed as **DO NOT SHARE** in the [Initializing a Node](run-validator.md#initializing-a-node) section.

In the future, these keys should be generated and referenced from an HSM. However, until HSM support is implemented, these keys should be kept as secure as possible on the `server`.

:::

#### Copying the Public Entity Artifacts from `/localhostdir`

We will also need to have the public entity artifacts from the `/localhostdir` present on the `server`. Copy the `/localhostdir/entity/entity.json` file on `localhost` to `/serverdir/node/entity/entity.json` on the `server`.

#### Copying the Genesis File to the server

The latest Genesis file can be found in the [Network Parameters](../../oasis-network/network-parameters.md). You should download the latest `genesis.json` file and copy it to `/serverdir/etc/genesis.json` on the `server`.

#### Configuring the Oasis Node

There are a variety of options available when running an Oasis node. The following YAML file is a basic configuration for a validator node on the network.

Before using this configuration you should collect the following information to replace the  variables present in the configuration file:

* `{{ external_address }}`: The external IP you used when registering this node.

:::info

If you are using a [Sentry Node](sentry-node-architecture.md), you should use the public IP of that machine.

:::

*   `{{ seed_node_address }}`: The seed node address in the form `ID@IP:port`.

    You can find the current Oasis Seed Node address in the [Network Parameters](../../oasis-network/network-parameters.md).

To use this configuration, save it in the `/serverdir/etc/config.yml` file and pass it to the `oasis-node` command as an argument to the `--config` flag.

```yaml
##
# Oasis Node Configuration
#
# This file's contents are derived from the command line arguments found in the
# root command of the oasis-node binary. For more information, execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. For example, "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node's artifacts
# should also be located in this directory.
datadir: /serverdir/node

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
  # By default logs are output to stdout. If you would like to output logs to
  # a file, you can use:
  #
  # file: /var/log/oasis-node.log

# Genesis.
genesis:
  # Path to the genesis file for the current version of the network.
  file: /serverdir/etc/genesis.json

# Worker configuration.
worker:
  registration:
    # In order for the node to register itself, the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /serverdir/node/entity/entity.json

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: true

  # Tendermint backend configuration.
  tendermint:
    core:
      listen_address: tcp://0.0.0.0:26656

      # The external IP that is used when registering this node to the network.
      # NOTE: If you are using the Sentry node setup, this option should be
      # omitted.
      external_address: tcp://{{ external_address }}:26656

    # List of seed nodes to connect to.
    # NOTE: You can add additional seed nodes to this list if you want.
    p2p:
      seed:
        - "{{ seed_node_address }}"
```

#### Ensuring Proper Permissions

Only the owner of the process that runs the Oasis node should have access to the files in the `/serverdir/node` directory. The `oasis-node` binary ensures that the files used by the node are as least privileged as possible so that you don't accidentally shoot yourself in the foot while operating a node.

To ensure proper permissions are set, we suggest running the following to remove all non-owner read/write/execute permissions:

```bash
chmod -R go-r,go-w,go-x /serverdir
```

:::info

Just so it's clear, the following permissions are expected by the `oasis-node` binary:

* `700` for the `/serverdir/node` directory
* `700` for the `/serverdir/node/entity` directory
* `600` for all `*.pem` files

:::

### Starting the Oasis Node

You can start the node by running the following command:

```bash
oasis-node --config /serverdir/etc/config.yml
```

:::tip

The Oasis node is configured to run in the foreground by default.

We recommend you configure and use it with a process manager like [systemd](https://github.com/systemd/systemd) or [Supervisor](http://supervisord.org).

:::

### Verifying the Connection to the Network

As part of the starting the server process, the `oasis-node` binary will, by default, setup an internal unix socket in the `datadir` of the Node. This socket can be used to communicate to the node and query details about the network.

Run the following command:

```bash
oasis-node registry entity list -a unix:/serverdir/node/internal.sock
```

If this command fails, you'll receive a non-zero exit code and there's a high likelihood that you are not connected to the network. However, if it does work properly it should respond with output like the following but with potentially many more values:

```
CVzqFIADD2Ed0khGBNf4Rvh7vSNtrL1ULTkWYQszDpc=
C5z1jB+FHB/QgtTITr6NKWpUs9QHwD11CG3v8tmuJ0g=
DPbZomOIleFrvcJBZPl7y/wEB1w9Q569vAbb6Krl9fE=
DVobZ8bWlOv2J6oHO0uITr5FPO5rIY2irdPNhByprHk=
D2hqhJcmZnBmhw9TodOdoFPAjmRkpRatANCNHxIDHgA=
```

Once you get to a node that's connected you can move on to the next section as your node is not yet registered as a validator on the Oasis Network.

## Staking and Registering

:::tip

This step is not necessary if your entity was fully staked at genesis.

:::

:::caution

If you've submitted staking or registry transactions before, your nonce is likely different than the nonce used in the examples. If you're uncertain, please check your account nonce by using [this guide](../../manage-tokens/advanced/oasis-cli-tools/get-account-info.md).

:::

Once you have been funded, you can complete the process of connecting your node to the network by registering both your entity and your node, as described below.

### Check that your node is synced

Before you can make any transactions you'll have to make sure that your node is synced. To do so call this command on the server:

```bash
oasis-node control is-synced -a unix:/serverdir/node/internal.sock
```

If your node is synced, the above command should output:

```
node completed initial syncing
```

If your node is not yet synced, you will need to wait before you can move forward.

### Generating a Staking (Escrow) Transaction on the `localhost`

Your entity's private key should be disconnected from the internet on the `localhost`. Therefore, you need to generate the following transaction on the `localhost`.

:::danger

The entity's private key is used to authorize transactions on your staking account.

Hence it should never be present on the online `server`.

:::

The current minimum stake required to register an entity and register a node as a validator is 200 tokens. So, we will generate an escrow transaction that escrows 200 tokens on your own entity.

:::info

The Oasis node's staking application calls the operation of staking tokens "escrow."

:::

Before generating the escrow transaction, you need to set the following environment variables:

* `GENESIS_FILE_PATH`: Path to the Genesis file on the `localhost`, i.e. `/localhostdir/genesis.json`.
*   `ENTITY_DIR_PATH`: Path to entity's artifacts directory on the `localhost`,

    i.e. `/localhostdir/entity/`.
*   `OUTPUT_TX_FILE_PATH`: Path to the file containing the outputted signed transaction.

    For this guide, we will use `/localhostdir/signed-escrow.tx`.
*   `ACCOUNT_ADDRESS`: Your staking account address.

    To obtain your staking account address from your Entity's ID, see [Obtaining Account Address From Entity's ID](../../manage-tokens/advanced/oasis-cli-tools/address.md#obtain-account-address-from-entitys-id).

Then execute the following command:

```bash
oasis-node stake account gen_escrow \
  --genesis.file $GENESIS_FILE_PATH \
  --signer.backend file \
  --signer.dir $ENTITY_DIR_PATH \
  --stake.escrow.account $ACCOUNT_ADDRESS \
  --stake.amount 200000000000 \
  --transaction.file $OUTPUT_TX_FILE_PATH \
  --transaction.fee.gas 2269 \
  --transaction.fee.amount 2000 \
  --transaction.nonce 0
```

:::info

The option `--stake.amount` looks like a very large number, but this is actually just an equivalent to 200 tokens on the Amber Network as each unit value used to track the account balance is 1x10^-9 tokens.

The `--transactions.fee.gas` and `--transaction.fee.amount` options depend on the network configuration, see [Common Transaction Flags](../../manage-tokens/advanced/oasis-cli-tools/setup.md#common-transaction-flags) for details.

:::

### Generating Entity Registration Transaction

Before you can run your node successfully, you'll need to register your entity so that your node registers properly. You could do this process _after_ you submit the escrow transaction, however, to save steps we prepare everything before hand.

Before generating the register transaction, you need to set the following environment variables:

*   `GENESIS_FILE_PATH`: Path to the Genesis file on the `localhost`, i.e.

    `/localhostdir/genesis.json`.
*   `ENTITY_DIR_PATH`: Path to entity's artifacts directory on the `localhost`,

    i.e. `/localhostdir/entity/`.
*   `OUTPUT_REGISTER_TX_FILE_PATH`: Path to the file containing the outputted signed transaction.

    For this guide, we will use `/localhostdir/signed-register.tx`.

Then execute the following command:

```bash
oasis-node registry entity gen_register \
  --genesis.file $GENESIS_FILE_PATH \
  --signer.backend file \
  --signer.dir $ENTITY_DIR_PATH \
  --transaction.file $OUTPUT_REGISTER_TX_FILE_PATH \
  --transaction.fee.gas 2460 \
  --transaction.fee.amount 1000 \
  --transaction.nonce 1
```

:::info

The `--transactions.fee.gas` and `--transaction.fee.amount` options depend on the network configuration, see [Common Transaction Flags](../../manage-tokens/advanced/oasis-cli-tools/setup.md#common-transaction-flags) for details.

:::

### Submitting Your Transactions on the `server`

To complete the staking process we need to copy the generated escrow and registry transactions from your offline `localhost` to the `server` and submit them.

To do so, follow these steps:

1.  Copy the file `/localhostdir/signed-escrow.tx` on the `localhost` to

    `/serverdir/signed-escrow.tx` on the `server`.
2.  Copy the file `/localhostdir/signed-register.tx` on the `localhost` to

    `/serverdir/signed-register.tx` on the `server`.
3.  Submit both transactions via `oasis-node consensus submit_tx` sub-command:

    ```bash
    oasis-node consensus submit_tx \
     --transaction.file /serverdir/signed-escrow.tx \
     -a unix:/serverdir/node/internal.sock
    oasis-node consensus submit_tx \
     --transaction.file /serverdir/signed-register.tx \
     -a unix:/serverdir/node/internal.sock
    ```

### Checking that Your Node is Properly Registered

To ensure that your node is properly connected as a validator on the network, you can run the following command:

```bash
oasis-node control status -a unix:/serverdir/node/internal.sock
```

If your node is registered and a validator, the above command should output (some fields omitted for clarity):

```javascript
{
  "software_version": "20.10",
  "identity": {
    ...
  },
  "consensus": {
    "consensus_version": "1.0.0",
    "backend": "tendermint",
    "features": 3,
    "node_peers": [
      ...
    ],
    "latest_height": 55899,
    "latest_hash": "AR34gxwWz1LS5rMDa6E0L1/ThW9E38ySIbRRlRG/shg=",
    "latest_time": "2020-08-10T11:38:26+02:00",
    "latest_state_root": {
      "ns": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      "version": 55898,
      "hash": "h2+8ZryxseOKpuSho1nVSImLF/irVsTF5xryc3I9cRk="
    },
    "genesis_height": 1,
    "genesis_hash": "+SIAMCUeZtWuYPg/Ke+zwPRhNRripRgUq1d5Al9ImNA=",
    "is_validator": true
  },
  "registration": {
    ...
  }
}
```

Pay attention to the `is_validator` field which should have the value of `true`.

:::info

Nodes are only elected into the validator set at epoch transitions, so you may need to wait for up to an epoch before being considered.

:::

:::caution

Note that in order to be elected in the validator set you need to have enough stake to be in the top K entities (where K is a network-specific parameter specified by the `scheduler.max_validators` field in the genesis document).

:::

## Oasis Metadata Registry

Congratulations, if you made it this far, you've properly connected your node to the network and became a validator on the Oasis Network.

For the final touch, you can add some metadata about your entity to the [Metadata Registry]. The Metadata Registry is the same for the Mainnet and the Testnet. 
The metadata consists of your entity name, email, Keybase handle, Twitter handle, etc. 

This information is also used by third party applications. For example [Oasis Scan] fetches your image from Keybase and uses it as the node operator's avatar.

[Metadata Registry]: https://github.com/oasisprotocol/metadata-registry
[Oasis Scan]: https://www.oasisscan.com/validators
