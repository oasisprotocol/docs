# Refreshing Node Certificates

## Refreshing Sentry Client TLS Certificate on the Validator Node

### Steps on the Validator Node

Go to your validator node's data directory, e.g. `/srv/oasis`, `/node`, `/serverdir/node`:

```
cd <PATH-TO-DATADIR>
```

:::caution

We recommend backing up your validator's private and public keys (i.e. all `*.pem` files) in your node's data directory before continuing.

:::

Remove the validator's current sentry client TLS private key and certificate by running:

```
rm sentry_client_tls_identity.pem sentry_client_tls_identity_cert.pem
```

Re-generate node's keys by running:

```
oasis-node identity init --datadir ./
```

:::tip

This should keep all your other node's keys (i.e. `beacon.pem`, `consensus.pem`, `consensus_pub.pem`, `identity.pem`, `identity_pub.pem`, ...) intact.

:::

Then run:

```
oasis-node identity show-sentry-client-pubkey --datadir ./
```

to obtain the value of the validator's new sentry client TLS public key in Base64-encoding that can be put in sentry node's configuration under `control.authorized_pubkey` list.

Restart your validator node.

### Steps on the Sentry Node

After generating a new sentry client TLS private key and certificate on the validator node, set the new client TLS public key in your sentry node's configuration.

Before using the below sentry node configuration snippet, replace the following variables:

* `{{ validator_sentry_client_grpc_public_key }}`: The validator node's new sentry client TLS public key encoded in Base64-encoding (e.g. `KjVEdeGbtdxffQaSxIkLE+kW0sINI5/5YR/lgUkuEcw=`).

```
... trimmed ...

# Worker configuration.
worker:
  sentry:
    # Enable sentry node.
    enabled: true
    # Port used by validator nodes to query sentry node for registry
    # information.
    # IMPORTANT: Only validator nodes protected by the sentry node should have
    # access to this port. This port should not be exposed on the public
    # network.
    control:
      port: 9009
      authorized_pubkey:
        - {{ validator_sentry_client_grpc_public_key }}

... trimmed ...
```

Restart your sentry node.

:::tip

The validator node will re-register itself automatically once it's connected to the network through the sentry again.

:::

## Refreshing TLS Certificate on the Sentry Node

### Steps on the Sentry Node

Go to your sentry node's data directory, e.g. `/srv/oasis`, `/node`, `/serverdir/node`:

```
cd <PATH-TO-DATADIR>
```

:::caution

We recommend backing up your sentry's private and public keys (i.e. all `*.pem` files) in your node's data directory before continuing.

:::

Remove the sentry's current TLS private key and certificate by running:

```
rm tls_identity.pem tls_identity_cert.pem
```

Re-generate node's keys by running:

```
oasis-node identity init --datadir ./
```

:::tip

This should keep all your other node's keys (i.e. `beacon.pem`, `consensus.pem`, `consensus_pub.pem`, `identity.pem`, `identity_pub.pem`, ...) intact.

:::

Then run:

```
oasis-node identity show-tls-pubkey --datadir ./
```

to obtain the value of the sentry's new TLS public key in Base64-encoding that can be put in validator node's configuration under `worker.sentry.address` list.

Restart your sentry node.

### Steps on the Validator Node

After generating a new TLS private key and certificate on the sentry node, set the new TLS public key in your validator node's configuration.

Before using the below validator node configuration snippet, replace the following variables:

* `{{ sentry_node_grpc_public_key }}`: The sentry node's new TLS public key encoded in Base64-encoding (e.g. `1dA4/NuYPSWXYaKpLhaofrZscIb2FDKtJclCMnVC0Xc=`).
* `{{ sentry_node_private_ip }}`: The private IP address of the sentry node over which sentry node should be accessible to the validator.

```
... trimmed ...

worker:
  registration:
    # In order for the node to register itself the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /serverdir/node/entity/entity.json
  sentry:
    address:
      - "{{ sentry_node_grpc_public_key }}@{{ sentry_node_private_ip }}:9009"

... trimmed ...
```

Restart your validator node.
