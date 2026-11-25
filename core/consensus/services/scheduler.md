# Committee Scheduler

Source: https://docs.oasis.io/core/consensus/services/scheduler

The committee scheduler service is responsible for periodically scheduling all
committees (validator, compute, key manager) based on [epoch-based time] and
entropy provided by the [random beacon].

The service interface definition lives in [`go/scheduler/api`]. It defines the
supported queries and transactions. For more information you can also check out
the [consensus service API documentation].

[epoch-based time]: https://docs.oasis.io/core/consensus/services/epochtime.md

[random beacon]: https://docs.oasis.io/core/consensus/services/beacon.md

[`go/scheduler/api`]: https://github.com/oasisprotocol/oasis-core/tree/master/go/scheduler/api

[consensus service API documentation]: https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/scheduler/api?tab=doc

## Events

## Validator Committee

To schedule the validator committee, the committee scheduler selects among
nodes [registered] with the [`RoleValidator`] role.
Each node's entity must have an [escrow account balance] meeting the total
thresholds for the nodes and runtimes that it has registered.
If an entity's escrow account balance is too low to meet the total threshold,
the committee scheduler does not consider that entity's nodes.

From these qualifying nodes, the committee scheduler selects at most one node
from each entity, up to a maximum validator committee size.
The maximum validator committee size is configured in the genesis document,
under the path `.scheduler.params.max_validators` (consult the [genesis
document] for details).
Unlike how the committee scheduler schedules other committees, it schedules the
validator committee by choosing nodes from the entities that have the highest
escrow account balances.

When the committee scheduler schedules the validator committee, it additionally
assigns each member a *voting power*, which controls (i) the weight of its
votes in the consensus protocol and (ii) how often it serves as the proposer in
the consensus protocol.

The committee scheduler assigns a validator's voting power proportional to its
entity's [escrow account balance].

[registered]: https://docs.oasis.io/core/consensus/services/registry.md#register-node

[`RoleValidator`]: https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/common/node?tab=doc#RoleValidator

[escrow account balance]: https://docs.oasis.io/core/consensus/services/staking.md#escrow

[genesis document]: https://docs.oasis.io/node/reference/genesis-doc.md#committee-scheduler

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
