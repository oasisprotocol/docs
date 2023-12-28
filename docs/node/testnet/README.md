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

On the Testnet, TEST tokens are in use -- if you need some to test your clients, nodes or paratimes, feel free to use our [Testnet Faucet](https://faucet.testnet.oasis.dev). Note that these are test-only tokens and account balances, as any other state, may be frequently reset.

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

:::tip

Feel free to use other seed nodes besides the one provided here.

:::

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [23.0.9](https://github.com/oasisprotocol/oasis-core/releases/tag/v23.0.9)
* [Oasis Rosetta Gateway](https://github.com/oasisprotocol/oasis-rosetta-gateway) version:
  * [2.6.0](https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.6.0)

:::info

The Oasis Node is part of the Oasis Core release.

:::

[handling network upgrades]: ../run-your-node/maintenance/handling-network-upgrades.md

## ParaTimes

This chapter contains parameters for various ParaTimes known to be deployed on the Testnet. Similar to the Testnet, these may be subject to frequent version upgrades and/or state resets.

### Cipher

* Oasis Core version:
  * [23.0.9](https://github.com/oasisprotocol/oasis-core/releases/tag/v23.0.9)
* Runtime identifier:
  * `0000000000000000000000000000000000000000000000000000000000000000`
* Runtime bundle version:
  * [3.0.2-testnet](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v3.0.2-testnet)
* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`
  * `jaFE5Lq6GS76ya1V7a+XlGQTgttAagXEtknO4Tv1wLs=@185.56.138.83:8650`

:::tip

Feel free to use other IAS proxies besides the ones provided here or [run your own](../run-your-node/ias-proxy.md).

:::

### Emerald

* Oasis Core version:
  * [23.0.9](https://github.com/oasisprotocol/oasis-core/releases/tag/v23.0.9)
* Runtime identifier:
  * `00000000000000000000000000000000000000000000000072c8215e60d5bca7`
* Runtime bundle version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v11.0.0-testnet#building)):
  * [11.0.0-testnet](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v11.0.0-testnet)
* Web3 Gateway version:
  * [4.0.2](https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/v4.0.2)

### Sapphire

* Oasis Core version:
  * [23.0.9](https://github.com/oasisprotocol/oasis-core/releases/tag/v23.0.9)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c`
* Runtime bundle version:
  * [0.7.0-testnet](https://github.com/oasisprotocol/sapphire-paratime/releases/tag/v0.7.0-testnet)
* Web3 Gateway version:
  * [4.0.2](https://github.com/oasisprotocol/oasis-web3-gateway/releases/tag/v4.0.2)
* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`
  * `jaFE5Lq6GS76ya1V7a+XlGQTgttAagXEtknO4Tv1wLs=@185.56.138.83:8650`

:::tip

Feel free to use other IAS proxies besides the ones provided here or [run your own](../run-your-node/ias-proxy.md).

:::

### Key Manager

* Oasis Core version:
  * [23.0.9](https://github.com/oasisprotocol/oasis-core/releases/tag/v23.0.9)
* Runtime identifier:
  * `4000000000000000000000000000000000000000000000004a1a53dff2ae482d`
* Runtime bundle version:
  * [0.4.1-testnet](https://github.com/oasisprotocol/keymanager-paratime/releases/tag/v0.4.1-testnet)
* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`
  * `jaFE5Lq6GS76ya1V7a+XlGQTgttAagXEtknO4Tv1wLs=@185.56.138.83:8650`

:::tip

Feel free to use other IAS proxies besides the ones provided here or [run your own](../run-your-node/ias-proxy.md).

:::
