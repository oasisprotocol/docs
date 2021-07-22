# 常用权益信息

{% hint style="info" %}
这个例子假设你已经读过[准备环节](prerequisites.md) 和 [安装小节](setup.md)。
{% endhint %}

为了查询 Oasis 节点的常用权益信息，运行：

```bash
oasis-node stake info -a $ADDR
```

该命令会输入如下：

```text
Token's ticker symbol: ROSE
Token's value base-10 exponent: 9
Total supply: ROSE 10000000000.0
Common pool: ROSE 7999217230.11968289
Last block fees: ROSE 0.0
Staking threshold (entity): ROSE 100.0
Staking threshold (node-validator): ROSE 100.0
Staking threshold (node-compute): ROSE 100.0
Staking threshold (node-storage): ROSE 100.0
Staking threshold (node-keymanager): ROSE 100.0
Staking threshold (runtime-compute): ROSE 100.0
Staking threshold (runtime-keymanager): ROSE 100.0
```

我们可以看到代币的名字是 ROSE ，并且1个代币对应有 10^9 \(十亿个\) 基本单位。

接下来，我们可以看到 **total supply** 是100亿个代币，并且有80亿个代币在 **common pool** 里。

最后，实体的 **staking thresholds**，所有节点类型 \(如validator, compute, storage\)何所有运行期类型 \(如compute, key manager\) 是100个代币。

也就是说如果你想注册一个验证者节点实体，你需要抵押至少200个代币。

