# 转账

{% hint style="warning" %}
主网的beta版本禁止转账。
{% endhint %}

{% hint style="info" %}
假设你已经阅读了 [前提准备](prerequisites.md)环节和[设置](.../setup.md)环节。
{% endhint %}

假设：

* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6` 是抵押地址，
* `oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3` 是目标抵押地址。

{% hint style="info" %}

要把你的 entity ID转换为押金地址，请看 [从 Entity ID 获取账户地址](address.md#obtain-account-address-from-entitys-id)
{% endhint %}

## Query Our Account's Info

要查询我们的押金账户信息，使用以下命令：

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

{% hint style="info" %}
关于查询账户信息的详细说明，请看[获得账户信息](get-account-info.md)。
{% endhint %}

在交易之前，输出是：

```javascript
General Account:
  Balance: ROSE 601.492492765
  Nonce:   7
Escrow Account:
  Active:
    Balance:      ROSE 11242.38481664
    Total Shares: 10000000000000
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

我们可以看到：

* 账户余额是 ~601
* 账户 nonce 是 7
* ~11242个代币被绑定到了代管账户
* 目前正在解绑的代币数量为0。

## Query Destination Account's Info

查询账户信息，使用以下命令：
```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3
```

交易之前，输出是：

```javascript
General Account:
  Balance: ROSE 0.0
  Nonce:   1030
Escrow Account:
  Active:
    Balance:      ROSE 0.0
    Total Shares: 0
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

我们可以观察到，普通帐户和托管帐户\（主动绑定和解除绑定\）的余额均为0。

## Generate a Transfer Transaction

我们交易 170个token \( 170的 单位是 \* 10^9\)，交易信息保存到 `tx_transfer.json`：

```bash
oasis-node stake account gen_transfer \
  "${TX_FLAGS[@]}" \
  --stake.amount 170000000000 \
  --stake.transfer.destination oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3 \
  --transaction.file tx_transfer.json \
  --transaction.nonce 7 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

输出交易预览：

```javascript
You are about to sign the following transaction:
  Nonce:  7
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.Transfer
  Body:
    To:     oasis1qr3jc2yfhszpyy0daha2l9xjlkrxnzas0uaje4t3
    Amount: ROSE 170.0
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

并要求你的确认。

## Submit the Transaction

要提交生成的交易，我们需要将`tx_transfer.json`复制到在线的Oasis节点，然后从那里提交：

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_transfer.json
```

## Query Both Accounts' Info
检查账户信息，首先是
```javascript
General Account:
  Balance: ROSE 431.492490765
  Nonce:   8
Escrow Account:
  Active:
    Balance:      ROSE 11242.38481664
    Total Shares: 10000000000000
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

然后是：

```javascript
General Account:
  Balance: ROSE 170.0
  Nonce:   1030
Escrow Account:
  Active:
    Balance:      ROSE 0.0
    Total Shares: 0
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

我们观察到：

* 账户余额减少了170.000002。 0.000002是交易费。
* 账户的 nonce 增加到了 8
* 目标帐户的总余额增加了170。
