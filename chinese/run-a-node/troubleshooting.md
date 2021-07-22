# 节点故障排除

{% hint style="danger" %}
**在你进行故障排除之前**

在开始故障排除之前，我们建议你检查以下所有内容：

* 检查你当前的程序版本是[当前网络参数](../oasis-network/network-parameters.md)上列出的最新版本

  * 在本地检查版本，使用 `oasis-node --version`
  * 在服务器端检查版本，使用 `oasis-node --version`
* 如果要升级，请确保已擦除状态（除非明确不需要）

* * 如果你要对实体做任何事情：
  * 你有最新版本的 genesis么?
  * 你有的正确的私钥么 (或者 Ledger 设备)。
  * 如果你要签名一笔交易：
    * 你的账户余额足够么？
      * 运行 `oasis-node stake account info`
    * 有没有使用正确的 nonce?
      * 运行 `oasis-node stake account info`
* 如果你正在生成一个交易：
  * 你有最新版本的 genesis么?
* 如果你要提交一个交易：
  * 你有最新版本的 genesis么?
  * 你的节点是否同步了？如果没有，交易将无法正常执行。
{% endhint %}

## 运行节点

### 无效的权限

#### 节点 和 entity 的权限

错误信息：

```text
common/Mkdir: path '/serverdir/node' has invalid permissions: -rwxr-xr-x
```

`entity` 和 `node` 目录的权限都是 `rwx------`。 确保目录的权限正确，或用`chmod`改变它们：

```bash
mkdir --mode 700 --parents {entity,node}
```

```bash
chmod 700 /serverdir/node
chmod 700 /serverdir/entity
```

#### `.pem` 文件的权限

错误信息：

```text
signature/signer/file: invalid PEM file permissions 700 on /serverdir/node/identity.pem
```

所有 `.pem` 文件的权限都是 `600`。使用下面的命令为目录中的所有`.pem`文件设置权限：

```bash
chmod -R 600 /path/*.pem
```

#### Serverdir 的权限

Another possible cause of permission issues is not giving ownership of your `serverdir` to the user running the node (e.g. `docker-host` or replace with your user):


权限问题的另一个可能原因是没有将 `serverdir`的所有权授予运行该节点的用户（例如docker-host或替换为自己）：

```bash
chown -R docker-host:docker-host /serverdir
```

通常，为避免在运行docker时出现问题，请在运行`docker`命令时通过添加 `--user $(id -u):$(id -g)` 来指定用户。

### 找不到文件

错误信息：

```text
no such file or directory
```

```text
file does not exist
```

```text
ts=2019-11-17T03:42:09.778647033Z level=error module=cmd/registry/node caller=node.go:127 msg="failed to load entity" err="file does not exist"
```

错误的发生频率通常超出预期，这是错误地设置路径的结果。 你可能在命令中使用了`--genesis.file $GENESIS_FILE_PATH` 之类的内容，而没有事先设置`$GENESIS_FILE_PATH`或未正确设置路径。
检查`echo $ GENESIS_FILE_PATH`是否不是你期望的文件地址或在命令中提供路径。

另一个可能的原因：无法从容器读取localhost目录中的文件。 确保在容器内的同一会话中运行命令。

## 抵押和注册

### 交易的Out of Gas问题

错误信息：

```text
module=cmd/stake caller=stake.go:70 msg="failed to submit transaction" err="rpc error: code = Unknown desc = staking: add escrow transaction failed: out of gas" attempt=1
```

现在文档已经更新，你在生成交易时需要添加`--stake.transaction.fee.gas`和`--stake.transaction.fee.alum`。请注意，如果你重新生成一个交易，你将需要增加`--nonce`。
