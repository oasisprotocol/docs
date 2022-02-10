# Oasis File-Based Signer

:::danger

We strongly suggest that you do not use any entity/staking account that is generated with the file-based signer on the Mainnet.

In case you need to use the file-based signer, make sure you only use it on an [offline/air-gapped machine](https://en.wikipedia.org/wiki/Air_gap_\(networking\)). Gaining access to your entity's/staking account's private key can compromise your tokens.

:::

To hold your ROSE tokens via a private key stored in a file, use the Oasis file-based signer.

## Manage Your Tokens

### Using Oasis Wallets

This is a simpler option since it allows you to import your private key stored in a file into a web browser app or a web browser extension.

Follow the instructions in the [Oasis Wallets](../oasis-wallets/) doc.

:::danger

Importing your private key into an online web browser app or a web browser extension will significantly increase its exposure and chances for it to be compromised.

We recommend ONLY doing this with wallets with small amounts of ROSE tokens or wallets only used with the Testnet.

:::

### Using Oasis CLI Tools

This is the most powerful option that allows performing any token-related management task.

Follow the instructions in the [Oasis CLI Tools](oasis-cli-tools/) doc.

:::caution

To ensure your private key's safety, we recommend only exposing/using your private key on an [offline/air-gapped machine](https://en.wikipedia.org/wiki/Air_gap_\(networking\)).

Exposing your entity's/staking account's private key on an online machine can compromise your tokens.

:::
