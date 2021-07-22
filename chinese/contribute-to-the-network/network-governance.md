# 网络治理

{% hint style="info" %}
治理模式仍在敲定中。请随时查看最新情况。

如果你有关于如何使用和部署软件的问题，请看[运行节点](../run-a-node/node-operator-overview.md) 这篇文章或加入我们的[Slack](https://join.slack.com/t/oasiscommunity/shared_invite/enQtNjQ5MTA3NTgyOTkzLWIxNTg1ZWZmOTIwNmQ2MTg1YmU0MzgyMzk3OWM2ZWQ4NTQ0ZDJkNTBmMTdlM2JhODllYjg5YmJkODc2NzgwNTg).

欢迎并鼓励社区所尊有成员向平台提交代码、文档和建议。贡献指南可以在[这里](contribution-guidelines.md)找到。
{% endhint %}

### Proposed Governance Model Overview

Oasis Protocol基金会为Oasis网络的持续发展提出了基于链下和链上流程相结合的代议制民主治理模式。Oasis Protocol基金会将负责指导平台的长期发展，并协调开发和网络运营的社区，收集社区成员的意见，网络的变化由节点运营者投票决定，投票权基于有桩和委托代币的比例。我们之所以提出这种模式，是因为我们认为这种模式可以为所有参与的社区成员--从各种规模的开发者，到节点所有者，再到代币持有者--提供一个平衡的话语权，同时还能促进网络更新、新功能、关键bug修复的快速部署。

为了让社区在分布式所有权和参与度与平台开发的速度和质量之间取得平衡，我们提出了一种链下机制和链上机制的混合模式，主要围绕以下几个部分展开：

1. 小功能要求
2. 主要功能要求
3. 错误修复

### Decision Making Process

今后，我们提议的审查和批准主要议定书更新的程序是：

**提案** 的功能和路线图更新的建议可以由社区中的任何人以 issues（[小功能](network-governance.md#minor-feature-requests)）或[建筑决策记录](https://github.com/oasisprotocol/oasis-core/blob/master/docs/adr/index.md)（[主要功能](network-governance.md#major-feature-requests)）的形式提出。

* **审查和讨论这些提案** 关于项目未来的决定是通过与社区所有成员的讨论做出的，从最新的用户到最有经验的用户。所有非敏感的项目管理讨论都会在Oasis Protocol GitHub上通过issues([针对次要功能](network-governance.md#minor-feature-requests))和ADRs([针对主要功能](network-governance.md#major-feature-requests))进行。

* **决策过程** 为了确保该项目不被无休止的讨论和持续的投票所困扰，该项目实行一种懒惰的协商一致政策。这使得大多数决定不需要经过正式表决就能作出。

一般来说，只要没有人明确反对一个提案或补丁，就会被认为得到了社区的支持。为了使懒人共识有效，在假设没有人反对该提案之前，有必要允许至少72小时。这个要求可以确保每个人都有足够的时间来阅读、消化和回应提案。

如果通过讨论没有达成共识，[项目提交人](https://github.com/oasisprotocol/oasis-core/blob/master/GOVERNANCE.md#committers)可以投票决定接受或拒绝该提案。投票是通过提案拉请求中的评论来进行的。提案以简单的多数票被接受。

* **最后投票通过** 建成后，社区会投票批准每一次升级和提案中包含的相应功能。这个投票过程最初可能会在链下进行，但最终会变成链上过程。持有股权的实体将投票批准变更，每个实体的投票权与他们所押注的代币份额相对于押注的总代币成正比。

* **升级** 节点运营商自主升级系统，运行新版软件。

### Minor Feature Requests

要请求新的功能，有两种最有效的方法来接收意见并取得进展。

如果这个功能很小--只是对一个功能的改变，或者是增加了一个可以用几句话清晰简洁地表达出来的功能，那么最合适的地方就是在Oasis核心仓库中[以新功能请求的形式提出](https://github.com/oasisprotocol/oasis-core/issues/new?template=feature_request.md)。

### Major Feature Requests

如果该功能比较复杂，涉及 Protocol变更，或者具有潜在的安全或性能影响，那么可以考虑提出[架构决策记录(Architectural Decision Record，ADR)](https://github.com/oasisprotocol/oasis-core/blob/master/docs/adr/index.md)，并将其作为拉动请求提交到Oasis核心存储库。

这将允许对拟议的修改进行有条理的审查和评论。在开始实施之前，你应该争取让ADR被接受和合并。请记住，项目的提交者仍然对项目中的内容有最终决定权。

{% hint style="info" %}
我们建议在Oasis Protocol基金会及其技术咨询委员会的建议下，进行重大 Protocol更新，包括需要硬分叉、路线图和功能规划。
{% endhint %}

### Urgent Bug Fixes

紧急错误修复将主要在链外进行协调，以优化处理任何对网络即时健康至关重要的问题的速度。Oasis网络社区作为一个整体，共同负责识别和解决错误。当发现bug时，Oasis Protocol基金会可以作为第一道防线，对bug进行分配，并协调安全补丁的快速发布。

对于任何软件项目来说，bug不能避免。

如果您认为某个错误报告会带来安全风险，请遵循[责任披露](https://en.wikipedia.org/wiki/Responsible_disclosure)，并按照[安全披露信息](https://oasisprotocol.org/security)进行报告，而不是提交公开问题或发布到公共论坛。

我们会及时给你回复。

否则，请先在[我们版本库中已有的问题](https://github.com/oasisprotocol/oasis-core/issues)之间搜索，如果问题还没有被报告，请[提交一个新的问题](https://github.com/oasisprotocol/oasis-core/issues/new?template=bug_report.md)。

### Contributing to the Network

如果你有兴趣为 Oasis 代码库或文档做出贡献，请查看我们的[贡献指南](contribution-guidelines.md)
