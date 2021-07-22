# 修改佣金表

{% hint style="info" %}
假设你已经阅读并遵循[准备环节](../../manage-tokens/oasis-cli-tools/准备环节.md) 和 [安装环节](../../manage-tokens/oasis-cli-tools/setup.md) 的 _使用你的代币_。
{% endhint %}

我们可以配置账户，对给节点抵押奖励收取佣金。**佣金率**必须在**佣金率范围内**，我们也可以自行配置。

假设：

* 我们要更改佣金率范围，我们可以在0％-25％之间设置任何比率，并且
* 佣金率 改为10%，
* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6` 是我们的抵押地址。

我们不允许在近期内把佣金范围改得太近，所以必须在以后的几个周期内进行修改。

## Commission Schedule Rules

佣金表规则由`staking.params.commission_schedule_rules`共识参数指定。

从genesis文件中获取这个值，运行：

```bash
cat $GENESIS_FILE | \
  python3 -c 'import sys, json; \
  rules = json.load(sys.stdin)["staking"]["params"]["commission_schedule_rules"]; \
  print(json.dumps(rules, indent=4))'
```

将返回的内容如下：

```javascript
{
    "rate_change_interval": 1,
    "rate_bound_lead": 336,
    "max_rate_steps": 10,
    "max_bound_steps": 10
}
```

这意味着，我们必须至少提前336个周期提交佣金率(`rate_bound_lead`)，并且我们可以在每个周期(`rate_change_interval`)改变它。

`max_rate_steps`和 `max_bound_steps` 分别决定了佣金率步数和费率约束步数的最大值。


## Query Our Account's Info

要查询我们的抵押账户信息，使用以下命令：

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

{% hint style="info" %}
关于查询账户信息的详细说明，请看 [Get Info](../../manage-tokens/oasis-cli-tools/get-account-info.md) 章节的 _使用你的代币_ 内容。
{% endhint %}

在交易之前，这个输出是：

```javascript
General Account:
  ...
  Nonce:   10
Escrow Account:
  ...
  Commission Schedule:
    Rates: (none)
    Rate Bounds: (none)
  ...
```

我我们观察到

* 账户的 nonce 是 10。
* 目前没有设定佣金率或限制。

## Generate an Amend Commission Schedule Transaction

在这个例子中，我们将设置范围从epoch 1500开始。一个账户的默认上限是0%，所以我们必须等到新的上限生效后才能将利率提高到10%。正因为如此，我们将指定费率也从epoch 1500开始。

让我们为这个例子生成一个修改佣金计划交易，并将其存储到`tx_amend_commission_schedule.json`。

```bash
oasis-node stake account gen_amend_commission_schedule \
  "${TX_FLAGS[@]}" \
  --stake.commission_schedule.bounds 1500/0/25000 \
  --stake.commission_schedule.rates 1500/10000 \
  --transaction.file tx_amend_commission_schedule.json \
  --transaction.nonce 10 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

{% hint style="info" %}

费率的最低/最高费率以1/100,000为单位，因此`0`、`50000`和`100000`分别为0%、50%和100%。

{% endhint %}

这将输出一个生成的交易的预览：

```javascript
You are about to sign the following transaction:
  Nonce:  10
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.AmendCommissionSchedule
  Body:
    Amendment:
      Rates:
        (1) start: epoch 1500
            rate:  10.0%
      Rate Bounds:
        (1) start:        epoch 1500
            minimum rate: 0.0%
            maximum rate: 25.0%
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

并向你确认。

## Submit the Transaction

为了提交生成的交易，我们需要将`tx_amend_commission_schedule.json` 复制到Oasis的在线节点(即`server`)，并从那里提交。


```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_amend_commission_schedule.json
```

## Query Our Account's Info Again

再次检查我们的[账户信息](amend-commission-schedule.md#query-our-accounts-info)：

```javascript
General Account:
  ...
  Nonce:   11
Escrow Account:
  ...
  Commission Schedule:
    Rates:
      (1) start: epoch 1500
          rate:  10.0%
    Rate Bounds:
      (1) start:        epoch 1500
          minimum rate: 0.0%
          maximum rate: 25.0%
  ...
```

我们观察到：

* 账户的 nonce增加到11。
* 我们将佣金率设定为10.0%，从 epoch 1500开始。
* 我们设置了0%-25%的佣金率范围，也是从 epoch 1500年开始。

{% hint style="info" %}
更多关于佣金如何运作的信息，请参考 _使用你的代币_ 中的对[佣金](.../.../manage-token/terminology.md#commission)介绍。
{% endhint %}

## Setting a More Complex Commission Schedule

也可以通过多次传递 `--stake.commission_schedule.rates` and `--stake.commission_schedule.bounds` 命令行来设置多个佣金费率步长和费率约束步长。

例如，如下设置多个佣金费率步长和费率约束步长 \(对于与上一个示例相同的帐户\)：

```
oasis-node stake account gen_amend_commission_schedule \
  "${TX_FLAGS[@]}" \
  --stake.commission_schedule.bounds 2000/10000/30000 \
  --stake.commission_schedule.bounds 3000/20000/40000 \
  --stake.commission_schedule.rates 2000/15000 \
  --stake.commission_schedule.rates 2200/20000 \
  --stake.commission_schedule.rates 2500/25000 \
  --stake.commission_schedule.rates 2800/30000 \
  --stake.commission_schedule.rates 3000/35000 \
  --transaction.file tx_amend_commission_schedule.json \
  --transaction.nonce 11 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

would result in the following commission schedule being printed out in [our account's info](amend-commission-schedule.md#query-our-accounts-info):

将会在[账户信息](amend-commission-schedule.md#query-our-accounts-info)中打印出以下佣金表：

```text
...
Escrow Account:
  ...
  Commission Schedule:
    Rates:
      (1) start: epoch 1500
          rate:  10.0%
      (2) start: epoch 2000
          rate:  15.0%
      (3) start: epoch 2200
          rate:  20.0%
      (4) start: epoch 2500
          rate:  25.0%
      (5) start: epoch 2800
          rate:  30.0%
      (6) start: epoch 3000
          rate:  35.0%
    Rate Bounds:
      (1) start:        epoch 1500
          minimum rate: 0.0%
          maximum rate: 25.0%
      (2) start:        epoch 2000
          minimum rate: 10.0%
          maximum rate: 30.0%
      (3) start:        epoch 3000
          minimum rate: 20.0%
          maximum rate: 40.0%
  ...
```

{% hint style="info" %}

要解决被拒绝的修正案的问题，请参考我们的[佣金表修正案失败的23种常见方法汇总](https://github.com/oasisprotocol/oasis-core/blob/0dee03d75b3e8cfb36293fbf8ecaaec6f45dd3a5/go/staking/api/commission_test.go#L61-L610)
{% endhint %}

