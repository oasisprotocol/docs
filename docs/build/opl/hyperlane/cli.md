---
description: Hyperlane CLI for Sapphire
---

# Hyperlane CLI

:::info

The standard **Hyperlane CLI** relies on the `eth_getStorageAt` method,
which is incompatible with **Sapphire** by default. 

To address this, the installation instructions below cherry pick the commit that fixes this issue from the use the
**[`pb/storage-workaround`]** of the Hyperlane CLI.

For more details about `eth_getStorageAt` on Sapphire, refer to the
[Sapphire documentation].

For more helps, see the [Troubleshooting section] of the Hyperlane docs.

:::

## Installation

Run the command below to clone the latest version of the Hyperlane relayer and apply the commit on top that fixes the `eth_getStorageAt` issue.

1. Clone the Sapphire-compatible branch:
    ```bash
    git clone https://github.com/hyperlane-xyz/hyperlane-monorepo.git 
    cd hyperlane-monorepo
    git fetch
    git pull
    gco -b my-local-relayer
    git cherry-pick 871df7a
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

[`pb/storage-workaround`]: https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/pb/storage-workaround
[Sapphire documentation]: https://docs.oasis.io/build/sapphire/ethereum#encrypted-contract-state
[Troubleshooting section]: https://docs.hyperlane.xyz/docs/deploy-hyperlane-troubleshooting#eth_getstorageat-compatibility
[hyperlane-deploy]: https://docs.hyperlane.xyz/docs/deploy-hyperlane

