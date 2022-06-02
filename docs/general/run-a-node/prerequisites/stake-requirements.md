---
description: >-
  Overview of the stake requirements to become a validator
  on the consensus layer of the Oasis Network.
---

# Stake requirements

## Mainnet

To become a validator on the Oasis Network, you will need to have enough 
tokens staked in your escrow account.  

:::info

To determine if you are eligible to receive a delegation from the Oasis Protocol 
Foundation, see the [Delegation Policy] document.

[Delegation Policy]: ../../foundation/delegation-policy.md

:::

Currently, you are going to need:

* 100 ROSE staked for your entity's registration since that is the [current entity's 
staking threshold].
* 100 ROSE staked for your validator node's registration since that is the 
[current validator node's staking threshold].
* If you want to be part of the active validator set, you are going to need enough 
ROSE staked. Currently this means you will have to be one of the top 120 entities 
by stake. You can see how much you are going to need on the blockchain explorer 
such as like [Oasis Scan].


[current entity's staking threshold]: ../../oasis-network/genesis-doc.md#node-and-paratime-token-thresholds
[current validator node's staking threshold]: ../../oasis-network/genesis-doc.md#node-and-paratime-token-thresholds
[Oasis Scan]: https://www.oasisscan.com/validators

:::info

For more information about obtaining information on your entity's account, see 
the [Account Get Info] doc.

[Account Get Info]: ../../manage-tokens/advanced/oasis-cli-tools/get-account-info.md

:::

:::info

The size of the consensus committee (i.e. the validator set) is configured by 
the [**max_validators** consensus parameter].

[**max_validators** consensus parameter]: ../../oasis-network/genesis-doc.md#consensus

:::