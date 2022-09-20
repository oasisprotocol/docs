# Mainnet

These are the current parameters for the Mainnet:

* [Genesis file](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2022-04-11/genesis.json):
  * SHA256: `bb379c0202cf82404d75a3ebc6466b0c3b98f32fac62111ee4736a59d2d3f266`

:::info

Genesis file is signed by [network's current maintainers](https://github.com/oasisprotocol/mainnet-artifacts/blob/master/README.md#pgp-keys-of-current-maintainers). To verify its authenticity, follow the [PGP verification instructions](https://github.com/oasisprotocol/mainnet-artifacts/blob/master/README.md#verifying-genesis-file-signatures).

:::

* Genesis document's hash ([explanation](../genesis-doc.md#genesis-file-vs-genesis-document)):
  * `b11b369e0da5bb230b220127f5e7b242d385ef8c6f54906243f30af63c815535`
* Oasis seed node address:
  * `E27F6B7A350B4CC2B48A6CBE94B0A02B0DCB0BF3@35.199.49.168:26656`

:::tip

Feel free to use other seed nodes besides the one provided here.

:::

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
* [Oasis Rosetta Gateway](https://github.com/oasisprotocol/oasis-rosetta-gateway) version:
  * [2.2.1](https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.2.1)

:::info

The Oasis Node is part of the Oasis Core release.

:::

:::danger

Do not use a newer version of Oasis Core since it likely contains changes that are incompatible with the version of Oasis Core used by other nodes.

:::

If you want to join our Testnet, see the [Testnet](../testnet/README.md) docs for the current Testnet parameters.

## ParaTimes

This section contains parameters for various ParaTimes known to be deployed on the Mainnet.

### Cipher ParaTime

* Oasis Core version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000e199119c992377cb`
* Runtime binary version:
  * [1.1.0](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v1.1.0)
* IAS proxy address:
  * `tnTwXvGbbxqlFoirBDj63xWtZHS20Lb3fCURv0YDtYw=@34.86.108.137:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../../node/run-your-node/ias-proxy.md).

:::

### Emerald ParaTime

* Oasis Core version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000e2eaa99fc008f87f`
* Runtime binary version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v9.0.1#building)):
  * [8.2.0](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v8.2.0)
  * [9.0.1](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v9.0.1)

:::info

When multiple runtime versions are listed, make sure to specify the paths to all
of the bundles in your configuration. This ensures that any planned upgrade
happens at the right time.

For example, for the above Emerald ParaTime versions the configuration would
look like the following (only showing the relevant options):

```yaml
runtime:
  # ... other options omitted ...
  paths:
    - /path/to/emerald-paratime-8.2.0.orc
    - /path/to/emerald-paratime-9.0.1.orc
```

:::

* Emerald Web3 Gateway version:
  * [2.2.0](https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v2.2.0) (for Emerald 8.2.0 and earlier)
  * [3.0.0](https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v3.0.0) (for Emerald 9.0.1 and later)

:::caution

Only upgrade the Emerald Web3 Gateway to 3.0.0 _after_ the Emerald 9.0.1 upgrade
has actually happened on the network (as indicated by the `active_version` in
the Oasis Core node's status output).

:::

:::info

Check the [Emerald ParaTime page](/dapp/emerald/#web3-gateway) on how to access the public Web3 gateway.

:::
