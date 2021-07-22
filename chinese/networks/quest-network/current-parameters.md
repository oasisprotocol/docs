# Current Parameters

{% hint style="danger" %}
The Quest Network has ended and transitioned to the [Amber Network](../amber-network/current-parameters.md). This deployment changelog is only provided for historical reference.
{% endhint %}

## Deployment Change Log <a id="deployment-change-log"></a>

### 2020-05-11 <a id="_2020-05-11"></a>

* Block height when network stops: **353000**
* Upgrade Window:
  * Start: **2020-05-11T16:00:00Z**
  * End: **2020-05-12T15:59:59Z**
    * As with previous deploys, the "_End_" of the window is not something we can enforce unilaterally, however, if, for whatever reason, not enough people upgrade on the public testnet we _may_ release and redeploy a new genesis block that removes inactive nodes from the validator set.

#### Upgrade Procedure <a id="upgrade-procedure-4"></a>

1. \(Optional\) Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-05-11 release](https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-05-11).
3. Stop your node.
4. [Wipe Node State](https://docs.oasis.dev/operators/maintenance/wiping-node-state.html#state-wipe-and-keep-node-identity).
5. Upgrade `oasis-node` to version [20.6](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.6).
6. If you have been using the prometheus metrics on `oasis-node`, these options have changed. Please see the [20.6 Changelog](https://github.com/oasisprotocol/oasis-core/blob/v20.6/CHANGELOG.md#206-2020-05-07) and update your configuration.
7. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades](https://docs.oasis.dev/operators/maintenance/handling-network-upgrades.html) guide.

### 2020-04-16 <a id="_2020-04-16"></a>

#### Upgrade Parameters <a id="upgrade-parameters"></a>

* Block height when network stops: **591600**
* Upgrade Window:
  * Start: **2020-04-16T16:00:00Z**
  * End: **2020-04-17T15:59:59Z**
    * As with previous deploys, the "_End_" of the window is not something we can enforce unilaterally, however, if, for whatever reason, not enough people upgrade on the public testnet we _may_ release and redeploy a new genesis block that removes inactive nodes from the validator set.

#### Upgrade Procedure <a id="upgrade-procedure-5"></a>

1. \(Optional\) Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-04-16 release](https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-04-16).
3. Stop your node.
4. [Wipe Node State](https://docs.oasis.dev/operators/maintenance/wiping-node-state.html#state-wipe-and-keep-node-identity).
5. Upgrade `oasis-node` to version [20.5](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.5).
6. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades](https://docs.oasis.dev/operators/maintenance/handling-network-upgrades.html) guide.

### 2020-03-05 <a id="_2020-03-05"></a>

#### Upgrade Parameters <a id="upgrade-parameters-2"></a>

* Block height to dump: **335400**
* Upgrade Window
  * Start: **2020-03-05T17:00:00Z**
  * End: **2020-03-06T16:59:59Z**
    * The "_End_" of the window is not something we can enforce unilaterally, however, if, for whatever reason, not enough people upgrade on the public testnet we _may_ release and redeploy a new genesis block that removes inactive nodes from the validator set.

#### Upgrade Procedure <a id="upgrade-procedure-6"></a>

1. Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-03-05 release](https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-03-05).
3. Stop your node.
4. [Wipe Node State](https://docs.oasis.dev/operators/maintenance/wiping-node-state.html#state-wipe-and-keep-node-identity).
5. Upgrade `oasis-node` to version [20.4.1](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.4.1).
6. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades](https://docs.oasis.dev/operators/maintenance/handling-network-upgrades.html) guide.

### 2020-02-11 <a id="_2020-02-11"></a>

#### Upgrade Parameters <a id="upgrade-parameters-3"></a>

* Block height to dump: **270000**
* Upgrade Window
  * Start: **2020-02-11T17:00:00Z**
  * End: **2020-02-12T16:59:59Z**
    * The "_End_" of the window is not something we can enforce unilaterally, however, if, for whatever reason, not enough people upgrade on the public testnet we _may_ release and redeploy a new genesis block that removes inactive nodes from the validator set.

#### Upgrade Procedure <a id="upgrade-procedure-7"></a>

1. Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-02-11 release](https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-02-11).
3. Stop your node.
4. [Wipe Node State](https://docs.oasis.dev/operators/maintenance/wiping-node-state.html#state-wipe-and-keep-node-identity).
5. Delete `/serverdir/node/tls_identity.pem` and `/serverdir/node/tls_identity_cert.pem`.
   * The format for the TLS keys have changed. This will be regenerated on restart.
6. Update your `/serverdir/etc/config.yml` per the below instructions.
7. Upgrade `oasis-node` to version [20.3.1](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.3.1).
8. Start your node.

#### `/serverdir/etc/config.yml` Required Changes <a id="serverdir-etc-config-yml-required-changes"></a>

**Changed**

The `tendermint.seed` field has moved to `tendermint.p2p.seed`

Old Version:

```yaml
tendermint:
  # ... other config
  seed:
    - "{{ seed_node_address }}"
```

New Version:

```yaml
tendermint:
  # ... other config
  p2p:
    seed:
      - "{{ seed_node_address }}"
```

### 2020-01-23 <a id="_2020-01-23"></a>

You should only need to do an upgrade as detailed in the [Handling Network Upgrades](https://docs.oasis.dev/operators/maintenance/handling-network-upgrades.html) guide.

### 2020-01-15 <a id="_2020-01-15"></a>

**`/serverdir/etc/config.yml` Required Changes**

If you've deployed before, we changed the storage backend from `boltdb` to `badger`.

### 2019-12-17 <a id="_2019-12-17"></a>

You should only need to do an upgrade as detailed in the [Handling Network Upgrades](https://docs.oasis.dev/operators/maintenance/handling-network-upgrades.html) guide.

### 2019-11-26 <a id="_2019-11-26"></a>

#### `/serverdir/etc/config.yml` Required Changes <a id="serverdir-etc-config-yml-required-changes-2"></a>

**Changed**

Format for seed nodes has changed. Previously it only accepted a string. Now it supports an array of strings.

Old Version:

```yaml
tendermint:
  # ... other config
  seeds: "{{ seed_node_address }}"
```

New Version:

```yaml
tendermint:
  # ... other config
  seed:
    - "{{ seed_node_address0 }}"
    - "{{ seed_node_address1 }}"
```

**Removed**

This temporary configuration on the initial deployment is no longer necessary. These lines have been removed.

```yaml
## THESE NEXT 3 LINES ARE TEMPORARY YOU SHOULD NOT EXPOSE THIS PORT IN ANY WAY
grpc:
  debug:
    port: "42261"
```

#### Staking and Registration Changes <a id="staking-and-registration-changes"></a>

The CLI for creating and submitting staking and registration transactions have changed. If you've already staked and registered your entity, then there's no need to make any changes.

#### Docker Support <a id="docker-support"></a>

We no longer document using the Docker container for setup or deployment as we now distribute `oasis-node` binaries. You may still use the Docker container, and we will, for now, document the current Docker image tag for a given deployment.

### 2019-11-13 <a id="_2019-11-13"></a>

This is the initial deployment.

