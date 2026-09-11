# ADR 0016: Consensus Parameters Change Proposal

Source: https://docs.oasis.io/adrs/0016-consensus-parameters-change-proposal

## Component

Oasis Core

## Changelog

* 2022-09-15: Initial version

## Status

Proposed

## Context

Currently consensus parameters can only be changed with an upgrade governance
proposal which is effective but not very efficient. Upgrades require downtime
during which binaries need to be updated, nodes restarted and synced, consensus
network version has to be increased etc. We would like to avoid this cumbersome
procedure and change the parameters of a consensus module as fast and as simple
as possible without affecting the performance of the consensus layer.

## Decision

Implement governance proposal which changes consensus parameters only.

## Implementation

### New proposal

A new type of governance proposal named `ChangeParametersProposal` should be
added to the consensus layer. The proposal should contain two non-empty fields:

* the name of the consensus `Module` the changes should be applied to, and,

* a CBOR-encoded document `Changes` describing parameter changes.

```golang
// ChangeParametersProposal is a consensus parameters change proposal.
type ChangeParametersProposal struct {
  // Module identifies the consensus backend module to which changes should be
  // applied.
  Module string `json:"module"`
  // Changes are consensus parameter changes that should be applied to
  // the module.
  Changes cbor.RawMessage `json:"changes"`
}
```

Both fields should be validated before proposal submission to avoid having
invalid proposals with empty fields. A more in-depth validation should be done
by consensus modules during submission to ensure that the encoded `Changes` are
complete and well-formed and that there is exactly one module to which changes
will be applied.

```golang
// ValidateBasic performs a basic validation on the change parameters proposal.
func (p *ChangeParametersProposal) ValidateBasic() error {
  // Validate that both fields are set.
}
```

The new proposal should be added to the `ProposalContent`. The extension should
still allow only one proposal at a time, so we must not forget to update
the code responsible for validation.

```golang
type ProposalContent struct {
  ...
  ChangeParameters *ChangeParametersProposal `json:"change_parameters,omitempty"`
}
```

### Parameter changes

Each consensus module should carefully scope which parameters are allowed to
be changed. For example, a governance module could allow changing only the gas
costs and the voting period, while the staking module would allow changing
all parameters.

```golang
// ConsensusParameterChanges define allowed governance consensus parameter
// changes.
type ConsensusParameterChanges struct {
  // GasCosts are the new gas costs.
  GasCosts *transaction.Costs `json:"gas_costs,omitempty"`
  // VotingPeriod is the new voting period.
  VotingPeriod *beacon.EpochTime `json:"voting_period,omitempty"`
}
```

To prevent invalid proposals being submitted, `ConsensusParameterChanges`
should expose validation method which can be used to check if changes are
valid (e.g. changes are not empty, parameters have the right ranges).

```golang
// SanityCheck performs a sanity check on the consensus parameters changes.
func (c *ConsensusParameterChanges) SanityCheck() error {
  // Validate changes.
}
```

How changes are executed is up to the module implementation.

```golang
// Apply applies changes to the given consensus parameters.
func (c *ConsensusParameterChanges) Apply(params *ConsensusParameters) error {
   // Apply changes.
}
```

### Submission

When a new `ChangeParametersProposal` is submitted a basic validation is
performed first which checks whether the `Module` name and `Changes` are set
correctly. Afterwards, a validation message is broadcasted to all modules
requesting them to validate the proposal. Only the module for which `Changes`
are intended should act and reply to the message, other modules should silently
ignore it. In case no module replies, the proposal is immediately rejected
as not being supported.

The module should carefully examine the proposal, check whether the proposal
is well-formed, `Changes` are not empty and deserialize correctly to the
expected format, deserialized parameter changes are valid etc. If all checks
succeed, the module should respond with a confirmation message. Otherwise,
an error describing why proposal is invalid should be returned as a response.

Note: Validation at this stage cannot always be complete as valid parameter
values are not necessary independent of each other. If multiple proposals are
being executed at the same time, the resulting parameters can be invalid even
though validation of each proposal passed. Therefore, another validation
is required when the proposal is about to be executed.

### Execution

If `ChangeParametersProposal` closes as accepted (vote passed), the governance
module will execute the proposal by broadcasting a message containing
the proposal to all modules. Notification can be done using the same message
dispatch mechanism as in the submission phase. Once messages are delivered,
only one module will act and try to apply `Changes`.

That module should first fetch current consensus parameters, then apply
proposed `Changes` and finally validate the result. Validation of parameters
is necessary as mentioned in the submission phase. If validation succeeds,
the consensus parameters are updated and proposal is marked as passed.
Otherwise, the proposal is marked as failed and the proposed parameter
changes are discarded.

```golang
// SanityCheck performs a sanity check on the consensus parameters.
func (p *ConsensusParameters) SanityCheck() error {
   // Validate parameters.
}
```

### How to enable the new proposal

Adding a new proposal type is a consensus breaking change. To make it
non-breaking we introduce a new governance consensus parameter which disables
the new type by default and can be enabled via governance. When disabled,
the governance module will treat the new proposal type as invalid, thus not
violating the consensus.

```golang
type ConsensusParameters struct {
  ...
  // EnableChangeParametersProposal is true iff change parameters proposals are
  // allowed.
  EnableChangeParametersProposal bool `json:"enable_change_parameters_proposal,omitempty"`
}
```

## Consequences

### Positive

* Agile and zero-downtime consensus parameter changes.

* Separation of consensus parameter changes and consensus upgrades.

### Negative

* Introduction of a new governance consensus parameter which enables new
  proposals in the upgrade handler. New parameters can always be considered
  as a minor disadvantage as they usually increase the complexity of the code.

### Neutral

## References

No references.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
