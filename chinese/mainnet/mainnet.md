# 主网介绍

本文件介绍了从Mainnet Beta升级到Mainnet的标准的变化。本文件已经 经[Oasis Network的社区成员和验证者审查和批准](https://github.com/oasisprotocol/community-forum/issues/1)，现转载并摘编于此，以方便查阅。

{% hint style="warning" %}
根据社区提议，从Mainnet Beta到Mainnet的升级将于2020年11月18日16:00UTC启动。
{% endhint %}

## Criteria for Mainnet

为了从Mainnet Beta过渡到Mainnet，社区成员集体建议满足以下条件。这是社区反馈的集合。

* [x] 代表最初的共识委员会2/3以上股份的验证人成功在线启动了Mainnet Beta。
* [x] Beta网络成功运行了至少10天。
* [x] 在过去的10天内，没有发现Beta网络上的主要安全风险，也没有对它进行补救和测试。
* [x] 网络上至少有50个验证者。
  * _在整个Mainnet Beta中，网络上有75至77个有效的验证者。_
* [x] 没有Oasis Protocol 基金会或Oasis Labs节点充当验证者。
* [x] 至少存在一个区块浏览器，以跟踪网络稳定性，交易和验证程序活动。
  * _还有更多。见_ [_Block Explorers & Validator 排行榜 _](https://docs.oasis.dev/general/community-resources/community-made-resources#block-explorers-validator-leaderboards)。

* [x] 至少有一个合格的保管人支持本地ROSE代币。
  * _目前，Anchorage和 Finoa支持ROSE代币。详细信息请看[_监护人_](https://docs.oasis.dev/general/use-your-tokens/holding-tokens/custody-providers)。

## Mechanics of Upgrading to Mainnet

从Mainnet Beta升级到Mainnet需要协调升级网络。所有节点都需要配置一个新的genesis文件，它们可以独立生成或验证，并重置/存档Mainnet Beta的任何状态。一旦有足够多的节点(代表2/3以上的利益)采取了这一步骤，网络就会启动。

## Proposed Changes From Mainnet Beta to Mainnet

Mainnet genesis文件旨在尽可能接近升级时Mainnet Beta网络的状态。这包括保留验证器代币余额，保留enesis文件钱包分配，以及快照时的区块高度。

此外，在收到社区的更多反馈后，Oasis Protocol 基金会提出了增加抵押奖励。

在新提出的模式中，抵押奖励将从20%开始，在网络的前4年中从20%到2%不等。 \(查看更多内容，请看 [代币分配](https://docs.oasis.dev/oasis-network-primer/token-metrics-and-distribution)\)。

{% hint style="info" %}
Genesis文件的以下部分将被更新：

* **`height`** 将与Mainnet Beta版快照时保持不变，即`702000`。
* **`genesis_time`**将设置为 `2020-11-18T16:00:00Z`。
* **`chain_id`** 将设置为 `oasis-1`。
* **`halt_epoch`** 将设置为 `9940` \(从Mainnet 运行起约1年\)。
* **`staking.params.disable_transfers`** 将省略(或设置为`false`)以实现转账。
* **`staking.params.reward_schedule`**  将被更新，以反映上述更新的奖励时间表。
* **`staking.common_pool`** 将增加4.5亿ROSE，以资助增加押注奖励。
* **`staking.ledger.oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6`**,  与社区和生态系统钱包相对应的 `general.balance`将减少4.5亿ROSE至 `1183038701000000000`，并转入共同Common Pool，以资助增加定金奖励。

* **`extra_data`** 将被设置为 [Mainnet Beta genesis 文件](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-10-01/genesis.json) 中的值，包含Oasis的创世引言：“_[Quis custodiet ipsos custodes?](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F)_”。[由Oasis社区成员Daniyar Borangaziyev提交]。


  ```diff
    "extra_data": {
      "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="
    }
  ```
{% endhint %}

参见更新后的[网络参数](.../oasis-network/network-parameters.md)发布的主网 genesis 文件。

{% hint style="info" %}
关于如何通过比较网络状态转储来验证所提供的Mainnet genesis文件的详细说明，请阅读 [处理网络升级](../run-a-node/maintenance-guides/handling-network-upgrades.md#example-diff-for-mainnet-beta-to-mainnet-network-upgrade)。
{% endhint %}

主网将会使用 [**Oasis Core 20.12.2 版本**](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.2)。

## Mainnet Launch Support

在Mainnet发布期间，Oasis团队将提供实时视频支持。视频通话链接和日历细节将通过电子邮件和Slack与节点操作员者分享。

如需更多支持，请通过 Oasis社区的[Slack频道](.../oasis-network/connect-with-us.md)联系，提出与Mainnet Beta相关的问题、意见和反馈。

关注Oasis，请使用包括[oasisscan.com](https://www.oasisscan.com/)在内的社区版区块浏览器。
