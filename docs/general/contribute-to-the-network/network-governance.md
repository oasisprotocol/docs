# Network Governance



:::info

If you have a general question on how to use and deploy our software, please read our [Run a Node](../run-a-node/node-operator-overview.mdx) section or join our [community Slack](https://join.slack.com/t/oasiscommunity/shared_invite/enQtNjQ5MTA3NTgyOTkzLWIxNTg1ZWZmOTIwNmQ2MTg1YmU0MzgyMzk3OWM2ZWQ4NTQ0ZDJkNTBmMTdlM2JhODllYjg5YmJkODc2NzgwNTg).

All community members are welcome and encouraged to commit code, documentation and enhancement proposals to the platform. Contribution guidelines can be found [here](contribution-guidelines.md).

:::

### Governance Model Overview

The Oasis Protocol Foundation proposes a representative democracy governance model based on a combination of off-chain and on-chain processes for the continued development of the Oasis Network. The Oasis Protocol Foundation will be tasked with guiding the long-term development of the platform and coordinating the community of development and network operations, with input collected from community members and changes to the network being voted on by node operators, with voting power based proportionally on staked and delegated tokens. We propose this model because we think it will provide a balanced voice to all engaged community members -- from developers of all sizes, to node owners, to token holders -- while at the same time still facilitating the swift deployment of network updates, new features, critical bug fixes.

In order for the community to balance distributed ownership and participation with speed and quality of platform development, we propose a hybrid model of off- and on-chain mechanisms, organized around the following key components:

1. Minor Feature Requests
2. Major Feature Requests
3. Bug Fixes

### Decision Making Process

Moving forward, our proposed process for reviewing and approving major protocol updates is:

* **Proposals** for features and roadmap updates can come from anyone in the community in the form of issues ([for minor features](network-governance.md#minor-feature-requests)) or [Architectural Decision Records](../../../oasis-core/adr) (ADRs, [for major features](network-governance.md#major-feature-requests)).
* **Review and discussion of the proposals.** Decisions about the future of the project are made through discussion with all members of the community, from the newest user to the most experienced. All non-sensitive project management discussion takes place in the Oasis Protocol GitHub via issues ([for minor features](network-governance.md#minor-feature-requests)) and ADRs ([for major features](network-governance.md#major-feature-requests)).
* **Decision making process.** In order to ensure that the project is not bogged down by endless discussion and continual voting, the project operates a policy of lazy consensus. This allows the majority of decisions to be made without resorting to a formal vote.

  In general, as long as nobody explicitly opposes a proposal or patch, it is recognised as having the support of the community. For lazy consensus to be effective, it is necessary to allow at least 72 hours before assuming that there are no objections to the proposal. This requirement ensures that everyone is given enough time to read, digest and respond to the proposal.

  In case consensus is not reached through discussion, the [project committers](https://github.com/oasisprotocol/oasis-core/blob/master/GOVERNANCE.md#committers) may vote to either accept the proposal or reject it. Votes are cast using comments in the proposal pull request. The proposal is accepted by a simple majority vote.
* **Final vote for approval.** Once built, the community votes to approve each upgrade and the corresponding features that are included in the proposal. This voting process may initially be done off-chain but will eventually become an on-chain process. Entities holding stake will vote to approve changes, with each entity's voting power being proportional to their share of tokens staked relative to the total tokens staked.
* **Upgrade.** Node operators autonomously upgrade their system to run the new version of the software.

### Minor Feature Requests

To request new functionality, there are two primary approaches that will be most effective at receiving input and making progress.

If the feature is small - a change to a single piece of functionality, or an addition that can be expressed clearly and succinctly in a few sentences, then the most appropriate place to [propose it is as a new feature request](https://github.com/oasisprotocol/oasis-core/issues/new?template=feature_request.md) in the Oasis Core repository.

### Major Feature Requests

If the feature is more complicated, involves protocol changes, or has potential safety or performance implications, then consider [proposing an Architectural Decision Record (ADR)](../../../oasis-core/adr) and submit it as a pull request to the Oasis Core repository. This will allow a structured review and commenting of the proposed changes. You should aim to get the ADR accepted and merged before starting on implementation. Please keep in mind that the project's committers still have the final word on what is accepted into the project.

:::info

We recommend that major protocol updates including a need to hard fork, roadmap and feature planning be conducted with recommendations from the Oasis Protocol Foundation and its technical advisory committee.

:::

### Urgent Bug Fixes

Urgent bug fixes will primarily be coordinated off-chain to optimize for speed in addressing any issues that are critical to the immediate health of the network. The Oasis Network community as a whole is collectively responsible for identifying and addressing bugs. As bugs are identified, the Oasis Protocol Foundation can serve as a line of first defense to triage these bugs and coordinate security patches for quick release.

Bugs are a reality for any software project. We can't fix what we don't know about!

If you believe a bug report presents a security risk, please follow [responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure) and report it by following the [security disclosure information](https://oasisprotocol.org/security) instead of filing a public issue or posting it to a public forum.

We will get back to you promptly.

Otherwise, please, first search between [existing issues in our repository](https://github.com/oasisprotocol/oasis-core/issues) and if the issue is not reported yet, [file a new one](https://github.com/oasisprotocol/oasis-core/issues/new?template=bug_report.md).

### Contributing to the Network

If you are interested in contributing to the Oasis Network's codebase or documentation, please [review our contribution guidelines here.](contribution-guidelines.md)
