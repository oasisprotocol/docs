---
description: >-
    本文介绍了Mainnet Beta网络，这是Oasis网络Mainnet启动前的最后一步。
---

# 主网Beta版介绍

{% hint style="warning" %}
**Mainnet测试版将于 utc时间2020年10月1日16:00启动**。
{% endhint %}

{% hint style="info" %}
**genesis文件中的所有节点都被鼓励参加主网测试**
{% endhint %}

在成功进行[MainnetDry Run]()后，其中的Dry Run测试网络在不到1分钟的时间内上线了，我们准备启动Mainnet Beta！

## What is Mainnet Beta?

主网 Beta是启动主网络的第一阶段。 它包括最终确定的主网[genesis文件](genesis-file.md)和初始代币分配。以下是几大亮点：

* **主网测试期间交易被禁止**
* 参加tMainne测试版的**验证者**将可以**开始获得押金奖励**。
* 当网络升级并启用代币转账时，主网 Beta版的所有**账户余额**将 **转入主网**。
* **奖励计划**将在 **主网重置**，但主网测试期间获得的奖励将随着ROSE代币的生成而在主网上持续存在。

## Why launch a Mainnet Beta?

Mainnet Beta版的主要目标是以最安全的方式推出Oasis网络。

我们要确保在网络上线前对我们的设计进行广泛的测试和审查。Mainnet Beta版使社区能够有重点、有目的地对网络进行最后的检查，并允许社区提出并决定何时开启网络上的附加功能。这个渐进的过程将有助于为绿洲网络奠定坚实的基础。

## Mainnet Beta Timeline

我们预计在Mainnet Beta之后，验证者社区将很快推出Mainnet。

## Success Criteria

当验证者社区认为Mainnet测试版成功后，基金会将提议将网络升级为 Oasis Mainnet。我们认为，当下列条件得到满足时，该网络将为 Oasis网络Mainnet做好准备：

* 代表初始共识委员会2/3以上利益的验证者成功上线。
* 测试版网络成功运行至少10天。

Oasis Protocol 基金会将通过在[Slack](https://docs.oasis.dev/general/community-resources/connect-with-us)中分享电子邮件和消息，向节点操作者传达Mainnet测试版已经成功结束的消息。邮件将包括有关计划启动日期和主网的相关细节。


## **Mainnet Beta Genesis File**

Mainnet测试版[genesis文件](genesis-file.md)旨在尽可能地接近Mainnet的genesis文件。我们预计从现在到Mainnet启动期间，genesis文件参数不会有重大变化。

{% hint style="info" %}
The parts of the genesis file that will change between Mainnet Beta and Mainnet include:

* **genesis\_time.**
* **chain\_id.**
* **halt\_epoch.**
* Mainnet创世文件中的账户余额将包括验证者在Mainnet测试期间获得的额外代币。
* **disable\_transfer** 参数将被设置为 _false_（或省略），以启用Mainnet 转账。
{% endhint %}

你可以下载 [genesis文件](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-10-01/genesis.json).

你可以用以下哈希值来验证文件：

* SHA1: `3a17891f73ae2079e5a2cf7e53c25f7b26f63d3e`
* SHA256: `a188bcae5b6ba7b1d2bf7fd4b3972381db611989ab11a45059f6faee28ad2a8d`

更加详细的信息，请看 [Genesis 文件](https://docs.oasis.dev/general/pre-mainnet/genesis-file).

## Mainnet Beta Support

在Mainnet测试版推出期间，Oasis团队将提供实时视频支持。视频通话链接和日历细节将通过电子邮件和Slack与节点操作员共享。

如需更多支持，请通过 Oasis社区的[Slack](.../oasis-network/connect-with-us.md)联系，提出与Mainnet Beta相关的问题、意见和反馈。
