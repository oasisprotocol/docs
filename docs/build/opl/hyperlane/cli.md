---
description: Hyperlane CLI for Sapphire
---

# Hyperlane CLI

:::info

The standard **Hyperlane CLI** relies on the `eth_getStorageAt` method,
which is incompatible with **Sapphire** by default. To address this, use the
**[custom branch]** of the Hyperlane CLI or follow the guidance in the
[Troubleshooting section] of Hyperlane.

For more details about `eth_getStorageAt` on Sapphire, refer to the
[Sapphire documentation].

:::

## Installation

1. Clone the Sapphire-compatible branch:
    ```bash
    git clone https://github.com/hyperlane-xyz/hyperlane-monorepo.git --branch pb/storage-workaround
    cd hyperlane-monorepo
    ```

2. Install dependencies and build the project:
    ```bash
    yarn install && yarn build
    ```

## Usage

Run the modified CLI:
```bash
yarn workspace @hyperlane-xyz/cli hyperlane
```

## Hyperlane Core Deployment

For guidance on how to use the modified CLI for deploying the Hyperlane Core
on Sapphire, refer to the [official deploy documentation][hyperlane-deploy].

[custom branch]: https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/pb/storage-workaround
[Sapphire documentation]: https://github.com/oasisprotocol/sapphire-paratime/blob/main/docs/develop/deployment#caution-against-using-eth_getstorageat
[Troubleshooting section]: https://docs.hyperlane.xyz/docs/deploy-hyperlane-troubleshooting#eth_getstorageat-compatibility
[hyperlane-deploy]: https://docs.hyperlane.xyz/docs/deploy-hyperlane
