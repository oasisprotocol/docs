# 前提条件

## 安装、使用 oasis-node

Any time the `oasis-node` binary is referenced, we are referring to the binary that is created from the [Oasis Core](https://github.com/oasisprotocol/oasis-core) repository's `go/` path. This binary contains both the logic for running an Oasis node and also provides a CLI for handling registry and staking operations.

### 下载文件

{% hint style="success" %}
我们建议你在生产环境通过源码编译 `oasis-node`
{% endhint %}

为了方便起见，我们提供了由Oasis Protocol 基金会编译的二进制可执行程序。
在[网络参数](current-parameters.md) 页面中提供了到二进制可执行程序的链接。

### 从源码编译

从源代码编译二进制可执行程序，不在本文档的范围之内。有关详细信息，请参见Oasis Core的构建说明。

{% hint style="danger" %}
[`master` 分支](https://github.com/oasisprotocol/oasis-core/tree/master/)的代码可能与公共测试网中其他节点使用的代码不兼容。
请确保使用[网络参数](current-parameters.md) 中指定的版本。
{% endhint %}

