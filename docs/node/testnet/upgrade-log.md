# Upgrade Log


For each upgrade of the Testnet network, we are tracking important changes for
node operators' deployments.

They are enumerated and explained in this document.

## 2023-10-XX Upgrade

* **Upgrade height:** upgrade is scheduled to happen at epoch **XXX**.

:::info

We expect the Testnet network to reach this epoch at around 2023-10-XX X:XX UTC.

:::

### Instructions

1. (optional) Vote for the upgrade. On 2023-XX-XX, an upgrade proposal will be
   proposed which (if accepted) will schedule the upgrade on epoch **XXX**. See
   the [Governance documentation] for details on voting for proposals.

The following steps should be performed only after the network has reached the
upgrade epoch and has halted:

2. Download the Testnet genesis file published in the
   [Testnet 2023-10-XX release].

:::info

Testnet state at epoch **XXX** will be exported and migrated to a 23.0
compatible genesis file.

The new genesis file will be published on the above link soon after reaching the
upgrade epoch.

:::

3. Verify the provided Testnet upgrade genesis file by comparing it to the
   local network state dump.

   The state changes are described in the [State Changes](#state-changes)
   section below.

4. Replace the old genesis file with the new Testnet genesis file.

5. Ensure your node will remain stopped by disabling auto-starting via your
   process manager (e.g., [systemd] or [Supervisor])

6. [Wipe state]. This must be performed _before_ replacing the Oasis Node
   binary.

:::danger

State of ParaTimes/runtimes is not affected by this upgrade and MUST NOT be
wiped. Wiping state for confidential ParaTimes will prevent your compute or
key manager node from transitioning to the new network.

Transitioning confidential ParaTimes to the new network requires local state
that is sealed to the CPU. This also means that bootstrapping a new node on a
separate CPU immediately after the network upgrade will not be possible until
an updated ParaTime containing new trust roots is released and adopted.

:::

7. Replace the old version of Oasis Node with version [23.0].

:::info

Oasis Core 23.0 binary is built only for Ubuntu 22.04. You'll have to build the core if you're using prior Ubuntu versions.

:::

8. Perform any needed [configuration changes](#configuration-changes) described
   below.

9. (only Web3 Gateway operators) Replace old version of Oasis Web3 Gateway with
   version [4.0.0-rc1][web3-gw-4.0.0-rc1].

10. (only Rosetta Gateway operators) Replace old version of Oasis Rosetta
    Gateway with version [3.0.0-rc1][rosetta-gw-3.0.0-rc1].

11. Start your node and re-enable auto-starting via your process manager.

[Governance documentation]: ../../general/manage-tokens/cli/network.md#governance-cast-vote
[Testnet 2023-10-XX release]: https://github.com/oasisprotocol/testnet-artifacts/releases/tag/2023-10-XX
[systemd]: https://systemd.io/
[Supervisor]: http://supervisord.org/
[Wipe state]: ../run-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity
[23.0]: https://github.com/oasisprotocol/oasis-core/releases/tag/v23.0
[web3-gw-4.0.0-rc1]:
  https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v4.0.0-rc1
[rosetta-gw-3.0.0-rc1]:
  https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v3.0.0-rc1

### Configuration Changes

:::info

To see the full extent of the changes examine the [Change Log] of the 23.0
release.

:::

The node configuration has been refactored so that everything is now configured
via a YAML configuration file and **configuring via command-line options is no
longer supported**.

Some configuration options have changed and so the configuration file needs to
be updated. To make this step easier, a command-line tool has been provided that
will perform most of the changes automatically. You can run it with:

```
oasis-node config migrate --in config.yml --out new-config.yml
```

The migration subcommand logs the various changes it makes and warns you if a
config option is no longer supported, etc. At the end, any unknown sections of
the input config file are printed to the terminal to give you a chance to review
them and make manual changes if required.

Note that the migration subcommand does not preserve comments and order of
sections from the input YAML config file. You should always carefully read the
output of this command, as well as compare the generated config file with the
original before using it.

After you are satisfied with the new configuration file, replace the old file
with the new one as follows:

```
mv new-config.yml config.yml
```

[Change Log]:
  https://github.com/oasisprotocol/oasis-core/blob/v23.0/CHANGELOG.md
### State Changes

The following parts of the genesis document will be updated:

:::info

For a more detailed explanation of the parameters below, see the
[Genesis Document] docs.

:::

:::info

All state changes will be done automatically with the migration command provided
by the new version of `oasis-node`. It can be used as follows to derive the same
genesis file from an existing state dump at the correct height:

```
oasis-node genesis migrate --genesis.new_chain_id testnet-2023-10-XX
```

:::

#### **General**

* **`chain_id`** will be set to `testnet-2023-10-XX`.

* **`halt_epoch`** will be removed as it is no longer used.

#### **Registry**

* **`registry.params.gas_costs.prove_freshness`** specifies the cost of the
  freshness proof transaction. It will be set to `1000`.

* **`registry.params.gas_costs.update_keymanager`** specifies the cost of the
  keymanager policy update transaction. It will be removed as the parameter has
  been moved under `keymanager.params.gas_costs.update_policy`.

* **`registry.params.tee_features`** specify various TEE features supported by
  the consensus layer registry service. These will be set to the following
  values to activate the new features:

  ```json
  "tee_features": {
    "sgx": {
      "pcs": true,
      "signed_attestations": true,
      "max_attestation_age": 1200
    },
    "freshness_proofs": true
  }
  ```

* **`registry.params.max_runtime_deployments`** specifies the maximum number of
  runtime deployments that can be specified in the runtime descriptor. It will
  be set to `5`.

#### **Staking**

* **`staking.params.commission_schedule_rules.min_commission_rate`** specifies
  the minimum commission rate. It will be set to `0` to maintain the existing
  behavior.

#### **Key Manager**

* **`keymanager.params.gas_costs`** specify the cost of key manager
  transactions. These will be set to the following values:

  ```json
  "gas_costs": {
    "publish_ephemeral_secret": 1000,
    "publish_master_secret": 1000,
    "update_policy": 1000
  }
  ```

#### **Random Beacon**

* **`beacon.base`** is the network's starting epoch. It will be set to the epoch
  of Testnet's state dump + 1, `XXX`.

#### **Governance**

* **`governance.params.enable_change_parameters_proposal`** specifies whether
  parameter change governance proposals are allowed. It will be set to `true`.

#### Other

* **`extra_data`** will be set back to the value in the [Mainnet genesis file]
  to include the Oasis Network's genesis quote:

  _”_[_Quis custodiet ipsos custodes?_][mainnet-quote]_” \[submitted by Oasis
  Community Member Daniyar Borangaziyev]:_

  ```
  "extra_data": {
    "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="
  }
  ```

[Genesis Document]: ../genesis-doc.md#parameters
[Mainnet genesis file]:
  https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-11-18
[mainnet-quote]: https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F

## 2022-04-04 Upgrade

* **Upgrade height:** upgrade is scheduled to happen at epoch **15056**.

:::info

We expect the Testnet network to reach this epoch at around 2022-04-04 7:45 UTC.

:::

### Instructions

* See [Before upgrade](upgrade-log.md#before-upgrade) section for required steps
  to be done before upgrade.

* (optional) Vote for the upgrade. On 2022-04-01, an upgrade proposal will be
  proposed which (if accepted) will schedule the upgrade on epoch **15056**.
  See the [Governance documentation](../../general/manage-tokens/cli/network.md#governance-cast-vote)
  for details on voting for proposals.

:::info

The upgrade proposal contains the `"empty"` upgrade handler whose only purpose
is allow specifying a no-op handler when submitting an upgrade proposal.

:::

:::caution This is not dump & restore upgrade

For this upgrade, **do NOT wipe state**. The new Oasis Core version expects
the synced state using Oasis Core 22.0.x all the way until the upgrade epoch.
Read [Handling Network Upgrades] for more info.

:::

* Once reaching the designated upgrade epoch, your node will stop and needs to
  be upgraded to Oasis Core [22.1].
  After your node is upgraded to Oasis Core 22.1, restart it and wait for more
  than 2/3+ of nodes by stake to do the same and the network starts again.

:::info

The Testnet's genesis file and the genesis document's hash will remain the same.

:::

* If the nodes are running any ParaTimes, make sure you upgrade to the versions
  published on the [Testnet network parameters page](./README.md).

:::caution

ParaTime binaries for the Cipher ParaTime will be published at a later time due
to the additional offline signing step. If you are running _multiple_ ParaTimes
on the same node, you should _disable_ the Cipher ParaTime until the new version
is published.

:::

* If you are running a Rosetta gateway, upgrade it to version [2.2.0].

[Handling Network Upgrades]: ../run-your-node/maintenance/handling-network-upgrades.md

### Before Upgrade

This upgrade will upgrade **Oasis Core** to **version [22.1]** which **no longer
allows running Oasis Node** (i.e. the `oasis-node` binary) **as root**
(effective user ID of 0).

Running network accessible services as the root user is extremely bad for
system security as a general rule. While it would be "ok" if we could drop
privileges, `syscall.AllThreadsSyscall` does not work if the binary uses `cgo`
at all.

Nothing in Oasis Node will ever require elevated privileges.
Attempting to run the `oasis-node` process as the root user will now terminate
immediately on startup.

While there may be specific circumstances where it is safe to run network
services with the effective user ID set to 0, the overwhelming majority of cases
where this is done is a misconfiguration.

If the previous behavior is required, the binary must be run in unsafe/debug
mode (via the intentionally undocumented flag), and `debug.allow_root` must also
be set.

[22.1]: https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1
[2.2.0]: https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.2.0

## 2022-03-03 Upgrade

* **Upgrade height:** upgrade is scheduled to happen at epoch **14209.**

:::info

We expect the Testnet network to reach this epoch at around 2022-03-03 12:45 UTC.

:::

### Instructions

* (optional) Vote for the upgrade. On 2022-03-02, an upgrade proposal will be proposed which (if accepted) will schedule the upgrade on epoch **14209.** See the [Governance documentation](../../general/manage-tokens/cli/network.md#governance-cast-vote) for details on voting for proposals.

:::caution

The upgrade proposal contains a non-existing upgrade handler and will be used to
coordinate the network shutdown, the rest of the upgrade is manual.

:::

The following steps should be performed only after the network has reached the
upgrade network and has halted:

* Download the Testnet genesis file published in the [Testnet 2022-03-03 release](https://github.com/oasisprotocol/testnet-artifacts/releases/tag/2022-03-03).

:::info

Testnet state at epoch **14209** will be exported and migrated to a 22.0
compatible genesis file. The new genesis file will be published on the above
link soon after reaching the upgrade epoch.

:::

* Replace the old genesis file with the new Testnet genesis file.
  The [state changes](#state-changes) are described and explained below.
* Replace the old version of Oasis Node with version [22.0](https://github.com/oasisprotocol/oasis-core/releases/tag/v22.0).
* [Wipe state](../run-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Perform any needed [configuration changes](#configuration-changes) described below.
* Start your node.

### Configuration Changes

:::info

To see the full extent of the changes examine the [Change Log](https://github.com/oasisprotocol/oasis-core/blob/v22.0/CHANGELOG.md#220-2022-03-01) of the 22.0 release.

:::

If your node is currently configured to run a ParaTime, you need to perform some
additional steps.

The way ParaTime binaries are distributed has changed so that all required
artifacts are contained in a single archive called the Oasis Runtime Container
and have the `.orc` extension. Links to updated ParaTime binaries will be
published on the [Testnet network parameters page](./README.md) for their respective
ParaTimes.

The configuration is simplified as the `runtime.paths` now only needs to list
all of the supported `.orc` files (see below for an example).

Instead of separately configuring various roles for a node, there is now a
single configuration flag called `runtime.mode` which enables the correct roles
as needed. It should be set to one of the following values:

  - `none` (runtime support is disabled, only consensus layer is enabled)
  - `compute` (node is participating as a runtime compute node for all the
    configured runtimes)
  - `keymanager` (node is participating as a keymanager node)
  - `client` (node is a stateful runtime client)
  - `client-stateless` (node is a stateless runtime client and connects to
    remote nodes for any state queries)

Nodes that have so far been participating as compute nodes should set the mode
to `compute` and nodes that have been participating as clients for querying
and transaction submission should set it to `client`.

The following configuration flags have been removed:

- `runtime.supported` (existing `runtime.paths` is used instead)
- `worker.p2p.enabled` (now automatically set based on runtime mode)
- `worker.compute.enabled` (now set based on runtime mode)
- `worker.keymanager.enabled` (now set based on runtime mode)
- `worker.storage.enabled` (no longer needed)

Also the `worker.client` option is no longer needed unless you are providing
consensus layer RPC services.

For example if your _previous_ configuration looked like:

```yaml
runtime:
  supported:
    - "000000000000000000000000000000000000000000000000000000000000beef"

  paths:
    "000000000000000000000000000000000000000000000000000000000000beef": /path/to/runtime

worker:
  # ... other settings omitted ...

  storage:
    enabled: true

  compute:
    enabled: true

  client:
    port: 12345
    addresses:
      - "xx.yy.zz.vv:12345"

  p2p:
    enabled: true
    port: 12346
    addresses:
      - "xx.yy.zz.vv:12346"
```

The _new_ configuration should look like:

```yaml
runtime:
  mode: compute
  paths:
    - /path/to/runtime.orc

worker:
  # ... other settings omitted ...

  p2p:
    port: 12346
    addresses:
      - "xx.yy.zz.vv:12346"
```

### State Changes

The following parts of the genesis document will be updated:

:::info

For a more detailed explanation of the parameters below, see the [Genesis Document] docs.

:::

### **General**

* **`height`** will be set to the height of the Testnet state dump + 1, i.e. `8535081`.
* **`genesis_time`** will be set to `2022-03-03T13:00:00Z`.
* **`chain_id`** will be set to `testnet-2022-03-03`.
* **`halt_epoch`** will be set to `24210` (more than 1 year from the upgrade).

### **Registry**

* **`registry.runtimes`** list contains the registered runtimes' descriptors. In
  this upgrade, all runtime descriptors will be migrated from version `2` to
  version `3`.
  The migration will be done automatically with the `oasis-node debug fix-genesis`
  command.
* **`registry.suspended_runtimes`** list contains the suspended registered
  runtimes' descriptors. In this upgrade, all runtime descriptors will be
  migrated from version `2` to version `3`.
  The migration will be done automatically with the `oasis-node debug fix-genesis`
  command.
* Inactive registered entities in **`registry.entities`** (and their
  corresponding nodes in **`registry.nodes`**) that don't pass the
  [minimum staking thresholds] will be removed.
  The removal will be done automatically with the `oasis-node debug fix-genesis`
  command.

### **Root Hash**

* **`roothash.params.gas_costs.submit_msg`** is a new parameter that specifies
  the cost for an submit message transaction. It will be set to `1000`.
  This will be done automatically with the `oasis-node debug fix-genesis` command.
* **`roothash.params.max_in_runtime_messages`** is a new parameter that that
  specifies the maximum number of incoming messages that can be queued for
  processing by a runtime. It will be set to `128`.

  This will be done automatically with the `oasis-node debug fix-genesis` command.
* **`roothash.runtime_state`** contains the state roots of the runtimes.
  Empty fields will be omitted.
  This will be done automatically with the `oasis-node debug fix-genesis` command.

### **Staking**

* **`staking.params.thresholds`** specifies the minimum number of tokens that
  need to be staked in order for a particular entity or a particular type of node
  to participate in the network.
  The `node-storage` key is removed since Oasis Core 22.0+ removes separate
  storage nodes (for more details, see: [#4308](https://github.com/oasisprotocol/oasis-core/pull/4308)).
  This will be done automatically with the `oasis-node debug fix-genesis` command.
* **`staking.params.min_transfer`** specifies the minimum number of tokens one
  can transfer.
  The value is set to 10,000,000 base units, or 0.01 TEST tokens.
  This will be done automatically with the `oasis-node debug fix-genesis` command.
* **`staking.params.min_transact_balance`** specifies the minimum general balance
  an account must have to be able to perform transactions on the network.
  The value is set to 0 base units meaning this requirement is currently not
  enforced.
  This will be done automatically with the `oasis-node debug fix-genesis` command.
* **`staking.params.reward_schedule`** specifies the staking reward schedule
  as an array with elements of the form:
  ```
  {
    "until": 14226,
    "scale": "1229"
  }
  ```
  For example, this element specifies that the staking reward is 0.001229% per
  epoch until epoch `14226`.
  It will be set to the same schedule that is currently on used on the Mainnet.

### **Random Beacon**

The **`beacon`** object contains parameters controlling the new
[improved VRF-based random beacon][ADR 0010] introduced in the Damask upgrade.

* **`beacon.base`** is the network's starting epoch. It will be set to the 
`14209`.

* **`beacon.params.backend`** configures the random beacon backend to use. It
will be set to `"vrf"` indicating that the beacon implementing a
[VRF-based random beacon][ADR 0010] should be used.

* **`beacon.params.vrf_parameters.alpha_hq_threshold`** is minimal number of
  nodes that need to contribute a VRF proof for the beacon's output to be valid.
  It will be set to `3`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`beacon.params.vrf_parameters.interval`** is the duration of an epoch.
  It will be set to `600`.

  This will be done automatically with the `oasis-node debug fix-genesis`
  command.

* **`beacon.params.vrf_parameters.proof_delay`** is number of blocks since the
  beginning of an epoch after a node can still submit its VRF proof.
  It will be set to `300`.

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

[ADR 0010]: ../../adrs/0010-vrf-elections
[pvss-beacon]: ../../adrs/0007-improved-random-beacon.md

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

[Genesis Document]: ../genesis-doc.md#parameters
[minimum staking thresholds]: ../genesis-doc.md#node-and-paratime-token-thresholds

## 2021-08-11 Upgrade

* **Upgrade height:** upgrade is scheduled to happen at epoch **8844.**

:::info

We expect the Testnet network to reach this epoch at around 2021-08-11 08:50 UTC.

:::

### Proposed Parameter Changes

The [Oasis Core 21.2.8](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.2.8) release contains the [`consensus-params-update-2021-08` upgrade handler](https://github.com/oasisprotocol/oasis-core/blob/v21.2.8/go/upgrade/migrations/consensus_parameters.go) which will update the following parameters in the consensus layer:

* **`staking.params.max_allowances` ** specifies the maximum number of allowances on account can store. It will be set to `16` (default value is `0`) to enable support for beneficiary allowances which are required to transfer tokens into a ParaTime. _Note that this has already been the case on Testnet since the_ [_2021-06-23 upgrade_](upgrade-log.md#2021-06-23-upgrade)_._
* **`staking.params.gas_costs` ** , **`governance.params.gas_costs`** and **`roothash.params.gas_costs`** specify gas costs for various types of staking, governance and roothash transactions. Gas costs for transactions that were missing gas costs will be added.
* **`scheduler.params.max_validators`** is the maximum size of the consensus committee (i.e. the validator set). It will be increased to`110` (it was set to `100` previously).

### Instructions - Before Upgrade System Preparation

* This upgrade will upgrade **Oasis Core** to version **21.2.8** which:
  * Has a check that makes sure the **file descriptor limit** is set to an appropriately high value (at least 50000). While previous versions only warned in case the limit was set too low, this version will refuse to start. Follow the [File Descriptor Limit](../run-your-node/prerequisites/system-configuration.mdx#file-descriptor-limit) documentation page for details on how to increase the limit on your system.
* Stop your node, replace the old version of Oasis Node with version [21.2.8](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.2.8) and restart your node.

:::tip

Since Oasis Core 21.2.8 is otherwise compatible with the current consensus layer protocol, you may upgrade your Testnet node to this version at any time.

:::

:::caution This is not dump & restore upgrade

For this upgrade, **do NOT wipe state**.

:::

* Once reaching the designated upgrade epoch, your node will stop and needs to be upgraded to Oasis Core [21.2.8](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.2.8).
  * If you upgraded your node to Oasis Core 21.2.8 before the upgrade epoch was reached, you only need to restart your node for the upgrade to proceed.
  * Otherwise, you need to upgrade your node to Oasis Core 21.2.8 first and then restart it.

:::tip

If you use a process manager like [systemd](https://github.com/systemd/systemd) or [Supervisor](http://supervisord.org), you can configure it to restart the Oasis Node automatically.

:::

:::info

The Testnet's genesis file and the genesis document's hash will remain the same.

:::

## 2021-06-23 Upgrade

* **Upgrade height:** upgrade is scheduled to happen at epoch **7553.**

:::info

We expect the Testnet network to reach this epoch at around 2021-06-23 14:30 UTC.

:::

### Instructions

* See [Before upgrade](upgrade-log.md#before-upgrade) section for required steps to be done before upgrade.
* (optional) Vote for the upgrade. On 2021-06-21, an upgrade proposal will be proposed which (if accepted) will schedule the upgrade on epoch **7553.** See the [Governance documentation](../../general/manage-tokens/cli/network.md#governance-cast-vote) for details on voting for proposals.

:::info

The upgrade proposal contains the `"consensus-max-allowances-16"` upgrade handler whose only purpose is to set the**`staking.params.min_delegation`** consensus parameter to 16 (default value is 0) to enable support for beneficiary allowances which are required to transfer tokens into a ParaTime.

:::

* Stop your node, replace the old version of Oasis Node with version [21.2.4](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.2.4) and restart your node.

:::tip

Since Oasis Core 21.2.4 is otherwise compatible with the current consensus layer protocol, you may upgrade your Testnet node to this version at any time.

:::

:::caution This is not dump & restore upgrade

For this upgrade, **do NOT wipe state**.

:::

* Once reaching the designated upgrade epoch, your node will stop and needs to be upgraded to Oasis Core [21.2.4](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.2.4).
  * If you upgraded your node to Oasis Core 21.2.4 before the upgrade epoch was reached, you only need to restart your node for the upgrade to proceed.
  * Otherwise, you need to upgrade your node to Oasis Core 21.2.4 first and then restart it.

:::tip

If you use a process manager like [systemd](https://github.com/systemd/systemd) or [Supervisor](http://supervisord.org), you can configure it to restart the Oasis Node automatically.

:::

:::info

The Testnet's genesis file and the genesis document's hash will remain the same.

:::

### Before upgrade

This upgrade will upgrade Oasis Core to version **21.2.x** which includes the new [**BadgerDB**](https://github.com/dgraph-io/badger) **v3**.

Since BadgerDB's on-disk format changed in v3, it requires on-disk state migration. The migration process is done automatically and makes the following steps:

* Upon startup, Oasis Node will start migrating all `<DATA-DIR>/**/*.badger.db` files (Badger v2 files) and start writing Badger v3 DB to files with the `.migrate` suffix.
*   If the migration fails in the middle, Oasis Node will delete all `<DATA-DIR>/**/*.badger.db.migrate` files the next time it starts and start the migration (of the remaining `<DATA-DIR>/**/*.badger.db`

    files) again.
* If the migration succeeds, Oasis Node will append the `.backup` suffix to all `<DATA-DIR>/**/*.badger.db` files (Badger v2 files) and remove the `.migrate` suffix from all `<DATA-DIR>/**/*.badger.db.migrate` files (Badger v3 files).

#### Extra storage requirements

Your node will thus need to have extra storage space to store both the old and the new BadgerDB files.

To see estimate how much extra space the migration will need, use the `du` tool:

```
shopt -s globstar
du -h <DATA-DIR>/**/*.badger.db | sort -h -r
```

This is an example output from a Testnet node that uses `/srv/oasis/node` as the `<DATA-DIR>`:

```
6.3G	/srv/oasis/node/tendermint/data/blockstore.badger.db
2.7G	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db
1.4G	/srv/oasis/node/tendermint/data/state.badger.db
158M	/srv/oasis/node/persistent-store.badger.db
164K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints
80K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4424334
80K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4423334
76K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4424334/fc815694d8219acb97fc0207a2159601df76df4d96802c147252ad0f2fd8a3f3
76K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4423334/613e734e4ee4999bf71c3a190df13ea9d9b7d65af6a7fd8b2c9a477f2d052313
68K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4424334/fc815694d8219acb97fc0207a2159601df76df4d96802c147252ad0f2fd8a3f3/chunks
68K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4423334/613e734e4ee4999bf71c3a190df13ea9d9b7d65af6a7fd8b2c9a477f2d052313/chunks
20K	/srv/oasis/node/tendermint/data/evidence.badger.db
```

:::info

After you've confirmed your node is up and running, you can safely delete all the  `<DATA-DIR>/**/*.badger.db.backup` files.

:::

#### Extra memory requirements

BadgerDB v2 to v3 migration can use a number of Go routines to migrate different database files in parallel.

However, this comes with a memory cost. For larger database files, it might need up to 4 GB of RAM per database, so we recommend lowering the number of Go routines BadgerDB uses during migration (`badger.migrate.num_go_routines`) if your node has less than 8 GB of RAM.

If your node has less than 8 GB of RAM, set the number of Go routines BadgerDB uses during migration to 2 (default is 8) by adding the following to your node's `config.yml`:

```
# BadgerDB configuration.
badger:
  migrate:
    # Set the number of Go routines BadgerDB uses during migration to 2 to lower
    # the memory pressure during migration (at the expense of a longer migration
    # time).
    num_go_routines: 2
```

## 2021-04-13 Upgrade

* **Upgrade height:** upgrade is scheduled to happen at epoch **5662.**

:::info

We expect the Testnet network to reach this epoch at around 2021-04-13 12:00 UTC.

:::

### Instructions

* Runtime operators see [Before upgrade](upgrade-log.md#before-upgrade) section for required steps to be done before upgrade.
* (optional) Vote for the upgrade. On 2021-04-12 an upgrade proposal will be proposed which (if accepted) will schedule a network shutdown on epoch **5662.** See the [Governance documentation](../../general/manage-tokens/cli/network.md#governance-cast-vote) for details on voting for proposals.

:::caution

The upgrade proposal contains a non-existing upgrade handler and will be used to coordinate the network shutdown, the rest of the upgrade is manual.

:::

Following steps should be performed only after the network has reached the upgrade network and has halted:

* Download the Testnet genesis file published in the [Testnet 2021-04-13 release](https://github.com/oasisprotocol/testnet-artifacts/releases/tag/2021-04-13).

:::info

Testnet state at epoch **5662** will be exported and migrated to a 21.1.x compatible genesis file. Upgrade genesis file will be published on the above link soon after reaching the upgrade epoch.

:::

* Replace the old genesis file with the new Testnet genesis file.
* Replace the old version of Oasis Node with version [21.1](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.1).
* [Wipe state](../run-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Start your node.

### Before upgrade

**Runtime operators**

This upgrade requires a runtime storage node migration to be performed **before the upgrade genesis is published**. This can be done before the upgrade epoch is reached by stopping all runtime nodes and running the migration.

:::danger

**Backup your node's data directory**

To prevent irrecoverable runtime storage data corruption/loss in case of a failed storage migration, backup your node's data directory.

For example, to backup the `/serverdir/node` directory using the rsync tool, run:

```
rsync -a /serverdir/node/ /serverdir/node-BACKUP/
```

:::

The storage database on all storage nodes needs to be migrated with the following command (using the [21.1](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.1) binary):

```
oasis-node storage migrate \
  --datadir <NODE-DATADIR> \
  --runtime.supported <RUNTIME-ID>
```

After the migration to v5 completes, you will see an output similar to:

```
...
- migrating from v4 to v5...
- migrating version 24468...
- migrated root state-root:195cf7a9a103e7300b2bb4e537cb9935cbebd83e448e67aa55433861a6ad7426 -> state-root:cea105a5d701deab935b94af9e8e0c5af5dcdb61c242bf434da9f11aa8d110ba
- migrated root io-root:0850c5a33ee7f45aa92724b7d5f28c9ac9ae8799b88cc5be9773e8aba9526ca7 -> io-root:19713a2b44e1bf868ebee43c36872baa3058870bb890a5e25d1c4cea2622be77
- migrated root io-root:477391131f60ac2c22bce9167c7e3783a13d4fb81fddd2d388b4ead6a586fe52 -> io-root:f29f86d491303c5fd7b3572e97cbd65b7487b6b4ac519623afd161cc2e4678b7
```

Take note of the displayed `state-root` and report it to the Foundation, as it needs to be included in the upgrade's new genesis file. Keep the runtime nodes stopped until the upgrade epoch is reached. At upgrade epoch, upgrade the nodes by following the remaining steps above.

## 2021-03-24 Upgrade

* **Upgrade height:** upgrade is scheduled to happen at epoch **5128.**

:::info

We expect the Testnet network to reach this epoch at around 2021-03-24 11:30 UTC.

:::

### Instructions

*   (optional) To ensure your node will stop at epoch **5128** [submit the following upgrade descriptor](../run-your-node/maintenance/handling-network-upgrades.md#stop-the-node-at-specific-epoch) at any time before the upgrade:

    ```
    {
      "name": "testnet-upgrade-2021-03-24",
      "method": "internal",
      "identifier": "testnet-upgrade-2021-03-24",
      "epoch": 5128
    }
    ```
* Download the Testnet genesis file published in the [Testnet 2021-03-24 release](https://github.com/oasisprotocol/testnet-artifacts/releases/tag/2021-03-24).

:::info

Testnet state at epoch **5128** will be exported and migrated to a 21.0.x compatible genesis file. Upgrade genesis file will be published on the above link soon after reaching the upgrade epoch.

:::

* (optional) Verify the provided Testnet genesis file by comparing it to network state dump. See instructions in the [Handling Network Upgrades](../run-your-node/maintenance/handling-network-upgrades.md#download-and-verify-the-provided-genesis-file) guide.
* Replace the old genesis file with the new Testnet genesis file.
* Stop your node (if you haven't stopped it already by submitting the upgrade descriptor).
* Replace the old version of Oasis Node with version [21.0.1](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.0.1).
* Update your node's configuration or perform any additional needed steps as per [Additional Steps](./README.md#additional-steps) below.
* [Wipe state](../run-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Start your node.

:::info

For more detailed instructions, see the [Handling Network Upgrades](../run-your-node/maintenance/handling-network-upgrades.md) guide.

:::

### Additional steps

Examine the [Changelog](https://github.com/oasisprotocol/oasis-core/blob/v21.0.1/CHANGELOG.md#210-2021-03-18) of the 21.0 release.

**Runtime operators**

In addition to some [configuration changes](https://github.com/oasisprotocol/oasis-core/blob/v21.0.1/CHANGELOG.md#configuration-changes), this upgrade contains breaking runtime API changes. Make sure any runtime code is updated and compatible with the 21.0.x runtime API version.

:::danger

**Backup your node's data directory**

To prevent irrecoverable runtime storage data corruption/loss in case of a failed storage migration, backup your node's data directory.

For example, to backup the `/serverdir/node` directory using the rsync tool, run:

```
rsync -a /serverdir/node/ /serverdir/node-BACKUP/
```

:::

For this upgrade, the runtime node operators need to perform an additional migration of the storage nodes. **Before starting the upgraded node and before wiping state**, the storage database on all storage nodes needs to be migrated with the following command (using the 21.0.1 binary):

```
oasis-node storage migrate \
  --datadir <NODE-DATADIR> \
  --runtime.supported <RUNTIME-ID>
```

:::caution

**Storage access policy changes**

Due to the changes in the default access policy on storage nodes, at least one of the storage nodes should be configured with the `worker.storage.public_rpc.enabled` flag set to `true`.

Otherwise, external runtime clients wont be able to connect to any storage nodes.

:::
