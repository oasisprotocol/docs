---
description: >-

  成为Oasis Network验证者的技术设置要求和抵押要求
---

# 运行验证节点

[Oasis Network](../oasis-network/overview.md) 的共识层是一组去中心化的验证者节点，它们维护着一个 PoS 区块链。这些节点由独立的节点操作者操作。

因此，它需要一套运行不同功能的分布式节点\(包括验证程序节点\)。

## 技术设置

确保你的系统符合[硬件](.../run-a-node/prerequisites/hardware-recommendations.md)的基本条件，[Oasis Node](../run-a-node/prerequisites/oasis-node.md) 也已经安装。


然后按照[运行验证器节点](../run-a-node/set-up-your-node/run-validator.md)进行操作：
* 创建 entity。
* 初始化节点配置。
* 在你的托管账户中投入足够的资金。
* 在网络上登记你的entity。

## 抵押要求

要成为Oasis的验证者，需要在你的托管账户中存入足够的代币。

{% hint style="info" %}

有关获取entity账的更多信息，请看文档[获取账户信息](.../manag-tokens/oasis-cli-tools/get-account-info.md)。

{% endhint %}

目前，你应该已经：

* 100个ROSE用于entity注册，因为这是[当前entity抵押的阈值](../mainnet/genesis-file.md#node-and-runtime-token-thresholds)。

* 100 ROSE staked for your validator node's registration since that is the [current validator node's staking threshold](../mainnet/genesis-file.md#node-and-runtime-token-thresholds).

* 100个ROSE用于验证器节点的注册，因为这是[当前entity抵押的阈值](../mainnet/genesis-file.md#node-and-runtime-token-thresholds)。

* 足够的ROSE股份进入前80个实体(以股份形式)，这样验证者将被选举进入共识委员会。

{% hint style="info" %}
共识委员会（即验证者集）的大小由 [max_validators 共识参数](../mainnet/genesis-file.md#consensus)配置。
{% endhint %}

{% hint style="info" %}
要确定你是否有资格获得 Oasis Protocol 基金会的代理权，请看[代理政策文件](../foundation/delegation-policy.md)。
{% endhint %}
