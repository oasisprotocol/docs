# Consensus Validator Node

This guide provides an overview of the technical setup and stake requirements to
become a validator on the consensus layer of the Oasis Network.

## About Oasis Network

[Oasis Network](../../general/oasis-network/README.mdx)'s consensus Layer is a decentralised set of validator nodes that maintain a proof-of-stake blockchain.

Hence, it needs a set of distributed node operators that run different nodes (including validator nodes).

## Technical setup

Make sure your system meets the [Hardware](../../node/run-your-node/prerequisites/hardware-recommendations.md) prerequisites and has [Oasis Node](../../node/run-your-node/prerequisites/oasis-node.md) installed.

Then proceed by following the [Run a Validator Node](../../node/run-your-node/validator-node.mdx) guide to:

* Create your entity.
* Initialize and configure your node.
* Put enough stake in your escrow account.
* Register your entity on the network.

## Stake requirements

To become a validator on the Oasis Network, you need to have enough tokens staked in your escrow account.

:::info

For more information about obtaining information on your entity's account, see the [Account Get Info](../../general/manage-tokens/cli/account.md#show) doc.

:::

Currently, you should have:

* 100 ROSE staked for your entity's registration since that is the [current entity's staking threshold](../../node/reference/genesis-doc.md#staking-thresholds).
* 100 ROSE staked for your validator node's registration since that is the [current validator node's staking threshold](../../node/reference/genesis-doc.md#staking-thresholds).
* Enough ROSE staked to be in the top 120 entities (by stake) so your validator will be elected into the consensus committee.

:::info

The size of the consensus committee (i.e. the validator set) is configured by the [**max_validators** consensus parameter](../../node/reference/genesis-doc.md#consensus).

:::

:::info

To determine if you are eligible to receive a delegation from the Oasis Protocol Foundation, see the [Delegation Policy](../delegation-policy.md) document.

:::
