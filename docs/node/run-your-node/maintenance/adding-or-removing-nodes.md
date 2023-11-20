# Adding or Removing Nodes

At some point you may wish to add or remove nodes from your entity. In order to
do so, you will need to have at least the following:

* Access to a synced node
* Access to your entity's private key

:::tip

If you just need to temporarily disable your node (e.g. to perform system
updates), use [graceful shutdown] instead. This will assure you that your
entity will not get penalized during node's downtime.

:::

## Overview

The process for adding/removing nodes is similar and has the following steps:

1. Obtain the ID of your running Oasis node
2. Download your entity descriptor (`entity.json`) from the network registry
3. Update the entity descriptor by adding/removing a node
4. Submitting the updated entity descriptor to the network

[graceful shutdown]: shutting-down-a-node.md

## Obtain the ID of your Node

Connect to your `server` and obtain the ID of your node by running:

```shell
oasis-node control status -a unix:/node/data/internal.sock | jq .identity.node
```

## Download Your Latest Entity Descriptor

To ensure that we do not update your entity descriptor (`entity.json`)
incorrectly we should get the latest entity descriptor state from the network.
For this operation, you will need to know the base64 encoding of your entity's
public key.

Use [`oasis network show`] command on your `localhost` to get the latest entity
descriptor stored in the network registry. This command is part of [Oasis CLI].
For example:

![code shell](../../../../external/cli/examples/network-show/id-entity.in)

Now store the obtained JSON as `entity.json`.

[`oasis network show`]: ../../../general/manage-tokens/cli/network.md#show-id
[Oasis CLI]: ../../../general/manage-tokens/cli/README.md

## Updating Your Entity Descriptor

### To Add a Node

:::info

Due to how the node election process works, only a single node from your entity
can be selected as a validator for any given epoch. Additional nodes will _not_
give you more voting power nor will it, inherently, provide high availability
to have multiple nodes.

:::

To attach a new node with your entity, add the ID of your node obtained in
the [section above](#obtain-the-id-of-your-node) to the `nodes` field in your
`entity.json`. For example:

```json
{
  "v": 2,
  "id": "xQN6ffLSdc51EfEQ2BzltK1iWYAw6Y1CkBAbFzlhhEQ=",
  "nodes": [
     "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
     "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB="
  ]
}
```

In the above entity descriptor 2 nodes are attached to the entity:

1. A node with an identity `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`
2. A node with an identity `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=`

## To Remove a Node

To remove node with ID `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=` from your
entity descriptor, simply remove the record from the array in the `nodes` field.
For example:

```json
{
  "v": 2,
  "id": "xQN6ffLSdc51EfEQ2BzltK1iWYAw6Y1CkBAbFzlhhEQ=",
  "nodes": [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
  ],
}
```

## Submitting Your Entity Registration to the Network

Finally, to commit the changes on the network, invoke the [`oasis account entity
register`] command on your `localhost`:

```shell
oasis account entity register entity.json --account my_entity
```

The account used to sign the transaction (`my_entity` in the snippet above) must
correspond to the entity ID in `entity.json`.

If there are no errors, your entity registration should be updated. You can run
the [`oasis network show`] command again to see the changes.
