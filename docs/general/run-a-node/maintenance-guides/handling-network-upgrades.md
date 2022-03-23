# Handling Network Upgrades

:::caution

Following this guide when there is no network upgrade will result in you losing your place on the current network.

:::

The following guide should be used when the network has agreed to do a software upgrade.

## Stop the node at specific epoch

Before an upgrade we will update the [Upgrade Log](../upgrade-log.md) to specify the epoch height at which the upgrade will take place. Additionally, an upgrade descriptor will be provided which can be used to instruct the node to shutdown and export state at the start of the upgrade epoch.

To submit the provided upgrade descriptor use the following command:

```bash
oasis-node control upgrade-binary \
 -a unix:/serverdir/node/internal.sock \
 <PATH-TO-UPGRADE-DESCRIPTOR.json>
```

To verify that the upgrade descriptor has been received, grep your node's logs for "received upgrade descriptor" message, e.g.:

> {"caller":"upgrade.go:60","epoch":5102,"level":"info","module":"upgrade","msg":"received upgrade descriptor, scheduling shutdown","name":"testnet-upgrade-2021-03-24","ts":"2021-03-24T09:56:52.944552808Z"}

If for any reason you would need to cancel a scheduled pending upgrade, use the `cancel-upgrade` command.

Node reaching the upgrade epoch will automatically export network state to a genesis file under the following path:`exports/genesis-<CHAIN-ID>-at-<DUMP-BLOCK-HEIGHT>.json`.

## Manually exporting network state

To dump the state of the network to a genesis file, run:

```bash
oasis-node genesis dump \
  -a unix:/serverdir/node/internal.sock \
  --genesis.file /serverdir/etc/genesis_dump.json \
  --height <HEIGHT-TO-DUMP>
```

replacing `<HEIGHT-TO-DUMP>` with the block height we specified.

:::caution

You can only run the following command _after_ the `<HEIGHT-TO-DUMP>` block height has been reached on the network.

To see the network's current height, run:

```bash
oasis-node control status -a unix:/serverdir/node/internal.sock
```

and observe the value of the `consensus.latest_height` key.

:::

## Patch Dumped State

At the moment, we don't provide state patches.

However, for certain upgrades we use the **`oasis-node debug fix-genesis`** CLI command to automatically migrate/update some parts of the genesis file.

Other parts are updated manually, as described in each upgrade's Proposed State Changes section (e.g. [Cobalt upgrade's Proposed State Changes](../../mainnet/previous-upgrades/cobalt-upgrade.md#proposed-state-changes)).

## Download and Verify the Provided Genesis File

Download the new genesis file linked in the [Network Parameters](../../oasis-network/network-parameters.md) and save it as `/serverdir/etc/genesis.json`.

Then compare the dumped state with the downloaded genesis file:

```bash
diff --unified=3 genesis_dump.json genesis.json
```

### Example diff for Mainnet Beta to Mainnet network upgrade

Let's assume that the above `diff` command returns:

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

We can observe that the provided genesis file mostly updates some particular network parameters. In addition, some ROSE tokens were transferred from an account to the Common Pool. All other things remained unchanged.

Let's break down the diff and explain what has changed.

The following genesis file fields will always change on a network upgrade:

* `chain_id`: A unique ID of the network.
* `genesis_time`: Time from which the genesis file is valid.
* `halt_epoch`: The epoch when the node will stop functioning. We set this to intentionally force an upgrade.

The following fields were a particular change in this upgrade:

* `staking.params.reward_schedule`: This field describes the staking reward model. It was changed to start at 20% (annualized) and range from 20% to 2% over the first 4 years of the network. For more details, see the updated [Token Metrics and Distribution](/oasis-network-primer/token-metrics-and-distribution) doc.
* `staking.params.disable_transfers`: This field was removed to enable token transfers.
* `staking.common_pool`: This field represents the Common Pool. Its balance was increased by 450M ROSE to fund increased staking rewards.
* `staking.ledger.oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6`: This field corresponds to the Community and Ecosystem Wallet. Its `general.balance` was reduced by 450M ROSE and transferred to the Common Pool to fund increased staking rewards.
* `extra_data`: This field can hold network's extra data, but is currently ignored everywhere. For this upgrade, we changed it back to the value in the Mainnet Beta genesis file to include the Oasis network's genesis quote: _”_[_Quis custodiet ipsos custodes?_](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F)_” \[submitted by Oasis Community Member Daniyar Borangaziyev\]._

:::info

The balances in the genesis file are enumerated in base units with 1 ROSE token equaling 10^9 (i.e. billion) base units. For more details, see the [Genesis Document](../../oasis-network/genesis-doc.md#parameters) docs.

:::

If you obtain the same result, then you have successfully verified the provided genesis file.

## Stop Your Node

This will depend on your process manager. You should stop your [Oasis Node](../prerequisites/oasis-node.md) process however this is done for your setup.

## Wipe State

:::caution

We do not suggest that you wipe _all_ state. You might lose node identities and keys if you do it this way.

:::

Before restarting your node you should wipe consensus state. The process for this is described in the [Wiping Node State](wiping-node-state.md#state-wipe-and-keep-node-identity) document.

## Update Configuration

If the [Upgrade Log](../upgrade-log.md) provides instructions for updating your node's configuration, update the `/serverdir/etc/config.yml` file accordingly.

## Upgrade Oasis Node

Before starting your node again, make sure you upgrade your [Oasis Node](../prerequisites/oasis-node.md) binary to the current version specified in the [Network Parameters](../../oasis-network/network-parameters.md).

## Start Your Node

This will depend on your process manager. If you don't have a process manager, you should use one. However, to start the node without a process manager you can start the [Oasis Node](../prerequisites/oasis-node.md) like so:

```bash
oasis-node --config /serverdir/etc/config.yml
```

## Clean Up

After you're comfortable with your node deployment, you can clean up the `genesis_dump.json` file.

