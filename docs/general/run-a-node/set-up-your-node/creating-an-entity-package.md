# Create an Entity Package

:::caution

Entity packages are only required at the beginning of a network. If the network is already running then this will no longer be used.

:::

In order to join at the beginning of the Mainnet, we require that you send an Entity Package so that a genesis document can be created for the network.

## Details

To create an Entity Package you must create a tarball (`.tar.gz`) that contains the following files:

* `entity/entity_genesis.json` - This is the `entity_genesis.json` from the entity you initialized.
* `entity/entity.json` - This is the `entity.json` file from the entity you initialized.
* `node/node_genesis.json` - This is the `node_genesis.json` from the node you initialized.

:::tip

During genesis creation we will only accept a single node.

:::

The following commands should be executed on your local system, where you [initialized your Entity and Node](run-validator#initializing-an-entity):

```
mkdir -p package/entity package/node
cp /localhostdir/entity/*.json package/entity
cp /localhostdir/node/node_genesis.json package/node
cd package && tar -zcvf ../<YOUR-GITHUB-USERNAME>-entity.tar.gz entity node
```

## Submitting Your Entity Package (For Mainnet)

:::caution

The deadline for Mainnet Entity Packages is 2020-09-03T23:59:00 UTC.

:::

To submit your Entity Package, we've created a repository that will consume and validate the Entity packages.

1. Fork the [oasisprotocol/mainnet-entities](https://github.com/oasisprotocol/mainnet-entities) repository.
2. Add your Entity Package to the `entities/` directory of the repository.
3. Create a pull request against the `master` branch of the [oasisprotocol/mainnet-entities](https://github.com/oasisprotocol/mainnet-entities) repository.
   Once your Entity Package passes all validation checks we will handle the merging of your pull request.

:::info

If there are any issues, you can always resubmit your entity package.

:::
