# ADR 0015: Randomized Paratime Proposer Selection

Source: https://docs.oasis.io/adrs/0015-vrf-per-block-entropy

## Component

Oasis Core

## Changelog

* 2022-09-14: Initial import

## Status

Proposed

## Context

The paratime block proposer currently is selected via a round-robin algorithm,
and it is trivial to determine the block proposer well in advance.  This ADR
proposes having a mechanism for generating per-consensus block entropy via
ECVRF[1], and randomizing the Paratime block proposer.

## Decision

### Prerequisites

Let each node have a distinct long-term VRF keypair, that is published as
part of the node's descriptor (as per ADR 0010).

Let Tendermint actually implement `ExtendVote`/`VerifyVoteExtension` as
per certain versions of the ABCI++ spec[2].  Note that it appears that this
will NOT be in Tendermint 0.37.x, but instead is scheduled for a later
release.

### Vote extension

ABCI++ introduces a notion of an application defined `vote_extension` blob
that is set by the tendermint block proposer, and verified by all of the
voters.  Oasis will use the following datastructure, serialized to canonical
CBOR, and signed with the node's consensus signing key.

```golang
type OasisVoteExtension struct {
  // Pi is the proposer's VRF proof for the current block height.
  Pi []byte `json:"pi"`
}
```

For the genesis block +1 (No previous beta), let the VRF alpha\_string input
be derived as:

`TupleHash256((chain_context, I2OSP(height,8)), 256, "oasis-core:tm-vrf/alpha")`

For subsequent blocks, let the VRF alpha\_string input be derived as:

`TupleHash256((chain_context, I2OSP(height,8), prev_beta), 256, "oasis-core:tm-vrf/alpha")`
where prev\_beta is the beta\_string output from the previous height's ECVRF
proof.

Blocks must have a valid `OasisVoteExtension` blob to be considered valid,
and nodes MUST use the same ECVRF key for the entire epoch (key changes
mid-epoch are ignored till the epoch transition) to prevent the proposer
from regenerating the ECVRF key repeatedly to fish for entropy output.

### Proposer selection

Instead of round-robin through the per-epoch list of primary (non-backup)
workers, the index for the node can be selected as thus:

```golang
seed = TupleHash256((chain_context, I2OSP(height,8), runtime_id, pi), 256, "oasis-core:tm-vrf/paratime")
drbg = drbg.New(crypto.SHA512, seed, nil, "BlockProposer")
rng = rand.New(mathrand.New(drbg))

l := len(primary_nodes)
primary_index = int(rng.Int63n(l))
```

## Consequences

### Positive

The paratime block proposer(s) will be randomized.

This can be done without having to patch tendermint.

In theory, the system will have a way to generate entropy at the consensus
layer again.

### Negative

The tendermint block proposer still will be selected via a round robin
algorithm.  Note that Oasis does not have smart contracts at that level so
the impact of being able to predict the block proposer there is less
significant than other systems.

People may be tempted to abuse this entropy for other things (eg: inside
paratimes), which would be incorrect (block proposer can cheat).

This relies on interfaces exposed by ABCI++, which appear to no longer
be part of 0.37.x, so it is unknown when this will be possible to implement.

### Neutral

## References

[1]: https://datatracker.ietf.org/doc/draft-irtf-cfrg-vrf/

[2]: https://github.com/cometbft/cometbft/blob/main/docs/references/rfc/tendermint-core/rfc-013-abci%2B%2B.md

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
