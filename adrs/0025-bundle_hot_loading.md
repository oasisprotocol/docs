# ADR 0025: Hot-loading of Runtime Bundles

Source: https://docs.oasis.io/adrs/0025-bundle_hot_loading

## Component

Oasis Core

## Changelog

* 2025-07-13: Initial version

## Status

Accepted

## Context

The secure procedure for upgrading runtimes is not simple and requires
significant effort from node operators. First, they must download
the latest bundle, which includes the updated version of the runtime
they intend to upgrade. Then, they need to verify the bundle, update
the node configuration to point to the new bundle's location, and restart
the node. Finally, once the new version is active, they must remove
the outdated bundles.

## Decision

This proposal aims to automate bundle discovery and distribution so that
the upgrade process is more secure, reliable, and more user-friendly
for node operators.

The process would involve the following steps:

* The runtime owner publishes the bundle checksum, i.e. the SHA-256 hash
  of the runtime bundle manifest, on-chain when registering a new runtime
  deployment.

* Upon registration of the new deployment, the node automatically retrieves
  the bundle URL corresponding to the provided checksum from the configured
  bundle registries and downloads the bundle. The downloaded bundle is then
  verified and extracted to the appropriate location.

* Once the new deployment becomes active, files and bundles associated
  with the previous versions are removed from the file system.

If needed, we can gradually transition to a more decentralized version
of this process.

## Metadata File

A metadata file is a plain text document that references a specific bundle
ORC file and must follow these rules:

* The name must match the checksum of the bundle.

* The content must be a single line containing the URL of the corresponding
  bundle ORC file.

For example, for the Sapphire ParaTime version 0.8.2, the metadata file would
be named `e523903e480a8bef7caf18b846aefaa17913878b67eee13ac618849dd0bb8741`
and would look like this:

```txt
https://github.com/oasisprotocol/sapphire-paratime/releases/download/v0.8.2/sapphire-paratime.orc
```

## Bundle Registry

The bundle registry is responsible for storing metadata files used for bundle
discovery and distribution. It may host metadata for one or more runtimes.

The registry must ensure that all metadata files are accessible through
a bundle registry URL, as metadata URLs are formed by appending the metadata
file name, i.e. the bundle checksum, to this URL. Therefore, the bundle
registry URL doesn't need to be valid endpoint, only the constructed metadata
URLs need to be valid.

Note that the registry itself does not need to store any bundles; these can be
hosted externally. Similarly, the runtime owners do not need to change their
existing release process. Instead, they simply need to extend it by publishing
metadata files with each release, if they wish to support hot-loading.

### Oasis Bundle Registry

To avoid requiring every runtime owner to host their own bundle registry,
the Oasis team has prepared a shared
[bundle registry](https://github.com/oasisprotocol/bundle-registry),
which is included by default in the node configuration.

Runtime owners can contribute by creating a pull request to add their metadata
files to this shared registry. Alternatively, they can override the default
configuration and use a custom one if they prefer to maintain their own.

To explicitly use the Oasis bundle registry, you need to add the following
URL to the configuration. Note that this URL is not a valid endpoint by itself:

```txt
https://raw.githubusercontent.com/oasisprotocol/bundle-registry/main/metadata/
```

When the node will request a metadata file, for example, for Sapphire ParaTime
version 0.8.2, the full URL will be constructed by appending the bundle
checksum. This will point to the correct file:

```txt
https://raw.githubusercontent.com/oasisprotocol/bundle-registry/main/metadata/e523903e480a8bef7caf18b846aefaa17913878b67eee13ac618849dd0bb8741
```

## Updates to the Runtime Configuration

Runtime configuration needs to be extended to accept a list of bundle registry
URLs from which metadata files can be fetched. Registries hosting metadata
for all runtimes can be defined at the top level, while runtime-specific
registries can be configured individually for each runtime.

The global configuration and runtime-specific configuration should be updated
as follows:

```go
// Config is the runtime registry configuration structure.
type Config struct {
  // ... existing fields omitted ...

  // Registries is the list of base URLs used to fetch runtime bundle metadata.
  //
  // The actual metadata URLs are constructed by appending the manifest hash
  // to the base URL. Therefore, the provided URLs don't need to be valid
  // endpoints themselves, only the constructed URLs need to be valid.
  Registries []string `yaml:"registries,omitempty"`
}
```

```go
// RuntimeConfig is the runtime configuration.
type RuntimeConfig struct {
  // ... existing fields omitted ...

  // Registries is the list of base URLs used to fetch runtime bundle metadata.
  //
  // The actual metadata URLs are constructed by appending the manifest hash
  // to the base URL. Therefore, the provided URLs don't need to be valid
  // endpoints themselves, only the constructed URLs need to be valid.
  Registries []string `yaml:"registries,omitempty"`
}
```

## Consequences

### Positive

* Seamless runtime upgrades.

* Reduced manual effort for node operators.

* Improved security, as bundles are automatically verified.

### Negative

* Requires runtime owners to maintain metadata files and publish them
  consistently.

### Neutral

* Does not change the release process.

* Bundle hosting remains flexible and decentralized.

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
