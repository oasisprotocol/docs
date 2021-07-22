# 回收委托/抵押的代币

当我们想要回收托管的代币时，我们不能直接这样做。相反，我们需要指定我们想要从托管账户中回收的股份数量。

假设：

* 我们想从我们的托管账户中取回3570亿股，
* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw`是抵押地址。

## Query Our Account's Info

查询 抵押地址信息，运行以下信息：

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

{% hint style="info" %}
关于查询账户信息的详细说明，请看[获得账户信息](get-account-info.md)。
{% endhint %}

交易之前：

```javascript
General Account:
  Balance: ROSE 223.492486765
  Nonce:   9
Escrow Account:
  Active:
    Balance:      ROSE 11450.38481664
    Total Shares: 10185014125910
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

观察到：

* 账户余额是 ~223
* 账户 nonce 是 9
* ～11450个代币被绑定到了代管账户
* 目前正在解绑的代币数量为0。

## Generate a Reclaim Escrow Transaction

Let's generate a reclaim escrow transaction of 357 billion shares from our own escrow account and store it to `tx_reclaim.json`:

我们交易 357 亿股，交易信息保存到 `tx_reclaim.json`：

```bash
oasis-node stake account gen_reclaim_escrow \
  "${TX_FLAGS[@]}" \
  --stake.shares 357000000000 \
  --stake.escrow.account oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6 \
  --transaction.file tx_reclaim.json \
  --transaction.nonce 9 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

输出交易预览：

```javascript
You are about to sign the following transaction:
  Nonce:  9
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.ReclaimEscrow
  Body:
    Account: oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
    Shares:  357000000000
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

并要求你的确认。

## Submit the Transaction

要提交生成的交易，我们需要将`tx_reclaim.json`复制到在线的Oasis节点，然后从那里提交：

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_reclaim.json
```

## Query Our Account's Info Again
再次检查 [账户信息](reclaim-tokens.md#query-our-accounts-info)：

```javascript
General Account:
  Balance: ROSE 223.492486765
  Nonce:   10
Escrow Account:
  Active:
    Balance:      ROSE 11049.031678686
    Total Shares: 9828014125910
  Debonding:
    Balance:      ROSE 401.353137954
    Total Shares: 401353137954
  ...
```

观察到：

* 账户余额减少了0.000002。0.000002是交易费。
* 账户的 nonce 增加到了 10。
*  托管账户有效股数减少3570了亿股，现为9,828,014,125,910股。

* 我们的托管账户活动余额减少了401.353137954，现为11049.031678686。

*我们托管账户的借贷余额增加到401.353137954，其股数也增加到相同的数额。

### Computation of Reclaimed Tokens

当委托人想要收回一定数量的代管代币时，必须根据代管账户的当前活动余额和已发行股数来计算**代币价格** （以股份单位）：

```text
tokens_per_share = account_delegated_tokens / account_issued_shares
```

这个例子中，目前的代币价格为11450.384816640/10,185,014,125,910，即每股1.124238481664054*10^-9个代币。

3570亿股，因此，将回收的代币数量为357/10^9/1.124238481664054/10^-9，即401.35313795406726代币（四舍五入为401.353137954代币）。

因此，托管账户的活动余额减少了401.353137954个代币，扣款余额增加了同样的金额。

{% hint style="warning" %}
虽然目前退市股的数量等于目前被退市的基础单位数量，因此，在退市期结束后，我们可以除外收回的代币数量为401多一点，但不能保证这个数量在退市期结束前保持不变。任何削减（例如双签）都可能改变股价。
{% endhint %}

### Debonding Period

The debonding period is specified by the `staking.params.debonding_interval` consensus parameter and is represented as a number of epochs that need to pass.

拆分周期由`staking.params.debonding_interval`共识参数指定，通过epoch表示。

要从genesis文件中获取这个值，运行以下命令：

```bash
cat $GENESIS_FILE | \
  python3 -c 'import sys, json; \
  print(json.load(sys.stdin)["staking"]["params"]["debonding_interval"])'
```

对于我们的示例网络，将返回：

```text
10
```

扣款期过后，网络会自动将托管账户的扣款余额转入普通账户。
