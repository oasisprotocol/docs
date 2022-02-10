# Adding or Removing Nodes

At some point you may wish to add or remove nodes from your entity. In order to do so, you will need to have at least the following:

* Access to a synced node
* Access to your entity's private key

## Overview

The process for adding/removing nodes is similar and has the following steps:

1. Retrieve your up to date entity descriptor \(`entity.json`\)
2. Update your entity descriptor by adding/removing a node
3. Generate a `register` transaction to update your entity registration on the network.

## Retrieving Your Latest Entity Descriptor

To ensure that we do not update your entity descriptor \(`entity.json`\) incorrectly we should get the latest entity descriptor state. For this operation, you will need to know your the base64 encoding of your entity's public key.

On your server run this command:

```bash
ENTITY_PUBLIC_KEY="some-base64-public-key"
oasis-node registry entity list \
    -a unix:/serverdir/node/internal.sock -v | grep $ENTITY_PUBLIC_KEY
```

## Updating Your Entity Descriptor

### To Add a Node

{% hint style="info" %}
Due to how the node election process works, only a single node from your entity can be selected as a validator for any given epoch. Additional nodes will _not_ give you more voting power nor will it, inherently, provide high availability to have multiple nodes.
{% endhint %}

Adding a node is a simple operation that is directly supported by the `oasis-node` binary. For this operation you'll need to have initialized a new node, and you'll need to have the `node_genesis.json` file in order to add it to the entity descriptor.

Assuming that the `node_genesis.json` is at `/localhostdir/new_node/node_genesis.json` the command is the following:

```bash
NEW_NODE_GENESIS_PATH=/localhostdir/new_node/node_genesis.json
oasis-node registry entity update \
  --signer.dir /localhostdir/entity \
  --entity.node.descriptor /localhostdir/new_node/node_genesis.json
```

## To Remove a Node

Removing a node requires updating the entity descriptor manually. The entity descriptor file is a simple JSON document that looks something like:

```javascript
{
  "id": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
  "nodes": [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB="
  ],
  "allow_entity_signed_nodes": false
}
```

In the above entity descriptor 2 nodes are attached to the entity:

1. A node with an identity `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`
2. A node with an identity `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=`

To remove the the Node `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=` you would remove it from the array in the `nodes` field, like so:

```javascript
{
  "id": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
  "nodes": [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
  ],
  "allow_entity_signed_nodes": false
}
```

## Updating Your Entity Registration on the Network

Finally, to commit the changes on the network you'll need to generate a `register` transaction and submit that transaction to the network.

### Generating a `register` Transaction

Run this command on your localhost \(as you need your entity's private key\):

```bash
GENESIS_FILE_PATH="path/to/the/current/genesis"
OUTPUT_REGISTER_TX_FILE_PATH="/localhostdir/update_entity_registration.tx"
oasis-node registry entity gen_register \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --transaction.file $OUTPUT_REGISTER_TX_FILE_PATH \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1 \
  --transaction.nonce 1
```

Once this has exited with a `0` status, you should have a file at `$OUTPUT_REGISTER_TX_FILE_PATH`. Upload that file to your server.

### Submitting the Transaction

Run this command on your server:

```bash
oasis-node consensus submit_tx \
  --transaction.file /serverdir/update_entity_registration.tx \
  -a unix:/serverdir/node/internal.sock
```

If there are no errors, your entity registration should be updated. You can run this command to see the changes reflected:

```bash
ENTITY_PUBLIC_KEY="some-base64-public-key"
oasis-node registry entity list \
    -a unix:/serverdir/node/internal.sock -v | grep $ENTITY_PUBLIC_KEY
```

