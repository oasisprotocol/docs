# Stake Requirements

:::tip

To check the balance of your account, use one of the blockchain explorers like
the [Oasis Scan] or the [`oasis account show`] command part of the Oasis CLI.

:::

|                                                         |                                                   Mainnet |                    Testnet |
|---------------------------------------------------------|----------------------------------------------------------:|---------------------------:|
| Registration of entity[^entity-reg]                     |                                                  100 ROSE |                   100 TEST |
| Registration of node                                    |                                                  100 ROSE |                   100 TEST |
| Size of the validator set[^validator-set]               |                               120[^validator-set-mainnet] | 110[^validator-set-testnet] |
| Run Sapphire or Emerald compute node[^compute-node]     | 5,000,000 ROSE<br/>+ member of the validator set[^member] |                          / |
| Run Cipher compute node[^compute-node]                  |                      member of the validator set[^member] |                          / |
| Create ROFL app on Sapphire or Cipher[^rofl-app-create] |                      10,000 ROSE[^rofl-app-create-amount] |                10,000 TEST[^rofl-app-create-amount] |
| Create a ParaTime                                       |                                               50,000 ROSE |                10,000 TEST |

[^entity-reg]: You can fetch the latest entity registration stake requirements
by running [`oasis network show native-token`].

[^validator-set]: The size of the consensus committee (i.e. the validator set)
is configured by the [**max_validators** committee-scheduler parameter]. You can
view the current value by running [`oasis network show parameters`].

[^validator-set-mainnet]: To determine if you are eligible to receive a
delegation from the Oasis Protocol Foundation, see the [Delegation Policy]
document.

[^validator-set-testnet]: For the Testnet, you can receive a limited number of
TEST tokens by using our [Oasis Network Testnet Faucet][faucet-testnet]. For
more tokens please contact us on our official [Discord in the #testnet channel][discord].

[^member]: You can check the current top validators on the blockchain explorers
like the [Oasis Scan] or by running [`oasis network show validators`].

[^compute-node]: You can fetch the latest ParaTime-specific stake requirements
by running [`oasis network show`] and specifying the ParaTime ID ([Mainnet], [Testnet]).

[^rofl-app-create]: You can fetch current ParaTime application-specific stake
requirements by running [`oasis paratime show parameters`].

[^rofl-app-create-amount]: The amount must be staked inside the ParaTime.

## Stake requirements by a specific role of the node

The table below shows required stake-related steps you need to make, if you
want to set up a working node from scratch.

| Node role              | Requirement                                                                                                                                                          |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Validator node]       | 1. Registration of entity<br/>2. Registration of the validator node<br/>3. Member of the validator set                                                               |
| [Non-validator node]   | /                                                                                                                                                                    |
| [ParaTime node]        | 1. Registration of entity<br/>2. Registration of the compute node<br/>3. Extra ParaTime-specific compute node stake<br/>4. Member of the validator set (Mainnet only) |
| [ParaTime client node] | 1. Registration of entity<br/>2. Registration of the observer node                                                                                                   |

[Validator node]: ../validator-node.mdx
[Non-validator node]: ../non-validator-node.mdx
[ParaTime node]: ../paratime-node.mdx
[ParaTime client node]: ../paratime-client-node.mdx

[Oasis Scan]: https://www.oasisscan.com/validators
[`oasis account show`]: ../../../general/manage-tokens/cli/account.md#show
[`oasis network show native-token`]: ../../../general/manage-tokens/cli/network.md#show-native-token
[`oasis network show validators`]: ../../../general/manage-tokens/cli/network.md#show-validators
[`oasis network show parameters`]: ../../../general/manage-tokens/cli/network.md#show-parameters
[Delegation Policy]: ../../../get-involved/delegation-policy.md
[**max_validators** committee-scheduler parameter]: ../../genesis-doc.md#committee-scheduler
[faucet-testnet]: https://faucet.testnet.oasis.io/
[discord]: https://oasis.io/discord
[`oasis network show`]: ../../../general/manage-tokens/cli/network.md#show-id
[Mainnet]: ../../mainnet/README.md#paratimes
[Testnet]: ../../testnet/README.md#paratimes
[`oasis paratime show parameters`]: ../../../general/manage-tokens/cli/paratime.md#show-parameters
