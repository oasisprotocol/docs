---
description: Approving fee payer in Router Protocol
---

# Approving the Fee Payer

According to Router Protocol's [fee management] system, cross-chain requests
initiated by a dApp are paid for by the dApp's corresponding fee payer account
on the Router Chain. This fee payer is registered by calling the
`setDappMetadata` function on the gateway contract.

## Obtaining Test Tokens

To interact with the Router Protocol testnet, you'll need `ROUTE` test tokens.
Follow these steps to obtain them from the Router Faucet:

1. Visit the [Router Faucet] website.
2. Connect your MetaMask wallet.
3. Add the Router Test Network to your MetaMask if prompted.
4. Enter your account address in the provided field.
5. Click the `Get Test Tokens` button.

![Router Test Faucet](../../images/opl/router-faucet.png)

## Approving Contracts in Router Explorer

After deploying your contracts, you need to approve the fee payer for each of
them. Here's how to do it using the Router Explorer:

1. Navigate to the [Router Explorer].
2. Connect your wallet by clicking the "Connect Wallet" button.
3. Once connected, you'll see a list of pending approvals for your deployed
contracts.

![Router Approvals](../../images/opl/router-approve.png)

4. For each contract listed, click the `Approve` button.
5. Follow the prompts in your wallet to sign the approval message.

:::info

If you don't see your deployed contracts in the list, it's possible you used an
incorrect gateway address for the chain during deployment. Verify the current
gateway addresses in the [Router Protocol documentation].

:::

## Troubleshooting

If you encounter any issues during the approval process, consider the following:

- Ensure you have sufficient ROUTE test tokens in your wallet.
- Verify that you're connected to the correct network in MetaMask.
- Double-check that the contracts were deployed with the correct gateway
  addresses.

[fee management]: https://docs.routerprotocol.com/develop/message-transfer-via-crosstalk/key-concepts/fee-management
[Router Faucet]: https://faucet.routerprotocol.com/
[Router Explorer]: https://testnet.routerscan.io/feePayer
[Router Protocol documentation]: https://docs.routerprotocol.com/networks/supported-chains#for-testnet
