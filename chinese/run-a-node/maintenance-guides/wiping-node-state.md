# 擦除节点状态

在某些情况下，您可能希望（或需要）在部署新版本的网络之前，以干净状态进行完全重新部署。除非存在严重的问题，否则在主网期间不应该使用这种方法，这样一来，节点将不得不花费时间来追赶网络的其余部分数据。

以下说明假设`datadir`在节点的配置中为`/serverdir/node`。

## 状态擦除并保持节点身份

1. 停止 `oasis-node` 服务器进程（这将取决于您自己的部署设置）。

2. 使用 `oasis-node unsafe-reset` 命令删掉区块状态：

   ```bash
   # Do a dry run first to see which files will get deleted.
   oasis-node unsafe-reset --datadir=/serverdir/node --dry_run --log.level info
   # Delete.
   oasis-node unsafe-reset --datadir /serverdir/node --log.level info
   ```

3. 运行 oasis-node 服务进程。

{% hint style="info" %}
`oasis-node` 对文件的权限非常严格。如果你遇到以下错误：

```text
common/Mkdir: path '/serverdir/node' has invalid owner: 1000. Expected owner: 0
```

你需要以文件的所有者的身份运行`oasis-node`命令，例如：


```text
sudo --user=#1000 -- oasis-node unsafe-reset --datadir=/serverdir/node --dry_run --log.level info
```
{% endhint %}

## 全状态擦除

{% hint style="danger" %}
This is likely not what you want to do. This is destructive and might result in losing private state required to operate the given node. **USE AT YOUR OWN RISK.**

这很可能不是你想要做的。这是破坏性的，可能会导致失去操作给定节点所需的私有状态。 **由你自己承担风险。**
{% endhint %}

完整状态擦除还意味着您需要生成一个新的节点标识\（或复制旧的节点标识\）。

1. 停止 `oasis-node` 服务器进程（这将取决于您自己的部署设置）。
2. 删除 `/serverdir/node` 目录。
3. 重新部署你的节点。 您需要复制 节点 所需要的配置或创建新的配置。