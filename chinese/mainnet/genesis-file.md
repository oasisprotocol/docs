---
description: >-
  本文介绍 Oasis主网 genesis文件。
---

# Genesis 文件介绍

{% hint style="info" %}
可以在 [Network Parameters](../oasis-network/network-parameters.md) 找到 Genesis 文件。
{% endhint %}

{% hint style="warning" %}
请注意，在Oasis主网启动前，genesis文件中的参数和对应的数值可能会发生变化。
{% endhint %}

## What is a Genesis File?

genesis文件是一个JSON文档文件，它包含一组参数，概述了网络的初始状态。
Oasis Network的genesis文件中定义的状态包含了启动Oasis Network Mainnet的所有必要信息，包括初始代币分配、网络参数等。我们将在这里介绍的genesis文件中的一些关键参数。

### Genesis File vs. Genesis Document

当Oasis 节点加载genesis文件\(JSON 文档\)时，它将其转换为genesis文档。

需要注意的是，genesis文档是用来计算[genesis文档hash](https://docs.oasis.dev/oasis-core/high-level-components/index/genesis#genesis-documents-hash)的。

此hash用于验证交易用于哪个网络。

{% hint style="info" %}
关于 genesis 文档更多的介绍， 请看 [Genesis 文档](https://docs.oasis.dev/oasis-core/high-level-components/index/genesis)。
{% endhint %}

## Genesis Time and Chain ID

**genesis\_time** 参数是ISO8601 UTC时间戳，用于指定何时正式启动区块链。在创世之时，验证者有望上线并开始参与网络运营的共识过程。 一旦代表初始共识委员会超过2/3股份的验证人在线，网络便会启动。

**chain\_id** 是区块链的可读版本标识符。要注意，仅此值并不决定genesis文件的版本。 为了确定genesis文件的正确版本，将需要生成该创世文件的hash。执行以下命令极即可：

```text
shasum -a 256 genesis.json
```

## Epoch Time

参数**interval**指定了一个 _epoch_ 的块数。Epoch 用于衡量奖励计划， 非Mainnet测试网络到期时间等的时间量度。
该值设置为600，表示每次生成600个新块时，都会在Oasis网络上出现一个新Epoch。

## Node Operator Registry
在**registry**对象中，有各种各样的参数可以指定节点运算符的初始集合及其相应的初始节点状态。

* **max\_node\_expiration** - 节点注册持续的最大持续时间\(epochs\)。初始值设置为2，以确保节点持续在线，因为每次过了2个epoch，节点的注册就会失效，需要节点重新注册。

* **entities** - 初始节点操作者的实体登记，包括公钥和签名信息。这里的数值是在9月初进行的实体包收集过程中获得的。

{% hint style="warning" %}
如果你是成功完成KYC流程的运营商，并在9月初的截止日期前提交了实体包，你的实体应该包含在genesis文件中。
如果你希望你的实体被包含在genesis文件中，请查看[genesis文件](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-09-22/genesis.json)的实体部分，以确保你的实体被包含在genesis文件中。

你可以使用提交的实体包中的实体公钥在genesis文件中搜索自己实体。如果在查找实体时遇到任何问题，请通过genesis文件[反馈表]
(https://oasisfoundation.typeform.com/to/yG4pp57W)告诉我们。
{% endhint %}

* **nodes** - 初始节点操作人员的节点注册，包括公钥和签名信息。

## Gas Costs

以下参数确定了网络上各种类型交易的gas成本：


* **compute\_commit** - ParaTime节点的计算提交成本。该值设置为10000 gas。
* **merge\_commit** - ParaTime合并提交的费用。该值设置为10000 gas。
* **add\_escrow** -  一次add_escrow（增加抵押）的费用。该值设定为1000gas。
* **burn** - 一次销毁交易的成本。该值设定为1000gas.
* **reclaim\_escrow** - reclaim\_escrow（取回抵押）交易的费用。该值设定为1000gas.
* **transfer** - 一次交易的成本（发送代币). 该值设定为1000gas.
* **amend\_commission\_schedule** - 更改佣金表的费用。该值设定为1000gas.

## Node & Runtime Token Thresholds

有几个**阈值**参数指定了特定实体或特定类型节点参与网络所需的最低代币数量。

为**entity,** **node-compute, node-keymanager, node-storage,** 和 **node-validator** 参数指定的最小阈值为100000000000 nROSE，表示你需要至少抵押100个ROSE代币，才能让你的实体或任何一个指定节点上线。
注册新运行时也有最低门槛。注册**runtime-compute**和**runtime-keymanager**的最低门槛为50000000000000 nROSE，表示至少需要抵押50000个ROSE代币才能注册一个运行时。

## Staking & Rewards

这些关键参数与网络上的抵押和奖励有关：

* **debonding\_interval** - 在申请提取的定金或委托代币返回到账户之前必须经过的时间段（以epoch为单位）。该值设置为336个epoch，预计约为14天。

* **reward\_schedule** - 抵押奖励时间表，表明抵押奖励率如何随时间变化，按每个epoch的颗粒度定义。奖励表采用渐进式，在较早的epoch支付较高的奖励，然后随着时间的推移逐渐减少。

* **signing\_reward\_threshold\_numerator** 和 **signing\_reward\_threshold\_denominator** - 这些参数定义了验证者在每个纪元中必须签署的区块比例，以获得抵押奖励。3/4的比例意味着验证者必须在一个周期内保持至少75%的正常运行时间，才能获得该周期的抵押奖励。

* **rate\_change\_interval** - 在佣金表中可以指定佣金率变化的粒度。这限制了佣金表的复杂程度；该值设置为1，表示佣金率每epoch可以改变一次。

* **rate\_bound\_lead** - 佣金费率界限变化所需的最短准备时间。运营商需要在任何费率界限变化生效前等待。该值为336，预计约为14天。

* **max\_rate\_steps** - 佣金表中允许的最大费率级数变化，该值设置为10，表示佣金表最多可以有10个费率级数。

* **max\_bound\_steps** - 佣金表中最大允许的佣金率约束步数变化。该值设置为10，表示佣金表最多可以有10个约束步数。

* **min\_delegation** - 授权中所需要的最低数量的代币。该值设置为100000000000 nROSE，即100个ROSE代币。

* **fee\_split\_weight\_propose** - 区块提案人的交易费份额，设为2。

* **fee\_split\_weight\_next\_propose** - 下一个提案人的交易费用份额，设为1。

* **fee\_split\_weight\_vote** - 签名人/投票人在交易费中的份额，设为1；

* **reward\_factor\_epoch\_signed** - 分配给在某一epoch至少签署了阈值区块的验证者的奖励系数，设为1。

* **reward\_factor\_block\_proposed** - 提出区块所获得的奖励的系数。设为0，表示验证者不会因为提出区块而获得额外的赌注奖励。

## Token Supply & Ledger

* **total\_supply** - 代币的总供应总量，固定为100亿ROSE代币。

* **common\_pool** - 预留的抵押奖励的代币，将按时间发放。

* **ledger** - 抵押总帐目，编码所有账户和在创世时网络上的相应账户余额，包括初始操作员的账户，支持者，保管钱包等。

* **delegations** - 在创世时最初的委托编码。

{% hint style="warning" %}

如果你是成功完成KYC流程的运营商，并在9月初的截止日期前提交了实体包，你的账户应该包含在创世文件中，账户总余额和托管金额反映了你在Mainnet之前收到的任何赠款、奖励等。如果你希望账户被纳入创世文件，请查看[创世文件]的分类账部分，以确保你的账户被纳入[genesis 文件](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-09-22/genesis.json)。
请记住，代币的单位是nROSE，10亿nROSE相当于1个ROSE代币。你可以在genesis文件的账目部分搜索账户节点，搜索你的抵押地址，这是一个Bech32编码的地址，前缀为 "oasis"。如果你在账本中找不到账户，请通过创世文件[反馈表](https://oasisfoundation.typeform.com/to/yG4pp57W)告诉我们。
{% endhint %}

{% hint style="info" %}
**Interpreting your account balance in the ledger:**
你的**一般**余额包括你所有没有被抵押或授权的代币。这将在创世时设置为100个代币，以覆盖gas，因为你的大部分代币（除了一般余额100外）最初将代表你进行抵押（自我委托）。在**escrow**中，你的**active**参数显示的是已经分配或委托给你的代币总数。
{% endhint %}

## Slashing

这些参数为网络的削减机制指定了关键值：

* **amount** - 要进行双重签名的token数量，请减少。 该值设置为100000000000 nROSE或100个ROSEtoken。

* **freeze\_interval** - 被冻结进行双重签名的节点的持续时间（以epoch为单位）为“冻结”，或者被禁止参加网络的共识委员会。18446744073709551615 \（64位无符号整数的最大值\）表示实际上已永久禁止从网络中删除任何进行双签名的节点。

## Consensus

以下是用于定义网络共识协议的关键参数：

* **min\_validators** - 委员会的最小规模，为 15个验证者.
* **max\_validators** - 委员会的最大规模, 为 80 个验证者.
* **max\_validators\_per\_entity** - 某一实体在任何时候可以加入共识委员会的最大节点数。值为 1.
* **backend** - 定义后台共识协议。指定为 "tendermint"。
* **timeout\_commit** - 指定在提交一个块后，在开始一个新的块高度之前等待的时间，单位为纳秒。 \(区块的间隔\). 值为 5000000000 纳秒, or 5秒.
* **max\_tx\_size** - 共识层交易的最大字节数。 为 32768 字节.
* **max\_block\_size** - 区块最大尺寸，单位是字节，为 22020096 字节。
* **max\_block\_gas** - 最大区块 gas, 值为 0，gas量不限。
* **public\_key\_blacklist** - 公钥列黒名单。

## Transfers

请注意，Mainnet测试版的交易将被禁止，我们希望一旦由社区提出并通过启用开始Mainnet。交易在Mainnet Dry上启用，以完全测试这个功能。

## Feedback

你可以使用提交的实体包中的实体公钥在genesis文件中搜索自己实体。如果在查找实体时遇到任何问题，请通过genesis文件[反馈表]
(https://oasisfoundation.typeform.com/to/yG4pp57W)告诉我们。

##
