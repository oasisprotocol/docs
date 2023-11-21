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
  * [22.2.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.2.11)
* [Oasis Rosetta Gateway](https://github.com/oasisprotocol/oasis-rosetta-gateway) version:
  * [2.4.0](https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.4.0)

:::info

The Oasis Node is part of the Oasis Core release.

:::

:::danger

Do not use a newer version of Oasis Core since it likely contains changes that are incompatible with the version of Oasis Core used by other nodes.

:::

If you want to join our Testnet, see the [Testnet](../testnet/README.md) docs for the current Testnet parameters.

## ParaTimes

This section contains parameters for various ParaTimes known to be deployed on the Mainnet.

### Cipher

* Oasis Core version:
  * [22.2.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.2.11)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000e199119c992377cb`
* Runtime binary version:
  * [2.6.2](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v2.6.2)
* IAS proxy address:
  * `tnTwXvGbbxqlFoirBDj63xWtZHS20Lb3fCURv0YDtYw=@34.86.108.137:8650`
  * `tuDyXwaajTEbNWb1QIlf8FWHsdkaB4W1+TjzP1QID/U=@131.153.243.17:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../../node/run-your-node/ias-proxy.md).

:::

### Emerald

* Oasis Core version:
  * [22.2.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.2.11)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000e2eaa99fc008f87f`
* Runtime binary version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v10.0.0#building)):
  * [10.0.0](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v10.0.0)
* Web3 Gateway version:
  * [3.4.0](https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/v3.4.0)

:::info

Check the [Emerald ParaTime page](/dapp/emerald/#web3-gateway) on how to access the public Web3 gateway.

:::

### Sapphire

* Oasis Core version:
  * [22.2.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.2.11)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000f80306c9858e7279`
* Runtime binary version:
  * [0.5.2](https://github.com/oasisprotocol/sapphire-paratime/releases/tag/v0.5.2)
  * [0.6.4](https://github.com/oasisprotocol/sapphire-paratime/releases/tag/v0.6.4)
* Oasis Web3 Gateway version:
  * [3.4.0](https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/v3.4.0)
* IAS proxy address:
  * `tnTwXvGbbxqlFoirBDj63xWtZHS20Lb3fCURv0YDtYw=@34.86.108.137:8650`
  * `tuDyXwaajTEbNWb1QIlf8FWHsdkaB4W1+TjzP1QID/U=@131.153.243.17:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../../node/run-your-node/ias-proxy.md).

:::

### Key Manager

* Oasis Core version:
  * [22.2.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.2.11)
* Runtime identifier:
  * `4000000000000000000000000000000000000000000000008c5ea5e49b4bc9ac`
* Runtime binary version:
  * [0.3.4](https://github.com/oasisprotocol/keymanager-paratime/releases/tag/v0.3.4)
* IAS proxy address:
  * `tnTwXvGbbxqlFoirBDj63xWtZHS20Lb3fCURv0YDtYw=@34.86.108.137:8650`
  * `tuDyXwaajTEbNWb1QIlf8FWHsdkaB4W1+TjzP1QID/U=@131.153.243.17:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../../node/run-your-node/ias-proxy.md).

:::
