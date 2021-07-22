---
description: 如何在 Oasis 网络中运行种子节点
---

# 运行种子节点

本文将介绍如何为Oasis Network设置种子节点。我们假设你对命令行工具的使用有基本的了解。

## 前提条件

开始之前，假设你已经读过[准备环节](../prerequisites/oasis-node.md)，并了解如何使用 `oasis-node`。

{% hint style="danger" %}
**由于最近对种子节点的改进，建议使用[20.11.2](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.11.2) (或更高版本)的`oasis-node`**。
{% endhint %}

### 创建工作目录

我们将在顶级目录 `/node`(目录可以是任意名)中创建以下目录结构：

* `etc`： 保存 节点的配置，以及 genesis文件。
* `data`：这将存储正在运行的 `oasis-node` 所需的数据目录，包括完整的区块链状态。

目录的权限是`rwx------`。

你需要执行以下命令：

```text
mkdir -m700 -p /node/{etc,data}
```

### 复制 Genesis 文件

最新的 genesis 文件可以在[网络参数](../../oasis-network/network-parameters.md) 这一节找到。
你应该下载最新的`genesis.json`文件，将其复制到刚创建的`/node/etc`工作目录中。

## 配置

{% hint style="info" %}
这些配置仅应用于种子节点。
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
    mode: seed
```

## 启动 Oasis 节点

使用以下命令运行节点：

```bash
oasis-node --config /node/etc/config.yml
```

### 种子节点地址

执行以下命令，获取种子节点的Tendermint标识：

```bash
oasis-node identity tendermint show-node-address --datadir /node/data/
```

### 分享种子节点地址

节点现在可以通过配置使用你的种子节点：

```bash
--consensus.tendermint.p2p.seed <TENDERMINT_ADDRESS>@<EXTERNAL_IP>:26656
```

