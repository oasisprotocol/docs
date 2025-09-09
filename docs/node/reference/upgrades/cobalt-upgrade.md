# Cobalt Upgrade

This document provides an overview of the proposed criteria and changes for the Cobalt Mainnet upgrade. This has been [reviewed and approved by community members and validators of the Oasis Network](https://github.com/oasisprotocol/community/discussions/18) and is being reproduced and summarized here for easy access.

:::caution

As proposed by the community, the Cobalt upgrade on Mainnet will kick off around April 28, 2021 at 16:00 UTC.

:::

## Major Features

All features for the Cobalt upgrade are implemented as part of **Oasis Core 21.1.1** which is a protocol-breaking release. Summary of the major features is as follows:

* **Light Clients and Checkpoint Sync**: In order to make bootstrapping of new network nodes much faster, the upgrade will introduce support for light clients and restoring state from checkpoints provided by other nodes in the network.
* **Random Beacon**: The random beacon is used by the consensus layer for ParaTime committee elections and is a critical component in providing security for ParaTimes with an open admission policy. The improved random beacon implementation is based on SCRAPE and provides unbiased output as long as at least one participant is honest.
* **On-Chain Governance**: The new on-chain governance service provides a simple framework for submitting governance proposals, validators voting on proposals and once an upgrade proposal passes, having a way to perform the upgrade in a controlled manner which minimizes downtime.
* **Support for Beneficiary Allowances**: Each account is able to configure beneficiaries which are allowed to withdraw tokens from it in addition to the account owner.
* **ROSE Transfers Between the consensus layer and ParaTimes**: The proposed upgrade introduces a mechanism where ParaTimes can emit messages as part of processing any ParaTime block. These messages can trigger operations in the consensus layer on the ParaTime's behalf. ParaTimes get their own accounts in the consensus layer which can hold ROSE and ParaTimes are able to request them be transferred to other accounts or to withdraw from other accounts when allowed via the allowances mechanism.
* **A Path Towards Self-Governing ParaTimes**: By building on the ParaTime messages mechanism, the proposed upgrade extends ParaTime governance options and enables a path towards ParaTimes that can define their own governance mechanisms.

In addition to the specified additional features we also propose the validator set size to be increased from the current 80 to 100 validators as [suggested earlier by the community](https://github.com/oasisprotocol/community/discussions/5#discussioncomment-282746).

## Mechanics of the Upgrade

:::info

This section will be updated with more details as we get closer to the upgrade.

:::

Upgrading the Mainnet will require a coordinated upgrade of the Network. All nodes will need to configure a new genesis file that they can generate or verify independently and reset/archive any state from Mainnet. Once enough (representing 2/3+ of stake) nodes have taken this step, the upgraded network will start.

For the actual steps that node operators need to make on their nodes, see the [Upgrade Log](../upgrade-logs/mainnet.md#cobalt-upgrade).

## Proposed State Changes

The following parts of the genesis document will be updated:

:::info

For a more detailed explanation of the parameters below, see the [Genesis Document](../../reference/genesis-doc.md#parameters) docs.

:::

### **General**

* **`height`** will be set to the height of the Mainnet state dump + 1, i.e.`3027601`.
* **`genesis_time`** will be set to`2021-04-28T16:00:00Z`.
* **`chain_id`** will be set to `oasis-2`.
* **`halt_epoch`** will be set to`13807`(approximately 1 year from the Cobalt upgrade).

### **Epoch Time**

The **`epochtime`**object will be removed since it became obsolete with the new [improved random beacon](../../../adrs/0007-improved-random-beacon.md). It will be replaced with the new **`beacon`** object described [below](cobalt-upgrade.md#random-beacon).

### **Registry**

*   **`registry.params.enable_runtime_governance_models` ** is a new parameter that specifies the set of [runtime governance models](../../../core/consensus/services/registry.md#runtimes) that are allowed to be used when creating/updating registrations. It will be set to:

    ```
    {
      "entity": true,
      "runtime": true
    }
    ```
* **`registry.runtimes`** list contains the registered runtimes' descriptors. In the Cobalt upgrade, it will be migrated from a list of _signed_ runtime descriptors to a list of runtime descriptors. The migration will be done automatically with the `oasis-node debug fix-genesis` command.
* **`registry.suspended_runtimes`** list contains the suspended registered runtimes' descriptors. In the Cobalt upgrade, it will be migrated from a list of _signed_ suspended runtime descriptors to a list of suspended runtime descriptors. The migration will be done automatically with the `oasis-node debug fix-genesis` command.
* Inactive registered entities in **`registry.entities`** (and their corresponding nodes in **`registry.nodes`**) that don't pass the [minimum staking thresholds](../../reference/genesis-doc.md#staking-thresholds) will be removed. The removal will be done automatically with the `oasis-node debug fix-genesis` command.

:::info

Removing entities from **`registry.entities`** will effectively deregister them but the entities' accounts in **`staking.ledger`** will remain intact.

Deregistered entities can always re-register by submitting the [entity registration transaction](../../run-your-node/validator-node.mdx#entity-registration) after the upgrade.

:::

* **`registry.node_statuses`** object contains the registered nodes' statuses. In the Cobalt upgrade, each node's status will get a new parameter: **`election_eligible_after`**. This parameter specifies at which epoch a node is eligible to be [scheduled into various committees](../../../core/consensus/services/scheduler.md). All nodes will have the parameter set to `0` which means they are immediately eligible. The migration will be done automatically with the `oasis-node debug fix-genesis` command.

### **Root Hash**

* **`roothash.params.max_runtime_messages` ** is a new parameter that specifies the global limit on the number of [messages](../../../core/runtime/messages.md) that can be emitted in each round by the runtime. It will be set to `256`.
* **`roothash.params.max_evidence_age`** is a new parameter that specifies the maximum age (in the number of rounds) of submitted evidence for [compute node slashing](../../../adrs/0005-runtime-compute-slashing.md). It will be set to `100`.

### **Staking**

* **`staking.governance_deposits` ** are the tokens collected from governance proposal deposits. The initial balance will be set to `"0"`.
* **`staking.params.allow_escrow_messages`** is a new parameter indicating whether to enable support for the newly added `AddEscrow` and `ReclaimEscrow` [runtime messages](../../../core/runtime/messages.md) . It will be set to`true`.
* **`staking.params.slashing.0`** will be renamed to **`staking.params.slashing.consensus-equivocation`**.
* **`staking.params.slashing.consensus-light-client-attack.amount`** is a new parameter controlling how much to slash for light client attack. It will be set to `"100000000000"` (i.e. 100,000,000,000 base units, or 100 ROSE tokens).
* **`staking.params.slashing.consensus-light-client-attack.freeze_interval` ** is a new parameter controlling the duration (in epochs) for which a node that has been slashed for light client attack is “frozen,” or barred from participating in the network's consensus committee. It will be set to `18446744073709551615` (i.e. the maximum value for a 64-bit unsigned integer) which means that any node slashed for light client attack will be, in effect, permanently banned from the network.

### **Committee Scheduler**

* **`scheduler.params.max_validators`** is the maximum size of the consensus committee (i.e. the validator set). It will be increased from `80` to`100`.

### **Random Beacon**

The **`beacon`** object contains parameters controlling the new [improved random beacon](../../../adrs/0007-improved-random-beacon.md) introduced in the Cobalt upgrade.

* **`beacon.base`** is the network's starting epoch. It will be set to the epoch of Mainnet's state dump + 1, i.e. `5047`.
* **`beacon.params.backend`** configures the random beacon backend to use. It will be set to `"pvss"` indicating that the beacon implementing a [PVSS (publicly verifiable secret sharing) scheme](../../../adrs/0007-improved-random-beacon.md) should be used.
* **`beacon.params.pvss_parameters.participants`** is the number of participants to be selected for each beacon generation protocol round. It will be set to `20`.
* **`beacon.params.pvss_parameters.threshold`** is the minimum number of participants which must successfully contribute entropy for the final output to be considered valid. It will be set to `10`.
* **`beacon.params.pvss_parameters.commit_interval`** is the duration of the Commit phase (in blocks). It will be set to `400`.
* **`beacon.params.pvss_parameters.reveal_interval`** is the duration of the Reveal phase (in blocks). It will be set to `196`.
* **`beacon.params.pvss_parameters.transition_delay`** is the duration of the post Reveal phase (in blocks). It will be set to `4`.

### **Governance**

The **`governance`** object contains parameters controlling the network's [on-chain governance](../../../core/consensus/services/governance.md) introduced in the Cobalt upgrade**.**

* **`governance.params.min_proposal_deposit`** is the amount of tokens (in base units) that are deposited when creating a new proposal. It will be set to  `"10000000000000"` (i.e. 10,000,000,000,000 base units, or 10,000 ROSE tokens).
* **`governance.params.voting_period`** is the number of epochs after which the voting for a proposal is closed and the votes are tallied. It will be set to `168`, which is expected to be approximately 7 days.
*   **`governance.params.quorum`** is the minimum percentage of voting power that needs to be cast on a proposal for the result to be valid. It will be set to `75` (i.e. 75%).

    **`governance.params.threshold`** is the minimum percentage of `VoteYes` votes in order for a proposal to be accepted. It will be set to `90`(i.e. 90%).
*   **`governance.params.upgrade_min_epoch_diff`** is the minimum number of epochs between the current epoch and the proposed upgrade epoch for the upgrade proposal to be valid. Additionally, it specifies the minimum number of epochs between two consecutive pending upgrades.

    It will be set to `336`, which is expected to be approximately 14 days.
* **`governance.params.upgrade_cancel_min_epoch_diff`** is the minimum number of epochs between the current epoch and the proposed upgrade epoch for the upgrade cancellation proposal to be valid. It will be set to`192`, which is expected to be approximately 8 days.

### **Consensus**

*   **`consensus.params.max_evidence_num`** parameter will be removed and replaced by the

    **`consensus.params.max_evidence_size`** parameter.
* **`consensus.params.max_evidence_size`** is a new parameter specifying the maximum evidence size in bytes. It replaces the **`consensus.params.max_evidence_num`** parameter and will be set to`51200` (51,200 bytes, or 50 kB).
* **`consensus.params.state_checkpoint_interval`** parameter controls the interval (in blocks) on which state checkpoints should be taken. It will be set to `10000`.
* **`consensus.params.state_checkpoint_num_kept`** parameter specifies the number of past state checkpoints to keep. It will be set to `2`.
* **`consensus.params.state_checkpoint_chunk_size`** parameters controls the chunk size (in bytes) that should be used when creating state checkpoints. It will be set to `8388608` (8,388,608 bytes, or 8 MB).

### Other

*   **`extra_data`** will be set back to the value in the [Mainnet genesis file](https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-11-18) to include the Oasis network's genesis quote: _”_[_Quis custodiet ipsos custodes?_](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F)_” \[submitted by Oasis Community Member Daniyar Borangaziyev]:_

    ```
    "extra_data": {
      "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="
    }
    ```

### Runtime State Root Migration

Additionally, each runtime's state root will need to be updated for the [runtime storage migration](../upgrade-logs/mainnet.md#runtime-operators) that is performed during this upgrade.

At this time, there is only one active runtime on the Mainnet, namely Second State's Oasis Ethereum ParaTime with ID (Base64-encoded) `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wM=`.

After completing the runtime storage migration, Second State will communicate the new state root of their runtime and the genesis document needs to be updated as follows:

* **`roothash.runtime_states.<RUNTIME-ID>.state_root`** will be set to the (Base64-encoded) migrated state root.
* **`registry.runtimes.[id=<RUNTIME-ID>].genesis.state_root`** will be set to the (Base64-encoded) migrated state root.
* **`registry.runtimes.[id=<RUNTIME-ID>].genesis.state`** will be set to `null`.
* **`registry.runtimes.[id=<RUNTIME-ID>].genesis.round`** will be set to the same value as **`roothash.runtime_states.<RUNTIME-ID>.round`**.

## Launch Support

The Oasis team will be offering live video support during the Cobalt upgrade. Video call link and calendar details will be shared with node operators via email and Slack.

For any additional support, please reach out via the [**#nodeoperators** Oasis Community Slack channel](../../../get-involved/README.md) with your questions, comments, and feedback related to Cobalt upgrade.

To follow the network, please use one of the many [community block explorers][archived - block explorers].

[archived - block explorers]: https://github.com/oasisprotocol/docs/blob/0aeeb93a6e7c9001925923661e4eb3340ec4fb4b/docs/general/community-resources/community-made-resources.md#block-explorers--validator-leaderboards-block-explorers-validator-leaderboards
