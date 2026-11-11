# ADR 0021: Forward-Secret Ephemeral Secrets

Source: https://docs.oasis.io/adrs/0021-keymanager-ephemeral-secrets

## Component

Oasis Core

## Changelog

* 2023-02-17:
  * Rename ephemeral entropy to ephemeral secret
  * Update types and methods, add method for loading a secret
  * Define publish ephemeral secret transaction
  * Split instructions for generation and replication in two sections
* 2022-12-01: Initial proposal

## Status

Accepted

## Context

The network needs forward-secret ephemeral secrets that are distributed
amongst enclave executors. Because of the forward-secrecy requirements,
using the current key manager master secret is not workable.

## Decision

### Runtime encryption key (REK)

Let the per-enclave `node.CapabilityTEE` structure and related helpers be
ammeded as follows, to faciliate the addition of a X25519 public key held
by the enclave, so that encrypted data can be published on-chain to an
enclave instance.

```
// Note: This could also be done via the keymanager InitResponse, but
// it is the author's opinion that having a general mechanism for this
// may be useful in other contexts.

// CapabilityTEE represents the node's TEE capability.
type CapabilityTEE struct {
  ...

  // Runtime encryption key.
  REK *x25519.PublicKey `json:"rek,omitempty"`
}
```

### Ephemeral secrets

The key manger enclave will gain the following additional RPC methods:

```
const (
  // Local RPC methods (plaintext).
  GenerateEphemeralSecret  = "generate_ephemeral_secret"
  LoadEphemeralSecret      = "load_ephemeral_secret"

  // Remote RPC method (Noise session).
  ReplicateEphemeralSecret = "replicate_ephemeral_secret"
)

type GenerateEphemeralSecretRequest struct {
  Epoch beacon.EpochTime `json:"epoch"`
}

type ReplicateEphemeralSecretRequest struct {
  Epoch beacon.EpochTime `json:"epoch"`
}

type LoadEphemeralSecretRequest struct {
  SignedSecret SignedEncryptedEphemeralSecret `json:"signed_secret"`
}

type GenerateEphemeralSecretResponse struct {
  SignedSecret SignedEncryptedEphemeralSecret `json:"signed_secret"`
}

type ReplicateEphemeralSecretResponse struct {
  // The request and this response are considered confidential,
  // so the channel handles authentication and confidentiality.
  EphemeralSecret [32]byte `json:"ephemeral_secret"`
}
```

Ephemeral secret generation will return a signed and encrypted ephemeral secret
for the requested epoch.

```
type EncryptedSecret struct {
  // Checksum is the secret verification checksum.
  Checksum []byte `json:"checksum"`

  // PubKey is the public key used to derive the symmetric key for decryption.
  PubKey x25519.PublicKey `json:"pub_key"`

  // Nonce is the nonce used to decrypt the secret.
  Nonce []byte `json:"nonce"`

  // Ciphertexts is the map of REK encrypted ephemeral secrets for all known key manager enclaves.
  Ciphertexts map[x25519.PublicKey][]byte `json:"ciphertexts"`
}

type EncryptedEncryptedSecret struct {
  // ID is the runtime ID of the key manager.
  ID common.Namespace `json:"runtime_id"`

  // Epoch is the epoch to which the secret belongs.
  Epoch beacon.EpochTime `json:"epoch"`

  // Secret is the encrypted secret.
  Secret EncryptedSecret `json:"secret"`
}

type SignedEncryptedEphemeralSecret struct {
  // Secret is the encrypted ephemeral secret.
  Secret EncryptedEphemeralSecret `json:"secret"`

  // Signature is a signature of the ephemeral secret.
  Signature signature.RawSignature `json:"signature"`
}
```

### Ephemeral secret transaction

Key manager application will be augmented with a `PublishEphemeralSecret`
transaction that will accept the first published secret for an epoch and
discard the others.

```
MethodPublishEphemeralSecret = transaction.NewMethodName(
  ModuleName, "PublishEphemeralSecret", SignedEncryptedEphemeralSecret{}
)
```

### Generation

Each keymanager will, at a random time in a given epoch:

1. Check to see if another instance has published the next epoch's ephemeral
   secret. If yes, go to step 4.

2. Execute a local `generate_ephemeral_secret` RPC call. The enclave will,
   in-order, use the light client to query the members of the committee,
   generate secret, and return a `GenerateEphemeralSecretResponse`.
   On failure, go to step 1.

3. Publish `SignedEncryptedEphemeralSecret` to consensus via
   a `PublishEphemeralSecret` transaction.

4. This key manager instance is DONE.

### Replication

Each key manager will:

1. Listen to the publications of new ephemeral secrets and forward them to
   the enclave.

2. Enclave will validate the secret and verify that it was published in the
   consensus. Iff verification succeeds and there is a corresponding REK entry
   in the `Ciphertexts` map, decrypt the secret and go to step 4.

3. Until a successful response is obtained, iterate through the enclaves
   in the ephemeral secret `Ciphertexts` map, issuing
   `replicate_ephemeral_secret` RPC calls. On failure, repeat step 3.

4. This key manager instance is DONE.

## Consequences

### Positive

* It will be possible to publish ephemeral encrypted data to enclave
  instances on-chain.

* There will be ephemeral secret per key manager committee.

* Enclave compromise can not go back to previous epochs to compromise
  the ephemeral secrets.

* Ephemeral secrets are never encrypted with SGX sealing key nor stored in
  cold storage.

### Negative

* If enough key manager workers restart at the wrong time, the epoch's
  ephemeral secret will be lost, and it will take until the next epoch
  to recover.

* Forward-secrecy is imperfect due to the epoch granular nature of the
  ephemeral secret.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
