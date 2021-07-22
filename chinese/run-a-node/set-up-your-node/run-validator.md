---
description: 本页面描述符如何在Oasis Network上运行验证器节点。
---

# 运行验证节点

{% hint style="info" %}
这些说明用于设置一个*验证*节点。如果你想验证 1 个 _非验证节点_，请看 [如何运行非验证器节点](run-non-validator.md)
{% endhint %}

这份指南将介绍如何为 Oasis Network 设置验证器节点。使用本指南需要你对命令行有一些基本的了解。

## 前提条件

开始之前，假设你已经读过[准备环节](../prerequisites/)，并在系统上安装了 Oasis Node 文件。

### 抵押需求

要成为 Oasis Network 上的验证者，你需要在托管帐户中放入足够的 token。 更多细节，请看[运行验证者节点](../../contribute-to-the-network/run-validator.md#stake-requirements)文档的[抵押要求](../../contribute-to-the-network/run-validator.md)部分。

### 系统

假设你有两台不同的物理机用于部署。这两台机器如下：

- 你的本地系统，以后就称 `localhost`。
- 作为 Oasis 节点运行的远程系统，称为 `server`。

这样做的原因是为了保护用于设置节点的密钥。强烈建议使用 HSM 存储密钥。

## Creating Your Entity 创建

{% hint style="danger" %}
本节中的所有内容都应在 `localhost`上完成，因为将创建一些敏感的项目。
{% endhint %}

### Creating a Working Directory 创建 1 个工作目录

在这个初始化过程中，我们将创建密钥和其他重要的工件，这些都是部署节点所必需的。如果你打算用它们来注册你的 entity 和节点，那么在这个目录中保存和保护生成的工件很重要。

在`/localhostdir`文件夹内，创建以下目录：

- `entity`：存储你的 entity。如果在断开网络连接的机器上使用，这个目录中的私密内容是最安全的。

这个文件夹的权限是 `rwx------`

- `node`: 这将存储一个称之为 `node`的节点。名字并不重要。它只是代表你的一个节点。你可以把它重命名为任何你想要的名称。这个目录的私有内容将在节点本身上使用。

  你应该在可以访问 entity 私钥的系统上初始化这些信息。

这个文件夹的权限是 `rwx------`

要创建目录结构，可以用以下命令。

```bash
mkdir -m700 -p {entity,node}
```

### Copying the Genesis File 复制 Genesis 文件

最新的 genesis 文件可以 [网络参数](../../oasis-network/network-parameters.md) 找到。
你应该下载最新的`genesis.json`文件，将其复制到工作目录中，并设置以下环境变量指向这个路径。

```bash
GENESIS_FILE_PATH=/localhostdir/genesis.json
```

以后在生成交易时，就会需要这个文件。

### Initializing an Entity Entity 初始化

Entity 对于控制网络上的节点至关重要，因为它控制着个人或组织质押的权益。我们强烈建议使用 HSM 或[Ledger]（https://docs.oasis.dev/oasis-core-ledger）设备保护你的的Entity私钥。

#### Using a Ledger-based Signer 使用 基于 Ledger 的签名器

基于 Ledger 的签名器将你的私钥存储在 Ledger 钱包上。它是作为一个 Oasis Core signer 插件实现的。
你需要按照我们[Oasis Core Ledger 文档](https://docs.oasis.dev/oasis-core-ledger) 的[设置]((https://docs.oasis.dev/oasis-core-ledger/usage/setup) 部分进行设置。

由于 entity 的私钥存储在你的 Ledger 钱包上，你只需要按照我们的[Oasis Core Ledger 文档](https://docs.oasis.dev/oasis-core-ledger)中[导出公钥到 entity](https://docs.oasis.dev/oasis-core-ledger/usage/entity)部分的描述符导出 entity 的公钥。

这将在`/localhostdir/entity`中创建一个文件：

- `entity.json`：entity 的描述符。这个 JSON 文件描述符了 要发送到网络上的注册器应用程序的未签名的信息。

{% hint style="info" %}
目前还没有创建有签名的 entity 描述符，即`entity_genesis.json`。当你用你的签名节点描述符更新 entity 描述符时，这个文件将被创建，就像[将节点添加到 描述符符](run-validator.md#adding-the-node-to-the-entity-descriptor)部分所述。
{% endhint %}

#### Using a File-based Signer 使用文件签名器

{% hint style="danger" %}
我们强烈建议你不要在主网上使用文件签名生成的任何 entity。当使用文件的签名时，强烈建议在[离线](https://en.wikipedia.org/wiki/Air_gap_%28networking%29)状态使用。获得对 entity 私钥的访问权限可能会使的你的 token 处于风险中。
{% endhint %}

要初始化一个 entity，只需在`/localhostdir/entity`中运行以下命令：

```bash
oasis-node registry entity init
```

这个命令将会在`/localhostdir/entity` 生成三个文件：

- `entity.pem`：entity 的私钥。 **永远不要分享这个文件，因为它可以用来转帐。**
- `entity.json`：entity 描述符。这是要发送给网络中的注册器应用程序的未签名的 JSON。
- `entity_genesis.json`: 这个 JSON 对象包含用 entity 私钥签名的 entity 描述符，即`entity.pem`。这是为了在创世块中共享。

### Initializing a Node 初始化节点

节点启动时，节点会将自己注册到网络中。然而，为了验证自己， entity 会签署一个与节点相关的公钥。这使得节点注册时无需上传 entity 的私钥到互联网上。

{% hint style="info" %}
要想得到下面需要的`$ENTITY_ID`，请检查`entity.json`中的`id`字段的值，比如`entity.json`中的内容：

```text
{"v":1,"id":"2D5nSE3uFGvp2UkUY3w8OSjnCCYmQX/3JpJ77+aJGUQ="}
```

entity ID 是 `2D5nSE3uFGvp2UkUY3w8OSjnCCYmQX/3JpJ77+aJGUQ=`.
{% endhint %}

要初始化验证器节点，请记下将运行节点的服务器的静态 IP，并在`/ localhostdir/node`目录执行以下命令：

```bash
ENTITY_ID=<YOUR-ENTITY-ID>
STATIC_IP=<YOUR-STATIC-IP>
oasis-node registry node init \
  --node.entity_id $ENTITY_ID \
  --node.consensus_address $STATIC_IP:26656 \
  --node.role validator
```

这个命令将创建一个验证节点的身份，这样它就可以成为一个自签名节点（这就是允许自我注册的原因）。

{% hint style="info" %}
更多的初始化选项，你可以通过一下命令：

```bash
oasis-node registry node init --help
```

{% endhint %}

该命令将生成以下文件：

- `consensus.pem`: 节点的私钥。**不要分享**
- `consensus_pub.pem`: 节点的公钥。
- `identity.pem`:节点的标识私钥。**不要分享**
- `identity_pub.pem`: 节点的标识公钥
- `node_genesis.json`: 节点的详细信息，如果你希望将此节点包含在网络的创世文件中。
- `p2p.pem`: 节点用于 libp2p 的私钥。 **不要分享**
- `p2p_pub.pem`: 节点用于 libp2p 的公钥 .
- `sentry_client_tls_identity.pem`: 用于与 sentry 节点通信的 节点 TLS 证书私钥。 **不要分享**
- `sentry_client_tls_identity_cert.pem`: 用于与 sentry 节点通信的节点 TLS 证书。

### Adding the Node to the Entity Descriptor 将节点添加到 Entity 描述符

节点初始化后，我们需要将其添加到 entity 描述符中，以便在节点启动时可以正确地注册自身。指令根据用于生成 entity 的签名者的类型而有所不同。

- **如果使用插件签名器**，在 `/localhostdir/entity` 执行以下命令(假设使用 Ledger 签名器，在这种情况下，你需要在 Ledger 设备上确认签名操作)：

```bash
oasis-node registry entity update \
    --signer.backend plugin \
    --signer.plugin.name ledger \
    --signer.plugin.path "$LEDGER_SIGNER_PATH" \
    --signer.plugin.config "wallet_id:$LEDGER_WALLET_ID,index:$LEDGER_INDEX" \
    --entity.node.descriptor /localhost/node/node_genesis.json
```

- **如果使用文件签名器**，在 `/localhostdir/entity` 执行以下命令：

```bash
oasis-node registry entity update \
  --entity.node.descriptor /localhost/node/node_genesis.json
```

这将更新 `entity.json` 中的 entity 描述符，随后更新包含签名 entity 描述符的 `entity_genesis.json` 文件。

## Running an Oasis Node on the `server` 在服务器上运行 Oasis 节点

### Setting up the Oasis Node's Working Directory Oasis 节点的工作目录

在`server`上运行节点之前，我们需要确保有一个地方来保存节点所需的文件。

{% hint style="info" %}
在整个文档中，我们将把`server`上的工作目录称为`/serverdir`。
{% endhint %}

#### Setting Up the the `/serverdir` Directory 设置 `/serverdir` 目录

在`/serverdir`目录下，我们将创建以下子目录：

- `etc/` - 保存配置
- `node/` - 保存 节点数据
- `node/entity/` - 这是为了保存节点 entity 的公共组件

通过执行以下命令来创建目录结构：

```bash
mkdir -m700 -p /serverdir/{etc,node,node/entity}
```

#### Copying the Node Artifacts from `/localhostdir` 从 `/localhostdir`复制节点文件

为了使节点注册能够正常工作，正如`/localhostdir/entity.json`中所定义的那样，你必须复制在 [初始化节点](run-validator.md#initializing-a-node)一节中生成的节点的工件。

要做到这一点，请通过安全通道（比如 SSH） 从`/localhostdir/node`上传文件到`/serverdir/node`。

- `consensus.pem`
- `consensus_pub.pem`
- `identity.pem`
- `identity_pub.pem`
- `p2p.pem`
- `p2p_pub.pem`
- `sentry_client_tls_identity.pem`
- `sentry_client_tls_identity_cert.pem`

然后确保这些文件都是`0600`权限。

你可以执行以下命令

```bash
chmod -R 600 /serverdir/node/*.pem
```

{% hint style="warning" %}

在 [初始化节点]](run-validator.md#initializing-a-node) 这节点，你可能注意到了其中一些文件被列为**不共享**。
将来，这些密钥应该从 HSM 中生成和引用。然而，在实现 HSM 支持之前，这些密钥应该尽可能安全地保存在服务器上。
{% endhint %}

#### Copying the Public Entity Artifacts from `/localhostdir` 从 `/localhostdir` 复制公共 Entity 文件

我们还需要将`/localhostdir`中的公共 entity 文件放在`server`上。将`localhost`上的`/localhostdir/entity/entity.json`文件复制到`server`上的`/serverdir/node/entity/entity.json`。

#### Copying the Genesis File to the server 复制创世文件到服务器

最近的创世文件在[网络参数](../../oasis-network/network-parameters.md)，你下载最近的 `genesis.json` ，然后在`server` 复制到 `/serverdir/etc/genesis.json`。

#### Configuring the Oasis Node 配置 Oasis 节点

在运行 Oasis 节点时，有多种选项可供选择。下面的 YAML 文件是验证器节点的基本配置。

在使用这些配置前，你需要替换文件中的一些配置：

- `{{ external_address }}`：注册节点时使用外网 IP

{% hint style="info" %}
如果你使用 [Sentry 节点](sentry-node-architecture.md)，你要使用有公共 ip 的机器。
{% endhint %}

- `{{ seed_node_address }}`：种子节点地址，格式为 `ID@IP:port`。

Oasis 种子节点地址可以在 [网络参数](../../oasis-network/network-parameters.md)这一节发现。

要使用这个配置，将它保存在`/serverdir/etc/config.yml`文件中，并将其作为`--config` 的参数传递给`oasis-node`命令。

```yaml
##
# Oasis Node Configuration
#
# This file's contents are derived from the command line arguments found in the
# root command of the oasis-node binary. For more information, execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. For example, "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node's artifacts
# should also be located in this directory.
datadir: /serverdir/node

# Logging.
#
# Per-module log levels are defined below. If you prefer just one unified log
# level, you can use:
#
# log:
#   level: debug
log:
  level:
    # Per-module log levels. Longest prefix match will be taken. Fallback to
    # "default", if no match.
    default: debug
    tendermint: warn
    tendermint/context: error
  format: JSON
  # By default logs are output to stdout. If you would like to output logs to
  # a file, you can use:
  #
  # file: /var/log/oasis-node.log

# Genesis.
genesis:
  # Path to the genesis file for the current version of the network.
  file: /serverdir/etc/genesis.json

# Worker configuration.
worker:
  registration:
    # In order for the node to register itself, the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /serverdir/node/entity/entity.json

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: true

  # Tendermint backend configuration.
  tendermint:
    core:
      listen_address: tcp://0.0.0.0:26656

      # The external IP that is used when registering this node to the network.
      # NOTE: If you are using the Sentry node setup, this option should be
      # omitted.
      external_address: tcp://{{ external_address }}:26656

    # List of seed nodes to connect to.
    # NOTE: You can add additional seed nodes to this list if you want.
    p2p:
      seed:
        - "{{ seed_node_address }}"
```

#### Ensuring Proper Permissions 保证合适的权限

只有运行 Oasis 节点的进程的所有者才能访问`/serverdir/node`目录中的文件。 `oasis-node`文件可确保该节点使用的文件具有尽可能低的权限。

为了确保设置正确的权限，我们建议运行以下命令：

```bash
chmod -R go-r,go-w,go-x /serverdir
```

{% hint style="info" %}
需要说明的是，`oasis-node`文件需要以下权限：

- `/serverdir/node` 目录的权限是 `700`
- `/serverdir/node/entity` 目录的权限是 `700`
- 所有`*.pem` 文件的权限是 `600`
  {% endhint %}

### Starting the Oasis Node

通过运行以下命令来启动节点：

```bash
oasis-node --config /serverdir/etc/config.yml
```

{% hint style="success" %}
Oasis 节点默认配置为在前台运行。

我们建议你用一个进程管理器比如 [systemd](https://github.com/systemd/systemd) 或者 [Supervisor](http://supervisord.org/)，来管理节点。
{% endhint %}

### Verifying the Connection to the Network 验证网络连接

作为启动服务器进程的一部分，`oasis-node` 默认会在节点的 `datadir`中设置一个 socket。
这个 socket 可以用来和节点通信，查询网络的详细信息。

运行以下命令：

```bash
oasis-node registry entity list -a unix:/serverdir/node/internal.sock
```

如果这个命令失败，很有可能你没有连接到网络。如果正常工作，它会有如下的输出：

```text
CVzqFIADD2Ed0khGBNf4Rvh7vSNtrL1ULTkWYQszDpc=
C5z1jB+FHB/QgtTITr6NKWpUs9QHwD11CG3v8tmuJ0g=
DPbZomOIleFrvcJBZPl7y/wEB1w9Q569vAbb6Krl9fE=
DVobZ8bWlOv2J6oHO0uITr5FPO5rIY2irdPNhByprHk=
D2hqhJcmZnBmhw9TodOdoFPAjmRkpRatANCNHxIDHgA=
```

得到连接的节点后，你可以继续进行下一部分，因为你的节点尚未在 Oasis Network 上注册为验证器。

## Staking and Registering 抵押和注册

{% hint style="success" %}
如果你的 entity 在创世时就已经完全定好了，这一步就不需要了。
{% endhint %}

{% hint style="warning" %}
如果你之前提交过抵押或注册交易，则你的 nonce 可能与示例中使用的 nonce 不同。 如果不确定，请使用[指南](../../manage-tokens/oasis-cli-tools/get-account-info.md) 检查帐户的 nonce。
{% endhint %}

一旦获得资金，就可以通过注册 entity 和节点来完成将节点连接到网络的过程，如下所述。

### Check that your node is synced 检查节点是否已同步

在你进行任何交易之前，你必须确保你的节点已经同步好。你可以在服务器上执行这个命令：

```bash
oasis-node control is-synced -a unix:/serverdir/node/internal.sock
```

如果你的节点是同步的，命令会输出：

```text
node completed initial syncing
```

如果你的节点还没有同步，你需要等待同步完成，才能继续之后的操作

### Generating a Staking \(Escrow\) Transaction on the `localhost` 在`localhost`上生成一个抵押（托管）交易

你的 entity 的私钥应该在`localhost`上与互联网断开连接。因此，你需要在`localhost`上生成以下交易。

{% hint style="danger" %}
entity 的私钥用于授权你的抵押账户上的交易。
因此，它永远都不会出现在在线服务器上。
{% endhint %}

目前，注册一个 entity 和注册一个节点作为验证者所需的最低股权是 200 个代币。所以，我们将生成一个托管交易，托管自己 entity 上的 200 个 token。

{% hint style="info" %}
Oasis 将抵押 token 的操作称为 “托管”。
{% endhint %}

在生成托管交易之前，你需要设置以下环境变量：

- `GENESIS_FILE_PATH`：`localhost`上 Genesis 文件的路径，即`/localhostdir/genesis.json`。
- `ENTITY_DIR_PATH`：Path to entity 在 `localhost`的路径，即`/localhostdir/entity/`.
- `OUTPUT_TX_FILE_PATH`：包含输出的已签名交易的文件的路径。我们使用 `/localhostdir/signed-escrow.tx`.
- `ACCOUNT_ADDRESS`：你的抵押账户的地址。

  从 entity ID 中获取你的抵押帐户地址，请看 [从 entity ID 获取帐户地址](../../manage-tokens/oasis-cli-tools/address.md#obtain-account-address-from-entitys-id).

命令如下：

```bash
oasis-node stake account gen_escrow \
  --genesis.file $GENESIS_FILE_PATH \
  --signer.backend file \
  --signer.dir $ENTITY_DIR_PATH \
  --stake.escrow.account $ACCOUNT_ADDRESS \
  --stake.amount 200000000000 \
  --transaction.file $OUTPUT_TX_FILE_PATH \
  --transaction.fee.gas 2269 \
  --transaction.fee.amount 2000 \
  --transaction.nonce 0
```

{% hint style="info" %}
`--stake.amount`看起来是一个非常大的数字，但实际上这只是相当于 Amber Network 的 200 个 tokne，因为账户余额的单位是 1x10^-9。
`--transactions.fee.gas` 和 `--transaction.fee.amount` 选项取决于网络配置。
你可以通过 [常用交易标志](../../manage-tokens/oasis-cli-tools/setup.md#common-transaction-flags) 获得更详细的信息。
{% endhint %}

### Generating Entity Registration Transaction 生成 entity 注册交易

在成功运行节点之前，需要注册 enitiy，以便节点能正确注册。 你可以在提交托管交易后执行此过程，但是，为了节省步骤，我们需要事前准备好一切。

- `GENESIS_FILE_PATH`： Genesis 文件在`localhost`的路径，即 `/localhostdir/genesis.json`。

- `ENTITY_DIR_PATH`：entity 文件在 `localhost`的路径，即`/localhostdir/entity/`。

- `OUTPUT_REGISTER_TX_FILE_PATH`： 签名交易输出文件的路径，我们使用 `/localhostdir/signed-register.tx`。

命令如下：

```bash
oasis-node registry entity gen_register \
  --genesis.file $GENESIS_FILE_PATH \
  --signer.backend file \
  --signer.dir $ENTITY_DIR_PATH \
  --transaction.file $OUTPUT_REGISTER_TX_FILE_PATH \
  --transaction.fee.gas 2460 \
  --transaction.fee.amount 1000 \
  --transaction.nonce 1
```

{% hint style="info" %}
`--transactions.fee.gas` 和 `--transaction.fee.amount`依赖网络配置，
你可以通过 [常用交易标志](../../manage-tokens/oasis-cli-tools/setup.md#common-transaction-flags) 获得更详细的信息。
{% endhint %}

### Submitting Your Transactions on the `server` 在 `server`端提交交易

为了完成抵押过程，我们需要将生成的托管和注册交易从离线的`localhost`复制到 `server`，并提交。

要做到这一点，需要以下步骤：

1. 在 `localhost` 上的 `/localhostdir/signed-escrow.tx`复制到 `server`的 `/serverdir/signed-escrow.tx` 。

2. 在`localhost`上的`/localhostdir/signed-register.tx` 复制到 `server`的 `/serverdir/signed-register.tx`。

3. 通过 `oasis-node consensus submit_tx`提交：

   ```bash
   oasis-node consensus submit_tx \
    --transaction.file /serverdir/signed-escrow.tx \
    -a unix:/serverdir/node/internal.sock
   oasis-node consensus submit_tx \
    --transaction.file /serverdir/signed-register.tx \
    -a unix:/serverdir/node/internal.sock
   ```

### Checking that Your Node is Properly Registered 检查节点是否正确注册。

为确保你的节点已作为验证器正确连接到网络上，可以运行以下命令：

```bash
oasis-node control status -a unix:/serverdir/node/internal.sock
```

如果你的节点已注册并为验证器，则上述命令应输出（省略了一些内容）：

```javascript
{
  "software_version": "20.10",
  "identity": {
    ...
  },
  "consensus": {
    "consensus_version": "1.0.0",
    "backend": "tendermint",
    "features": 3,
    "node_peers": [
      ...
    ],
    "latest_height": 55899,
    "latest_hash": "AR34gxwWz1LS5rMDa6E0L1/ThW9E38ySIbRRlRG/shg=",
    "latest_time": "2020-08-10T11:38:26+02:00",
    "latest_state_root": {
      "ns": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      "version": 55898,
      "hash": "h2+8ZryxseOKpuSho1nVSImLF/irVsTF5xryc3I9cRk="
    },
    "genesis_height": 1,
    "genesis_hash": "+SIAMCUeZtWuYPg/Ke+zwPRhNRripRgUq1d5Al9ImNA=",
    "is_validator": true
  },
  "registration": {
    ...
  }
}
```

Pay attention to the `is_validator` field which should have the value of `true`.

{% hint style="info" %}
节点只有在 epoch 转换时才选入验证器集集中，因此你可能需要等待一个 epoch 才能被考虑。
{% endhint %}

{% hint style="warning" %}
需要注意的是，为了在验证者集中当选，你需要有足够的抵押来跻身前 K 个 entity（其中 K 是由 genesis 文档中`scheduler.max_validators`字段指定的参数）。
{% endhint %}

## You're a Validator! 你是验证者了！

到目前为止，你已经将节点正确连接到了网络上，你现在已经是 Oasis 网络上的验证者了。
