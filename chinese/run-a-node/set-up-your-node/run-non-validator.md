---
description: 如何在Oasis网络上运行非验证节点。
---

# 运行一个非验证节点

{% hint style="info" %}
这些说明用于设置_非验证_节点，如果你想运行1个_验证_节点，请看[如何运行验证节点](run-validator.md)。
{% endhint %}

本文将介绍如何为Oasis Network设置非验证者节点。我们假设你对命令行工具的使用有基本的了解。

## 前提条件

开始之前，假设你已经读过[准备环节](../prerequisites/)，并已经在系统里安装好了执行程序。

### 创建工作目录

我们将在顶级目录 `/node`(目录可以是任意名)中创建以下目录结构：

* `etc`： 保存 节点的配置，以及 genesis文件。
* `data`：这将存储正在运行的 `oasis-node` 所需的数据目录，包括完整的区块链状态。

目录的权限是`rwx------`。

你需要执行以下命令：

```bash
mkdir -m700 -p /node/{etc,data}
```

### 复制 Genesis 文件

最新的 genesis 文件可以在[网络参数](../../oasis-network/network-parameters.md) 这一节找到。
你应该下载最新的`genesis.json`文件，将其复制到刚创建的`/node/etc`工作目录中。

## 配置

{% hint style="info" %}
这些配置仅应用于共识层。
{% endhint %}

为了配置节点，创建`/node/etc/config.yml`文件，内容如下：

```yaml
datadir: /node/data

log:
  level:
    default: info
    tendermint: info
    tendermint/context: error
  format: JSON

genesis:
  file: /node/etc/genesis.json

consensus:
  tendermint:
    p2p:
      # List of seed nodes to connect to.
      # NOTE: You can add additional seed nodes to this list if you want.
      seed:
        - "{{ seed_node_address }}"

```

在使用这些配置前，你需要替换文件中的一些配置：

* `{{ seed_node_address }}`：种子节点地址，格式为 `ID@IP:port`。

Oasis 种子节点地址可以在 [网络参数](../../oasis-network/network-parameters.md)这一节发现。

## 启动 Oasis 节点

使用以下命令运行节点：

```bash
oasis-node --config /node/etc/config.yml
```

## 检查节点状态

为了确保节点已正确连接到网络，你可以运行以下命令：

```bash
oasis-node control status -a unix:/node/data/internal.sock
```

