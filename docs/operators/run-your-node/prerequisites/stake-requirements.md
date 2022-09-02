# Stake Requirements

This page provides an overview of the stake requirements to become a validator
on the consensus layer of the Oasis Network.

## Mainnet

To become a validator on the Oasis Network, you will need to have enough
tokens staked in your escrow account.

Currently, you are going to need:

* 100 ROSE staked for your entity's registration since that is the
[staking thresholds].
* 100 ROSE staked for your validator node's registration since that is the
[staking thresholds].
* If you want to be part of the active validator set, you will need enough
ROSE staked --  this means you will have to be one of the top 120 entities
by stake. You can check out current top 120 entities on the blockchain explorer
such as [Oasis Scan].

For more information about obtaining information on your entity's account, see
the [Account Get Info] doc.

Staking thresholds may change in the future. Read [Common staking info] chapter,
to learn how to check the current network thresholds directly from the
`oasis-node`.

[staking thresholds]: ../genesis-doc.md#staking-thresholds
[Oasis Scan]: https://www.oasisscan.com/validators
[Account Get Info]: ../../../general/manage-tokens/advanced/oasis-cli-tools/get-account-info.md
[Common staking info]: ../../../general/manage-tokens/advanced/oasis-cli-tools/common-staking-info.md

:::info

To determine if you are eligible to receive a delegation from the Oasis Protocol
Foundation, see the [Delegation Policy] document.

[Delegation Policy]: ../../../general/contribute-to-the-network/delegation-policy.md

:::

:::info

The size of the consensus committee (i.e. the validator set) is configured by
the [**max_validators** consensus parameter].

[**max_validators** consensus parameter]: ../genesis-doc.md#consensus

:::

## Testnet

For the Testnet you are going to need TEST tokens. You can receive a limited
number of TEST by using our [Oasis Network Testnet Faucet][faucet-testnet]. For
more tokens please contact us at our official [Discord #testnet channel]
[discord-testnet].

[faucet-testnet]: https://faucet.testnet.oasis.dev/
[discord-testnet]: https://discord.com/channels/748635004384313474/960599828662976522
