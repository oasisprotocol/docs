# Testnet

These are the current parameters for the Testnet, a test-only network for
testing out upcoming features and changes to the protocol.

:::danger

**The Testnet may be subject to frequent version upgrades and state resets.**

Also note that while the Testnet does use actual TEEs, due to experimental
software and different security parameters, **confidentiality of confidential
ParaTimes on the Testnet is not guaranteed** -- all transactions and state
published on the Testnet should be considered public even when stored inside
confidential ParaTimes.

:::

:::info

On the Testnet, TEST tokens are in use -- if you need some to test your clients, nodes or paratimes, feel free to use our [Testnet Faucet](https://faucet.testnet.oasis.io). Note that these are test-only tokens and account balances, as any other state, may be frequently reset.

:::

This page is meant to be kept up to date with the information from the currently released Testnet. Use the information here to deploy or upgrade your node on the Testnet.

* Latest Testnet version: **2023-10-12**
* [Genesis file](https://github.com/oasisprotocol/testnet-artifacts/releases/download/2023-10-12/genesis.json):
  * SHA256: `02ce385c050b2a5c7cf0e5e34f5e4930f7804bb21efba2d1d3aa8215123aab68`
* Genesis document's hash ([explanation](../genesis-doc.md#genesis-file-vs-genesis-document)):
  * `0b91b8e4e44b2003a7c5e23ddadb5e14ef5345c0ebcb3ddcae07fa2f244cab76`
* Oasis seed node addresses:
  * `HcDFrTp/MqRHtju5bCx6TIhIMd6X/0ZQ3lUG73q5898=@34.86.165.6:26656`
  * `HcDFrTp/MqRHtju5bCx6TIhIMd6X/0ZQ3lUG73q5898=@34.86.165.6:9200`
  * `kqsc8ETIgG9LCmW5HhSEUW80WIpwKhS7hRQd8FrnkJ0=@34.140.116.202:26656`
  * `kqsc8ETIgG9LCmW5HhSEUW80WIpwKhS7hRQd8FrnkJ0=@34.140.116.202:9200`

:::tip

Feel free to use other seed nodes besides the one provided here.

:::

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [25.3](https://github.com/oasisprotocol/oasis-core/releases/tag/v25.3)
* [Oasis Rosetta Gateway](https://github.com/oasisprotocol/oasis-rosetta-gateway) version:
  * [2.7.0](https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.7.0)

:::info

The Oasis Node is part of the Oasis Core release.

:::

[handling network upgrades]: ../run-your-node/maintenance/handling-network-upgrades.md

## ParaTimes

This chapter contains parameters for various ParaTimes known to be deployed on the Testnet. Similar to the Testnet, these may be subject to frequent version upgrades and/or state resets.

### Sapphire

* Oasis Core version:
  * [25.3](https://github.com/oasisprotocol/oasis-core/releases/tag/v25.3)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c`
* Runtime bundle version:
  * [0.10.3-testnet](https://github.com/oasisprotocol/sapphire-paratime/releases/tag/v0.10.3-testnet)
* Web3 Gateway version:
  * [5.1.0](https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/v5.1.0)

### Cipher

* Oasis Core version:
  * [25.3](https://github.com/oasisprotocol/oasis-core/releases/tag/v25.3)
* Runtime identifier:
  * `0000000000000000000000000000000000000000000000000000000000000000`
* Runtime bundle version:
  * [3.3.3-testnet](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v3.3.3-testnet)

### Emerald

* Oasis Core version:
  * [25.3](https://github.com/oasisprotocol/oasis-core/releases/tag/v25.3)
* Runtime identifier:
  * `00000000000000000000000000000000000000000000000072c8215e60d5bca7`
* Runtime bundle version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v11.0.0-testnet#building)):
  * [11.0.0-testnet](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v11.0.0-testnet)
* Web3 Gateway version:
  * [5.1.0](https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/v5.1.0)

### Key Manager

* Oasis Core version:
  * [25.3](https://github.com/oasisprotocol/oasis-core/releases/tag/v25.3)
* Runtime identifier:
  * `4000000000000000000000000000000000000000000000004a1a53dff2ae482d`
* Runtime bundle version:
  * [0.5.0-testnet](https://github.com/oasisprotocol/keymanager-paratime/releases/tag/v0.5.0-testnet)
  * [0.6.0-testnet](https://github.com/oasisprotocol/keymanager-paratime/releases/tag/v0.6.0-testnet)
