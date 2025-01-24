---
description: Hyperlane Protocol
---

# Hyperlane

[Hyperlane] is a permissionless interoperability protocol that enables seamless
cross-chain communication for developers. Its unique design allows deployment
across various blockchain environments, including layer 1 chains, rollups, and
app-chains, without the need for approvals or intermediaries. This 
[permissionless design] empowers developers to build cross-chain applications
with full control over their operations in a multi-chain ecosystem. 

[Hyperlane]: https://hyperlane.xyz/
[permissionless design]: https://docs.hyperlane.xyz/docs/intro

## Hyperlane CLI on Sapphire

:::info

The standard **Hyperlane CLI** relies on the `eth_getStorageAt` method, which is
incompatible with **Sapphire** by default. To address this, a **[custom branch]** of the
Hyperlane CLI has been created.

For more details about `eth_getStorageAt` on Sapphire, refer to the
[Sapphire documentation].

:::

To use the Hyperlane branch that supports Sapphire, run the following:

1. Clone the branch to your local machine:

    ```
    git clone https://github.com/hyperlane-xyz/hyperlane-monorepo.git --branch pb/storage-workaround
    cd hyperlane-monorepo
    ```

2. Install dependencies and build the project:

    ```
    yarn install && yarn build
    ```

3. Run the modified CLI using the following command:

    ```
    yarn workspace @hyperlane-xyz/cli hyperlane
    ```

:::info

For more details about Hyperlane compatibility, refer to the
[Hyperlane Troubleshooting documentation].

:::


[custom branch]: https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/pb/storage-workaround
[Sapphire documentation]: https://github.com/oasisprotocol/sapphire-paratime/blob/main/docs/develop/deployment#caution-against-using-eth_getstorageat
[Hyperlane Troubleshooting documentation]: https://docs.hyperlane.xyz/docs/deploy-hyperlane-troubleshooting#eth_getstorageat-compatibility

### Hyperlane Deployment

For guidance on deploying on a new chain using the Hyperlane CLI, refer to the
[official deploy documentation][hyperlane-deploy].

[hyperlane-deploy]: https://docs.hyperlane.xyz/docs/deploy-hyperlane
