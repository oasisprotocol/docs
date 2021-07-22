# 创建 Entity 包

{% hint style="warning" %}
Entity 包仅在网络开始时需要。如果网络已经在运行，那么也不再需要使用了。
{% endhint %}

为了在主网开始时加入，我们要求你发送一个Entity包，以便为网络创建一个 genesis文档。

## 详细过程

要创建一个Entity包，你必须创建一个压缩文件(`.tar.gz`)，并包含以下文件：

* `entity/entity_genesis.json`
* `entity/entity.json`
* `node/node_genesis.json`

{% hint style="success" %}
在创世过程中，我们将只接受一个节点。
{% endhint %}

在本地系统中执行以下命令，你可以在 [初始化Entity和节点](run-validator.md#initializing-an-entity)看到：

```text
mkdir -p package/entity package/node
cp /localhostdir/entity/*.json package/entity
cp /localhostdir/node/node_genesis.json package/node
cd package && tar -zcvf ../<YOUR-GITHUB-USERNAME>-entity.tar.gz entity node
```

## 提交 Entity 包 \( 主网\)

{% hint style="warning" %}
主网 Entity 包的截止日期是 2020-09-03T23:59:00 UTC。
{% endhint %}

我们已经创建了一个资源库，用来提交你的实体包。

1. Fork [oasisprotocol/mainnet-entities](https://github.com/oasisprotocol/mainnet-entities) 项目。
2. 在 `entities/`目录添加你的 Entity 包。
3. 在 [oasisprotocol/mainnet-entities](https://github.com/oasisprotocol/mainnet-entities)  `master` 提交pr.

   一旦你的实体包通过了所有的验证检查，我们合并你提交的pr。

{% hint style="info" %}
如果有任何问题，你可以随时重新提交你的entity包。
{% endhint %}

