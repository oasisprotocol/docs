# Genesis Document

A genesis document contains the initial state of an Oasis Network, and all the
necessary information for launching that particular network (e.g. [Mainnet],
[Testnet]).

:::info

For a more in-depth explanation of the genesis document, see the
[Genesis Document](../../core/consensus/genesis.md) part of Oasis Core's developer
documentation.

:::

The important thing to note is that the genesis document is used to compute the
[genesis document's hash](../../core/consensus/genesis.md#genesis-documents-hash).
This hash is used to verify for which network a given transaction is intended
for.

## Genesis File vs. Genesis Document

A genesis file is a JSON file corresponding to a serialized genesis document. As
such, it is more convenient for distribution and sharing.

When Oasis Node loads a genesis file, it converts it to a genesis document.

:::info

Up to date information about the current genesis file and the current genesis
document's hash can be found on the Network Parameters page ([Mainnet],
[Testnet]).

:::

[Mainnet]: ../network/mainnet.md
[Testnet]: ../network/testnet.md

## Parameters

This sections explains some of the key parameters of the genesis document.

:::caution

The concrete parameter values in the following sections pertain to the [Mainnet].
Other Oasis networks (e.g. [Testnet]) might use different values.

:::

:::danger

The token balances in a genesis document (or a genesis file) are enumerated in
base units.

The **`staking.token_value_exponent`** parameter defines the token value's
base-10 exponent. For the Mainnet it is set to 9 which means 1 ROSE equals 10^9
(i.e. billion) base units.

:::

### Height, Genesis Time and Chain ID

The **`height`** parameter specifies the network's initial block height. When a
network is upgraded, its height is retained. For example, for the
[Cobalt upgrade](./upgrades/cobalt-upgrade.md) the height of the
Mainnet state dump was bumped by 1 from 3,027,600 to 3,027,601.

The **`genesis_time`** parameter is an ISO8601 UTC timestamp that specifies when
the network is officially going to launch. At the time of genesis, validators
are expected to come online and start participating in the consensus process for
operating the network. The network starts once validators representing more than
2/3 of stake in the initial consensus committee are online.

The **`chain_id`** is a human-readable version identifier for a network.

:::caution

It is important to note that this value alone doesn't dictate the version of an
Oasis network. Rather, the hash of the whole genesis document, i.e. the
[genesis document's hash](../../core/consensus/genesis.md#genesis-documents-hash),
is the network's unique identifier.

:::

### Registry

Within the **`registry`** object, there are a broad range of parameters that
specify the initial set of node operators and their corresponding initial node
statuses.

* **`registry.params.max_node_expiration`** The maximum duration (in epochs)
  that node registrations last. The starting value is set to 2 in order to
  ensure that a node is continuously online, since the node’s registration would
  expire each time 2 epochs pass, requiring the node to re-register.

* **`registry.params.enable_runtime_governance_models`** The set of
  [runtime governance models] that are allowed to be used when creating/updating
  registrations. It is set to `{"entity": true, "runtime": true}` which means a
  runtime can choose between **entity governance** and **runtime-defined
  governance**.

* **`registry.entities`** The entity registrations for initial node operators,
  including public key and signature information.

* **`registry.runtimes`** The initial runtime registrations. Each item describes
  a runtime's operational parameters, including its identifier, kind, admission
  policy, committee scheduling, storage, governance model, etc. For a full
  description of the runtime descriptor see the [`Runtime` structure]
  documentation.

* **`registry.suspended_runtimes`** The initial suspended runtime registrations.
  Each item describes a suspended runtime's operational parameters, including
  its identifier, kind, admission policy, committee scheduling, storage,
  governance model, etc. For a full description of the runtime descriptor see
  the [`Runtime` structure] documentation.

* **`registry.nodes`** The node registrations for initial node operators,
  including public key and signature information.

:::info

For a new network, the entity and node registrations are obtained via the entity
package collection process (e.g. [Mainnet Network Entities]).

For an upgrade to an existing network, the network's state dump tool captures
the network's current entity and node registrations.

:::

[runtime governance models]: ../../core/consensus/services/registry.md#runtimes
[`Runtime` structure]: https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/registry/api?tab=doc#Runtime
[Mainnet Network Entities]: https://github.com/oasisprotocol/mainnet-entities

### Gas Costs

The following parameters define the gas costs for various types of transactions
on the network:

* **`staking.params.gas_costs.add_escrow`** The cost for an add escrow (i.e.
  stake tokens) transaction. The value is set to 1000.
* **`staking.params.gas_costs.burn`** The cost for a burn (i.e. destroy tokens)
  transaction. The value is set to 1000.
* **`staking.params.gas_costs.reclaim_escrow`** The cost for a reclaim escrow
  transaction (i.e. unstake tokens). The value is set to 1000.
* **`staking.params.gas_costs.transfer`** The cost for a transfer transaction.
  The value is set to 1000.
* **`staking.params.gas_costs.amend_commission_schedule`** The cost for
  amending, or changing, a commission schedule. The value is set to 1000.
* **`registry.params.gas_costs.deregister_entity`** The cost for a deregister
  entity transaction. The value is set to 1000.
* **`registry.params.gas_costs.register_entity`** The cost for a register entity
  transaction. The value is set to 1000.
* **`registry.params.gas_costs.register_node`** The cost for a register node
  transaction. The value is set to 1000.
* **`registry.params.gas_costs.register_runtime`** The cost for a register
  ParaTime transaction. The value is set to 1000.
* **`registry.params.gas_costs.runtime_epoch_maintenance`** The cost of a
  maintenance fee that a node that is registered for a ParaTime pays each epoch.
  The value is set to 1000.
* **`registry.params.gas_costs.unfreeze_node`** The cost for unfreeze node (i.e.
  after the node is slashed and frozen) transaction. The current value is 1000.
* **`keymanager.params.gas_costs.publish_ephemeral_secret`** The cost for
  keymanager ephemeral secret publication transaction. The value is set to 1000.
* **`keymanager.params.gas_costs.publish_master_secret`** The cost for
  keymanager master secret publication transaction. The value is set to 1000.
* **`keymanager.params.gas_costs.update_policy`** The cost for keymanager update
  policy transaction. The value is set to 1000.
* **`roothash.params.gas_costs.compute_commit`** The cost for a ParaTime compute
  commitment transaction. The value is set to 10000.

:::caution

In addition to the gas costs specified above, each transaction also incurs a
cost proportional to its size.

The **`consensus.params.gas_costs.tx_byte`** parameter specifies the additional
gas cost for each byte of a transaction. The value is set to 1.

For example, a staking transfer transaction of size 230 bytes would have a total
gas cost of 1000 + 230.

:::

### Root Hash

The **`roothash`** object contains parameters related to the [Root Hash service]
and minimal state related to runtimes.

* **`roothash.params.max_runtime_messages`** The global limit on the number of
  [messages] that can be emitted in each round by the runtime. The value is set
  to 256.

* **`roothash.params.max_evidence_age`** The maximum age (in the number of
  rounds) of submitted evidence for [compute node slashing]. The value is set to
  100.

[Root Hash service]: ../../core/consensus/services/roothash.md
[messages]: ../../core/runtime/messages.md
[compute node slashing]: ../../adrs/0005-runtime-compute-slashing.md

### Staking

The **`staking`** object contains parameters controlling the Staking service and
all state related to accounts, delegations, special pools of tokens...

#### Token Supply & Ledger

The following parameters specify the total token supply, total token pool
reserved for staking rewards, and account balances across the network at the
time of genesis:

* **`staking.total_supply`** The total token supply (in base units) for the
  network. This is fixed at 10 billion ROSE tokens (the value is set to
  10,000,000,000,000,000,000 base units).

* **`staking.common_pool`** The tokens (in base units) reserved for staking
  rewards to be paid out over time.

* **`staking.governance_deposits`** The tokens (in base units) collected from
  governance proposal deposits.

* **`staking.ledger`** The staking ledger, encoding all accounts and
  corresponding account balances on the network at the time of genesis,
  including accounts for initial operators, backers, custodial wallets, etc.

* **`staking.delegations`** The encoding of the initial delegations at the time
  of genesis.

:::info

**Interpreting your account balance in the `staking.ledger`**

Your account's **`general.balance`** includes all of your tokens that have not
been staked or delegated. Within your account's `escrow` field, the
`active.balance` holds the total amount of tokens are (actively) delegated _to_
you.

:::

#### Delegations

The following parameters control how delegations behave on the network:

* **`staking.params.debonding_interval`** The period of time (in epochs) that
  must pass before staked or delegated tokens that are requested to be withdrawn
  are returned to the account's general balance. The value is set to 336 epochs,
  which is expected to be approximately 14 days.
* **`staking.params.min_delegation`** The minimum amount of tokens one can
  delegate. The value is set to 100,000,000,000 base units, or 100 ROSE tokens.
* **`staking.params.allow_escrow_messages`** Indicator whether to enable support
  for `AddEscrow` and `ReclaimEscrow` [runtime messages](../../core/runtime/messages.md).
  The value is set to `true`.

#### Node & ParaTime Token Thresholds {#staking-thresholds}

There are several **`staking.params.thresholds`** parameters that specify the
minimum number of tokens that need to be staked in order for a particular entity
or a particular type of node to participate in the network.

The **`entity`**, **`node-compute`**, **`node-keymanager`**, and
**`node-validator`** parameters are set to 100,000,000,000 base units for each,
indicating that you need to stake at least 100 ROSE tokens in order to have your
entity or any of the specified nodes go live on the network.

The **`staking.params.thresholds`** parameters also specify the minimum
thresholds for registering new ParaTimes. The **`runtime-compute`** and
**`runtime-keymanager`** parameters are set to 50,000,000,000,000 base units,
indicating that you need to stake at least 50,000 ROSE tokens in order to
register a compute/key manager ParaTime.

#### Rewards

The following parameters control the staking rewards on the network:

* **`staking.params.reward_schedule`** The staking reward schedule, indicating
  how the staking reward rate changes over time, defined at an epoch-by-epoch
  granular basis. The reward schedule uses a tapering formula with higher
  rewards being paid out at earlier epochs and then gradually decreasing over
  time. For more details, see the [Staking Incentives] doc.
* **`staking.params.signing_reward_threshold_numerator`** and
  **`staking.params.signing_reward_threshold_denominator`** These parameters
  define the proportion of blocks that a validator must sign during each epoch
  to receive staking rewards. The set fraction of 3/4 means that a validator
  must maintain an uptime of at least 75% blocks during an epoch in order to
  receive staking rewards for that period.
* **`staking.params.fee_split_weight_propose`** The block proposer's share of
  transaction fees. The value is set to 2.
* **`staking.params.fee_split_weight_next_propose`** The next block proposer's
  share of transaction fees. The value is set to 1.
* **`staking.params.fee_split_weight_vote`** The block signer’s/voter’s share of
  transaction fees. The value is set to 1.
* **`staking.params.reward_factor_epoch_signed`** The factor for rewards
  distributed to validators who signed at least threshold blocks in a given
  epoch. The value is set to 1.
* **`staking.params.reward_factor_block_proposed`** The factor for rewards
  earned for block proposal. The value is set to 0, indicating validators get no
  extra staking rewards for proposing a block.

[Staking Incentives]: ../../general/oasis-network/token-metrics-and-distribution.mdx#staking-incentives

#### Commission Schedule

The following parameters control how commission rates and bounds can be defined
and changed:

* **`staking.params.commision_schedule_rules.rate_change_interval`** The time
  interval (in epochs) at which rate changes can be specified in a commission
  schedule. The value is set to 1 indicating that the commission rate can change
  on every epoch.

* **`staking.params.commision_schedule_rules.rate_bound_lead`** The minimum lead
  time (in epochs) needed for changes to commission rate bounds. This is set to
  protect the delegators from unexpected changes in an operator's commission
  rates. The value is set to 336, which is expected to be approximately 14 days.

* **`staking.params.commision_schedule_rules.max_rate_steps`** The maximum
  number of rate step changes in a commission schedule. The value is set to 10,
  indicating that the commission schedule can have a maximum of 10 rate steps.

* **`staking.params.commision_schedule_rules.max_bound_steps`** The maximum
  number of commission rate bound step changes in the commission schedule. The
  value is set to 10, indicating that the commission schedule can have a maximum
  of 10 rate bound steps.

#### Slashing

These parameters specify key values for the network's slashing mechanism:

* **`staking.params.slashing.consensus-equivocation.amount`** The amount of
  tokens to slash for equivocation (i.e. double signing). The value is set to
  100,000,000,000 base units, or 100 ROSE tokens.

* **`staking.params.slashing.consensus-equivocation.freeze_interval`** The
  duration (in epochs) for which a node that has been slashed for equivocation
  is “frozen,” or barred from participating in the network's consensus
  committee. The value of 18446744073709551615 (the maximum value for a 64-bit
  unsigned integer) means that any node slashed for equivocation is, in effect,
  permanently banned from the network.

* **`staking.params.slashing.consensus-light-client-attack.amount`** The amount
  of tokens to slash for light client attack. The value is set to
  100,000,000,000 base units, or 100 ROSE tokens.

* **`staking.params.slashing.consensus-light-client-attack.freeze_interval`**
  The duration (in epochs) for which a node that has been slashed for light
  client attack is “frozen,” or barred from participating in the network's
  consensus committee. The value of 18446744073709551615 (the maximum value for
  a 64-bit unsigned integer) means that any node slashed for light client attack
  is, in effect, permanently banned from the network.

### Committee Scheduler

The **`scheduler`** object contains parameters controlling how various
committees (validator, compute, key manager) are periodically [scheduled].

* **`scheduler.params.min_validators`** The minimum size for the consensus
  committee. The value is set to 15 validators.

* **`scheduler.params.max_validators`** The maximum size for the consensus
  committee. The value is set to 100 validators.

* **`scheduler.params.max_validators_per_entity`** The maximum number of nodes
  from a given entity that can be in the consensus committee at any time. The
  value is set to 1.

[scheduled]: ../../core/consensus/services/roothash.md

### Random Beacon

The **`beacon`** object contains parameters controlling the network's random
beacon.

* **`beacon.base`** Network's starting epoch. When a network is upgraded, its
  epoch is retained. For example, for the [Cobalt upgrade](./upgrades/cobalt-upgrade.md)
  the epoch of the Mainnet state dump was bumped by 1 from 5,046 to 5,047.

* **`beacon.params.backend`** The random beacon backend to use. The value is set
  to "vrf" indicating that the beacon implementing a VRF (verifiable random
  function) should be used.

#### VRF Beacon

These parameters control the behavior of the VRF random beacon:

* **`beacon.params.vrf_parameters.alpha_hq_threshold`** The minimum number of
  proofs that must be received for the next input to be considered high quality.
  If the VRF input is not high quality, runtimes will be disabled for the next
  epoch. The value is set to 20.

* **`beacon.params.vrf_parameters.interval`** The epoch interval in blocks. The
  value is set to 600 blocks, which is expected to be approximately 1 hour.

* **`beacon.params.vrf_parameters.proof_delay`** The wait period in blocks after
  an epoch transition that nodes must wait before attempting to submit a VRF
  proof for the next epoch's elections. The value is set to 400 blocks.

### **Governance**

The **`governance`** object contains parameters controlling the network's
[on-chain governance](../../core/consensus/services/governance.md) introduced in
the [Cobalt upgrade](./upgrades/cobalt-upgrade.md):

* **`governance.params.min_proposal_deposit`** The amount of tokens (in base
  units) that are deposited when creating a new proposal. The value is set to
  10,000,000,000,000 base units, or 10,000 ROSE tokens.

* **`governance.params.voting_period`** The number of epochs after which the
  voting for a proposal is closed and the votes are tallied. The value is set to
  168, which is expected to be approximately 7 days.

* **`governance.params.stake_threshold`** The percentage of `VoteYes` votes in
  terms of total voting power for a governance proposal to pass. The value is
  set to 68 (i.e. 68%).

* **`governance.params.upgrade_min_epoch_diff`** The minimum number of epochs
  between the current epoch and the proposed upgrade epoch for the upgrade
  proposal to be valid. Additionally, it specifies the minimum number of epochs
  between two consecutive pending upgrades.

  The value is set to 336, which is expected to be approximately 14 days.

* **`governance.params.upgrade_cancel_min_epoch_diff`** The minimum number of
  epochs between the current epoch and the proposed upgrade epoch for the
  upgrade cancellation proposal to be valid. The value is set to 192, which is
  expected to be approximately 8 days.

### Consensus

The following parameters are used to define key values for the network's
consensus protocol:

* **`consensus.backend`** Defines the backend consensus protocol. The value is
  set to "tendermint" indicating that the Tendermint BFT protocol is used.

* **`consensus.params.timeout_commit`** Specifies how long to wait (in
  nanoseconds) after committing a block before starting a new block height (this
  affects the block interval). The value is set to 5,000,000,000 nanoseconds, or
  5 seconds.

* **`consensus.params.max_tx_size`** Maximum size (in bytes) for consensus-layer
  transactions. The value is set to 32,768 bytes, or 32 kB.

* **`consensus.params.max_block_size`** Maximum block size (in bytes). The value
  is set to 22,020,096 bytes, or 22 MB.

* **`consensus.params.max_block_gas`** Maximum block gas. The value is set to 0,
  which specifies an unlimited amount of gas.

* **`consensus.params.max_evidence_size`** Maximum evidence size (in bytes). The
  value is set to 51,200 bytes, or 50 kB.

* **`consensus.params.public_key_blacklist`** A list of the public keys that
  cannot be used on the network. Currently, there are no blacklisted public
  keys.

* **`consensus.params.state_checkpoint_interval`** The interval (in blocks) on
  which state checkpoints should be taken. The value is set to 10000.

* **`consensus.params.state_checkpoint_num_kept`** The number of past state
  checkpoints to keep. The value is set to 2.

* **`consensus.params.state_checkpoint_chunk_size`** The chunk size (in bytes)
  that should be used when creating state checkpoints. The value is set to
  8,388,608 bytes, or 8 MB.
