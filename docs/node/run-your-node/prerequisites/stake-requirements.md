# Stake Requirements

This page provides an overview of the stake requirements to become a validator
on the consensus layer and to run a ParaTime compute node of the Oasis Network.

## Consensus Layer

To become a validator on the consensus layer, you will need to have enough ROSE
for **registering your entity**, **registering your validator node**, and be among
the top entities by stake to be included in the **validator set**.

Current requirements are:

|                             | Mainnet  | Testnet  |
| --------------------------- | -------- | -------- |
| Entity Registration         | 100 ROSE | 100 TEST |
| Validator Node Registration | 100 ROSE | 100 TEST |
| Validator Set Size          | 120      | 110      |

You can check the current top validators on the blockchain explorers like the [Oasis Scan].

For the Testnet, you can receive a limited number of TEST tokens by using our [Oasis Network Testnet Faucet][faucet-testnet].
For more tokens please contact us on our official [Discord in the #testnet channel][discord].

:::tip

You can use the Oasis CLI to check your account and the network parameters. Use
the [`oasis account show`] command to check your entity's account and
[`oasis network show native-token`] to see the current values used by the network.

:::


:::info

To determine if you are eligible to receive a delegation from the Oasis Protocol
Foundation, see the [Delegation Policy] document.

:::

:::info

The size of the consensus committee (i.e. the validator set) is configured by
the [**max_validators** consensus parameter][**max_validators** consensus parameter].

:::

[Oasis Scan]: https://www.oasisscan.com/validators
[`oasis account show`]: ../../../general/manage-tokens/cli/account.md#show
[`oasis network show native-token`]: ../../../general/manage-tokens/cli/network.md#show-native-token
[Delegation Policy]: ../../../get-involved/delegation-policy.md
[**max_validators** consensus parameter]: ../../genesis-doc.md#consensus
[faucet-testnet]: https://faucet.testnet.oasis.io/
[discord]: https://oasis.io/discord

## ParaTime

To run a ParaTime compute node, the minimum you need to stake currently is:

|            | Mainnet     | Testnet  |
| ---------- | ----------- | -------- |
| Sapphire   | 50,000 ROSE | 100 TEST |
| Emerald    | 50,000 ROSE | 100 TEST |
| Cipher     | 100 ROSE    | 100 TEST |


