# Prerequisites

This sections lists the prerequisites for using your tokens.

{% hint style="info" %}
Currently, the only supported and documented way to use your tokens is by utilizing the Oasis Node CLI in combination with:

* [Ledger-based signer](https://docs.oasis.dev/oasis-core-ledger/), or
* file-based signer.
{% endhint %}

## Oasis Node CLI

To setup Oasis Node CLI, follow the Oasis Node documentation:

{% content-ref url="../../../run-a-node/prerequisites/oasis-node.md" %}
[oasis-node.md](../../../run-a-node/prerequisites/oasis-node.md)
{% endcontent-ref %}

## Ledger-based signer

{% hint style="info" %}
This is only needed if you will use the [Ledger wallet](../../holding-rose-tokens/ledger-wallet.md) to hold your tokens.
{% endhint %}

To use the Ledger-based signer in combination with Oasis Node CLI, follow the [Setup](https://docs.oasis.dev/oasis-core-ledger/usage/setup) guide in our [Oasis Core Ledger](https://docs.oasis.dev/oasis-core-ledger/) docs.

## File-based signer

{% hint style="danger" %}
We strongly suggest that you do not use any entity/staking account that is generated with the file-based signer on the Mainnet.

In case you need to use the file-based signer, make sure you only use it on an [offline/air-gapped machine](https://en.wikipedia.org/wiki/Air\_gap\_\(networking\)). Gaining access to your entity's/staking account's private key can compromise your tokens.
{% endhint %}

There are no additional things needed since the file-based signer is a part of Oasis Node CLI.
