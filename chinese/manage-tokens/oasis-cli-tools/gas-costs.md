# Gas 成本

{% hint style="info" %}
这个例子假设你已经读过[准备环节](prerequisites.md) 和 [安装小节](setup.md)。
{% endhint %}

### 获取交易的 Gas 成本

在 [常见交易标识](setup.md#common-transaction-flags) 小节中，我们可以通过下面的命令从 genesis 文件中获取不同的权益交易的 gas 成本：

```bash
cat $GENESIS_FILE | \
  python3 -c 'import sys, json; \
  print(json.dumps(json.load(sys.stdin)["staking"]["params"]["gas_costs"], indent=4))'
```

返回数值如下：

```javascript
{
    "add_escrow": 1000,
    "burn": 1000,
    "reclaim_escrow": 1000,
    "transfer": 1000
}
```

因此，我们需要设定 `--transaction.fee.gas` ， 如交易花费的最大数量的gas，以后的交易最少需要 1000 **gas单位**。

