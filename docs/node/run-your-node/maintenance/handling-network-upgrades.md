# Handling Network Upgrades

Changes between the major consensus network versions are backward and forward
breaking. You have to always run **a specific version of the Oasis Core to
fetch and validate the blocks matching the specific consensus network version**.

There are two kinds of consensus network upgrades that can occur:

- *Seamless upgrade*: on-chain upgrade without resetting the consensus state or
  changing the genesis document (e.g. [Testnet upgrade 2022-04-04], [Mainnet
  upgrade 2021-08-31]).
- *Dump & restore upgrade*: requires wiping state and starting the upgraded
  network from a fresh genesis document (e.g. [Mainnet upgrade 2022-04-11
  (Damask)], [Testnet upgrade 2022-03-03]).

The specific Oasis Core version requirements also impact the way how you
**initially sync your node with the network**:
- If the last network upgrade was a dump & restore one, then your node will
  complete the synchronization automatically by fetching and validating all
  blocks following the state in the genesis document.
- If the last network upgrade was a seamless one, you will first need to
  download the older version of the Oasis Core to sync the initial blocks
  and then sequentially perform seamless upgrade(s).

For example, at time of writing this guide in order to sync your node from
scratch on the [Testnet network][Testnet Parameters] you needed to do the
following:

- Download the genesis document and run Oasis Core 22.0.x which synced
  blocks from epoch 14209 through (excluding) upgrade epoch 15056.
- Wait until the node automatically stopped, then upgrade to Oasis Core
  22.2.x which synced the blocks from epoch 15056 onwards.

The expected versions of the Oasis Core to sync your node from the latest
genesis document on the Mainnet and Testnet are always published on the
[Network Parameters] and [Testnet Parameters] pages respectively.

## Reaching Upgrade Epoch

Once a [governance proposal] is accepted the node will automatically stop when
reaching the **upgrade epoch** specified in the proposal. The node will
write something like this in the log:

```json
{"caller":"mux.go:426","level":"debug","module":"abci-mux","msg":"dispatching halt hooks for upgrade","ts":"2022-05-06T13:11:41.721994647Z"}
```

and on the error output:

```text
panic: upgrade: reached upgrade epoch
```

The state of the network at the upgrade epoch height will be automatically
exported into a genesis file located in
`<NODE-DATADIR>/exports/genesis-<CHAIN_ID>-at-<UPGRADE_HEIGHT>.json`,
where `CHAIN_ID` is the chain ID of the network and `LATEST_HEIGHT` is the
height of the last consensus block before the upgrade epoch. This command,
depending on the size of the state, may take some time to finish.

:::tip

While waiting for the network upgrade epoch, you can check the current height
and epoch by running:

```bash
oasis-node control status -a unix:/serverdir/node/internal.sock
```

and observe the value of the `consensus.latest_height` and
`consensus.latest_epoch` fields respectively.

:::

[governance proposal]: ../../../general/manage-tokens/cli/network.md#governance-cast-vote

Once the upgrade epoch is reached, follow the instructions in the corresponding
[upgrade log].

[upgrade log]: ../../mainnet/upgrade-log.md
[Network Parameters]: ../../mainnet/README.md
[Testnet Parameters]: ../../testnet/README.md
[Testnet upgrade 2022-04-04]: ../../testnet/upgrade-log.md#2022-04-04-upgrade
[Testnet upgrade 2022-03-03]: ../../testnet/upgrade-log.md#2022-03-03-upgrade
[Testnet upgrade 2021-08-11]: ../../testnet/upgrade-log.md#2021-08-11-upgrade
[Mainnet upgrade 2022-04-11 (Damask)]: ../../mainnet/upgrade-log.md#damask-upgrade
[Mainnet upgrade 2021-08-31]: ../../mainnet/upgrade-log.md#2021-08-31-upgrade
[Mainnet upgrade 2021-04-28 (Cobalt)]: ../../mainnet/upgrade-log.md#cobalt-upgrade

## Preparing New Genesis File and Wiping State

For dump & restore upgrades, the exported genesis file needs to be patched and
verified accordingly. Then, we wipe the existing consensus state including the
history of all transactions and let the node reload the state from the genesis
file.

### Patching Dumped State

First, let's run a built-in helper which migrates and updates parts of the
genesis file which changed in the new version of Oasis Core. We will provide
the dumped genesis file as the input and write the new version of the genesis
file into `genesis_dump.json`.

```bash
oasis-node debug fix-genesis --genesis.file genesis-<CHAIN_ID>-at-<LATEST_HEIGHT>.json --genesis.new_file genesis_dump.json
```

Other parts of the genesis need to be updated manually, as described in each
upgrade's *Proposed State Changes* section (e.g. [Damask upgrade's Proposed
State Changes], [Cobalt upgrade's Proposed State Changes]).

[Cobalt upgrade's Proposed State Changes]: ../../mainnet/previous-upgrades/cobalt-upgrade.md#proposed-state-changes
[Damask upgrade's Proposed State Changes]: ../../mainnet/previous-upgrades/damask-upgrade.md#proposed-state-changes

### Download and Verify the Provided Genesis File {#verify-genesis}

In addition, download the new genesis file linked in the [Network Parameters]
and save it as `/serverdir/etc/genesis.json`.

Compare the dumped state with the downloaded genesis file:

```bash
diff --unified=3 genesis_dump.json genesis.json
```

If you obtain the same result, then you have successfully verified the provided
genesis file!

#### Example diff for Mainnet Beta to Mainnet network upgrade

Let's look at what `diff` returned before performing manual changes to the
genesis file for the Mainnet network upgrade:

```diff
--- genesis_dump.json    2020-11-16 17:49:46.864554271 +0100
+++ genesis.json    2020-11-16 17:49:40.353496022 +0100
@@ -1,7 +1,7 @@
 {
   "height": 702000,
-  "genesis_time": "2020-11-18T13:38:00Z",
-  "chain_id": "mainnet-beta-2020-10-01-1601568000",
+  "genesis_time": "2020-11-18T16:00:00Z",
+  "chain_id": "oasis-1",
   "epochtime": {
     "params": {
       "interval": 600
@@ -2506,1563 +2506,1779 @@
       "debonding_interval": 336,
       "reward_schedule": [
         {
-          "until": 3696,
-          "scale": "1595"
+          "until": 4842,
+          "scale": "2081"
         },
         {
-          "until": 3720,
-          "scale": "1594"
+          "until": 4866,
+          "scale": "2080"
         },

        ... trimmed ...

         {
-          "until": 35712,
+          "until": 36882,
           "scale": "2"
         },
         {
-          "until": 35760,
+          "until": 36930,
           "scale": "1"
         }
       ],
@@ -4087,7 +4303,6 @@
         "transfer": 1000
       },
       "min_delegation": "100000000000",
-      "disable_transfers": true,
       "fee_split_weight_propose": "2",
       "fee_split_weight_vote": "1",
       "fee_split_weight_next_propose": "1",
@@ -4097,7 +4312,7 @@
     "token_symbol": "ROSE",
     "token_value_exponent": 9,
     "total_supply": "10000000000000000000",
-    "common_pool": "1835039672187348312",
+    "common_pool": "2285039672187348312",
     "last_block_fees": "0",
     "ledger": {
       "oasis1qp0l8r2s3076n4xrq8av0uuqegj7z9kq55gu5exy": {
@@ -6419,7 +6634,7 @@
       },
       "oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6": {
         "general": {
-          "balance": "1633038701000000000"
+          "balance": "1183038701000000000"
         },
         "escrow": {
           "active": {
@@ -9862,6 +10077,8 @@
       }
     }
   },
-  "halt_epoch": 1440,
-  "extra_data": null
+  "halt_epoch": 9940,
+  "extra_data": {
+    "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="
+  }
 }
```

We can observe that the provided genesis file mostly updates some particular
network parameters. In addition, some ROSE tokens were transferred from an
account to the Common Pool. All other things remained unchanged.

Let's break down the diff and explain what has changed.

The following genesis file fields will always change on a network upgrade:

* `chain_id`: A unique ID of the network. Mainnet upgrades follow a pattern `oasis-1`, `oasis-2`, ...
* `genesis_time`: Time from which the genesis file is valid.
* `halt_epoch`: The epoch when the node will stop functioning. We set this to
  intentionally force an upgrade.

The following fields were a particular change in this upgrade:

* `staking.params.reward_schedule`: This field describes the staking reward
  model. It was changed to start at 20% (annualized) and range from 20% to 2%
  over the first 4 years of the network. For more details, see the [Token
  Metrics and Distribution] doc.
* `staking.params.disable_transfers`: This field was removed to enable token
  transfers.
* `staking.common_pool`: This field represents the Common Pool. Its balance was
  increased by 450M ROSE to fund increased staking rewards.
* `staking.ledger.oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6`: This field
  corresponds to the Community and Ecosystem Wallet. Its `general.balance` was
  reduced by 450M ROSE and transferred to the Common Pool to fund increased
  staking rewards.
* `extra_data`: This field can hold network's extra data, but is currently
  ignored everywhere. For this upgrade, we changed it back to the value in the
  Mainnet Beta genesis file to include the Oasis network's genesis quote:
  _”_[_Quis custodiet ipsos custodes?_](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F)_” \[submitted by Oasis Community Member Daniyar Borangaziyev\]._

:::info

The balances in the genesis file are enumerated in base units with 1 ROSE token
equaling 10^9 (i.e. billion) base units. For more details, see the
[Genesis Document](../../genesis-doc.md#parameters).

:::

[Token Metrics and Distribution]: ../../../general/oasis-network/token-metrics-and-distribution.mdx

### Wiping State

:::caution

We do not suggest that you wipe _all_ state. You might lose node identities and
keys if you do it this way.

:::

The process is described in the
[Wiping Node State](wiping-node-state.md#state-wipe-and-keep-node-identity)
document.

## Updating ParaTimes

If you are running a compute or a client ParaTime node, you will often need to
upgrade the ParaTime. The required ParaTime versions are stored in the network
registry. The command below queries the registry and extracts the version
information for the Paratime
`00000000000000000000000000000000000000000000000072c8215e60d5bca7`:

```bash
oasis-node registry runtime list -v -a unix:/serverdir/node/internal.sock \| 
jq 'select(.id=="00000000000000000000000000000000000000000000000072c8215e60d5bca7") | .deployments'
```

At time of writing the Emerald ParaTime on Testnet has the following record:

```
[
  {
    "version": {
      "major": 7,
      "minor": 1
    },
    "valid_from": 14320
  },
  {
    "version": {
      "major": 8
    },
    "valid_from": 15056
  }
]
```

The record above specifies that after epoch 14320, Emerald version 7.1.0 is
required and from epoch 15056, Emerald 8.0.0. If you are running a compute
node, **the installed ParaTime version must match exactly the ParaTime version
in the registry**! If you are running a client node, ParaTime state syncing
will be performed regardless of the version installed.

Oasis node supports configuring multiple versions of ParaTime bundles, for
example: 

```yaml
runtime:
  paths:
    - /path/to/emerald-paratime-7.1.0-testnet.orc
    - /path/to/emerald-paratime-8.0.0-testnet.orc
```

The node will then automatically run the correct version of the ParaTime as
specified in the registry.

## Start Your Node

This will depend on your process manager. If you don't have a process manager,
you should use one. However, to start the node without a process manager you
can start the [Oasis Node](../prerequisites/oasis-node.md) like this:

```bash
oasis-node --config /serverdir/etc/config.yml
```

## Clean Up

After you're comfortable with your node deployment, you can remove the old
Oasis Core version and the intermediate
`genesis-<CHAIN_ID>-at-<LATEST_HEIGHT>.json` and `genesis_dump.json` files.
