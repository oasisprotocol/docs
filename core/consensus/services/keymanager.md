# Key Manager

Source: https://docs.oasis.io/core/consensus/services/keymanager

The key manager service is responsible for coordinating the SGX-based key
manager runtimes. It stores and publishes policy documents and status updates
required for key manager replication.

The service interface definition lives in [`go/keymanager/api`]. It defines the
supported queries and transactions. For more information you can also check out
the [consensus service API documentation].

[`go/keymanager/api`]: https://github.com/oasisprotocol/oasis-core/tree/master/go/keymanager/api

[consensus service API documentation]: https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc

## Policies

A key manager policy document defines the policy that key manager
implementations use to enforce access control to key material. At this point the
policy document is specifically designed to work with our Intel SGX-based key
manager runtime.

The [policy document] specifies the following access control policies that are
enforced by the key manager runtime based on the calling enclave identity:

* **Enclaves that may query private keys.** These are usually enclave identities
  of confidential runtimes that need access to per-runtime private keys to
  decrypt state.

* **Enclaves that may replicate the master secret.** These are usually enclave
  identities of new key manager enclave versions, to support upgrades. Own
  enclave identity is implied (to allow key manager replication) and does not
  need to be explicitly specified.

In order for the policy to be valid and accepted by a key manager enclave it
must be signed by a configured threshold of keys. Both the threshold and the
authorized public keys that can sign the policy are hardcoded in the key manager
enclave.

[policy document]: https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc#PolicySGX

## Methods

### Update Policy

Policy update enables the key manager runtime owning entity to update the
current key manager policy. A new update policy transaction can be generated
using [`NewUpdatePolicyTx`].

**Method name:**

```
keymanager.UpdatePolicy
```

The body of an update policy transaction must be a [`SignedPolicySGX`] which is
a signed key manager access control policy. The signer of the transaction must
be the key manager runtime's owning entity.

[`NewUpdatePolicyTx`]: https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc#NewUpdatePolicyTx

[`SignedPolicySGX`]: https://pkg.go.dev/github.com/oasisprotocol/oasis-core/go/keymanager/api?tab=doc#SignedPolicySGX

## Events

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
