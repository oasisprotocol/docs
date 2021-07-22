---
description: >-
  对于网络的每一次升级，我们都会跟踪节点运营商部署的重要变化。

---

# 更新日志

## 2020-11-18 \(16:00 UTC\) - Mainnet \(Upcoming\)

* **区块高度**  Beta主网停止高度: **702000.**

{% hint style="info" %}
我们预计Mainnet Beta网络将在2020-11-18 13:30 UTC 左右达到这个区块高度。
{% endhint %}

* **升级窗口：**
  * 开始： **2020-11-18T16:00:00Z.**
  * 结束：**2/3以上抵押节点** 升级后

### 说明

* 下载 [Oasis节点](prerequisites/oasis-node.md) 版本 [20.12.2](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.2)，同时继续运行20.10.x版本。

* (可选) 使用Oasis Node 20.12.2版本在指定的区块高度转储网络状态。它将连接到正在运行的20.10.x版本节点。

* 在 [2020-11-18 release](https://github.com/oasisprotocol/mainnet-artifacts/releases/tag/2020-11-18) 下载 主网 genesis 文件。

* （可选）通过将提供的Mainnet生成文件与网络状态转储进行比较，来验证该文件。请看[处理网络升级](maintenance-guides/handling-network-upgrades.md#download-and-verify-the-provided-genesis-file)的说明。

* 用 genesis文件替换旧的 Beta genesis文件

* 停止节点

* 删除 旧的 20.10.x 版本

* [擦除状态] state](maintenance-guides/wiping-node-state.md#state-wipe-and-keep-node-identity)

* 根据[配置更新](upgrade-log.md#configuration-changes)中的说明更新节点的配置。

* 运行节点

{% hint style="info" %}

这次，我们建议使用升级后的Oasis Node二进制文件转储网络状态，以使创世纪文件的格式为[canonical form](https://docs.oasis.dev/oasis-core/high-level-components/index/genesis#canonical-form)。

canonical form将使获得的genesis文件与我们提供的文件更容易比较。
{% endhint %}

{% hint style="info" %}
更详细的说明，请看 [网络升级指南](maintenance-guides/handling-network-upgrades.md)。
{% endhint %}

### 配置更新


由于我们升级到了Mainnet，所以建议你修改节点配置。删除`consensus.tendermint.abci.prune`，就可以禁止修剪共识的状态。

配置为：

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

变成：

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

### 说明

* 停止节点
* [擦除状态](maintenance-guides/wiping-node-state.md#state-wipe-and-keep-node-identity)

* 将旧的genesis文件替换为[Mainnet Beta genesis 文件](../mainnet/mainnet-beta-overview.md#mainnet-beta-genesis-file)】。

* 运行节点

{% hint style="info" %}
你应该继续使用 Oasis Core 20.10。
{% endhint %}

{% hint style="info" %}
更详细的说明，请看 [网络升级指南](maintenance-guides/handling-network-upgrades.md)。

{% endhint %}

## 2020-09-22 - Mainnet Dry Run

### 说明

* 这是初始部署
