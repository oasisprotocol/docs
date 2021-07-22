# 设置

确保已经已经在 [前提准备](prerequisites.md)环节安装好了相应的程序。

## Server commands

要连接到在线Oasis节点的命令，你需要执行以下任一命令：

* 在执行该命令之前，将工作目录更改为Oasis节点UNIX socket所在的位置，或者
* 传递`-a $ ADDR`，其中`ADDR`代表以`unix:`为前缀的内部Oasis节点UNIX socket的路径。

Oasis Node CLI命令的示例：

* `oasis-node stake info`：显示常规抵押信息。
* `oasis-node stake list`：列出所有余额为>0的账户。
* `oasis-node stake account info`：显示账户的详细信息。
* `oasis-node consensus submit_tx`：向网络提交一个预先生成的交易。

## Local commands

以下命令是在你的本地机器上运行，只需要访问网络当前的[Genesis 文件](../../mainnet/genesis-file.md)和你的私钥。

* `oasis-node stake account gen_transfer`
* `oasis-node stake account gen_escrow`
* `oasis-node stake account gen_reclaim_escrow`
* `oasis-node stake account gen_amend_commission_schedule`

{% hint style="danger" %}

强烈建议你不要使用文件签名在主网生成 entity、抵押帐户。
如果你需要使用文件签名，确保仅在 [离线](https://en.wikipedia.org/wiki/Air_gap_%28networking%29)状态下使用。
获取 entity/抵押账户的私钥可能会丢失你的代币。

{% endhint %}

## JSON pretty-printing

我们将使用Python的[`json.tool`模块](https://docs.python.org/3/library/json.html#module-json.tool)将返回的JSON内容进行更友好的展示。

{% hint style="warning" %}

请注意，流行的JSON CLI工具[jq](http://stedolan.github.io/jq/)[将所有数字转换为IEEE 754 64位值](https://github.com/stedolan/jq/wiki/FAQ#caveats)可能会导致精度损失或其他变化。

因此，我们建议在这个问题解决之前避免使用它。
{% endhint %}

## Common CLI Flags

### Base Flags

在所有生成和签名交易的命令都需要设置以下内容：

* `--genesis.file`：genesis 文件的路径，比如 `/localhostdir/genesis.json`.

  为方便起见，将`GENESIS_FILE`genesis 文件的路径，例如：

  ```bash
  GENESIS_FILE=/localhostdir/genesis.json
  ```

* `--signer.dir`：entity的路径, 比如 `entity-$LEDGER_INDEX` 或者 `/localhostdir/entity/`

### Signer Flags

目前，我们提供了两种签名交易的选择。

* **Ledger签名**

  你需要仔细阅读 [Oasis Core Ledger](https://docs.oasis.dev/oasis-core-ledger/usage/transactions) 文档。

* **文件签名**

  你需要按照[Running a Node on the Network](../../run-a-node/set-up-your-node/run-validator.md#creating-your-entity)创建 entity，并使用以下命令：
  * `--signer.backend file`：指定使用文件签名器。

### Storing Base and Signer flags in an Environment Variable

为了使交易命令更短，避免输入错误，可以创建一个环境变量。比如 `TX_FLAGS`，结合 [Base 指令](setup.md#base-flags) 与 [Signer 指令](setup.md#signer-flags) 进行配置。

比如，我们可以Ledger 设备设置`TX_FLAGS` 命令如下： \(确保所有的 `LEDGER_*` 变量被正确地设置\)：

```bash
TX_FLAGS=(--genesis.file "$GENESIS_FILE"
  --signer.dir /localhostdir/entity
  --signer.backend plugin
  --signer.plugin.name ledger
  --signer.plugin.path "$LEDGER_SIGNER_PATH"
)
```

我们也可以为 文件签名设置 `TX_FLAGS`
```bash
TX_FLAGS=(--genesis.file "$GENESIS_FILE"
  --signer.backend file
  --signer.dir /localhostdir/entity/
)
```

### Common Transaction Flags

在生成交易时，需要根据给定交易的情况设置以下交易标志。

* `--stake.amount`：转让、托管管、烧毁的币的数量。
* `--transaction.file`：保存生成的交易的文件路径。
* `--transaction.nonce`：每个账户的交易nonce必须是唯一的递增数字。

 如何得到账户的 nonce, 请看 [检查账户的 nonce](maintenance/checking-account-nonce.md)。

* `--transaction.fee.gas`：一笔交易可以花费的最大gas量。

  不同交易的gas成本是由`staking.params.gas_costs`参数指定的。

  要从genesis文件中获取其值，运行以下命令：

  ```bash
  cat $GENESIS_FILE | \
    python3 -c 'import sys, json; \
    print(json.dumps(json.load(sys.stdin)["staking"]["params"]["gas_costs"], indent=4))'
  ```

* `--transaction.fee.amount`：我们将支付的的交易费用。

Note that specifying a transaction's fee amount \(via `--transaction.fee.amount`\) and maximum gas amount \(via `--transaction.fee.gas`\) implicitly defines the _gas price_ \(in base units\):

请注意，指定交易的费用金额（通过`--transaction.fee.amount` \）和最大gas量（通过`--transaction.fee.gas`）会隐式定义 _gas price_：

```text
gas_price = fee_amount / gas_amount
```


Consensus validators can configure their own _minimum gas price_ \(via `consensus.tendermint.min_gas_price` configuration flag\) and will refuse to process transactions that have their gas price set below their minimum gas price.


共识验证者可以配置自己的最低gas价格（通过`consensus.tendermint.min_gas_price`），并拒绝处理gas价格低于最低gas价格的交易。

{% hint style="info" %}

当前，没有方法可以发现验证者使用的最低gs价格。

更多细节 请看 [Oasis Core \#2526](https://github.com/oasisprotocol/oasis-core/issues/2526)。
{% endhint %}

##
