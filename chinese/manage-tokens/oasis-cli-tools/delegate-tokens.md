# 托管代币和权益代币

{% hint style="info" %}
这个例子假设你已经读过[准备环节](prerequisites.md) 和 [安装小节](setup.md)。
{% endhint %}

假设：

* 我们想要抵押 \(比如自我托管\) 208 个代币,
* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw` 是我们的权益账号地址。

{% hint style="info" %}
最小托管数量用 `staking.params.min_delegation` 共识参数指定。

为了从 genesis 文件中获得这个值，运行：

```bash
cat $GENESIS_FILE | \
  python3 -c 'import sys, json; \
  print(json.dumps(json.load(sys.stdin)["staking"]["params"]["min_delegation"], indent=4))'
```

注意这个数值是基础单位，比如 `"10000000000"` 的意思是10个代币。
{% endhint %}

为了达到这个目的，我们需要把208个代币放到自己的托管账户中。

## 查询账号信息

查询权益账号信息，使用下面的命令：

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

{% hint style="info" %}
查看账号信息的详细描述，参考 [获取信息](get-account-info.md) 小节。
{% endhint %}

交易之前，输出如下：

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

我们可以看到：

* General account's 余额是431.492490765
* 账号的随机值（nonce） 8.
* ~11242 个代币绑定在托管账号中。
* debonding的代币数量是0.

## 生成托管交易

生成托管 208 个代币的交易 \(i.e. 208 \* 10^9 基础单位\) 到托管账号，并存入 `tx_escrow.json`:

```bash
oasis-node stake account gen_escrow \
  "${TX_FLAGS[@]}" \
  --stake.amount 208000000000 \
  --stake.escrow.account oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6 \
  --transaction.file tx_escrow.json \
  --transaction.nonce 8 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

该命令输出生成的交易预览如下：

```javascript
You are about to sign the following transaction:
  Nonce:  8
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.AddEscrow
  Body:
    Account: oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
    Amount:  ROSE 208.0
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

然后需要进行确认。

## 提交交易

为了提交生成的交易，我们需要复制 `tx_escrow.json` 到线上的 Oasis 节点\(i.e. the `server`\) 并提交：

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_escrow.json
```

## 再次查询账号信息

再次检查 [账号信息](delegate-tokens.md#query-our-accounts-info) :

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

我们可以看到：

* general account's 余额减少了 208.000002 个代币。0.000002 个代币是我们为这次交易支付的费用。
* 账号的随机值（nonce）增加到9.
* 托管账号的余额增加了 208 个代币。
* 托管账号的活跃部分总股份数量（total shares）。

  从 10,000,000,000,000 增加到 10,185,014,125,910.

### 股份的计算

委托人将一定数量的代币委托给押金账户时，委托人获得的股份数量与当前 **股价**（以代币为单位）成正比，计算方法为：迄今为止委托给押金账户的代币总数和迄今为止发行的股份数量。

```text
shares_per_token = account_issued_shares / account_delegated_tokens
```

在我们的例子中，目前的股价 \(即 'shares_per_token'\) 是10,000,000,000,000 / 11242.384816640，即每个代币为889,490,989.9542729股。

因此，对于208个代币，新发行的股票数量为 208 \* 889,490,989.9542729，即185,014,125,910.48877股 \(四舍五入为185,014,125,910股\)。

因此，托管账户的总股数增加为185,014,125,910股。