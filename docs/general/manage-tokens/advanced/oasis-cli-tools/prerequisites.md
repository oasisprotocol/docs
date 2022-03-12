# Prerequisites

This sections lists the prerequisites for using your tokens.

:::info

Currently, the only supported and documented way to use your tokens is by utilizing the Oasis Node CLI in combination with:

* [Ledger-based signer](/oasis-core-ledger), or
* file-based signer.

:::

## Oasis Node CLI

To setup Oasis Node CLI, follow the [Oasis Node documentation](../../../run-a-node/prerequisites/oasis-node.md).

## Ledger-based signer

:::info

This is only needed if you will use the [Ledger wallet](../../holding-rose-tokens/ledger-wallet.md) to hold your tokens.

:::

To use the Ledger-based signer in combination with Oasis Node CLI, follow the [Setup](/oasis-core-ledger/usage/setup) guide in our [Oasis Core Ledger](/oasis-core-ledger/) docs.

## File-based signer

:::danger

We strongly suggest that you do not use any entity/staking account that is generated with the file-based signer on the Mainnet.

In case you need to use the file-based signer, make sure you only use it on an [offline/air-gapped machine](https://en.wikipedia.org/wiki/Air_gap_\(networking\)). Gaining access to your entity's/staking account's private key can compromise your tokens.

:::

There are no additional things needed since the file-based signer is a part of Oasis Node CLI.
