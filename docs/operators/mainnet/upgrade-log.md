# Upgrade Log

For each upgrade of the Oasis Network, we are tracking important changes for
node operators' deployments.

They are enumerated and explained in this document.

## 2022-04-11 (8:30 UTC) - Damask Upgrade {#damask-upgrade}

* **Upgrade height:** upgrade is scheduled to happen at epoch **13402**.

:::info

We expect the Mainnet network to reach this epoch at around 2022-04-11 8:30
UTC.

:::

### Instructions - Voting

:::caution

**Voting for the upgrade proposal will end at epoch 13152. We expect the Mainnet
network to reach this epoch at around 2022-03-31 21:00 UTC**.

:::

:::info

At this time only entities which have active validator nodes scheduled in the
validator set are eligible to vote for governance proposals.

:::

:::danger

At least **75%** of the total **voting power** of the validator set needs to
cast a vote on the upgrade proposal for the result to be valid.

At least **90%** of the vote needs to be **yes** votes for a proposal to be
accepted.

:::

The Oasis Protocol Foundation has submitted an [upgrade governance proposal]
with the following contents:

```yaml
{
   "v": 1,
    "handler": "mainnet-upgrade-2022-04-11",
    "target": {
        "consensus_protocol": {
            "major": 5
        },
        "runtime_host_protocol": {
            "major": 5
        },
        "runtime_committee_protocol": {
            "major": 4
        }
    },
    "epoch": 13402
}
```

To view the proposal yourself, you can run the following command on your online
Oasis Node:

```bash
oasis-node governance list_proposals -a $ADDR
```

where `$ADDR` represents the path to the internal Oasis Node UNIX socket
prefixed with `unix:` (e.g.`unix:/serverdir/node/internal.sock`).

The output should look like:

```yaml
[
  {
    "id": 2,
    "submitter": "oasis1qpydpeyjrneq20kh2jz2809lew6d9p64yymutlee",
    "state": "active",
    "deposit": "10000000000000",
    "content": {
      "upgrade": {
        "v": 1,
        "handler": "mainnet-upgrade-2022-04-11",
        "target": {
          "consensus_protocol": {
            "major": 5
          },
          "runtime_host_protocol": {
            "major": 5
          },
          "runtime_committee_protocol": {
            "major": 4
          }
        },
        "epoch": 13402
      }
    },
    "created_at": 12984,
    "closes_at": 13152
  }
]
```

Obtain [your entity's nonce] and store it in the `NONCE` variable. You can do
that by running:

```yaml
ENTITY_DIR=<PATH-TO-YOUR-ENTITY>
ADDRESS=$(oasis-node stake pubkey2address --public_key \
  $(cat $ENTITY_DIR/entity.json | jq .id -r))
NONCE=$(oasis-node stake account nonce --stake.account.address $ADDRESS -a $ADDR)
```

where `<PATH-TO-YOUR-ENTITY>` is the path to your entity's descriptor, e.g.
`/serverdir/node/entity/`.

To vote for the proposal, use the following command to generate a suitable
transaction:

```bash
oasis-node governance gen_cast_vote \
  "${TX_FLAGS[@]}" \
  --vote.proposal.id 2 \
  --vote yes \
  --transaction.file tx_cast_vote.json \
  --transaction.nonce $NONCE \
  --transaction.fee.gas 2000 \
  --transaction.fee.amount 2000
```

where `TX_FLAGS` refer to previously set base and signer flags as described in
the [Oasis CLI Tools Setup] doc.

:::caution

If you use a Ledger-signer backed entity, you will need to install version 2.3.2
of the Oasis App as described in [Installing Oasis App on Your Ledger Wallet].

Note that the previous version of the Oasis App available through Ledger Live,
version 1.8.2, doesn't support signing the `governance.CastVote` transaction
type.

:::

To submit the generated transaction, copy `tx_cast_vote.json` to the online
Oasis node and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_cast_vote.json
```

[upgrade governance proposal]: ../../core/consensus/services/governance.md#submit-proposal
[your entity's nonce]: ../../general/manage-tokens/advanced/oasis-cli-tools/get-account-nonce.md#get-your-entitys-nonce
[Oasis CLI Tools Setup]: ../../general/manage-tokens/advanced/oasis-cli-tools/setup.md#storing-base-and-signer-flags-in-an-environment-variable
[Installing Oasis App on Your Ledger Wallet]:
  ../../oasis-core-ledger/usage/setup#installing-oasis-app-on-your-ledger-wallet

### Instructions - Before upgrade

This upgrade will upgrade **Oasis Core** to the **22.1.x release series** which
**no longer allow running Oasis Node** (i.e. the `oasis-node` binary)
**as root** (effective user ID of 0).

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

Please, follow our [Changing Your Setup to Run Oasis Services with Non-root
System User][change-to-non-root] guide for steps-by-step instructions on how
to update your system.

If the previous behavior is required, the binary must be run in unsafe/debug
mode (via the intentionally undocumented flag), and `debug.allow_root` must also
be set.

[change-to-non-root]: ../set-up-your-node/prerequisites/system-configuration.mdx#change-to-non-root

### Instructions - Upgrade day

Following steps should be performed on **2022-04-11** only after the network has
reached the upgrade epoch and has halted:

1. Download the genesis file published in the [Damask upgrade release].

:::info

Mainnet state at epoch **13402** will be exported and migrated to a 22.1.x
compatible genesis file.

Upgrade genesis file will be published on the above link soon after reaching the
upgrade epoch.

:::

2. Verify the provided Damask upgrade genesis file by comparing it to network
   state dump.

   The state changes are described in the [Damask Upgrade] document.

   See instructions in the [Handling Network Upgrades] guide.

3. Replace the old genesis file with the new Damask upgrade genesis file.

4. Ensure your node will remain stopped by disabling auto-starting via your
   process manager (e.g., [systemd] or [Supervisor])

5. Replace the old version of Oasis Node with version [22.1.3].

6. [Wipe state].

:::caution

State of ParaTimes/runtimes is not affected by this upgrade and should NOT be
wiped.

:::

:::caution

We recommend **backing up the pre-Damask consensus state** so all the
transactions and history are not permanently lost.

Also, if you ever need to access that state in the future, you will be able to
spin up an Oasis Node in archive mode and query the pre-Damask state.

:::

7. Perform any needed [configuration changes][damask-conf-changes] described
   below.

8. (only for ParaTime operators) Replace old versions of your ParaTime binaries
   with the new [Oasis Runtime Containers (`.orc`)][orcs] introduced in the
   Damask upgrade.

   For the official Oasis ParaTimes, use the following versions:

   - Emerald ParaTime: [8.2.0][emerald-8.2.0]
   - Cipher ParaTime: [1.1.0][cipher-1.1.0]

9. (only Emerald Web3 Gateway operators) Replace old version of Emerald Web3
   Gateway with version [2.1.0][emerald-gw-2.1.0].

10. (only Rosetta Gateway operators) Replace old version of Oasis Rosetta
    Gateway with version [2.2.0][rosetta-gw-2.2.0].

11. Start your node and re-enable auto-starting via your process manager.

[Damask Upgrade]: damask-upgrade.md#state-changes
[Damask upgrade release]:
  https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2022-04-11
[Handling Network Upgrades]: ../set-up-your-node/maintenance/handling-network-upgrades.md#verify-genesis
[orcs]: https://github.com/oasisprotocol/oasis-core/issues/4469
[22.1.3]: https://github.com/oasisprotocol/oasis-core/releases/tag/v22.1.3
[emerald-8.2.0]:
  https://github.com/oasisprotocol/emerald-paratime/releases/tag/v8.2.0
[cipher-1.1.0]:
  https://github.com/oasisprotocol/cipher-paratime/releases/tag/v1.1.0
[emerald-gw-2.1.0]:
  https://github.com/oasisprotocol/emerald-web3-gateway/releases/tag/v2.1.0
[rosetta-gw-2.2.0]:
  https://github.com/oasisprotocol/oasis-rosetta-gateway/releases/tag/v2.2.0
[Wipe state]: ../set-up-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity
[damask-conf-changes]: #damask-conf-changes
[systemd]: https://systemd.io/
[Supervisor]: http://supervisord.org/

### Configuration Changes {#damask-conf-changes}

:::info

To see the full extent of the changes examine the [Change Log][changelog-22.1.3]:
of the **Oasis Core 22.1.3**, in particular the [22.1][changelog-22.1] and
[22.0][changelog-22.0] sections.

:::

If your node is currently configured to run a ParaTime, you need to perform some
additional steps.

The way ParaTime binaries are distributed has changed so that all required
artifacts are contained in a single archive called the Oasis Runtime Container
and have the `.orc` extension.

:::info

Links to updated ParaTime binaries will be published on the
[Network Parameters][network-parameters-paratimes] page for their respective
ParaTimes.

:::

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

For example, if your _previous_ configuration looked like:

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

[network-parameters-paratimes]: README.md#paratimes

### Additional notes

Examine the [Change Log][changelog-22.1.3] of the 22.1.3 release, in particular
the [22.1][changelog-22.1] and [22.0][changelog-22.0] sections.

[changelog-22.1.3]:
  https://github.com/oasisprotocol/oasis-core/blob/v22.1.3/CHANGELOG.md
[changelog-22.1]:
  https://github.com/oasisprotocol/oasis-core/blob/v22.1.3/CHANGELOG.md#221-2022-04-01
[changelog-22.0]:
  https://github.com/oasisprotocol/oasis-core/blob/v22.1.3/CHANGELOG.md#220-2022-03-01

## 2021-08-31 (16:00 UTC) - Parameter Update {#2021-08-31-upgrade}

* **Upgrade height:** upgrade is scheduled to happen at epoch **8049.**

:::info

We expect the Mainnet network to reach this epoch at around 2021-08-31 16:00 UTC.

:::

### Proposed Parameter Changes

The [Oasis Core 21.2.8](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.2.8) release contains the [`consensus-params-update-2021-08` upgrade handler](https://github.com/oasisprotocol/oasis-core/blob/v21.2.8/go/upgrade/migrations/consensus_parameters.go) which will update the following parameters in the consensus layer:

* **`staking.params.max_allowances` ** specifies the maximum number of allowances on account can store. It will be set to `16` (default value is `0`) to enable support for beneficiary allowances which are required to transfer tokens into a ParaTime.
* **`staking.params.gas_costs` ** , **`governance.params.gas_costs`** and **`roothash.params.gas_costs`** specify gas costs for various types of staking, governance and roothash transactions. Gas costs for transactions that were missing gas costs will be added.
* **`scheduler.params.max_validators`** is the maximum size of the consensus committee (i.e. the validator set). It will be increased to`110` (it was set to `100` previously).

### Instructions - Voting

:::caution

**Voting for the upgrade proposal will end at epoch 7876. We expect the Mainnet network to reach this epoch at around 2021-08-24 12:00 UTC**_**.**_

:::

:::info

At this time only entities which have active validator nodes scheduled in the validator set are eligible to vote for governance proposals.

:::

:::danger

At least **75%** of the **voting power** needs to cast vote on the upgrade proposal for the result to be valid.

At least **90%** of the votes need to be **yes** votes for a proposal to be accepted.

:::

This upgrade will be the first upgrade that will use the new on-chain governance service introduced in the [Cobalt Upgrade](previous-upgrades/cobalt-upgrade.md).

The Oasis Protocol Foundation has submitted an [upgrade governance proposal](../../core/consensus/services/governance.md#submit-proposal) with the following contents:

```yaml
{
   "v": 1,
    "handler": "consensus-params-update-2021-08",
    "target": {
        "consensus_protocol": {
            "major": 4
        },
        "runtime_host_protocol": {
            "major": 3
        },
        "runtime_committee_protocol": {
            "major": 2
        }
    },
    "epoch": 8049
}
```

To view the proposal yourself, you can run the following command on your online Oasis Node:

```bash
oasis-node governance list_proposals -a $ADDR | jq
```

where `$ADDR` represents the path to the internal Oasis Node UNIX socket prefixed with `unix:` (e.g.`unix:/serverdir/node/internal.sock`).

The output should look like:

```yaml
[
  {
    "id": 1,
    "submitter": "oasis1qpydpeyjrneq20kh2jz2809lew6d9p64yymutlee",
    "state": "active",
    "deposit": "10000000000000",
    "content": {
      "upgrade": {
        "v": 1,
        "handler": "consensus-params-update-2021-08",
        "target": {
          "consensus_protocol": {
            "major": 4
          },
          "runtime_host_protocol": {
            "major": 3
          },
          "runtime_committee_protocol": {
            "major": 2
          }
        },
        "epoch": 8049
      }
    },
    "created_at": 7708,
    "closes_at": 7876
  }
]
```

Obtain [your entity's nonce](../../general/manage-tokens/advanced/oasis-cli-tools/get-account-nonce.md#get-your-entitys-nonce) and store it in the `NONCE` variable. You can do that by running:

```yaml
ENTITY_DIR=<PATH-TO-YOUR-ENTITY>
ADDRESS=$(oasis-node stake pubkey2address --public_key \
  $(cat $ENTITY_DIR/entity.json | jq .id -r))
NONCE=$(oasis-node stake account nonce --stake.account.address $ADDRESS -a $ADDR)
```

where `<PATH-TO-YOUR-ENTITY>` is the path to your entity's descriptor, e.g. `/serverdir/node/entity/`.

To vote for the proposal, use the following command to generate a suitable transaction:

```bash
oasis-node governance gen_cast_vote \
  "${TX_FLAGS[@]}" \
  --vote.proposal.id 1 \
  --vote yes \
  --transaction.file tx_cast_vote.json \
  --transaction.nonce $NONCE \
  --transaction.fee.gas 2000 \
  --transaction.fee.amount 2000
```

where `TX_FLAGS` refer to previously set base and signer flags as described in the [Oasis CLI Tools Setup](../../general/manage-tokens/advanced/oasis-cli-tools/setup.md#storing-base-and-signer-flags-in-an-environment-variable) doc.

:::caution

If you use a Ledger-signer backed entity, you will need to install version 2.3.1 of the Oasis App as described in [Installing Oasis App 2.3.1 to Your Ledger](upgrade-log.md#installing-oasis-app-2-3-1-to-your-ledger). This is needed because the current version of the Oasis App available through Ledger Live, version 1.8.2, doesn't support signing the `governance.CastVote` transaction type.

:::

To submit the generated transaction, copy `tx_cast_vote.json` to the online Oasis node and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_cast_vote.json
```

### Instructions - Before Upgrade System Preparation

* This upgrade will upgrade **Oasis Core** to version **21.2.8** which:
  * Upgrades the BadgerDB database backend from v2 to v3. See [**BadgerDB v2 to v3 Migration**](upgrade-log.md#badgerdb-v2-to-v3-migration) section for required steps to be done before upgrade.
  * Has a check that makes sure the **file descriptor limit** is set to an appropriately high value (at least 50000). While previous versions only warned in case the limit was set too low, this version will refuse to start. Follow the [File Descriptor Limit](../set-up-your-node/prerequisites/system-configuration.mdx#file-descriptor-limit) documentation page for details on how to increase the limit on your system.
* Stop your node, replace the old version of Oasis Node with version [21.2.8](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.2.8) and restart your node.

:::tip

Since Oasis Core 21.2.8 is otherwise compatible with the current consensus layer protocol, you may upgrade your Mainnet node to this version at any time.

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

The Mainnet's genesis file and the genesis document's hash will remain the same.

:::

### BadgerDB v2 to v3 Migration

This upgrade will upgrade Oasis Core to version **21.2.x** which includes the new [**BadgerDB**](https://github.com/dgraph-io/badger) **v3**.

Since BadgerDB's on-disk format changed in v3, it requires on-disk state migration. The migration process is done automatically and makes the following steps:

* Upon startup, Oasis Node will start migrating all `<DATA-DIR>/**/*.badger.db` files (Badger v2 files) and start writing Badger v3 DB to files with the `.migrate` suffix.
*   If the migration fails in the middle, Oasis Node will delete all `<DATA-DIR>/**/*.badger.db.migrate` files the next time it starts and start the migration (of the remaining `<DATA-DIR>/**/*.badger.db`

    files) again.
* If the migration succeeds, Oasis Node will append the `.backup` suffix to all `<DATA-DIR>/**/*.badger.db` files (Badger v2 files) and remove the `.migrate` suffix from all `<DATA-DIR>/**/*.badger.db.migrate` files (Badger v3 files).

:::caution

The BadgerDB v2 to v3 migration is **very I/O intensive** (both IOPS and throughput) and **may take a couple of hours** to complete.

To follow its progress, run:

```
shopt -s globstar
du -h <DATA-DIR>/**/*.badger.db* | sort -h -r
```

and observe the sizes of various `*.badger.db*` directories.

For example, if it outputted the following:

```
55G	data/tendermint/data/blockstore.badger.db
37G	data/tendermint/abci-state/mkvs_storage.badger.db.backup
32G	data/tendermint/abci-state/mkvs_storage.badger.db
16G	data/tendermint/data/blockstore.badger.db.migration
2.9G	data/tendermint/data/state.badger.db
62M	data/persistent-store.badger.db.backup
2.1M	data/tendermint/abci-state/mkvs_storage.badger.db.backup/checkpoints
1.1M	data/tendermint/abci-state/mkvs_storage.badger.db.backup/checkpoints/4767601/ca51b06a054b69f2c18b9781ea42f0b00900de199c1937398514331b0d136ec3/chunks
1.1M	data/tendermint/abci-state/mkvs_storage.badger.db.backup/checkpoints/4767601/ca51b06a054b69f2c18b9781ea42f0b00900de199c1937398514331b0d136ec3
1.1M	data/tendermint/abci-state/mkvs_storage.badger.db.backup/checkpoints/4767601
1.1M	data/tendermint/abci-state/mkvs_storage.badger.db.backup/checkpoints/4757601/2ec3a28b1f4a2fcce503f2e80eb5d77b6c0a4d1075e8a14d880ac390338a855e/chunks
1.1M	data/tendermint/abci-state/mkvs_storage.badger.db.backup/checkpoints/4757601/2ec3a28b1f4a2fcce503f2e80eb5d77b6c0a4d1075e8a14d880ac390338a855e
1.1M	data/tendermint/abci-state/mkvs_storage.badger.db.backup/checkpoints/4757601
36K	data/persistent-store.badger.db
20K	data/tendermint/data/evidence.badger.db
```

then the `mkvs_storage.badger.db` was already migrated:

* old BadgerDB v2 directory: `37G data/tendermint/abci-state/mkvs_storage.badger.db.backup`
* new BadgerDB v3 directory: `32G data/tendermint/abci-state/mkvs_storage.badger.db`

and now the `blockstore.badger.db` is being migrated:

*   current BadgerDB v2 directory:

    `55G data/tendermint/data/blockstore.badger.db`
* new BadgerDB v3 directory: `16G data/tendermint/data/blockstore.badger.db.migration`

Note that usually, the new BadgerDB v3 directory is smaller due to less fragmentation.

:::

#### Extra storage requirements

Your node will thus need to have extra storage space to store both the old and the new BadgerDB files.

To see estimate how much extra space the migration will need, use the `du` tool:

```
shopt -s globstar
du -h <DATA-DIR>/**/*.badger.db | sort -h -r
```

This is an example output from a Mainnet node that uses `/srv/oasis/node` as the `<DATA-DIR>`:

```
43G	/srv/oasis/node/tendermint/data/blockstore.badger.db
28G	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db
311M	/srv/oasis/node/tendermint/data/state.badger.db
2.0M	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints
996K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4517601
996K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4507601
992K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4517601/ba6218d7be2df31ba6e7201a8585c6435154728e55bbb7df1ffebe683bf60217
992K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4507601/1e0bf592bb0d99832b13ad91bc32aed018dfc2639e07b93a254a05f6791a19ac
984K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4517601/ba6218d7be2df31ba6e7201a8585c6435154728e55bbb7df1ffebe683bf60217/chunks
984K	/srv/oasis/node/tendermint/abci-state/mkvs_storage.badger.db/checkpoints/4507601/1e0bf592bb0d99832b13ad91bc32aed018dfc2639e07b93a254a05f6791a19ac/chunks
148K	/srv/oasis/node/persistent-store.badger.db
36K	/srv/oasis/node/tendermint/data/evidence.badger.db
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

### Installing Oasis App 2.3.1 to Your Ledger

:::info

This manual installation procedure is needed until the latest version of the Oasis App, version 2.3.1, becomes available through [Ledger Live](https://www.ledger.com/ledger-live/)'s Manager.

:::

:::caution

Unlike Nano S devices, **Nano X** devices are locked meaning one cannot manual install the latest version of the Oasis App on them. If you use a Nano X device, you will need to temporarily switch to a Nano S device or wait for the new version of the Oasis App to be available through Ledger Live's Manager.

:::

#### Update Firmware to Version 2.0.0

First, make sure the firmware on your Nano S is up-to-date. At least [version 2.0.0](https://support.ledger.com/hc/en-us/articles/360010446000-Ledger-Nano-S-firmware-release-notes) released on May 4, 2021, is required. Follow [Ledger's instructions for updating the firmware on your Nano S](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware).

#### Install Prerequisites for Manual Installation

The manual installation process relies on some tooling that needs to be available on the system:

* [Python](https://www.python.org) 3.
* [Python tools for Ledger Blue, Nano S and Nano X](https://github.com/LedgerHQ/blue-loader-python).

Most systems should already have [Python](https://www.python.org) pre-installed.

To install [Python tools for Ledger Blue, Nano S and Nano X](https://github.com/LedgerHQ/blue-loader-python), use [pip](https://pip.pypa.io/en/stable/):

```
pip3 install --upgrade ledgerblue
```

You might want to install the packages to a [Python virtual environment](https://packaging.python.org/tutorials/installing-packages/#creating-virtual-environments) or via so-called [User install](https://pip.pypa.io/en/stable/user_guide/#user-installs) (i.e. isolated to the current user).

#### Download Oasis App 2.3.1

Download the [Oasis App 2.3.1 installer for Nano S](https://github.com/Zondax/ledger-oasis/releases/download/v2.3.1/installer_s.sh) from [Zondax's Oasis App GitHub repo](https://github.com/Zondax/ledger-oasis).

#### Install Oasis App 2.3.1

Make the downloaded installer executable by running:

```yaml
chmod +x installer_s.sh
```

Connect you Nano S and unlock it. Then execute the installer:

```yaml
./installer_s.sh load
```

Your Nano S will give you the option to either:

* _Deny unsafe manager_, or
* review the _Public Key_ and _Allow unsafe manager_.

First review the public key and ensure it matches the `Generated random root public key` displayed in the terminal.

Then double press the _Allow unsafe manager_ option.

:::info

If there is an existing version of the _Oasis App_ installed on your Nano S, you will be prompted with the _Uninstall Oasis_ screen, followed by reviewing the _Identifier_ (it will depend on the version of the Oasis App you have currently installed) and finally confirming deletion on the _Confirm action_ screen.

:::

After the new version of the Oasis App has finished loading, you will be prompted with the _Install app Oasis_ screen, followed by reviewing the _Version_, _Identifier_ and _Code Identifier_ screens_._ Ensure the values are as follows:

* Version: 2.3.1
* Identifier (_Application full hash_ on the terminal): `E0CB424D3B1C2A0F694BCB6E99C3B37C7685399D59DD12D7CF80AF4A487882B1`
* Code Identifier: `C17EBE7CD356D01411A02A81C64CDA3E81F193BDA09BEBBD0AEAF75AD7EC35E3`

Finally, confirm installation of the new app by double pressing on the _Perform installation_ screen. Your Ledger device will ask for your PIN again.

:::danger

Installing Oasis App 2.3.1 on a Nano S with the firmware version < 2.0.0 (e.g. 1.6.1) will NOT fail. It will show a different _Identifier_ when installing the app which will NOT match the _Application full hash_ shown on the terminal. However, opening the app will not work and it will "freeze" your Nano S device.

:::

#### Verify Installation

Open the Oasis App on your Nano S and ensure the _Version_ screen shows version 2.3.1.

:::info

Starting the manually installed version of the Oasis App will always show the _This app is not genuine_ screen, followed by _Identifier_ (which should match the Identifier value above) screen. Finally, open the application by double pressing on the _Open application_ screen.

:::

:::tip

After you've signed your `governance.CastVote` transaction, you can safely downgrade Oasis App to the latest official version available via [Ledger Live](https://www.ledger.com/ledger-live/), version 1.8.2.

To do that, just open Ledger Live's Manager and it will prompt you to install version 1.8.2.

:::

## 2021-04-28 (16:00 UTC) - Cobalt Upgrade {#cobalt-upgrade}

* **Upgrade height:** upgrade is scheduled to happen at epoch **5046.**

:::info

We expect the Mainnet network to reach this epoch at around 2021-04-28 12:00 UTC.

:::

### Instructions - Before upgrade

* Make sure you are running the latest Mainnet-compatible Oasis Node version: [20.12.7](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.7).
  * If you are running a different **20.12.x** Oasis Node version, update to version **20.12.7** before the upgrade.

:::tip

Version **20.12.7** is backwards compatible with other **20.12.x** releases, so upgrade can be performed at any time by stopping the node and replacing the binary.

:::

*   To ensure your node will stop at epoch **5046** [submit the following upgrade descriptor](../set-up-your-node/maintenance/handling-network-upgrades.md#stop-the-node-at-specific-epoch) at any time before the upgrade:

    ```
    {
      "name": "mainnet-upgrade-2021-04-28",
      "method": "internal",
      "identifier": "mainnet-upgrade-2021-04-28",
      "epoch": 5046
    }
    ```

:::caution

The upgrade descriptor contains a non-existing upgrade handler and will be used to coordinate the network shutdown, the rest of the upgrade is manual.

:::

#### **Runtime operators**

Following section is relevant only for **runtime operators** that are running **storage** nodes for active runtimes on the Mainnet.

This upgrade requires a runtime storage node migration to be performed **before the upgrade genesis is published**. This can be done before the upgrade epoch is reached by stopping all runtime nodes and running the migration.

**Backup your node's data directory**

To prevent irrecoverable runtime storage data corruption/loss in case of a failed storage migration, backup your node's data directory.

For example, to backup the `/serverdir/node` directory using the [rsync](https://rsync.samba.org) tool, run:

```
rsync -a /serverdir/node/ /serverdir/node-BACKUP/
```

The storage database on all storage nodes needs to be migrated with the following command (using the [21.1.1](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.1.1) binary):

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

### Instructions - Upgrade day

Following steps should be performed on **2021-04-28** only after the network has reached the upgrade epoch and has halted:

* Download the genesis file published in the [Cobalt Upgrade release](https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2021-04-28).

:::info

Mainnet state at epoch **5046** will be exported and migrated to a 21.1.x compatible genesis file. Upgrade genesis file will be published on the above link soon after reaching the upgrade epoch.

:::

* Verify the provided Cobalt upgrade genesis file by comparing it to network state dump. See instructions in the [Handling Network Upgrades](../set-up-your-node/maintenance/handling-network-upgrades.md#download-and-verify-the-provided-genesis-file) guide.
* Replace the old genesis file with the new Cobalt upgrade genesis file.
* Stop your node (if you haven't stopped it already by submitting the upgrade descriptor).
* Replace the old version of Oasis Node with version [21.1.1](https://github.com/oasisprotocol/oasis-core/releases/tag/v21.1.1).
* [Wipe state](../set-up-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Start your node.

:::info

For more detailed instructions, see the [Handling Network Upgrades](../set-up-your-node/maintenance/handling-network-upgrades.md) guide.

:::

### Additional notes

Examine the [Change Log](https://github.com/oasisprotocol/oasis-core/blob/v21.1.1/CHANGELOG.md) of the 21.1.1 (and 21.0) releases.

**Runtime operators**

Note the following configuration change in the [21.0](https://github.com/oasisprotocol/oasis-core/blob/v21.1.1/CHANGELOG.md#configuration-changes) release.

:::caution

**Storage access policy changes**

Due to the changes in the default access policy on storage nodes, at least one of the storage nodes should be configured with the `worker.storage.public_rpc.enabled` flag set to `true`.

Otherwise, external runtime clients wont be able to connect to any storage nodes.

:::

## 2020-11-18 (16:00 UTC) - Mainnet {#mainnet-upgrade}

* **Block height** when Mainnet Beta network stops: **702000.**

:::info

We expect the Mainnet Beta network to reach this block height at around 2020-11-18 13:30 UTC.

:::

* **Upgrade window:**
  * Start: **2020-11-18T16:00:00Z.**
  * End: After nodes representing **2/3+ stake** do the upgrade.

### Instructions

* Download [Oasis Node](../set-up-your-node/prerequisites/oasis-node.md) version [20.12.2](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.2), while continuing to run version 20.10.x.
* (optional) Use Oasis Node version 20.12.2 to dump network state at the specified block height. It will connect to the running version 20.10.x node.
* Download the Mainnet genesis file published in the [2020-11-18 release](https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-11-18).
* (optional) Verify the provided Mainnet genesis file by comparing it to network state dump. See instructions in the [Handling Network Upgrades](../set-up-your-node/maintenance/handling-network-upgrades.md#download-and-verify-the-provided-genesis-file) guide.
* Replace the old Mainnet Beta genesis file with the Mainnet genesis file.
* Stop your node.
* Remove the old 20.10.x version of Oasis Node.
* [Wipe state](../set-up-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Update your node's configuration per instructions in [Configuration changes](upgrade-log.md#configuration-changes) below.
* Start your node.

:::info

This time, we recommend dumping the network state with the upgraded Oasis Node binary so that the genesis file will be in the [canonical form](../../core/consensus/genesis.md#canonical-form).

The canonical form will make it easier to compare the obtained genesis file with the one provided by us.

:::

:::info

For more detailed instructions, see the [Handling Network Upgrades](../set-up-your-node/maintenance/handling-network-upgrades.md) guide.

:::

### Configuration changes

Since we are upgrading to the Mainnet, we recommend you change your node's configuration and disable pruning of the consensus' state by removing the `consensus.tendermint.abci.prune` key.

For example, this configuration:

```yaml
...

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: true

  # Tendermint backend configuration.
  tendermint:
    abci:
      prune:
        strategy: keep_n
        # Keep ~7 days of data since block production is ~1 block every 6 seconds.
        # (7*24*3600/6 = 100800)
        num_kept: 100800
    core:
      listen_address: tcp://0.0.0.0:26656

    ...
```

Becomes:

```yaml
...

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: true

  # Tendermint backend configuration.
  tendermint:
    core:
      listen_address: tcp://0.0.0.0:26656

    ...
```

## 2020-10-01 - Mainnet Beta {#mainnet-beta-upgrade}

### Instructions

* Stop your node.
* [Wipe state](../set-up-your-node/maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Replace the old genesis file with the Mainnet Beta genesis file published in the [2020-10-01 release](https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-10-01).
* Start your node.

:::info

You should keep using Oasis Core version 20.10.

:::

:::info

For more detailed instructions, see the [Handling Network Upgrades](../set-up-your-node/maintenance/handling-network-upgrades.md) guide.

:::

## 2020-09-22 - Mainnet Dry Run {#mainnet-dry-run}

### Instructions

* This is the initial deployment.
