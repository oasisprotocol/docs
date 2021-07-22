# Oasis 节点

Oasis 节点是从 [Oasis Core](https://github.com/oasisprotocol/oasis-core) 的`go/`路径下创建的文件。

它既包含了运行 Oasis 节点的逻辑，也提供了注册、抵押等命令行操作。

{% hint style="warning" %}
Oasis 节点当前仅支持 x86_64 Linux 系统。
{% endhint %}

## 下载文件

{% hint style="success" %}
我们建议你自己从源码上编译 Oasis Node，进行节点的部署运行。
{% endhint %}

文件链接请看[网络参数](../../oasis-network/network-parameters.md)。

## 从源码开始开始编译

从源码开始开始编译，请看 [Oasis Core 的编译环境设置和方式](https://docs.oasis.dev/oasis-core/development-setup/build-environment-setup-and-building) 文档，来了解更多内容。

{% hint style="danger" %}
[`master`](https://github.com/oasisprotocol/oasis-core/tree/master/) 分支的代码可能与主网中其他节点使用的代码不兼容。

请确保使用[网络参数](../../oasis-network/network-parameters.md)中指定的版本。
{% endhint %}

## 将`oasis-node` 添加到 `PATH`

要为当前用户安装`oasis-node`文件，请将其复制或链接到 `~/.local/bin` 。

要为系统的所有用户安装`oasis-node`文件，请将其复制到`/usr/local/bin`。
