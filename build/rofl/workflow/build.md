# Build

Source: https://docs.oasis.io/build/rofl/workflow/build

This operation packs `compose.yaml`, specific operating system components and
the hash of a trusted block on the Sapphire chain. All these pieces are needed
to safely execute our app inside a TEE.

Image: ROFL-compose-app bundle wrapper

Whenever you make changes to your app and want to deploy it, you first need
to build it. The build process takes the compose file together with other ROFL
artifacts and deterministically generates a bundle that can later be
deployed.

The build process also computes the *enclave identity* of the bundle which is
used during the process of remote attestation to authenticate the app instances
before granting them access to the key management system and [other features].

To build an app and update the enclave identity in the app manifest, simply run:

```shell
oasis rofl build
```

This will generate a ROFL bundle which can be used for later deployment and
output something like:

```
ROFL app built and bundle written to 'myapp.default.orc'.
```

[other features]: https://docs.oasis.io/build/rofl/features.md

## Update On-chain App Config

After any changes to the [app's policy] defined in the manifest, the on-chain
app config needs to be updated in order for the changes to take effect.

The designated admin account is able to update this policy by issuing an update
transaction which can be done via the CLI by running:

```shell
oasis rofl update
```

[app's policy]: https://docs.oasis.io/build/rofl/features/manifest.md#policy

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
