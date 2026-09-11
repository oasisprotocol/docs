# ADR 0024: Runtime Off-chain Logic (ROFL)

Source: https://docs.oasis.io/adrs/0024-off-chain-runtime-logic

## Component

Oasis Core, Oasis SDK

## Changelog

* 2024-02-26: Notifications
* 2023-11-27: Initial draft

## Status

Proposed

## Context

Sometimes we may want the runtime compute nodes to run additional off-chain
logic that communicates with the on-chain state securely (e.g. ensuring that the
off-chain logic is being run by the same node operator, is properly attested
when running in a TEE, etc.).

The off-chain logic may then perform non-deterministic and potentially expensive
things (like remote HTTPS requests or complex local computation) and securely
interact with the on-chain logic via transactions.

The main use case driving this proposal is support for running attested light
client committees that read and verify information from other chains, then make
this information available to Oasis runtimes with no additional trust
assumptions.

## Decision

While similar functionality can be implemented entirely independently on the
application layer (and such solutions already exist), this proposal attempts to
reuse the same security and attestation infrastructure that is already available
for on-chain parts of the runtimes, specifically:

* Compute nodes and runtime binary distribution and execution can stay the same
  as it has been for existing node operators that run the runtimes. Handling of
  the off-chain logic part should be done transparently if the runtime provides
  it.

* Existing attestation, consensus and freshness proof flows can be leveraged for
  ensuring that the off-chain logic is running in a secure environment.

One important consideration is also whether to have the off-chain logic part of
the same runtime binary or have it as a completely separate binary running in
its own process. This proposal decides on the latter to ensure that the
off-chain TCB is completely separate from the on-chain TCB. Given that the logic
running off-chain can be much more complex and can interact with untrusted
external services, ensuring this separation is important as a defense-in-depth
measure.

The proposed architecture extends the composition of the runtime so that it now
contains the following components:

* **Runtime On-chain Logic (RONL)** is what has existed as the sole runtime
  component before this proposal. It contains the logic (and TCB) that is
  responsible for executing the deterministic on-chain logic of the runtime.

* **Runtime Off-chain Logic (ROFL)** is an optional runtime component that may
  run in parallel with RONL and is part of its own TCB. It also uses the same
  general runtime framework and RHP, but instead of implementing the on-chain
  batch scheduling, execution and query methods, it only implements specific
  notification hooks that can trigger arbitrary actions.

Both RONL and ROFL are managed as independent runtimes by the Oasis Node as
host, using the existing runtime host architecture. Failure of ROFL does not
affect RONL which can proceed to run as usual.

### Attestation

An assumption made in this proposal is that both RONL and ROFL components are
developed and built together, by the same entity, and are part of the same
release. This means that we can simplify attestation by making RONL being able
to attest ROFL by being aware of its exact identity.

The idea is that during the release build process, ROFL is built first, its
signer-independent identity (e.g. MRENCLAVE) is measured and included during
compilation of RONL. The signer-dependent part of identity (e.g. MRSIGNER) is
assumed to be the same for both and can be read from trusted CPU state (since it
may not be available during the build process due to offline signing).

Alternatively, one can imagine a proposal where the ROFL identity is backed by
some sort of on-chain governance process defined in the RONL component. Defining
such a mechanism is outside the scope of this proposal.

The process for ROFL attestation proceeds as follows:

1. **Remote Attestation.** The normal runtime attestation flow is initiated by
   the host. As a result of this flow, the `node.CapabilityTEE` structure is
   generated which includes the remote attestation quote and additional data.

2. **Node Endorsement.** The host verifies the `node.CapabilityTEE` structure
   and if deemed correct, it signs it using the node's identity key and the
   following domain separation context:

   ```
   oasis-core/node: endorse TEE capability
   ```

   The signature is stored in a new structure `EndorsedCapabilityTEE` which is
   defined as follows:

   ```go
   type EndorsedCapabilityTEE struct {
      // CapabilityTEE is the TEE capability structure to be endorsed.
      CapabilityTEE CapabilityTEE `json:"capability_tee"`

      // NodeEndorsement is the node endorsement signature.
      NodeEndorsement signature.Signature `json:"node_endorsement"`
   }
   ```

3. **Updating Node-Endorsed CapabilityTEE in ROFL.** The `EndorsedCapabilityTEE`
   is sent to ROFL to be stored and available for establishing secure EnclaveRPC
   sessions.

4. **RONL Verification.** When establishing a new session with RONL, the
   endorsed TEE capability is presented during session establishment. RONL
   verifies the quote, ensures the enclave identity is one of the known
   identities set at compile-time and verifies the node endorsement against the
   locally known node identity (both RONL and ROFL must be from the same node).

   If all the checks pass, a secure EnclaveRPC session is established.

This flow needs to be repeated whenever RAK changes for any reason and also
periodically to ensure freshness (consistent with the quote policy configured
for the runtime in the consensus layer).

### Updates to the ORC Manifest

The ORC manifest is extended with a field that can specify extra components
which currently include ROFL binaries in a similar way as we already support
regular runtime binaries (e.g. specifying the executable and SGX metadata).

The manifest is updated as follows:

```go
// Manifest is a deserialized runtime bundle manifest.
type Manifest struct {
    // ... existing fields omitted ...

    // Components are the additional runtime components.
    Components []*Component `json:"components,omitempty"`
}

// ComponentKind is the kind of a component.
type ComponentKind string

const (
  // ComponentInvalid is an invalid component.
  ComponentInvalid ComponentKind = ""
  // ComponentRONL is the on-chain logic component.
  ComponentRONL ComponentKind = "ronl"
  // ComponentROFL is the off-chain logic component.
  ComponentROFL ComponentKind = "rofl"
)

// Component is a runtime component.
type Component struct {
  // Kind is the component kind.
  Kind ComponentKind `json:"kind"`

  // Name is the name of the component that can be used to filter components
  // when multiple are provided by a runtime.
  Name string `json:"name,omitempty"`

  // Executable is the name of the runtime ELF executable file.
  Executable string `json:"executable"`

  // SGX is the SGX specific manifest metadata if any.
  SGX *SGXMetadata `json:"sgx,omitempty"`
}
```

The top-level `executable` and `sgx` fields are supported for backwards
compatibility and implicitly define a new `Component` of kind `ComponentRONL`.

### Updates to the Runtime Host Protocol

This proposal includes some non-breaking updates to the Runtime Host Protocol in
order to support the ROFL component, as follows:

* **Consensus Block Notification.** No updates are required to facilitate
  notifications about consensus layer blocks as this is already handled as part
  of the existing RHP flow. The only change is that for ROFL, these
  notifications invoke a hook that can be implemented by the runtime.

* **Runtime Transaction Submission.** A new method `HostSubmitTx` is introduced
  which allows ROFL to submit transactions to the runtime. It works by queueing
  the transaction in the transaction pool (local queue) for later scheduling.

  ```go
  type HostSubmitTxRequest struct {
      // RuntimeID is the identifier of the target runtime.
      RuntimeID common.Namespace `json:"runtime_id"`
      // Data is the raw transaction data.
      Data []byte `json:"data"`
      // Wait specifies whether the call should wait until the transaction is
      // included in a block.
      Wait bool `json:"wait,omitempty"`
      // Prove specifies whether the response should include a proof of
      // transaction being included in a block.
      Prove bool `json:"prove,omitempty"`
  }
  ```

* **Notify Registration.** A new method `HostRegisterNotify` is introduced which
  allows ROFL to register to be notified by the host when specific events occur.
  Note that delivery of these notifications is best effort as a dishonest host
  may withold notification delivery or generate spurious notifications.

  Registering for notifications overwrites any previous configuration.

  ```go
  type HostRegisterNotifyRequest struct {
      // RuntimeBlock subscribes to runtime block notifications.
      RuntimeBlock bool `json:"runtime_block,omitempty"`
      // RuntimeEvent subscribes to runtime event emission notifications.
      RuntimeEvent *struct {
          // Tags specifies which event tags to subscribe to.
          Tags [][]byte `json:"tags,omitempty"`
      } `json:"runtime_event,omitempty"`
  }
  ```

* **Notification Delivery.** A new method `RuntimeNotify` is introduced which
  allows the host to deliver event notifications based on previously registered
  notifiers.

  ```go
  type RuntimeNotifyRequest struct {
      // RuntimeBlock notifies about a new runtime block.
      RuntimeBlock *roothash.AnnotatedBlock `json:"runtime_block,omitempty"`
      // RuntimeEvent notifies about a specific runtime event being emitted.
      RuntimeEvent *struct {
          // Block is the block header of the block that emitted the event.
          Block *roothash.AnnotatedBlock `json:"block"`
          // Tags are the matching tags that were emitted.
          Tags [][]byte `json:"tags"`
      } `json:"runtime_event,omitempty"`
  }
  ```

* **RONL-ROFL Communication.** The existing EnclaveRPC is reused to facilitate
  the communication between the two components if/when needed. For this purpose
  the endpoint identifier `ronl` is made available in the ROFL host method
  handler to address the RONL component.

* **Updating Node-Endorsed CapabilityTEE in ROFL.** A new method
  `RuntimeCapabilityTEEUpdateEndorsementRequest` is introduced which allows the
  node to refresh the `EndorsedCapabilityTEE` for ROFL.

  ```go
  type RuntimeCapabilityTEEUpdateEndorsementRequest struct {
      // EndorsedCapabilityTEE is an endorsed TEE capability.
      EndorsedCapabilityTEE node.EndorsedCapabilityTEE `json:"ect"`
  }
  ```

### Updates to EnclaveRPC RAK Binding

Version 2 of the `RAKBinding` structure is introduced for establishment of
EnclaveRPC sessions, as follows:

```rust
pub enum RAKBinding {
    // ... previous versions omitted ...

    /// V2 format which supports endorsed CapabilityTEE structures.
    #[cbor(rename = 2)]
    V2 {
        ect: EndorsedCapabilityTEE,
        binding: Signature,
    },
}
```

Additionally, the relevant EnclaveRPC session implementation is updated to
facilitate thew new authentication mechanism via endorsed TEE capabilities and
the session demultiplexer is updated to support authentication policies on
incoming connections.

### Updates to the Runtime Host Sandbox

This proposal updates the runtime host sandbox to support optionally allowing
external network requests. These are then allowed only for the ROFL component
(if any is available for a runtime).

The following modifications are required:

* When setting up the Bubblewrap sandbox, `--share-net` is passed to share the
  network namespace with the sandboxed runtime. All other namespaces are still
  unshared.

* The runtime loader is modified to accept an additional argument
  `--allow-network` which then changes the usercall extension to pass through
  any address passed in the `connect_stream` handler.

### Configuration

ROFL may require additional configuration which it may do through one of several
ways:

* **On-chain Configuration.** Configuration for the ROFL component may be stored
  in on-chain state. ROFL would then query the current configuration and apply
  it locally.

* **Local Per-Node Configuration.** In case some per-node configuration is
  required (e.g. to allow the node operator to override a default), the existing
  runtime local configuration mechanism can be used where configuration is
  provided as part of the RHP handshake. All configuration for ROFL should be
  contained under the `rofl` configuration key.

### Untrusted Local Storage

ROFL may utilize the existing untrusted node-local storage to store things like
sealed data local to the node. This store is shared between RONL and ROFL, but
all ROFL keys are transparently prefixed by `rofl.` on the host such that only
RONL can see (but not necessarily read) ROFL's keys but not vice versa.

### Updates to the Oasis SDK

A convenient way to develop ROFL modules alongside the on-chain support
functionality should be implemented in the Oasis SDK, including a convenient way
for ROFL to submit runtime transactions in a way that can be verified on-chain
as coming from a specific node/runtime instance.

## Consequences

### Positive

* Oasis runtimes can easily be extended with arbitrary off-chain logic that can
  securely interact with on-chain functionality.

* Node operators do not need to perform much additional configuration in order
  to support the new off-chain logic.

### Negative

* Additional complexity is introduced to the Runtime Host Protocol and to the
  node binary.

### Neutral

## References

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
