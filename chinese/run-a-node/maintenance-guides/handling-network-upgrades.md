# 处理网络升级

{% hint style="warning" %}
如果没有网络升级的时候，则按照本指南进行操作会导致你失去当前网络的资格。
{% endhint %}

当网络同意进行软件升级时，请使用以下指南。

## Dump Network State

{% hint style="info" %}
暂时不要停止[Oasis Node](../prerequisites/oasis-node.md) 进程。
{% endhint %}


升级之前，我们将更新[升级日志](../upgrade-log.md)，以指定要转储的区块块高度。

要将网络状态转储到genesis文件中，请运行：

```bash
oasis-node genesis dump \
  -a unix:/serverdir/node/internal.sock \
  --genesis.file /serverdir/etc/genesis_dump.json \
  --height <HEIGHT-TO-DUMP>
```

用我们指定的区块高替换`<HEIGHT-TO-DUMP>`。

{% hint style="warning" %}

你只能在网络达到 `<HEIGHT-TO-DUMP>` 区块的高度后才能运行以下命令。

查看当前的区块高度，请运行：

```bash
oasis-node control status -a unix:/serverdir/node/internal.sock
```

并观察`consensus.last_height`的值。

{% endhint %}

## Patch Dumped State

{% hint style="info" %}
目前，我们不提供状态补丁。
{% endhint %}

## Download and Verify the Provided Genesis File

从[Network Parameters](../../oasis-network/network-parameters.md)  下载新的 genesis 文件，保存为 `/serverdir/etc/genesis.json`。

然后将转储状态与下载的genesis文件进行比较：

```bash
diff --unified=3 genesis_dump.json genesis.json
```

### Example diff for Mainnet Beta to Mainnet network upgrade

假设上面的`diff`命令返回：

```diff
--- genesis_dump.json	2020-11-16 17:49:46.864554271 +0100
+++ genesis.json	2020-11-16 17:49:40.353496022 +0100
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

我们可以观察到，提供的genesis文件主要更新了某些特定的网络参数。 此外，一些ROSE token已从帐户转移到Common Pool。 其他内容保持不变。
让我们来分析一下变化，并解释一下发生了什么变动。

在网络升级时，以下genesis文件字段总是会改变：

* `chain_id`：网络的唯一ID。
* `genesis_time`：genesis 文件的有效时间。
* `halt_epoch`： 节点停止运行的时间。设置这个值是为了强制升级。

The following fields were a particular change in this upgrade:

下面的字段是此次升级中的特殊改动：

* `staking.params.reward_schedule`：描述了权益奖励模型。改为从20%/(年化)开始，在头4年中年化从20%到2%不等。更多细节，请看更新后的[token 分发](https://docs.oasis.dev/oasis-network-primer/token-metrics-and-distribution)文档。

* `staking.params.disable_transfers`: 字段已删除，以实现代币转账。

* `staking.common_pool`：代表的是Common Pool。其余额增加了4.5亿ROSE，为增加抵押奖励提供资金。

* `staking.ledger.oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6`：对应的是 Community and Ecosystem 钱包地址。

* `extra_data`：该字段可以保存网络的额外数据，但目前被忽略。此次升级，我们把它改回了Mainnet Beta genesis文件中的值，以包含Oasis的创世引言：“_[Quis custodiet ipsos custodes?](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F)_”。[由Oasis社区成员Daniyar Borangaziyev提交]。

{% hint style="info" %}
Genesis 文件中的余额以nROSE为单位，10亿nROSE相当于1个ROSE代币。更多细节请看[Genesis 文件](../../mainnet/genesis-file.md)。
{% endhint %}

如果获得相同的结果，则说明你已成功验证了Genesis文件。

## Stop Your Node

这将取决于你的进程管理器。你应该停止[Oasis Node](.../prerequisites/oasis-node.md)进程。

## Wipe State

{% hint style="warning" %}
我们不建议你擦除 _所有_ 状态。如果你这样做，可能会丢失节点标识和密钥。
{% endhint %}

在重新启动节点之前，你应该擦除共识状态。[擦除 Node 状态](wiping-node-state.md#state-wipe-and-keep-node-identity)文档中介绍了这个过程。

## Update Configuration

如果[升级日志](../upgrade-log.md)提供了更新后的节点配置的说明，请相应更新 `/serverdir/etc/config.yml`文件。

## Upgrade Oasis Node

在再次启动节点之前，请确保将 [Oasis Node](../prerequisites/oasis-node.md) 二进制程序升级到 [Network Parameters](../../oasis-network/network-parameters.md) 中指定的版本。

## Start Your Node

这将取决于你的过程管理器。如果没有流程管理器，你可以选择使用一个。
如果在没有进程管理器的情况下启动节点，可以运行一下命令启动 [Oasis Node](../prerequisites/oasis-node.md)：

```bash
oasis-node --config /serverdir/etc/config.yml
```

## Clean Up

当节点部署成功，你可以清理掉`genesis_dump.json`文件。
