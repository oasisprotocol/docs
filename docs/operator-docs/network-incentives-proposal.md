# Network Incentives Proposal

{% hint style="info" %}
This is a draft proposal and is subject to change pending the outcome of an economic audit, feedback from the community, and the results of the Oasis Foundation’s staking competition.
{% endhint %}

Below is a proposal of the initial incentive model for the Oasis Network at the time of Mainnet launch. To submit your feedback and comments to the proposal please reach out to us on [Slack](https://oasisprotocol.org/slack) or via [GitHub](https://github.com/oasisprotocol/docs). When designing and running stress tests, audits, and simulations, the underlying goal has been to develop an incentive model that encourages both the development of a healthy and active developer ecosystem as well as a secure, decentralized network through an engaged and diverse node operator community.

The core focus of this incentive documentation is to outline a proposal for parameters and rewards around staking and delegation. In future documentation we will provide more detail on the proposed roadmap and rewards that expand beyond this activity.

_Note that following network launch, all changes to the protocol will be determined by the community based on the consensus mechanism of the Oasis network._

## Summary

* **Estimated staking rewards**: 15% annual rewards at launch, tapering to 10%

  by end of year.

* **Slashing**: Slash for double-signing only
* **Number of validators to participate in any given consensus committee \(and receive staking rewards\) at launch**: up to 100 validators
* **Minimum stake**: 100 tokens

## Overview of the Oasis Consensus Layer

The Oasis Network is based on a Proof-of-Stake \(PoS\) consensus model. Tokens can be self-delegated directly by each node operator or delegated to a node operator by other token holders. While the Oasis Network is designed with a modular architecture that can use any consensus system that satisfies these properties, it currently uses [Tendermint](https://github.com/tendermint/tendermint) as its consensus algorithm.

At the time of the initial Mainnet launch, node operators will primarily serve as validators for this consensus layer. They will have the ability to sign blocks, earn transaction fees, stake, and receive delegation. Similar to the PoS design implemented by Cosmos, up to 100 validators with the most stake will be active validators participating in the consensus process.

The system will disincentivize bad behavior via slashing for double-signing, as well as via the cost to dominate the network, in terms of the number of staked tokens.

## Nuts and Bolts of Staking Rewards

### Staking Conditions

As a public, permissionless blockchain platform, our goal is to make the experience of setting up a node as seamless as possible for any member of our community who wants to contribute to the Oasis Network. To that end, we’ve put a lot of thought into ensuring our staking conditions minimize barriers to entry and encourage meaningful engagement on the network. A few key parameters:

* **Number of validators to participate in consensus committee \(and receive staking rewards\) at launch**: Up to 100 validators
* **Minimum stake**: 100 tokens
* **Selection to the consensus committee**: Each entity can have at most one node elected to the consensus committee at a time.
* **Annual rewards**: The network is targeted to hit ~15% annual rewards at launch \(based on the number of blocks produced, so timing could vary\) and then taper down to 10% by end of year. This will happen over a gradual taper rather than a step function change to avoid creating some sort of cliff.
* **Slashing**: At the time of Mainnet launch, the network will only slash for double-signing. The network would slash the minimum stake amount \(100 tokens\) and freeze the node. Freezing the node is a precaution in order to prevent the node from being over-penalized. The Network will not slash for liveness or uptime at launch.
* **Staking rewards**: The goal initially is to offer rewards that will help bootstrap the network effectively. To start, rewards will be proportional to the stake and awarded on a per-entity basis. In order to be eligible for staking rewards per epoch, a node would need to sign at least 75% of blocks in that epoch.
* **Unbonding period**: The network will have a ~14 day unbonding period. During this time, staked tokens are at risk of getting slashed for double-signing and do not accrue rewards during this time.
* **Consensus voting power**: The current voting power mechanism is stake-weighted. This means that the consensus voting power of a validator is proportional to its stake. In this model, the network will require signatures by validators representing +2/3 of the total stake of the committee to sign a block. Note that in Tendermint, a validator's opportunities to propose a block in the round-robin block proposer order are also proportional to its voting power.

### Delegation

As the Oasis Network gets closer to Mainnet, we’ll continue to share with our community plenty of additional information on the delegation process and how to do easily delegate on the network. In the meantime, here are a few thoughts on delegation more generally:

* **Slashing**: Delegated funds can be slashed for double-signing.
* **Reward disbursement**: Rewards from delegated funds are distributed directly to the delegator. Rewards are automatically added to their stakes \(i.e. reinvested\), so the rewards will have to go through the ~14 day unbonding period.

### Commission Rates

There is currently no plan to require a minimum or maximum commission rate for delegation, but we would like to set parameters around the transparency and notification of commission rates.

When a node sets up on network, it will be able to share its current commission rate, as well as the range with which that rate could change \(e.g. + / - 10%\). Commission rates can be adjusted once per epoch.

### Transaction Fee Distribution

Most likely, transaction fees will be distributed with about one half awarded to the proposer of the block containing that specific transaction, one fourth awarded equally among the validators who signed that block, and one fourth awarded to the proposer of the next block.

## Glossary of Commonly Used Terms

* **Entity**: That’s you! \(Or your organization.\) On the Oasis Network, you’re identified by your public key. Your private key controls your wallet, which maintains a token balance. Each entity can also have a token amount staked, which is a separate balance that permits it to run _nodes_. See [Entities and Key Management](network-architecture-overview.md#entities-and-key-management) for further information.
* **Node**: This is your computer \(VM, bare metal, container, etc.\), running the Oasis Network software. It’s identified by another public key, separate from your entity public key. On the Oasis Network, each node is owned by a single entity. For each node that an entity registers on the network, the entity must have a certain additional token amount _staked_.
* **Staking**: A token amount _staked_ with an entity is separate from the entity’s token balance and contributes to the entity’s eligibility to run nodes. Entities can _stake_ tokens with themselves or with other entities, the latter is referred to as _delegation_. The network keeps track of which entities delegated what proportion of an entity’s staked token amount.
* **Consensus committee**: The consensus committee is a group of nodes that the network elects to maintain its state by executing a Byzantine-fault-tolerant \(BFT\) consensus protocol.
* **Validator**: A validator is a node participating in the consensus committee. To be eligible to have your node selected as a validator, your entity must be within the Top K staked entities. Entities with a node serving as a validator receive _staking rewards_, which are shared with delegators, as well as _transaction fees_, which are deposited only into their own wallet. Each validator has a private key that is used for signing operations during block production and a public key, or Node Identity, used for identification. See [Entities and Key Management](network-architecture-overview.md#entities-and-key-management) for further information.
* **Top K**: The top-ranked entities by token amount staked. These entities’ nodes are eligible to participate in the consensus committee and receive staking rewards.
* **Transaction fee**: The reward that a validator receives from processing a transaction that runs on the network \(separate from staking rewards\).
* **Commission rate**: The fee that a validator chooses to charge to delegators.
* **Unbonding period**: A period of time when a validator or delegator wants to stop staking tokens, but cannot move them. During this waiting period, tokens do not accrue staking rewards but cannot be withdrawn.

For more information and for the latest updates, please visit our website. We also invite you to join our Slack community to share your feedback and help shape the future of our network.

If you’re new to Oasis, here are some resources you may find useful:

* [Oasis Foundation Website](https://oasisprotocol.org)
* [Running a Node on the Amber Network](running-a-node.md)
* [Operator Documentation](node-operator-overview.md)
* [GitHub](https://github.com/oasisprotocol)
* [Blog](https://medium.com/oasis-protocol-project)

