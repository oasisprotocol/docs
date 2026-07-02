# ADR 0022: Forward-Secret Master Secrets

Source: https://docs.oasis.io/adrs/0022-keymanager-master-secrets

## Component

Oasis Core

## Changelog

* 2023-04-17: Initial proposal

## Status

Proposed

## Context

The network needs forward-secret master secrets that are generated periodically
and distributed amongst enclave executors.

## Decision

### Key manager status

Key manager status will be extended with the following fields:

```
type Status struct {
  ...

  // Generation is the generation of the latest master secret.
  Generation uint64 `json:"generation,omitempty"`

  // RotationEpoch is the epoch of the last master secret rotation.
  RotationEpoch beacon.EpochTime `json:"rotation_epoch,omitempty"`
}
```

### Enclave init response

Key manager enclave init response will be extended with the following fields:

```
type InitResponse struct {
  ...
  
  NextChecksum []byte               `json:"next_checksum,omitempty"`
  NextRSK      *signature.PublicKey `json:"next_rsk,omitempty"`
}
```

### Master secrets

The key manager enclave will gain the following additional local RPC methods:

```
const (
  GenerateMasterSecret = "generate_master_secret"
  LoadMasterSecret     = "load_master_secret"
)

type GenerateMasterSecretRequest struct {
  Generation uint64           `json:"generation"`
  Epoch      beacon.EpochTime `json:"epoch"`
}

type GenerateMasterSecretResponse struct {
  SignedSecret SignedEncryptedMasterSecret `json:"signed_secret"`
}

type LoadMasterSecretRequest struct {
  SignedSecret SignedEncryptedMasterSecret `json:"signed_secret"`
}

```

Remote RPC method for replicating master secret will be extended to support
replication of generations and to return a Merkle proof for secret verification.

```
pub struct ReplicateMasterSecretRequest {
  ...

  /// Generation.
  #[cbor(optional)]
  pub generation: u64,
}

pub struct ReplicateMasterSecretResponse {
  ... 

  /// Checksum of the preceding master secret.
  #[cbor(optional)]
  pub checksum: Vec<u8>,
}
```

Master secret generation will return a signed and encrypted master secret
for the requested generation and epoch.

```
type EncryptedMasterSecret struct {
  // ID is the runtime ID of the key manager.
  ID common.Namespace `json:"runtime_id"`

  // Generation is the generation of the secret.
  Generation uint64 `json:"generation"`

  // Epoch is the epoch in which the secret was created.
  Epoch beacon.EpochTime `json:"epoch"`

  // Secret is the encrypted secret.
  Secret EncryptedSecret `json:"secret"`
}

type SignedEncryptedMasterSecret struct {
  // Secret is the encrypted master secret.
  Secret EncryptedMasterSecret `json:"secret"`

  // Signature is a signature of the master secret.
  Signature signature.RawSignature `json:"signature"`
}
```

### Checksums

Checksum computation will be extended with hash chains:

* `checksum_0 = KMAC(generation_0, runtime_id)`
* `checksum_N = KMAC(generation_N, checksum_(N-1)) for N > 0`

Hash chains allow us to use the previous checksum as a Merkle proof.
Given a verified checksum and a proof, a master secret can be verified
using the following formula:

* `next_checksum = KMAC(secret, prev_checksum)`

### Master secret transaction

Key manager application will be augmented with a `PublishMasterSecret`
transaction which will accept the proposal for the next generation of the master
secret if the following conditions are met:

* The proposal's master secret generation number is one greater than the last
  accepted generation, or 0 if no secrets have been accepted so far.

* The proposal is intended to be accepted in the upcoming epoch.

* Master secret hasn't been proposed in the current epoch.

* The rotation period will either expire in the upcoming epoch or has already
  expired.

  * The first master secret (generation 0) can be proposed immediately and even
    if the rotation interval is set to 0.

  * If the rotation interval is set to 0, rotations are disabled and secrets
    cannot be proposed anymore. To enable them again, update the rotation
    interval in the policy.

* The master secret is encrypted to the majority of the enclaves that form
  the committee.

* The node proposing the secret is a member of the key manager committee.

If accepted, the next secret can be proposed after the rotation interval
expires. Otherwise, the next secret can be proposed in the next epoch.

```
MethodPublishMasterSecret = transaction.NewMethodName(
  ModuleName, "PublishMasterSecret", SignedEncryptedMasterSecret{}
)
```

### Setup

The key manager is initialized with an empty checksum and no nodes.
Every node needs to register with an empty checksum to be included
in the key manager committee. Only members of the committee are
allowed to generate master secrets and will be able to decrypt
the proposals.

### Generation

Each keymanager will, at a random time in a given epoch:

1. Check to see if rotation period has expired. If not, go to step 5.

2. Check to see if another instance has published a proposal for the upcoming
   epoch. If yes, go to step 5.

3. Execute a local `generate_master_secret` RPC call. The enclave will,
   in-order:

   * Verify the master secret generation number.

   * Randomly select a secret.

   * Use the light client to query the members of the committee.

   * Encrypt and checksum the selected secret.

   * Return `GenerateMasterSecretResponse`.

   On failure, go to step 1.

4. Read `SignedEncryptedMasterSecret` from the response and publish it
   in the consensus layer using `PublishMasterSecret` transaction.

5. This key manager instance is DONE.

### Replication

Each key manager will listen for the publication of new master secret proposals
and will, when a new secret is proposed:

1. Cancel master secret generation scheduled for the current epoch.

2. Forward the proposal to the enclave.

3. The enclave will verify that:

   * The proposal was published in the consensus layer.

   * The secret can be decrypted with the enclave's REK key.

   * The master secret generation number is one greater than the last known
     generation.

   * The checksum computed from the decrypted secret and the last known
     checksum matches the one in the proposal.

   If all verifications pass, the enclave will:

   * Decrypt the secret, encrypt it with SGX sealing key and store
     the ciphertext locally.

   * Derive the RSK key for the proposed secret and store it in the memory
     together with the computed checksum.

   Otherwise, go to step 5.

4. Request enclave to initialize again and use the response to register
   with the forthcoming checksum and RSK key derived from the proposal.

5. This key manager instance is DONE.

### Rotation

Key manager application will try to rotate the master secret every epoch
as part of the key manager status generation as follows:

1. Fetch the latest master secret proposal.
   On failure, go to step 6.

2. Verify the master secret generation number and epoch of the proposal.
   On failure, go to step 6.

   * The rotation period is not verified here as it is already checked when
     the secret is proposed. Optionally, we can add this check to cover
     the case when the policy changes after the secret is proposed.

3. Count how many nodes have stored the proposal locally.

   * Compare the checksum of the proposal to the `next_checksum` field in
     the init response.

4. Accept the proposal if the majority of the nodes have replicated
   the proposed secret and announced `next_checksum` in their init status.

   * Increment the master secret generation number by 1.

   * Update the last rotation epoch.

   * Update the checksum.

5. Broadcast the new status.

   * If the master secret generation number has advanced, the enclaves will
     try to apply the proposal they stored locally.

6. Key manager application is DONE.

### Confirmation

Each key manager will listen for the key manager status updates and will,
when the master secret generation number advances:

1. Send the key manager status to the enclave.

2. The enclave will:

   * Check that the master secret generation number is one greater than
     the last known generation.

   * Load locally stored proposal for the next master secret or replicate it
     from another enclave.

   * Use the proposal to compute the next checksum.

   * Verify the computed checksum against the latest key manager status.

   If checksum matches, the enclave will:

   * Encrypt the secret with SGX sealing key using master secret generation
     number as additional data and store the ciphertext locally.

   * Update the last known generation number.

   * Update the latest checksum and RSK key.

   Otherwise, go to step 1.

3. Request enclave to initialize again and use the response to register
   with the latest checksum and RSK key while leaving the forthcoming
   checksum and RSK key empty.

4. This key manager instance is DONE.

## Consequences

### Positive

* Runtimes can periodically or on demand re-encrypt their state using
  the latest generation of the master secret.

* Compromise of an enclave cannot reveal master secrets generated after its
  upgrade or obsolescence.

* If enclave initialization is interrupted or aborted, the subsequent
  initialization will resume from where the previous one left off.
  This means that any secrets that have already been replicated and
  verified will not be fetched again.

* When compared to Merkle trees, hash chains provide a straightforward way
  to transition from the current checksum implementation and also enable
  the use of simpler proofs that can be validated in constant time.

### Negative

* Initialization takes time as all master secrets need to be replicated.

  | Number of secrets | Replication time |
  | :---------------: | :--------------: |
  |         10        |      45 sec      |
  |        100        |      52 sec      |
  |        1000       |   2 min 45 sec   |
  |       10000       |   21 min 17 sec  |

  Table 1: Local machine benchmarks (without any network overhead)

* Master secret replication response must contain a Merkle proof for secret
  verification.

* Newly accepted master secrets cannot be used immediately to derive runtime
  keys because key manager enclaves need to confirm them first. When using
  Tendermint as a backend, this delay is even greater as the verifier is one
  block behind.

### Neutral

* Master secrets need to be replicated in reverse order to ensure all
  secrets are verified against checksum published in the consensus layer.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
