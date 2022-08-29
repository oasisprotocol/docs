# Run a Consensus Validator Node

This guide provides an overview of the technical setup and stake requirements to
become a validator on the Consensus layer of the Oasis Network.

## About Oasis Network

[Oasis Network](../oasis-network/overview.mdx)'s Consensus Layer is a decentralised set of validator nodes that maintain a proof-of-stake blockchain.

Hence, it needs a set of distributed node operators that run different nodes (including validator nodes).

## Technical setup

Make sure your system meets the [Hardware](/operators/set-up-your-node/prerequisites/hardware-recommendations) prerequisites and has [Oasis Node](/operators/set-up-your-node/prerequisites/oasis-node) installed.

Then proceed by following the [Run a Validator Node](/operators/set-up-your-node/run-validator) guide to:

* Create your entity.
* Initialize and configure your node.
* Put enough stake in your escrow account.
* Register your entity on the network.

## Stake requirements

To become a validator on the Oasis Network, you need to have enough tokens staked in your escrow account.

:::info

For more information about obtaining information on your entity's account, see the [Account Get Info](../manage-tokens/advanced/oasis-cli-tools/get-account-info.md) doc.

:::

Currently, you should have:

* 100 ROSE staked for your entity's registration since that is the [current entity's staking threshold](../oasis-network/genesis-doc.md#node-and-paratime-token-thresholds).
* 100 ROSE staked for your validator node's registration since that is the [current validator node's staking threshold](../oasis-network/genesis-doc.md#node-and-paratime-token-thresholds).
* Enough ROSE staked to be in the top 120 entities (by stake) so your validator will be elected into the consensus committee.

:::info

The size of the consensus committee (i.e. the validator set) is configured by the [**max_validators** consensus parameter](../oasis-network/genesis-doc.md#consensus).

:::

:::info

To determine if you are eligible to receive a delegation from the Oasis Protocol Foundation, see the [Delegation Policy](delegation-policy.md) document.

:::
