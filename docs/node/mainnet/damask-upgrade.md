# Damask Upgrade

This document provides an overview of the changes for the Damask Mainnet
upgrade.

:::caution

The Damask upgrade on Mainnet is scheduled at epoch **13402** which will happen
around **Apr 11, 2022 at 8:30 UTC**.

:::

## Major Features

All features for the Damask upgrade are implemented as part of
**Oasis Core 22.1.x** release series which is a consensus protocol-breaking
release.

Summary of the major features is as follows:

- **Random Beacon**: The random beacon is used by the consensus layer for
  ParaTime committee elections and is a critical component in providing
  security for ParaTimes with an open admission policy.
  To make the random beacon more performant and scalable, the upgrade
  transitions the election procedure to one that is based on cryptographic
  sortition of Verifiable Random Function (VRF) outputs.
  For more details, see [ADR 0010].

- **On-Chain Governance**: The upgrade simplifies the governance by replacing
  separate quorum and threshold parameters with a single unified stake threshold
  parameter that represents the percentage of _yes_ votes in terms of total
  voting power for a governance proposal to pass.

- **ParaTime Performance**: By simplifying the protocol (executor and storage
  committees are merged into a single committee) the upgrade improves ParaTime
  committee performance and opens the way for even more improvements on the
  ParaTime side. It also leads to simplified configuration of ParaTime nodes.

- **ParaTime Upgrades**: After the Damask upgrade, runtime descriptors will
  include information regarding supported versions, and the epoch from which
  they are valid, which will allow ParaTime upgrades to happen without incurring
  downtime by having upgrades and the descriptor changes pre-staged well in
  advance of the upgrade epoch.
  For more details, see [ADR 0013].

- **ParaTime Packaging**: This upgrade changes runtime bundles to be unified
  across all supported TEE types and self describing so that configuring
  ParaTimes is only a matter of passing in the runtime bundle file.

- **Consensus and ParaTime Communication**: The upgrade adds support for
  incoming runtime messages where consensus layer transactions can trigger
  actions inside ParaTimes.
  For more details, see [ADR 0011].

  The upgrade also adds support for runtime message results which extends the
  results of the emitted runtime messages with relevant information beyond
  indicating whether the message execution was successful or not.
  For more details, see [ADR 0012].

In addition to the specified additional features, we also propose the
**validator set size** to be **increased from** the current **110 to 120** as
discussed in the
[Oasis Community Slack #nodeoperators channel][slack-validator-increase].

This upgrade marks an important milestone for the Oasis Network, as it sets the
foundation for unlocking the network's full capabilities.

[ADR 0010]: /adrs/0010-vrf-elections
[ADR 0013]: /adrs/0013-runtime-upgrades
[ADR 0011]: /adrs/0011-incoming-runtime-messages
[ADR 0012]: /adrs/0012-runtime-message-results
[slack-validator-increase]:
  https://oasiscommunity.slack.com/archives/CMUSJCRFA/p1647881564057319?thread_ts=1647448573.197229&cid=CMUSJCRFA

## Mechanics of the Upgrade

On Mar 24, 2022, the Oasis Protocol Foundation submitted the upgrade governance
proposal with id of `2` which proposed upgrading the network at epoch 13402.

:::tip

In addition to submitting the actual governance proposal to the network, Oasis
Protocol Foundation also published the [Damask Upgrade Proposal discussion] to
the [Oasis Community Forum on GitHub].

:::

Node operators which had an active validator node in the validator set had 1
week to cast their vote.

Validators representing more than 88% of the total stake in the consensus
committee participated in the vote, and 100% of them voted _yes_ for the proposal.

The upgrade will be performed by exporting the network's state at the upgrade
epoch, updating the [genesis document][genesis-doc], upgrading the Oasis Node
and the ParaTime binaries and starting a new network from the new genesis file.

This will require coordination between node operators and the Oasis Protocol
Foundation.
All nodes will need to configure the new genesis file that they can generate or
verify independently and reset/archive any existing state from Mainnet.

Once enough nodes (representing 2/3+ of stake) have taken this step, the
upgraded network will start.

For the actual steps that node operators need to make on their nodes, see the
[Upgrade Log][upgrade-log-damask].

[Damask Upgrade Proposal discussion]:
  https://github.com/oasisprotocol/community/discussions/30
[Oasis Community Forum on GitHub]:
  https://github.com/oasisprotocol/community
[upgrade-log-damask]: upgrade-log.md#damask-upgrade

## Proposed State Changes {#state-changes}

The following parts of the genesis document will be updated:

:::caution

This section will be updated with the exact details as we get closer to the
upgrade.

:::

:::info

For a more detailed explanation of the parameters below, see the
[Genesis Document][genesis-doc] docs.

:::

### **General**

* **`height`** will be set to the height of the Mainnet state dump + 1,
  `8048956`.

* **`genesis_time`** will be set to`2022-04-11T09:30:00Z`.

* **`chain_id`** will be set to `oasis-3`.

* **`halt_epoch`** will be bumped by `10000` (a little more than a year) to
  `23807`.

### **Registry**

* **`registry.runtimes`** list contains the registered runtimes' descriptors.
  In this upgrade, all runtime descriptors will be migrated from version `2` to
  version `3`.

  The migration will be done automatically with the
  `oasis-node debug fix-genesis` command.

* **`registry.runtimes.[id=000000000000000000000000000000000000000000000000e2eaa99fc008f87f].deployments.version`**
  specifies Emerald ParaTime's version on Mainnet.

  It will be upgraded from version 7.1.0 to 8.2.0 and hence the configuration
  needs to be manually updated to:

  ```
  "version": {
    "major": 8,
    "minor": 2
  },
  ```

* **`registry.runtimes.[id=000000000000000000000000000000000000000000000000e199119c992377cb].deployments`**
  specifies Cipher ParaTime's version and TEE identity on Mainnet.

  It will be upgraded from version 1.0.0 to 1.1.0 and hence the configuration
  needs to be manually updated to:

  ```
  "version": {
    "major": 1,
    "minor": 1
  },
  "valid_from": 0,
  "tee": "oWhlbmNsYXZlc4GiaW1yX3NpZ25lclggQCXat+vaH77MTjY3YG4CEhTQ9BxtBCL9N4sqi4iBhFlqbXJfZW5jbGF2ZVggoiJgre0cDF5arUk9wh0X9eGWr5cHb8LY0A3/msmznHc="
  ```

* **`registry.suspended_runtimes`** list contains the suspended registered
  runtimes' descriptors. In this upgrade, all runtime descriptors for suspended
  runtimes will be migrated from version `2` to version `3`.

  The migration will be done automatically with the
  `oasis-node debug fix-genesis` command.

* Inactive registered entities in **`registry.entities`** (and their
  corresponding nodes in **`registry.nodes`**) that don't pass the
  [minimum staking thresholds] will be removed.

  The removal will be done automatically with the `oasis-node debug fix-genesis`
  command.

### **Root Hash**

* **`roothash.params.gas_costs.submit_msg`** is a new parameter that specifies
  the cost for a submit message transaction. It will be set to `1000`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`roothash.params.max_in_runtime_messages`** is a new parameter that
  specifies the maximum number of incoming messages that can be queued for
  processing by a runtime. It will be set to `128`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`roothash.runtime_state`** contains the state roots of the runtimes.
  Empty fields will be omitted.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

### **Staking**

* **`staking.params.thresholds`** specifies the minimum number of tokens that
  need to be staked in order for a particular entity or a particular type of
  node to participate in the network.

  The `node-storage` key is removed since Oasis Core 22.0+ removes separate
  storage nodes.
  For more details, see: [Oasis Core #4308][oasis-core-4308].

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`staking.params.min_transfer`** is a new parameter that specifies the
  minimum number of tokens one can transfer.
  It will be set to 10,000,000 base units, or 0.01 ROSE tokens.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`staking.params.min_transact_balance`** is a new parameter that specifies
  the minimum general balance an account must have to be able to perform
  transactions on the network.
  It will be set to 0 base units, meaning this requirement is currently not
  enforced.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

### **Committee Scheduler**

* **`scheduler.params.min_validators`** is the minimum size of the consensus
  committee (i.e. the validator set). It will be increased from `15` to `30`.

* **`scheduler.params.max_validators`** is the maximum size of the consensus
  committee (i.e. the validator set). It will be increased from `110` to `120`.

### **Random Beacon**

The **`beacon`** object contains parameters controlling the new
[improved VRF-based random beacon][ADR 0010] introduced in the Damask upgrade.

* **`beacon.base`** is the network's starting epoch. It will be set to the epoch
  of Mainnet's state dump + 1, `13402`.

* **`beacon.params.backend`** configures the random beacon backend to use.
  It will be set to `"vrf"` indicating that the beacon implementing
  [VRF-based random beacon][ADR 0010] should be used.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

The **`beacon.params.vrf_parameters`** control the behavior of the new
[VRF-based random beacon][ADR 0010]:

* **`beacon.params.vrf_parameters.alpha_hq_threshold`** is minimal number of
  nodes that need to contribute a VRF proof for the beacon's output to be valid.
  It will be set to `20`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`beacon.params.vrf_parameters.interval`** is the duration of an epoch.
  It will be set to `600`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`beacon.params.vrf_parameters.proof_delay`** is number of blocks since the
  beginning of an epoch after a node can still submit its VRF proof.
  It will be set to `400`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`beacon.params.vrf_parameters.gas_costs.vrf_prove`** specifies the cost for
  a VRF prove transaction.
  It will be set to `1000`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

The **`beacon.params.pvss_parameters`** control the behavior of the
[previous random beacon implementing a PVSS scheme][pvss-beacon].

Since PVSS is no longer supported, all its configuration options are removed
as well.

### **Governance**

* **`governance.params.stake_threshold`** is a new parameter specifying the
  single unified stake threshold representing the percentage of `VoteYes` votes
  in terms of total voting power for a governance proposal to pass.
  It will be set to `68` (i.e. 68%).

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`governance.params.quorum`** is the minimum percentage of voting power that
  needs to be cast on a proposal for the result to be valid.

  It will be removed since it is being replaced by the single
  **`governance.params.staking_threshold`** parameter.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`governance.params.threshold`** is the minimum percentage of `VoteYes` votes
  in order for a proposal to be accepted.

  It will be removed since it is being replaced by the single
  **`governance.params.staking_threshold`** parameter.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

### **Consensus**

* **`consensus.params.state_checkpoint_interval`** parameter controls the
  interval (in blocks) on which state checkpoints should be taken. It will be
  increased from `10000` to `100000` to improve nodes' performance since
  computing checkpoints is I/O intensive.

### Other

* **`extra_data`** will be set back to the value in the [Mainnet genesis file]
  to include the Oasis Network's genesis quote:

  _”_[_Quis custodiet ipsos custodes?_][mainnet-quote]_” \[submitted by Oasis
  Community Member Daniyar Borangaziyev]:_

  ```
  "extra_data": {
    "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="
  }
  ```

[genesis-doc]: ../genesis-doc.md#parameters
[minimum staking thresholds]: ../genesis-doc.md#staking-thresholds
[oasis-core-4308]: https://github.com/oasisprotocol/oasis-core/pull/4308
[pvss-beacon]: ../../adrs/0007-improved-random-beacon.md
[Mainnet genesis file]:
  https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-11-18
[mainnet-quote]: https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F

## Launch Support

The Oasis team will be offering live video support during the Damask upgrade.
Video call link and calendar details will be shared with node operators via
email and Slack.

For any additional support, please reach out via the
[**#nodeoperators** Oasis Community Slack channel][node-operators-slack] with
your questions, comments, and feedback related to Damask upgrade.

To follow the network, please use one of the many
[community block explorers][archived - block explorers].

[node-operators-slack]: ../../get-involved/README.md
[archived - block explorers]: https://github.com/oasisprotocol/docs/blob/0aeeb93a6e7c9001925923661e4eb3340ec4fb4b/docs/general/community-resources/community-made-resources.md#block-explorers--validator-leaderboards-block-explorers-validator-leaderboards
