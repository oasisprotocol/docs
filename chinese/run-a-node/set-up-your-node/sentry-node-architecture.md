# Sentry 节点架构

本指南提供了使用Sentry节点架构进行部署的说明，以保护验证器节点不直接暴露在公共网络上。

本指南假定设置中的Oasis验证器节点只能通过专用网络访问，而sentry节点可以访问它。

本指南并不包括设置这个基础设施。 假设你了解 [Tendermint的 Sentry 节点架构](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)。

{% hint style="danger" %}
这只是Sentry节点部署的一个示例，对于其中的错误，我们不承担任何责任。请确保你知道自己在做什么。
{% endhint %}

## 前提条件

开始之前，假设你已经读过[准备环节](../prerequisites/oasis-node.md) 和 [运行节点](run-validator.md)，并创建了自己的 Entity

## Oasis Sentry 节点配置

### 初始化 Sentry 节点

Sentry的节点身份标识符，可以使用以下方法初始化：

```bash
oasis-node identity init --datadir /serverdir/node
```

### 配置 Sentry 节点

通过设置`worker.sentry.enabled`，可以将Oasis节点配置为作为Sentry节点运行。`tendermint.sentry.upstream_address`标志可以用来配置受sentry节点保护的节点列表。

下面是一个sentry节点的完整`YAML`配置的例子。


在使用这些配置前，你需要替换文件中的一些配置：


* `{{ external_address }}`：sentry 节点 可以访问的外网ip地址。
* `{{ seed_node_address }}`：种子节点地址，格式为 `ID@IP:port`。Oasis 种子节点地址可以在 [网络参数](../../oasis-network/network-parameters.md)这一节发现。

* `{{ validator_tendermint_id }}`: 这是 Oasis 验证器节点的Tendermint ID (地址)，这个节点将被sentry 节点保护。这个地址可以通过在验证节点运行以下命令获取到：

  ```bash
  oasis-node identity tendermint show-node-address --datadir /serverdir/node
  ```

* `{{ validator_private_address }}`: 这(大概)是一个私有地址，可以从 sentry 节点访问验证器。

* `{{ validator_sentry_client_grpc_public_key }}`： 这是Oasis验证程序节点的公共TLS密钥，将由sentry节点保护。可以在验证节点运行以下命令获取这个公钥：

  ```bash
   oasis-node identity show-sentry-client-pubkey --datadir /serverdir/node
  ```

需要注意的是，这个命令只有20.8.1版本以后的`oasis-node`才有。

```yaml
##
# Oasis Sentry Node Configuration
#
# This file's configurations are derived from the command line args found in the
# root command of the oasis-node binary. For more information execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. So "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node artifacts
# should also be located in this directory (for us this is /serverdir/node)
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
  # By default logs are output to stdout. If you're running this in docker keep
  # the default
  #file: /var/log/oasis-node.log

# Path to the genesis file for the current version of the network.
genesis:
  file: /serverdir/etc/genesis.json

# Worker configuration.
worker:
  sentry:
    # Enable sentry node.
    enabled: true
    # Port used by validator nodes to query sentry node for registry
    # information.
    # IMPORTANT: Only validator nodes protected by the sentry node should have
    # access to this port. This port should not be exposed on the public
    # network.
    control:
      port: 9009
      authorized_pubkey:
        - {{ validator_sentry_client_grpc_public_key }}

# Tendermint backend configuration.
consensus:
  tendermint:
    abci:
      prune:
        strategy: keep_n
        # Keep ~1 hour of data since block production is ~1 block every 6 seconds.
        # (3600/6 = 600)
        num_kept: 600
    core:
      listen_address: tcp://0.0.0.0:26656
      external_address: tcp://{{ external_address }}:26656

    # List of seed nodes to connect to.
    # NOTE: You can add additional seed nodes to this list if you want.
    p2p:
      seed:
        - "{{ seed_node_address }}"

    sentry:
      upstream_address:
        - "{{ validator_tendermint_id }}@{{ validator_private_address }}:26656"
```

{% hint style="success" %}
可以按照上述步骤配置多个 sentry节点。
{% endhint %}

## 配置验证节点

在这种设置中，Oasis验证器节点不应该直接暴露在公共网络上。Oasis验证器最好是通过一个私有网络，
能够连接到 sentry 节点。

### 初始化验证节点

{% hint style="info" %}
如果你的验证器节点已经在非sentry设置中注册并运行，可以跳过这一步，因为一旦我们用新的配置重新部署Oasis验证器，Oasis验证器将自动更新其在注册器中的地址。
{% endhint %}

当你 [初始化验证节点](run-validator.md#initializing-a-node)的时候，你应该在`node.consensus_address`中使用sentry节点的外部地址和共识ID。
如果你正在运行多个sentry节点，则可以多次指定`node.consensus_address`。

要初始化一个带有2个sentry节点的验证器节点，在`/localhostdir/node`目录下运行以下命令：

```bash
export SENTRY1_CONSENSUS_ID=<YOUR_SENTRY1_CONSENSUS_ID_B64>
export SENTRY1_STATIC_IP=<YOUR_SENTRY1_STATIC_IP>
export SENTRY2_CONSENSUS_ID=<YOUR_SENTRY2_CONSENSUS_ID_B64>
export SENTRY2_STATIC_IP=<YOUR_SENTRY2_STATIC_IP>
oasis-node registry node init \
  --signer.backend file \
  --signer.dir /localhostdir/entity \
  --node.consensus_address $SENTRY1_CONSENSUS_ID@$SENTRY1_STATIC_IP:26656 \
  --node.consensus_address $SENTRY2_CONSENSUS_ID@$SENTRY2_STATIC_IP:26656 \
  --node.is_self_signed \
  --node.role validator
```

{% hint style="info" %}
`SENTRY_CONSENSUS_ID`：这是sentry节点的base64格式的共识ID。该ID可从`consensus_pub.pem`中获得，需要在 sentry节点运行以下命令：

```bash
sed -n 2p /serverdir/node/consensus_pub.pem
```
{% endhint %}

### 配置验证节点

Oasis验证器节点需要进行一些配置更改，才能通过 sentry 节点实现代理。大部分配置跟 Tendermint sentry节点配置很相似。

由于验证器节点没有外部地址，所以忽略配置`consensus.tendermint.core.external_address`。
同样，`consensus.tendermint.p2p.seed`也可以忽略，因为`oasis-node`不会直接连接到任何种子节点。

Tendermint Peer Exchange 应该在验证器禁用`consensus.tendermint.p2p.disable_peer_exchange`。

Sentry 节点也能配置 Tendermint Persistent-Peers 通过 `consensus.tendermint.p2p.persistent_peer`。

除了上面熟悉的Tendermint设置外，每次验证器执行重新注册时，还需要将该节点配置为向Sentry节点查询外部地址。

这个配置是 `worker.sentry.address`。

`worker.sentry.address` 是这样的格式 `<pubkey>@ip:port`：

* `<pubkey>`：是sentry节点的TLS公钥。
* `ip:port`：是sentry节点的控制端的（私有）地址。

综合来看，下面给出了一个sentry节点架构中验证器节点的配置示例。

在使用这个配置之前，你应该收集以下信息来替换配置文件中的`{{ var_name }}`变量。

* `{{ sentry_node_private_ip }}`：这是sentry节点的私有IP地址，sentry节点应该可以通过该地址访问验证器。

* `{{ sentry_node_grpc_public_key }}`：这是哨兵节点的控制端点TLS公钥。这个ID可以在sentry节点运行
以下命令获得：
  ```bash
   oasis-node identity show-tls-pubkey --datadir /serverdir/node
  ```

需要注意的是，这个命令只有20.8.1版本以后的`oasis-node`才有。

* `{{ sentry_node_tendermint_id }}`： 这是哨兵节点的Tendermint ID \(地址\)，该节点将被配置为一个Persistent Peer。

在运行sentry节点，运行以下命令获取此ID：

  ```bash
  oasis-node identity tendermint show-node-address --datadir /serverdir/node
  ```

```yaml
##
# Oasis Node Configuration
#
# This file's configurations are derived from the command line args found in
# the root command of the oasis-node binary. For more information execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. So "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node artifacts
# should also be located in this directory (for us this is /serverdir/node)
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
  # By default logs are output to stdout. If you're running this in docker keep
  # the default
  #file: /var/log/oasis-node.log

# Path to the genesis file for the current version of the network.
genesis:
  file: /serverdir/etc/genesis.json

# Worker configuration.
worker:
  registration:
    # In order for the node to register itself the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /serverdir/node/entity/entity.json
  sentry:
    address:
      - "{{ sentry_node_grpc_public_key }}@{{ sentry_node_private_ip }}:9009"

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: True

  # Tendermint backend configuration.
  tendermint:
    abci:
      prune:
        strategy: keep_n
        # Keep ~7 days of data since block production is ~1 block every 6 seconds.
        # (7*24*3600/6 = 100800)
        num_kept: 100800
    core:
      listen_address: tcp://0.0.0.0:26656
    p2p:
      persistent_peer:
        - "{{ sentry_node_tendermint_id }}@{{ sentry_node_private_ip }}:26656"
      disable_peer_exchange: True
```

