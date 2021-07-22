---
description: Oasis Network 体系架构和关键技术优势
---

# Oasis Network 概览

Oasis Network 是个 1 层的去中心化区块链网络，这个网络具有优良的可扩展性，隐私优先并且功能多样。

Oasis Network 有两个主要架构组成部分，共识层和 ParaTime 层。

1. **共识层** 是一种可扩展的、高吞吐量的、安全的、基于 pos 的共识，由一组去中心化的验证器节点运行。

2. **ParaTime 层** 托管许多并行运行时 \(ParaTimes\), 每一个运行时都代表一个具有共享状态的复制计算环境。

![Oasis 的 ParaTime 与共识层的架构设计](https://lh4.googleusercontent.com/xGCkDb7ZW8EGOTrO7BDgKm9VRM03nTvkwwAJV-w2r8j67gICC7UIBbk0wARSccSVhAmQ25rhpwNLQCgNh7cl5OGkwSR_TFHt9J9jZZdM7fnzuJZOAzHuTKHJ3ajUAOVuzcRUYFkh)

## 技术亮点

- **将共识和执行分为两层**——共识层和 ParaTime 层——以实现更好的可扩展性和通用性 。

- 共识和执行相分离，使得**多个 ParaTimes 可以并行处理交易**，这意味着一个 ParaTime 上的复杂计算不会拖慢另一个 ParaTime 上的简单计算。

- ParaTime 层是完全去中心化的，允许 **任何人开发和建立自己的 ParaTime**。每个 ParaTime 都可以单独开发，以满足特定应用的需求，如保密计算、开放或关闭委员会等。

- 网络先进的差异检测功能使 Oasis**比分片和并行链更有效**——对于同等的安全级别，所需要的复制因子更小。

- **Oasis 对保密计算技术有广泛的支持**。Oasis Eth/WASI Runtime 是一个保密的 ParaTime 的开源例子，它使用安全区域飞地（secure enclaves）在处理数据时保持数据的私密性。

## Oasis Network 的技术优势

### 可伸缩性

Oasis Network 通过一组尖端技术实现了独一无二的可扩展性，这些功能提供了比其他网络更快的交易速度和更高的吞吐量。而这一顶级性能，在很大程度上是由于它将计算和共识分离成了共识层和 ParaTime 层。这种分离允许多个 ParaTimes 并行处理计算，也就是说一个 ParaTime 上的复杂计算是不会减慢另一个 ParaTime 上的简单计算的。此外，Oasis 的复杂差异检测也使得 Oasis 比分片和平行链更有效率，因为针对相同级别的安全性来说，其所需要的复制因子更小。

### 隐私优先

Oasis Network 设计了有史以来第一个支持保密智能合约的 ParaTime。在该 ParaTime 中，节点须在一个
“TEE” \(Trusted Execution Environment\) 的受信任的执行环境中进行安全计算。此时，TEE 充当的是智能合约执行时假设的黑匣子。也就是说，当加密过的数据和智能合约被发送至这个黑匣子时，数据便会被解密，然后再由智能合约进行处理，处理完后，数据会被再一次进行加密处理，最后才从 TEE 中发送出来。整个过程确保了数据的保密性，且永远不会泄漏给节点操作者或应用程序开发者。

Oasis Eth/WASI Runtime 是一个使用英特尔 SGX 的保密 ParaTime 的开源例子。此外，还可以使用其他安全计算技术，如 ZKP、HE 或其他安全计算技术等。在未来，我们希望支持更多的计算技术，如安全多方计算，联邦学习等。

这种保密特性解锁了一系列 Oasis Network 上涉及个人敏感数据的应用案例，比如与个人社保信息、银行对帐单和健康信息相关的信息，而如果在一层区块链上直接使用这些数据，将具有极大泄漏的风险。

### 功能多样性

Oasis Network 是为支持下一代区块链应用程序而设计的，因此它具有令人难以置信的多样性、敏捷性和可定制性。也就是说，每个 ParaTime 都可以单独开发，以满足特定应用程序的需要。ParaTimes 委员会可大可小、可开放也可以关闭，从而根据特定用例需求执行更快或更安全的操作。节点可能需要具备特定的硬件，例如在保密 ParaTime 中的安全飞地。每个 ParaTime 都可以类似地运行不同的 Runtime VM \(ParaTime 引擎\)，如 EVM 向后兼容引擎、基于 Rust 的智能合约语言或数据通证化引擎。最后，为了支持企业和开发人员用例，ParaTimes 还可以是需要许可的或者无需许可的，协会可以拥有他们自己的封闭的 ParaTime，或者社区也可以拥有完全去中心化的开放的 ParaTime。

ParaTime 层的多功能性允许 Oasis Network 扩展并以引入新的用例，但同时仍然保持着相同的核心账本和共识层。
