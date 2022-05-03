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

On the Testnet, TEST tokens are in use -- if you need some to test your clients, nodes or paratimes, feel free to use our [Testnet Faucet](https://faucet.testnet.oasis.dev). Note that these are test-only tokens and account balances, as any other state, may be frequently reset.

:::

This page is meant to be kept up to date with the information from the currently released Testnet. Use the information here to deploy or upgrade your node on the Testnet.

* Latest Testnet version: **2022-03-03**
* [Genesis file](https://github.com/oasisprotocol/testnet-artifacts/releases/download/2022-03-03/genesis.json):
  * SHA256: `4c3d271253d2a324816de3b9a048261b674471e7d4f9a02995a769489bd41984`
* Genesis document's hash ([explanation](../../oasis-network/genesis-doc.md#genesis-file-vs-genesis-document)):
  * `50304f98ddb656620ea817cc1446c401752a05a249b36c9b90dba4616829977a`
* Oasis seed node address:
  * `05EAC99BB37F6DAAD4B13386FF5E087ACBDDC450@34.86.165.6:26656`

:::tip

Feel free to use other seed nodes besides the one provided here.

:::

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [22.1.4](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.4)
* [Oasis Rosetta Gateway](https://github.com/oasisprotocol/oasis-rosetta-gateway) version:
  * [2.2.0](https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.2.0)

:::info

The Oasis Node is part of the Oasis Core release.

:::

## ParaTimes

This section contains parameters for various ParaTimes known to be deployed on the Testnet. Similar to the Testnet, these may be subject to frequent version upgrades and/or state resets.

### Cipher ParaTime

* Oasis Core version:
  * [22.1.4](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.4)
* Runtime identifier:
  * `0000000000000000000000000000000000000000000000000000000000000000`
* Runtime binary version:
  * [2.4.0-testnet](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v2.4.0-testnet)
  * [2.5.0-testnet](https://github.com/oasisprotocol/cipher-paratime/releases/tag/v2.5.0-testnet)

:::info

The release contains two bundles -- for deploying a ParaTime node you only need
`cipher-paratime.orc`. The other bundle is for the key manager runtime and can
be ignored unless you are deploying a key manager node.

:::

:::info

When multiple runtime versions are listed, make sure to specify the paths to all
of the bundles in your configuration. This ensures that any planned upgrade
happens at the right time.

For example, for the above Cipher ParaTime versions the configuration would look
like the following (only showing the relevant options):

```yaml
runtime:
  # ... other options omitted ...
  paths:
    - /path/to/cipher-paratime-2.4.0-testnet.orc
    - /path/to/cipher-paratime-2.5.0-testnet.orc
```

:::

* IAS proxy address:
  * `y4XO1ZETqgtHeZzLLmJLYAzpEfdGSJLvtd8bhIz+v3s=@34.86.197.181:8650`

:::tip

Feel free to use other IAS proxies besides the one provided here or [run your own](../../run-a-node/set-up-your-node/run-an-ias-proxy.md).

:::

### Emerald ParaTime

* Oasis Core version:
  * [22.1.4](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.4)
* Runtime identifier:
  * `00000000000000000000000000000000000000000000000072c8215e60d5bca7`
* Runtime binary version (or [build your own](https://github.com/oasisprotocol/emerald-paratime/tree/v8.1.0-testnet#building)):
  * [8.1.0-testnet](https://github.com/oasisprotocol/emerald-paratime/releases/tag/v8.1.0-testnet)
* Emerald Web3 Gateway version:
  * [2.1.0-rc1](https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v2.1.0-rc1)

:::tip

When upgrading the ParaTime version, make sure to just _add_ the path to the
bundle for the new version while also _keeping the old one_. This ensures that
the upgrade process happens at the right time.

For example the new configuration after the recent upgrade would look like the
following with **both versions** listed:

```yaml
runtime:
  paths:
    - /path/to/emerald-paratime-8.0.0-testnet.orc
    - /path/to/emerald-paratime-8.1.0-testnet.orc
```

:::
