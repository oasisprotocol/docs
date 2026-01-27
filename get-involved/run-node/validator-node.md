# Consensus Validator Node

Source: https://docs.oasis.io/get-involved/run-node/validator-node

This guide provides an overview of the technical setup and stake requirements to
become a validator on the consensus layer of the Oasis Network.

## About Oasis Network

[Oasis Network](https://docs.oasis.io/general/oasis-network.md)'s consensus Layer is a decentralised set of validator nodes that maintain a proof-of-stake blockchain.

Hence, it needs a set of distributed node operators that run different nodes (including validator nodes).

## Technical setup

Make sure your system meets the [Hardware](https://docs.oasis.io/node/run-your-node/prerequisites/hardware-recommendations.md) prerequisites and has [Oasis Node](https://docs.oasis.io/node/run-your-node/prerequisites/oasis-node.md) installed.

Then proceed by following the [Run a Validator Node](https://docs.oasis.io/node/run-your-node/validator-node.md) guide to:

* Create your entity.
* Initialize and configure your node.
* Put enough stake in your escrow account.
* Register your entity on the network.

## Stake requirements

To become a validator on the Oasis Network, you need to have enough tokens staked in your escrow account.

**Info**:

For more information about obtaining information on your entity's account, see the [Account Get Info](https://docs.oasis.io/build/tools/cli/account.md#show) doc.

Currently, you should have:

* 100 ROSE staked for your entity's registration since that is the [current entity's staking threshold](https://docs.oasis.io/node/reference/genesis-doc.md#staking-thresholds).
* 100 ROSE staked for your validator node's registration since that is the [current validator node's staking threshold](https://docs.oasis.io/node/reference/genesis-doc.md#staking-thresholds).
* Enough ROSE staked to be in the top 120 entities (by stake) so your validator will be elected into the consensus committee.

**Info**:

The size of the consensus committee (i.e. the validator set) is configured by the [**max\_validators** consensus parameter](https://docs.oasis.io/node/reference/genesis-doc.md#consensus).

**Info**:

To determine if you are eligible to receive a delegation from the Oasis Protocol Foundation, see the [Delegation Policy](https://docs.oasis.io/get-involved/delegation-policy.md) document.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
