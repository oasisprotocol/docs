# Eden Upgrade

:::info

This document is a work in progress and details around when the upgrade will be
proposed are still not known and will be determined later.

The upgrade first happened on Testnet and will only be proposed for Mainnet
after sufficient testing has been done to ensure everything will progress as
planned.

:::

This document provides an overview of the changes for the Eden Mainnet
upgrade.

:::caution

The Eden upgrade on Mainnet is scheduled at epoch TBD which will happen
around TBD.

:::

## Major Features

All features for the Eden upgrade are implemented as part of
**Oasis Core 23.0.x** release series which is a consensus protocol-breaking
release.

Summary of the major features is as follows:

- **On-Chain Governance**:
  - The upgrade adds support for delegators to participate in on-chain
    governance. So far, only validators have been able to vote on governance
    proposals on upgrades. From now on, anyone who is staking will be able to
    override the votes of the validator.
  - Prior to this upgrade, validators could vote solely on one specific type of
    upgrade proposal. This upgrade adds support for voting on parameter changes.
    An example of such a change includes voting on the staking rewards schedule
    modifications.

- **Node Operators UX**:
  - With the enhancement of the P2P Stack in the latest upgrade, we've
    integrated support for state sync. This improvement simplifies the process
    of initiating a new node, enabling immediate synchronization without the
    need for manual RPC node configuration.
  - The upgrade lays the foundation for the system to distribute bundles
    automatically. While this update doesn't enable this feature, in the future
    nodes will have the capability to upgrade automatically to the appropriate
    version immediately after a governance vote passes.
  - Enhancements have been made to bolster security and optimize the efficiency
    of specific queries.

- **Key Rotations**:
  - The upgrade introduces major updates to facilitate key rotations, both for
    ephemeral and state keys.
    - Key derivation for ephemeral keys will be modified such that the master
      ephemeral key will be rotated on every epoch and old entropy will be
      discarded after a few epochs. As a result, past transaction keys will be
      irretrievable unless the user keeps additional data to enable disclosure
      of past transactions.
    - The upgrade introduces support for state key rotations, incorporating key
      generations. ParaTimes can now rotate state keys daily, and use new keys
      for newer state. This facilitates re-encryption and, in the event of a TCB
      recovery, helps to partially mitigate the effects of compromised nodes.

- **ParaTime Confidential Query Latency**:
  - The current confidential ParaTimes have a block delay when querying
    confidential state following transaction execution. This is due to the fact
    that the ParaTime needs to independently verify finalization in the
    consensus layer to guard against attacks. The upcoming version introduces
    same-block execution. As soon as a block gets finalized on the consensus
    layer, ParaTimes can promptly obtain the latest state root hash and verify
    the state without delay. This reduces latency for those looking to query
    outcomes of their transactions, e.g. dApp users and developers.

- **ParaTime Upgrades**:
  - The upgrade reduces downtime associated with upgrading confidential
    ParaTimes. Previously, an upgrade to Sapphire mandated an epoch of downtime.
    Now, as compute nodes transition to the new version, the upgrade will be
    instantaneous, ensuring no delays or downtime.

- **ParaTime Performance**:
  - The upgrade implements a series of modifications to enhance the robustness
    of runtimes. These improvements encompass better response mechanisms for SGX
    TCB recovery events, expanded support for new SGX platforms, and improved
    proof validation within runtimes.
  - The upgrade improves runtime performance, especially in scenarios involving
    node failures. Should nodes malfunction, the impact on performance will now
    be significantly reduced.

## Mechanics of the Upgrade

:::info

This section will be updated with the exact details as we get closer to the
upgrade. For now, please take a look at the related [Testnet upgrade].

:::

[Testnet upgrade]: ../testnet/upgrade-log.md

### Voting

On TBD, an upgrade proposal will be proposed which (if accepted) will schedule
the upgrade on epoch **TBD**.

For optimal voting experience, we recommend using the [Oasis CLI].
Follow these steps to cast your vote:
1. [Import your keys into the wallet]
2. [Cast your vote]

### Upgrade Instructions

The following steps should be performed only after the network has reached the
upgrade epoch and has halted:

1. Wait for the network to reach the upgrade epoch and halt. The node
    will automatically stop without any action required on your part. After the
    network has halted, proceed to the next steps.

2. Download the Mainnet genesis file published in the
   [Mainnet TBD release].

:::info

Mainnet state at epoch **TBD** will be exported and migrated to a 23.0.x
compatible genesis file.

The new genesis file will be published on the above link soon after reaching the
upgrade epoch.

:::

3. Verify the provided Mainnet upgrade genesis file by comparing it to the
   local network state dump.

   Find the `genesis-mainnet-TBD.json` file in the `exports` subdirectory in
   your data dir (e.g. `/node/`, `/srv/oasis/node/`)  and run `sha256sum` on it.
   Afterwards, compare it with the hash that we will share on the
   `#node-operators` Discord channel.

   The state changes are described in the [State Changes](#state-changes)
   section below.

4. Replace the old genesis file with the new Mainnet genesis file.

5. Ensure your node will remain stopped by disabling auto-starting via your
   process manager (e.g., [systemd] or [Supervisor]).

6. Back up the entire data directory of your node. Verify that the backup
includes the following folders:
- for consensus: `tendermint/abci-state` and `tendermint/data`
- for runtimes: `runtimes/*/mkvs_storage.badger.db` and
`runtimes/*/worker-local-storage.badger.db`

7. [Wipe state]. This must be performed _before_ replacing the Oasis Node
   binary. In case you are upgrading ParaTimes/runtimes ensure you read the
   following section:

:::danger

State of ParaTimes/runtimes is not affected by this upgrade and MUST NOT be
wiped. Wiping state for confidential ParaTimes will prevent your compute or
key manager node from transitioning to the new network.

To safely wipe the blockchain state on a runtime while preserving the runtime
state, follow these steps:
1. **Dry run:** initiate a dry run to preview which files will be deleted by
running the following command:
``` bash
# specify 'datadir' as your node's data directory
oasis-node unsafe-reset \
  --datadir=/serverdir/node \
  --dry_run
```
2. **Wipe blockchain state:** after reviewing the dry run results, proceed with
the reset by running:
``` bash
# specify 'datadir' as your node's data directory
oasis-node unsafe-reset \
  --datadir=/serverdir/node
```

Transitioning confidential ParaTimes to the new network requires local state
that is sealed to the CPU. This also means that bootstrapping a new node on a
separate CPU immediately after the network upgrade will not be possible until
an updated ParaTime containing new trust roots is released and adopted.

:::

8. Replace the old version of Oasis Node with version [23.0.3].

:::info

The Oasis Core 23.0.3 binary in our published releases is built only for Ubuntu
22.04 (GLIBC>=2.32). You'll have to build it yourself if you're using prior
Ubuntu versions (or other distributions using older system libraries).

:::

9. Perform any needed [configuration changes](#configuration-changes) described
   below.

10. (only Rosetta Gateway operators) Replace old version of Oasis Rosetta
    Gateway with version [2.6.0][rosetta-gw-2.6.0].

11. Start your node and re-enable auto-starting via your process manager.

[Oasis CLI]: ../../general/manage-tokens/cli/
[Import your keys into the wallet]: ../../general/manage-tokens/cli/wallet.md#import-file
[Cast your vote]: ../../general/manage-tokens/cli/network.md#governance-cast-vote
[Mainnet TBD release]: https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/TBD
[systemd]: https://systemd.io/
[Supervisor]: http://supervisord.org/
[Wipe state]: ../run-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity
[23.0.3]: https://github.com/oasisprotocol/oasis-core/releases/tag/v23.0.3
[rosetta-gw-2.6.0]:
  https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.6.0

### Configuration Changes

:::info

To see the full extent of the changes examine the [Change Log] of the 23.0.3
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

:::tip

The configuration format for seed nodes has changed and it now requires the
node's P2P public key to be used. In case your old configuration file contains
known Mainnet seed nodes, this transformation is performed automatically.

However, if it contains unknown seed nodes then the conversion did not happen
automatically and you may need to obtain the seed node's P2P public key. For
Mainnet you can use the following addresses:

* `TBD`
* `TBD`

Please be aware that every seed node should be configured to listen on two
distinct ports. One is dedicated to peer discovery within the CometBFT P2P
network, while the other is used to bootstrap the Oasis P2P network.

:::

[Change Log]:
  https://github.com/oasisprotocol/oasis-core/blob/v23.0.3/CHANGELOG.md

### Data Directory Changes

The subdirectory (located inside the node's data directory) used to store
consensus-related data, previously called `tendermint` (after the consensus
layer protocol backend) has been renamed to `consensus` in Oasis Core 23.0.3. If
any of your scripts rely on specific directory names, please make sure to update
them to reflect the changed sdirectory name.

### State Changes

The following parts of the genesis document will be updated:

:::info

For a more detailed explanation of the parameters below, see the
[Genesis Document] docs.

:::

:::info

All state changes will be done automatically with the migration command provided
by the new version of `oasis-node`. It can be used as follows to derive the same
genesis file from an existing state dump at the correct height (assuming there
is a `genesis.json` present in the current working directory):

```
oasis-node genesis migrate --genesis.new_chain_id oasis-4
```

:::

#### General

* **`chain_id`** will be set to `oasis-4`.

* **`halt_epoch`** will be removed as it is no longer used.

#### Registry

* **`registry.runtimes[].txn_scheduler.propose_batch_timeout`** specifies how
  long to wait before accepting proposal from the next backup scheduler. It will
  be set to `5000000000` (5 seconds). Previously the value was represented in
  the number of consensus layer blocks.

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

#### Root Hash

* **`roothash.params.max_past_roots_stored`** specifies the maximum number of
  past runtime state roots that are stored in consensus state for each runtime.
  It will be set to `1200`.

#### Staking

* **`staking.params.commission_schedule_rules.min_commission_rate`** specifies
  the minimum commission rate. It will be set to `0` to maintain the existing
  behavior.

* **`staking.params.thresholds.node-observer`** specifies the stake threshold
  for registering an observer node. It will be set to `100000000000` base units
  (or `100` tokens), same as for existing compute nodes.

#### Key Manager

* **`keymanager.params.gas_costs`** specify the cost of key manager
  transactions. These will be set to the following values:

  ```json
  "gas_costs": {
    "publish_ephemeral_secret": 1000,
    "publish_master_secret": 1000,
    "update_policy": 1000
  }
  ```

#### Random Beacon

* **`beacon.base`** is the network's starting epoch. It will be set to the epoch
  of Mainnet's state dump + 1, `TBD`.

#### Governance

* **`governance.params.enable_change_parameters_proposal`** specifies whether
  parameter change governance proposals are allowed. It will be set to `true`.

#### Consensus

* **`consensus.params.max_block_size`** specifies the maximum block size in the
  consensus layer. It will be set to `1048576` (1 MiB).

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
