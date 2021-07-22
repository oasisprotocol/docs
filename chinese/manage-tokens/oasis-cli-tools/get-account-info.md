# 获得账户信息

{% hint style="info" %}
假设你已经阅读了 [前提准备](prerequisites.md)环节和[设置](.../setup.md)环节。
{% endhint %}

要想获得更多关于某一个抵押账户的信息，例如`oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx`，请运行以下命令：

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qrvsa8ukfw3p6kw2vcs0fk9t59mceqq7fyttwqgx
```

这将输出这个账户的所有抵押信息，例如：

```javascript
General Account:
  Balance: ROSE 376.594833237
  Nonce:   0
Escrow Account:
  Active:
    Balance:      ROSE 10528.684187046
    Total Shares: 10000000000000
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  Commission Schedule:
    Rates: (none)
    Rate Bounds: (none)
  Stake Accumulator:
    Claims:
      - Name: registry.RegisterEntity
        Staking Thresholds:
          - Global: entity
      - Name: registry.RegisterNode.9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=
        Staking Thresholds:
          - Global: node-validator
```

## General Account

我们可以观察到：

* 账户的 **Balance**，是 ~377 tokens.
* 账户的 **nonce**, 每个账户的交易都必须是唯一的增量数字，如果是0，这意味着这个账户还没有进行过交易。

## Escrow Account

我们可以观察到：

* **actively bounded** 是 ~10529 token。
* 主动绑定到托管账户的代币的 **share**为10万亿。
* 当前 **debonding** 是 0。
* 目前正在脱债的代币的**share**总数为0。

### Commission Schedule

一个实体也可以对委托给它的代币收取佣金。它将定义 **rate steps** 和 **rate bound steps**。

更多内容请看[Amend Commission Schedule](../../run-a-node/set-up-your-node/amend-commission-schedule.md)。

### Stake Accumulator

每个托管账户都有一个相应的股权累加器。它为托管账户存储**的股权债权**，并确保所有债权在任何给定点都得到满足。只有在现有的所有债权加上新的债权都能得到满足的情况下，才有可能增加新的债权。

我们可以观察到：

* `registry.RegisterEntity` 声明是注册一个实体。
  它需要满足由实体共识参数定义的用于注册实体\（`entity` \）的全局阈值。

  更多内容请看[Common Staking Info](common-staking-info.md)的 `oasis-node stake info` 命令。


* `registry.RegisterNode.9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=` 声明了 注册node ID 是`9Epy5pYPGa91IJlJ8Ivb5iby+2ii8APXdfQoMZDEIDc=`.

  它需要满足注册验证器节点的全局定点阈值（\(`node-validator`\)，该阈值由共识参数定义。

  更多内容请看[Common Staking Info](common-staking-info.md)的 `oasis-node stake info` 命令。

  除了全局阈值外，节点注册的每个运行时都可以定义自己的阈值，如果节点注册了多个运行时，则需要满足其注册的所有运行时的阈值之和。如果节点注册了多个运行时，它需要满足它注册的所有运行时的阈值之和。

  更多内容请看 [如何注册节点](https://github.com/oasisprotocol/oasis-core/blob/master/docs/consensus/registry.md#register-node)。
