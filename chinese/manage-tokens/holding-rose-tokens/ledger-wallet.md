# 使用Ledger管理钱包

## Install Oasis App

要使用你的[Ledger](https://www.ledger.com/)钱包来存放ROSE代币，请通过[Ledger Live](https://www.ledger.com/ledger-live/)的管理器在你的Ledger钱包上安装[Oasis 应用](https://github.com/Zondax/ledger-oasis)。

{% hint style="info" %}
目前，你必须通过 _设置-&gt;实验功能_ 启用 _开发者模式_，才能在Ledger Live的管理器中找到Oasis应用。
{% endhint %}

{% hint style="warning" %}

Oasis应用需要在你的Ledger钱包上安装最新的固件：

* Nano S 的版本至少是[1.6.1](https://support.ledger.com/hc/en-us/articles/360010446000-Ledger-Nano-S-firmware-release-notes)，在2020年8月11日发布。

Nano X 的版本至少是[1.2.4-4](https://support.ledger.com/hc/en-us/articles/360014980580-Ledger-Nano-X-firmware-release-notes)，在2020年8月4日发布。

按照Ledger的说明更新你的Ledger钱包上的固件：

* [Nano S](https://support.ledger.com/hc/en-us/articles/360002731113-Update-Ledger-Nano-S-firmware)
* [Nano X](https://support.ledger.com/hc/en-us/articles/360013349800)
{% endhint %}

要在Ledger Live应用商店中找到Oasis应用，请进入应用目录的搜索栏，输入 _Oasis_：

![](../../.gitbook/assets/image%20%284%29.png)

{% hint style="warning" %}
要确保你至少安装了1.8.1版本的Oasis应用。
{% endhint %}

{% hint style="info" %}
你可能会看到 _Oasis_ 和 _OasisVal_ 同时出现在搜索结果中。你要使用标准的 _Oasis_ 。
{% endhint %}

安装后，Oasis应用程序将使用存储在Ledger钱包中的[BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)助记词语为你的账户生成私钥和公钥对。

## Manage Your Tokens

### Using Ledger-backed Web Wallets

这是一个更简单的选择，因为它允许你通过一个网页浏览器应用程序连接到你的Ledger钱包。

按照[Web Wallets](.../web-wallets.md#ledger-backed-web-wallets)文档中的说明进行操作。

### Using Oasis CLI Tools

这是最强大的选项，可以执行任何与代币相关的任务。

按照[Oasis CLI 工具](./oasis-cli-tools/)文档中的说明进行操作。
