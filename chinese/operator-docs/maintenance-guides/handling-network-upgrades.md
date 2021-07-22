# Handling Network Upgrades

{% hint style="warning" %}
Following this guide when there is no network upgrade will result in you losing your place on the current network.
{% endhint %}

The following guide should be used when the network has agreed to do a software upgrade.

To see the latest upgrade schedule, see [Deployment Change Log](../../networks/amber-network/current-parameters.md#deployment-change-log) \(Amber Network\).

## Dumping Blockchain State

{% hint style="info" %}
Do not stop your `oasis-node` process just yet.
{% endhint %}

Before an upgrade we will update the [Upgrade Parameters](../../networks/amber-network/current-parameters.md) \(Amber Network\) to specify the block height at which to dump.

To dump the state of the network to a genesis file, run:

```bash
HEIGHT_TO_DUMP=<HEIGHT-TO-DUMP>
oasis-node genesis dump \
  -a unix:/serverdir/node/internal.sock \
  --genesis.file /serverdir/etc/genesis_dump.$HEIGHT_TO_DUMP.json \
  --height $HEIGHT_TO_DUMP
```

replacing `<HEIGHT-TO-DUMP>` with the block height we specified.

{% hint style="warning" %}
You must only run the following command _after_ the `<HEIGHT-TO-DUMP>` block height has been reached on the network.
{% endhint %}

## Patching Dumped State

{% hint style="info" %}
At the moment, we don't provide state patches.

Once [Oasis Core \#2757](https://github.com/oasisprotocol/oasis-core/issues/2757) is implemented, it will become easier to create/apply a state patch with the standard Unix tools.
{% endhint %}

## Downloading and Verifying the Provided Genesis Document

Download the genesis document linked in the [Deployment Change Log](../../networks/amber-network/current-parameters.md) \(Amber Network\) and save it as `/serverdir/etc/genesis.json`.

Pretty-print the dumped state \(set indent to 2\) so you will be able to easily compare it to the provided genesis document.

{% hint style="info" %}
We plan to update the `oasis-node genesis dump` command to output the state dump in a _canonical_ form that is `diff`/`patch` friendly.

For more details, see [Oasis Core \#2757](https://github.com/oasisprotocol/oasis-core/issues/2757).
{% endhint %}

One way to do that is to use [Python's `json` module](https://docs.python.org/3/library/json.html#module-json):

```bash
cat genesis_dump.$HEIGHT_TO_DUMP.json | \
  python3 -c 'import sys, json; print(json.dumps(json.load(sys.stdin), indent=2))' \
  > genesis_dump.$HEIGHT_TO_DUMP.pretty.json
```

{% hint style="warning" %}
Be aware that [jq](http://stedolan.github.io/jq/), the popular JSON CLI tool, [converts all numbers to IEEE 754 64-bit values](https://github.com/stedolan/jq/wiki/FAQ#caveats) which can result in silent loss of precision and/or other changes.

Hence, we recommend avoiding its usage until this issue is resolved.
{% endhint %}

Then compare the pretty-printed dumped state with the provided genesis document:

```bash
diff genesis_dump.$HEIGHT_TO_DUMP.pretty.json genesis.json
```

### Example diff for the 2020-03-05 network upgrade

For the 2020-03-05 network upgrade, the `diff` command above returns:

```diff
3,4c3,4
<   "genesis_time": "2020-03-05T14:16:02.002875089+01:00",
<   "chain_id": "quest-2020-02-11-1581440400",
---
>   "genesis_time": "2020-03-05T17:00:00.000000000Z",
>   "chain_id": "questnet-2020-03-05-1583427600",
1942c1942,1945
<         "3": "100000000000"
---
>         "3": "100000000000",
>         "4": "100000000000",
>         "5": "100000000000",
>         "6": "100000000000"
1953c1956,1961
<       "commission_schedule_rules": {},
---
>       "commission_schedule_rules": {
>         "rate_change_interval": 1,
>         "rate_bound_lead": 14,
>         "max_rate_steps": 21,
>         "max_bound_steps": 21
>       },
1967,1973d1974
<       "disable_transfers": true,
<       "disable_delegation": true,
<       "undisable_transfers_from": {
<         "OSo8hvkfyqypYniWWlVhikiVYQJC7EBsUdczBdpAjIs=": true,
<         "ZWVxEX66b1wnY62wx5lp7bR9rF8+2tCxgmcwFs7Kg1s=": true
<       },
<       "fee_weight_vote": 1,
1975c1976,1978
<       "reward_factor_block_proposed": "0"
---
>       "reward_factor_block_proposed": "0",
>       "fee_split_vote": "1",
>       "fee_split_propose": "1"
7647c7650
<   "halt_epoch": 4839,
---
>   "halt_epoch": 6525,
7649c7652
```

We can see that the provided genesis document updated some network parameters but didn't touch any other entity, account or delegation data.

If you obtain the same result, then you have successfully verified the provided genesis document.

Let's break down the diff and explain what has changed.

The following genesis document fields will always change on a network upgrade:

* `chain_id`: A unique ID of the network.
* `genesis_time`: Time from which the genesis document is valid.
* `halt_epoch`: The epoch when the node will stop functioning. We set this to intentionally force an upgrade.

The following fields were a particular change in this upgrade:

* `staking.params.thresholds`: Three new staking threshold values were added for three new staking threshold kinds \(`4`: key manager node, `5`: compute runtime, `6`: key manager runtime\).
* `staking.params.commission_schedule_rules`: Commission schedule rules were added since this upgrade enables token transfers and delegation.
* `staking.params.disable_transfers`, `staking.params.disable_delegation`,

  `staking.params.undisable_transfers_from`: These fields were removed since this upgrade enables token transfers and delegation.

* `staking.params.fee_split_vote`, `staking.params.fee_split_propose`:

  These two fields were added to control how a block's fee for a validator is split split between the validator that signs the block \(`fee_split_vote`\) and the validator that proposes the block \(`fee_split_propose`\).

## Stopping Your Node

This will depend on your process manager. You should stop your `oasis-node` process however this is done for your setup.

## Wiping State

{% hint style="warning" %}
We do not suggest that you wipe _all_ state. You might lose node identities and keys if you do it this way.
{% endhint %}

Before restarting your node you should wipe consensus state. The process for this is described in the [Wiping Node State](wiping-node-state.md#state-wipe-and-keep-node-identity) document.

## Updating Configuration

If the [Deployment Change Log](../../networks/amber-network/current-parameters.md#deployment-change-log) \(Amber Network\) provides instructions for updating your node's configuration, update the `/serverdir/etc/config.yml` file accordingly.

## Upgrading Oasis Core

Before starting your node again, make sure you upgrade your `oasis-node` binary to the current version specified in the [Current Testnet Parameters](../../networks/amber-network/current-parameters.md) \(Amber Network\).

## Starting the Node

This will depend on your process manager. If you don't have a process manager, you should use one. However, to start the node without a process manager you can start the `oasis-node` like so:

```bash
oasis-node --config /serverdir/etc/config.yml
```

## Cleaning Up

After you're comfortable with your node deployment, you can clean up the `genesis_dump.$HEIGHT_TO_DUMP.json` and `genesis_dump.$HEIGHT_TO_DUMP.pretty.json` files.

