# ADR 0017: ParaTime Application Standard Proposal Process

Source: https://docs.oasis.io/adrs/0017-app-standards

## Component

ADRs

## Changelog

* 2022-10-05: Initial version
* 2022-10-12: Accepted

## Status

Accepted

## Context

Applications running within a ParaTime having a novel runtime environment
(e.g., Sapphire, Cipher) benefit from interoperability standards. For example,
[ERCs] in Ethereum. ADRs are already present in the Oasis ecosystem and so are a
starting point, but these are intended for lightweight recording of decisions,
not gathering consensus around community contributions. This ADR proposes a
template and process amendment for ADRs introducing ParaTime-specific
application standards.

[ERCs]: https://github.com/ethereum/EIPs

## Decision

ADRs will be used for application standards because they are already well
supported within the Oasis ecosystem, and have most of the structure needed
for application standards. Although adapting another project's process would be
easy, having multiple proposal repositories could lead to confusion.

For use with application standards, ADRs shall have more structure to make
contributions fair and straightforward. Specifically, additional required
sections and concrete requirements for acceptance.

Although community standards are only proposals, the *Decision* section will
keep its name for compatibility with the existing template. The decision in this
context will be to accept the standard for distribution to a wider audience.

### Naming Conventions

App standard ADRs shall be referred to as ADR-\<number> regardless of the
targeted ParaTime.

### Changes to the ADR template

* add a new *Apps* component, which has the ParaTime as its sub-component

### New Section Requirements

#### Decision: Specification & Reference Implementation

The *Decision* section gets two new sub-sections:

**Specification**: A complete description of the interface of the standard,
including the threat/trust model, rationale for design decisions, alternative
approaches, and references to related work. This section will generally be
mostly prose with sprinkles of code for illustration.

**Reference Implementation**: A basic implementation of the proposed standard
written in a common language that targets the ParaTime runtime environment.
The reference implementation in the ADR should be executable.

#### Security Considerations

This new section details any weak points of the proposal or common security
flaws that a re-implementation of the specification may run into, as well as
suggestions for avoiding security issues.

### Acceptance Requirements

Like all ADRs, an Apps component ADR will start as *Proposed* and end up merged
once *Accepted*. An application standard ADR following the above format will be
accepted once:

* there is consensus within the ParaTime's own community that the standard meets
  its design goals
* there are no outstanding compatibility or security issues
* an ADR repo committer has signed off on the structure and format of the ADR

## Alternatives

One alternative is to fit the ParaTime-specific application standard proposals
into the existing ADR template, but this would cause the *Decision* section to
become overloaded with the necessary information in an ad-hoc way.

Another alternative is to encourage ParaTimes to do whatever they think most
effective. That's always allowed, of course, and it may sometimes be useful to
wholesale copy the best practices of another community. However, if we make the
ADR process convenient enough, the community can focus its collective effort on
the single ADR repo.

Within the chosen decision, there were many choices of structure from the now
several EIP-like repos. The ones chosen were the minimum we need to get going,
in the spirit of the lightweight ADR process. If more structure is needed in
the future, we can amend this process or switch to a new system entirely, at
which point this ADR shall be marked as *Superseded*.

## Consequences

### Positive

* The community has a rallying point for standard development.
* We can reuse existing process.

### Negative

* The app standard process might still not be ideal even after this proposal.
* ADR-NNN naming convention is not forwards compatible.

### Neutral

* We will need to maintain additional ADR process going forward.

## References

* [Ethereum Improvement Proposals](https://github.com/ethereum/EIPs)
* [RFCs](https://www.rfc-editor.org/pubprocess/)
* [Inter-Chain Standards](https://github.com/cosmos/ibc/blob/main/spec/ics-template.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
