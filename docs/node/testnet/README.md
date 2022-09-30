# Testnet

These are the current parameters for the Testnet, a test-only network for
testing out upcoming features and changes to the protocol.

:::danger

**The Testnet may be subject to frequent version upgrades and state resets.**

:::

:::info

On the Testnet, TEST tokens are in use -- if you need some to test your clients, nodes or paratimes, feel free to use our [Testnet Faucet](https://faucet.testnet.oasis.dev). Note that these are test-only tokens and account balances, as any other state, may be frequently reset.

:::

This page is meant to be kept up to date with the information from the currently released Testnet. Use the information here to deploy or upgrade your node on the Testnet.

* Latest Testnet version: **2022-03-03**
* [Genesis file](https://github.com/oasisprotocol/testnet-artifacts/releases/download/2022-03-03/genesis.json):
  * SHA256: `4c3d271253d2a324816de3b9a048261b674471e7d4f9a02995a769489bd41984`
* Genesis document's hash ([explanation](../genesis-doc.md#genesis-file-vs-genesis-document)):
  * `50304f98ddb656620ea817cc1446c401752a05a249b36c9b90dba4616829977a`
* Oasis seed node address:
  * `05EAC99BB37F6DAAD4B13386FF5E087ACBDDC450@34.86.165.6:26656`

:::tip

Feel free to use other seed nodes besides the one provided here.

:::

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
  * To sync from genesis, you need to start with an earlier version first
    ([read more][handling network upgrades]):
    * [22.0.3](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.0.3) (until epoch **15056**)
* [Oasis Rosetta Gateway](https://github.com/oasisprotocol/oasis-rosetta-gateway) version:
  * [2.2.1](https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.2.1)

:::info

The Oasis Node is part of the Oasis Core release.

:::

[handling network upgrades]: ../run-your-node/maintenance/handling-network-upgrades.md

## ParaTimes

This section contains parameters for various ParaTimes known to be deployed on the Testnet. Similar to the Testnet, these may be subject to frequent version upgrades and/or state resets.

### Cipher ParaTime

* Oasis Core version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
* Runtime identifier:
  * `0000000000000000000000000000000000000000000000000000000000000000`
* Runtime binary version:
  * [2.5.0-testnet](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v2.5.0-testnet)
* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../run-your-node/ias-proxy.md).

:::

### Emerald ParaTime

* Oasis Core version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
* Runtime identifier:
  * `00000000000000000000000000000000000000000000000072c8215e60d5bca7`
* Runtime binary version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v9.0.1-testnet#building)):
  * [9.0.1-testnet](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v9.0.1-testnet)
* Emerald Web3 Gateway version:
  * [3.1.0-rc1](https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v3.1.0-rc1)

### Sapphire ParaTime

* Oasis Core version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
* Runtime identifier:
  * `000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c`
* Runtime binary version:
  * [0.1.4-testnet](https://github.com/oasisprotocol/sapphire-paratime/releases/tag/v0.1.4-testnet)
* Web3 Gateway version:
  * [3.1.0-rc1](https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v3.1.0-rc1)
* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../run-your-node/ias-proxy.md).

:::

### Key Manager ParaTime

* Oasis Core version:
  * [22.1.11](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.11)
* Runtime identifier:
  * `4000000000000000000000000000000000000000000000004a1a53dff2ae482d`
* Runtime binary version:
  * [0.2.0-testnet](https://github.com/oasisprotocol/keymanager-paratime/releases/tag/v0.2.0-testnet)
* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../run-your-node/ias-proxy.md).

:::
