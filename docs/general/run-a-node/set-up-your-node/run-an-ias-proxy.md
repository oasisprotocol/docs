---
description: >-
  This page describes how to run an Intel Attestation Service (IAS) Proxy node
  on the Oasis Network.
---

# Run an IAS Proxy

This guide will cover setting up an [Intel Attestation Service (IAS)](https://software.intel.com/content/www/us/en/develop/download/intel-sgx-intel-epid-provisioning-and-attestation-services.html) Proxy node for the Oasis Network. This guide assumes some basic knowledge on the use of command line tools.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites](../prerequisites/README.mdx) section and have the Oasis Node binary installed on your system. The IAS Proxy connects to an Oasis Node, so make sure you have a running node first. For more details, see the instructions on how to [Run a Non-validator Node](/general/run-a-node/set-up-your-node/run-non-validator#configuration).

### Obtaining IAS Service Provider ID (SPID) and API Key

Running the [Intel Attestation Service (IAS)](https://software.intel.com/content/www/us/en/develop/download/intel-sgx-intel-epid-provisioning-and-attestation-services.html) Proxy requires access to the IAS API. Go to [IAS Enhanced Privacy ID (EPID) attestation](https://api.portal.trustedservices.intel.com/EPID-attestation) page and signup for the _Production Access_. As a service provider, you will register your TLS certificate and obtain your Service Provider ID (SPID) and API key. The SPID and API key will be used by the IAS Proxy to communicate with the IAS.

:::info

Basic understanding of SGX Remote attestation is recommended. See Intel's [Remote Attestation End-to-End Example](https://software.intel.com/content/www/us/en/develop/articles/code-sample-intel-software-guard-extensions-remote-attestation-end-to-end-example.html) for a short practical introduction.

:::

### Creating a Working Directory

We will be using the following working directory `/node/ias` (feel free to name your directory however you wish).

* The directory permissions should be `rwx------`.

To create the directory, use the following command:

```text
mkdir -m700 -p /node/ias
```

## Configuration

To avoid specifying the IAS Service Provider ID (SPID) and API key in the Oasis Node configuration directly, IAS Proxy supports reading the SPID and API key from environment variables. Make sure you have the following environment variables set:

```text
OASIS_IAS_SPID="<your-SPID>"
OASIS_IAS_APIKEY="<your-API-key>"
```

In order to configure the IAS proxy create the `/node/ias/config.yml` file with the following content:

```yaml
datadir: /node/ias

log:
  level:
    default: info
  format: JSON

address: unix:{{ oasis_node_socket }}

grpc:
  port: 8650
```

Before using this configuration you should collect the following information to replace the  variables present in the configuration file:

* `{{ oasis_node_socket }}`: Path to a running client Oasis Node socket.

## Starting the IAS Proxy

You can start the IAS Proxy using the following command:

```bash
oasis-node ias proxy --config /node/ias/config.yml
```

## IAS Proxy Public Key

The TLS public key required for connecting to the IAS Proxy is located in the configured `datadir` (e.g.`/node/ias`).

### Share IAS Proxy address <a id="share-seed-node-address"></a>

[ParaTime nodes](run-a-paratime-node.mdx) can now use your IAS Proxy by specifying it in configuration, e.g.:

```text
--ias.proxy.address <IAS_PROXY_PUBLIC_KEY>@<EXTERNAL_IP>:8650
```

[  
](/general/run-a-node/set-up-your-node/run-non-validator)

