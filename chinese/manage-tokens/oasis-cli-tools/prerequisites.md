# 准备环节

本节列出了使用代币的准备环节。

{% hint style="info" %}

目前，唯一支持和记录的使用代币的方式是利用Oasis Node CLI与：

* [Ledger ](https://docs.oasis.dev/oasis-core-ledger/)，或者
* 文件签名器。
{% endhint %}

## Oasis Node CLI

要设置Oasis Node CLI，请参考Oasis Node文档：

{% page-ref page="../../run-a-node/prerequisites/oasis-node.md" %}

## Ledger-based signer

{% hint style="info" %}
当你使用[Ledger 钱包](../holding-rose-tokens/ledger-wallet.md)保存代币的时候才需要这样。
{% endhint %}

使用Ledger与Oasis Node CLI结合使用，请参考[Oasis Core Ledger](https://docs.oasis.dev/oasis-core-ledger/)中的 [设置](https://docs.oasis.dev/oasis-core-ledger/usage/setup)指南。

## File-based signer

{% hint style="danger" %}

强烈建议你不要使用文件签名在主网生成 entity、抵押帐户。
如果你需要使用文件签名，确保仅在 [离线](https://en.wikipedia.org/wiki/Air_gap_%28networking%29)状态下使用。
获取 entity/抵押账户的私钥可能会丢失你的代币。
{% endhint %}

使用文件的签名器是Oasis Node CLI的一部分，不需要额外的东西。
