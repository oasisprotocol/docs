---
description: >-
  For each upgrade of the network, we will track important changes for node
  operators' deployments.
---

# Upgrade Log

## 2020-11-18 \(16:00 UTC\) - Mainnet

* **Block height** when Mainnet Beta network stops: **702000.**

{% hint style="info" %}
We expect the Mainnet Beta network to reach this block height at around 2020-11-18 13:30 UTC.
{% endhint %}

* **Upgrade window:**
  * Start: **2020-11-18T16:00:00Z.**
  * End: After nodes representing **2/3+ stake** do the upgrade.

### Instructions

* Download [Oasis Node](prerequisites/oasis-node.md) version [20.12.2](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.2), while continuing to run version 20.10.x.
* \(optional\) Use Oasis Node version 20.12.2 to dump network state at the specified block height. It will connect to the running version 20.10.x node.
* Download the Mainnet genesis file published in the [2020-11-18 release](https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-11-18).
* \(optional\) Verify the provided Mainnet genesis file by comparing it to network state dump. See instructions in the [Handling Network Upgrades](maintenance-guides/handling-network-upgrades.md#download-and-verify-the-provided-genesis-file) guide.
* Replace the old Mainnet Beta genesis file with the Mainnet genesis file.
* Stop your node.
* Remove the old 20.10.x version of Oasis Node.
* [Wipe state](maintenance-guides/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Update your node's configuration per instructions in [Configuration changes](upgrade-log.md#configuration-changes) below.
* Start your node.

{% hint style="info" %}
This time, we recommend dumping the network state with the upgraded Oasis Node binary so that the genesis file will be in the [canonical form](https://docs.oasis.dev/oasis-core/high-level-components/index/genesis#canonical-form).

The canonical form will make it easier to compare the obtained genesis file with the one provided by us.
{% endhint %}

{% hint style="info" %}
For more detailed instructions, see the [Handling Network Upgrades](maintenance-guides/handling-network-upgrades.md) guide.
{% endhint %}

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

## 2020-10-01 - Mainnet Beta

### Instructions

* Stop your node.
* [Wipe state](maintenance-guides/wiping-node-state.md#state-wipe-and-keep-node-identity).
* Replace the old genesis file with the Mainnet Beta genesis file published in the [2020-10-01 release](https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-10-01).
* Start your node.

{% hint style="info" %}
You should keep using Oasis Core version 20.10.
{% endhint %}

{% hint style="info" %}
For more detailed instructions, see the [Handling Network Upgrades](maintenance-guides/handling-network-upgrades.md) guide.
{% endhint %}

## 2020-09-22 - Mainnet Dry Run

### Instructions

* This is the initial deployment.

