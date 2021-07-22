# 添加或删除节点

在某些时候，你可能希望从entity中添加或删除节点。要做到这一点，至少需要具备以下条件：

* 进入同步的节点
* 获得你的entity的私钥

## Overview

增加/删除节点的过程类似，有以下步骤：

1. 检查最新的entity描述符(`entity.json`)。

2. 通过添加/删除一个节点来更新你的entity描述符。

3. 生成一个 `register`交易，更新你在网络上的entity注册。


## 检查最新的entity描述符

为了确保不会错误地更新你的entity描述符(`entity.json`)，我们应该获取最新的entity描述符状态。对于这个操作，你需要知道你的entity公钥的base64编码。

在你的服务器上运行如下命令：

```bash
ENTITY_PUBLIC_KEY="some-base64-public-key"
oasis-node registry entity list \
    -a unix:/serverdir/node/internal.sock -v | grep $ENTITY_PUBLIC_KEY
```

## 更新你的 Entity 描述符

### 添加一个节点

{% hint style="info" %}
由于节点选举过程的工作方式，在任何给定的时代，只能从你的entity中选择一个节点作为验证者。
额外的节点将_不会_给你更多的投票权，也就不会为拥有多个节点提供高可用性。
{% endhint %}

添加节点是一个简单的操作，由 `oasis-node`直接支持。
对于这个操作，你需要初始化一个新节点，并且需要有`node_genesis.json`文件才能将其添加到entity描述符中。

假设 `node_genesis.json`位于 `/localhostdir/new_node/node_genesis.json`，命令如下：

```bash
NEW_NODE_GENESIS_PATH=/localhostdir/new_node/node_genesis.json
oasis-node registry entity update \
  --signer.dir /localhostdir/entity \
  --entity.node.descriptor /localhostdir/new_node/node_genesis.json
```

## 删除一个节点

删除节点需要手动更新entity描述符。 entity描述符文件是一个简单的JSON文档，看起来像：

```javascript
{
  "id": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
  "nodes": [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB="
  ],
  "allow_entity_signed_nodes": false
}
```

在上述entity描述符中，有2个节点与entity相连。

1. 1个节点的标识是 `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`
2. 另1个节点的标识是  `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=`

要删除节点`BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=`，你可以从`nodes`字段的数组中删除它，像这样：

```javascript
{
  "id": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
  "nodes": [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
  ],
  "allow_entity_signed_nodes": false
}
```
## 更新你在网络上的entity注册

最后，为了在网络上提交更改，你需要生成一个`register` 交易，并将该交易提交给网络。

### 生成一个`register` 交易

在你的本地主机上运行这个命令（因为你需要entity私钥）：

```bash
GENESIS_FILE_PATH="path/to/the/current/genesis"
OUTPUT_REGISTER_TX_FILE_PATH="/localhostdir/update_entity_registration.tx"
oasis-node registry entity gen_register \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --transaction.file $OUTPUT_REGISTER_TX_FILE_PATH \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1 \
  --transaction.nonce 1
```

Once this has exited with a `0` status, you should have a file at `$OUTPUT_REGISTER_TX_FILE_PATH`.

一旦退出时出现 `0`，你在`$OUTPUT_REGISTER_TX_FILE_PATH`会得到一个文件。将该文件上传到你的服务器。


### 提交交易

在服务器上运行命令：

```bash
oasis-node consensus submit_tx \
  --transaction.file /serverdir/update_entity_registration.tx \
  -a unix:/serverdir/node/internal.sock
```
如果没有错误，你的entity注册应该已经更新。你可以运行这个命令来查看变化：

```bash
ENTITY_PUBLIC_KEY="some-base64-public-key"
oasis-node registry entity list \
    -a unix:/serverdir/node/internal.sock -v | grep $ENTITY_PUBLIC_KEY
```
