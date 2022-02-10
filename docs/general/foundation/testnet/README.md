---
description: >-
  These are the current parameters for the Testnet, a test-only network for
  testing out upcoming features and changes to the protocol.
---

# The Testnet

:::danger

**The Testnet may be subject to frequent version upgrades and state resets.**

:::

:::info

On the Testnet, TEST tokens are in use -- if you need some to test your clients, nodes or paratimes, feel free to request them on [**#testnet** in the Community Slack](../../oasis-network/connect-with-us). Note that these are test-only tokens and account balances, as any other state, may be frequently reset.

:::

This page is meant to be kept up to date with the information from the currently released Testnet. Use the information here to deploy or upgrade your node on the Testnet.

* Latest Testnet version: **2021-04-13**
* [Genesis file](https://github.com/oasisprotocol/testnet-artifacts/releases/download/2021-04-13/genesis.json):
  * SHA256: `ccac45fdf81f572c63e915a2dcb90b4281443020229a0df38d76018b55674489`
* Genesis document's hash ([explanation](../../oasis-network/genesis-doc#genesis-file-vs-genesis-document)):
  * `5ba68bc5e01e06f755c4c044dd11ec508e4c17f1faf40c0e67874388437a9e55`
* Oasis seed node address:
  * `05EAC99BB37F6DAAD4B13386FF5E087ACBDDC450@34.86.165.6:26656`

:::tip

Feel free to use other seed nodes besides the one provided here.

:::

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [21.3.10](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.10)

:::info

The Oasis Node is part of the Oasis Core release.

:::

## ParaTimes

This section contains parameters for various ParaTimes known to be deployed on the Testnet. Similar to the Testnet, these may be subject to frequent version upgrades and/or state resets.

### Cipher ParaTime

* Oasis Core version:
  * [21.3.10](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.10)
* Runtime identifier:
  * `0000000000000000000000000000000000000000000000000000000000000000`
* Runtime binary version:
  * [2.0.0-alpha3](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v2.0.0-alpha3)
* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../../run-a-node/set-up-your-node/run-an-ias-proxy).

:::

### Emerald ParaTime

* Oasis Core version:
  * [21.3.10](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.3.10)
* Runtime identifier:
  * `00000000000000000000000000000000000000000000000072c8215e60d5bca7`
* Runtime binary version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v7.0.0-rc1#building)):
  * [7.0.0-rc1](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v7.0.0-rc1)
