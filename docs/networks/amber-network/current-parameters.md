# Current Parameters

This page is meant to be kept up to date with the information from the currently released Testnet. Use the information here to deploy or upgrade your node on the Testnet.

* [Genesis Document](https://github.com/oasisprotocol/public-testnet-artifacts/releases/download/2020-08-06/genesis.json)
  * SHA1: `06a2664dd48eecbfeafb1e02a47fa50260fc25b8`
  * SHA256: `595718edf9a135774c5ffb879515c232835dee22466f3fb83ef99d60d64a700f`
* Oasis Seed Node Address:
  * `902521223C5095D74CF97E6CEE86A85038467547@34.86.145.181:26656`

{% hint style="success" %}
Feel free to use other seed nodes besides the one provided here.
{% endhint %}

* [Oasis Core](https://github.com/oasisprotocol/oasis-core) version:
  * [20.9](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.9)

{% hint style="info" %}
The `oasis-node` binary is part of the Oasis Core release.
{% endhint %}

{% hint style="danger" %}
Do not use a newer version of Oasis Core since it likely contains changes that are incompatible with the version of Oasis Core used by other nodes in the current testnet.
{% endhint %}

## Deployment Change Log <a id="deployment-change-log"></a>

### 2020-08-06 \(Latest\) <a id="_2020-08-06-latest"></a>

* Block height when network stops: **717600**
* Upgrade Window:
  * Start: **2020-08-06T16:00:00Z**
  * End: **2020-08-07T15:59:59Z**
    * As with previous deploys, the "_End_" of the window is not something we can enforce unilaterally, however, if, for whatever reason, not enough people upgrade on the public testnet we _may_ release and redeploy a new genesis block that removes inactive nodes from the validator set.

#### Upgrade Procedure <a id="upgrade-procedure"></a>

_Please note, our internal deployment process has changed and the seed node may have a different address_

1. Download and verify the genesis document published in the [2020-08-06 release](https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-08-06).
2. Stop your node.
3. [Wipe Node State](https://docs.oasis.dev/operators/maintenance/wiping-node-state.html#state-wipe-and-keep-node-identity).
4. Update your `config.yml`. See below for configuration changes.
5. Upgrade `oasis-node` to version [20.9](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.9).
6. Start your node.

#### `config.yml` Changes <a id="config-yml-changes"></a>

Per [configuration changes](https://github.com/oasisprotocol/oasis-core/blob/master/CHANGELOG.md#configuration-changes) in `oasis-core`. The `tendermint` section of the `config.yml` has been moved under the `consensus` section to `consensus.tendermint`.

For example, this configuration:

```yaml
consensus:
  validator: True

tendermint:
  p2p:
    seed:
      - "{{ seed_address }}"
```

Becomes:

```yaml
consensus:
  validator: True

  tendermint:
    p2p:
      seed:
        - "{{ seed_address }}"
```

### 2020-07-02 <a id="_2020-07-02"></a>

Patch upgrade. This update applies fixes for [CVE-2020-15091](https://github.com/tendermint/tendermint/security/advisories/GHSA-6jqj-f58p-mrw3) in Tendermint.

#### Upgrade Procedure <a id="upgrade-procedure-2"></a>

**DO NOT WIPE STATE. The genesis is still the** [**2020-06-18 release**](https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-06-18) **genesis document.**

1. Shutdown your `oasis-node` process
2. Upgrade your `oasis-node` to version [20.8.2](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.8.2)
3. Start your node

### 2020-06-18 <a id="_2020-06-18"></a>

The Amber Network starts at 2020-06-18T16:00:00Z.

#### Upgrade Procedure <a id="upgrade-procedure-3"></a>

1. Download and verify the genesis document published in the [2020-06-18 release](https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-06-18).
2. Stop your node.
3. [Wipe Node State](https://docs.oasis.dev/operators/maintenance/wiping-node-state.html#state-wipe-and-keep-node-identity).
4. Update your `/serverdir/etc/config.yml` with the new seed node address: [`[email protected]`](https://docs.oasis.dev/cdn-cgi/l/email-protection)`:26656`
5. Upgrade `oasis-node` to version [20.8](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.8).
6. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades](https://docs.oasis.dev/operators/maintenance/handling-network-upgrades.html) guide.

{% hint style="info" %}
Two `oasis-core` releases have occurred since the end of The Quest. If you are doing anything that isn't part of the normal documentation and you see it failing, please check the [20.8 Changelog](https://github.com/oasisprotocol/oasis-core/blob/v20.8/CHANGELOG.md#208-2020-06-16) and [20.7 Changelog](https://github.com/oasisprotocol/oasis-core/blob/v20.8/CHANGELOG.md#207-2020-06-08).
{% endhint %}

