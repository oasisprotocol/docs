---
description: >-
  This page is meant to be kept up to date with the information from the
  currently released network.
---

# Network Parameters

These are the current parameters for the Mainnet:

* [Genesis file](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2021-04-28/genesis.json):
  * SHA256: `8ae33cffe67e3df1be392dddde332a73f207cede5992c93600b0ae65c22af2a2`

:::info

Genesis file is signed by [network's current maintainers](https://github.com/oasisprotocol/mainnet-artifacts/blob/master/README.md#pgp-keys-of-current-maintainers). To verify its authenticity, follow the [PGP verification instructions](https://github.com/oasisprotocol/mainnet-artifacts/blob/master/README.md#verifying-genesis-file-signatures).

:::

* Genesis document's hash ([explanation](genesis-doc.md#genesis-file-vs-genesis-document)):
  * `53852332637bacb61b91b6411ab4095168ba02a50be4c3f82448438826f23898`
* Oasis seed node address:
  * `E27F6B7A350B4CC2B48A6CBE94B0A02B0DCB0BF3@35.199.49.168:26656`

:::tip

Feel free to use other seed nodes besides the one provided here.

:::

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [21.3.10](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.10)

:::info

The Oasis Node is part of the Oasis Core release.

:::

:::danger

Do not use a newer version of Oasis Core since it likely contains changes that are incompatible with the version of Oasis Core used by other nodes.

:::

If you want to join our Testnet, see the [Testnet](../foundation/testnet/README.md) docs for the current Testnet parameters.

## ParaTimes

This section contains parameters for various ParaTimes known to be deployed on the Mainnet.

### Cipher ParaTime

* Oasis Core version:
  * [21.3.10](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.10)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000e199119c992377cb`
* Runtime binary version:
  * [1.0.0](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v1.0.0)
* IAS proxy address:
  * `tnTwXvGbbxqlFoirBDj63xWtZHS20Lb3fCURv0YDtYw=@34.86.108.137:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../run-a-node/set-up-your-node/run-an-ias-proxy.md).

:::

### Emerald ParaTime

* Oasis Core version:
  * [21.3.10](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.10)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000e2eaa99fc008f87f`
* Runtime binary version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v7.1.0#building)):
  * [7.1.0](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v7.1.0)
* Emerald Web3 Gateway version:
  * [1.6.0](https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v1.6.0)

:::info

Check the [Emerald ParaTime page](../developer-resources/emerald-paratime/README.mdx#web3-gateway) on how to access the public Web3 gateway.

:::
