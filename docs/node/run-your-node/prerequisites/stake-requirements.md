# Stake Requirements

This page provides an overview of the stake requirements to become a validator
on the consensus layer, to run a ParaTime compute nodes and to run observer
nodes on the Oasis Network.

## Registering an Entity

To register an entity you are going to need at least: 

|                             | Mainnet  | Testnet  |
| --------------------------- | -------- | -------- |
| Entity Registration         | 100 ROSE | 100 TEST |
| Each Node Registration      | 100 ROSE | 100 TEST |


## Validator Node

To become a validator on the consensus layer, you will need to have enough ROSE
for **registering your entity**, **registering your validator node**, and be among
the top entities by stake to be included in the **validator set**.

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

## ParaTime Compute Node

 To run a ParaTime compute node you will need to have a minimum stake which
 currently is:

|          | Mainnet        | Testnet  |
| -------- | -------------- | -------- |
| Sapphire | 5,000,100 ROSE | 100 TEST |
| Emerald  | 5,000,100 ROSE | 100 TEST |
| Cipher   | 100 ROSE       | 100 TEST |

To run a ParaTime compute node, on Mainnet you will also have to be in the
validator set:

|          | Mainnet - Validator Set | Testnet - Validator Set |
| -------- | ----------------------- | ----------------------- |
| Sapphire | Yes                     | No                      |
| Emerald  | Yes                     | No                      |
| Cipher   | Yes                     | No                      |

## ParaTime Observer Node

To run a ParaTime observer nodes, you will need to register an entity and add
your observer nodes to the entity descriptor.
