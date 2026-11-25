# Oasis Web3 Gateway for your EVM ParaTime

Source: https://docs.oasis.io/node/web3

This guide will walk you through the steps needed to set up the Oasis Web3
gateway for EVM-compatible ParaTimes, such as [Emerald] and [Sapphire].

**Caution**:

Each ParaTime requires its own instance of the Web3 gateway!

## Prerequisites

### Hardware

In addition to the minimum hardware requirements for running the Oasis node,
the following should be added for running the Web3 gateway:

* CPU:
  * Minimum: 2.0 GHz x86-64 CPU
  * Recommended: 2.0 GHz x86-64 CPU with 2 cores/vCPUs
* Memory:
  * Minimum: 4 GB of ECC RAM
  * Recommended: 8 GB of ECC RAM
* Storage:
  * Minimum: 300 GB of SSD or NVMe fast storage
  * Recommended: 500 GB of SSD or NVMe fast storage

**Info**:

To put the figures above into perspective, the Web3 gateway for Emerald with
PostgreSQL encountered **210 GB** of database growth in \~5 months between
Nov 18, 2021 and Apr 11, 2022 (since the [Emerald Mainnet launch]).

### Oasis ParaTime Client Node

The Web3 gateway requires a locally deployed ParaTime-enabled Oasis Node.
First, follow the
[Oasis ParaTime client node](https://docs.oasis.io/node/run-your-node/paratime-client-node.md)
guide on how to configure the Oasis client node with one or more ParaTimes.
Always use the exact combination of the Oasis node/ParaTime versions as
published on the Network Parameters page ([Mainnet], [Testnet]).

Apart from the transactions that happen on-chain and produce some effects,
there are also a number of read-only queries implemented in the Oasis protocol
and EVM. Some of them may be quite resource-hungry such as simulating EVM calls
and are disabled by default to avoid DDOS attacks. If your Oasis node instance
will only be used by you and your Web3 gateway(s), you can safely enable
*expensive* transactions by adding the following to your Oasis node config:

```yaml title='config.yml'
# ... sections not relevant are omitted ...
runtime:
  mode: client
  paths:
    - {{ emerald_bundle_path }}
    - {{ sapphire_bundle_path }}

  config:
    "{{ emerald_paratime_id }}":
      estimate_gas_by_simulating_contracts: true
      allowed_queries:
        - all_expensive: true
    "{{ sapphire_paratime_id }}":
      estimate_gas_by_simulating_contracts: true
      allowed_queries:
        - all_expensive: true
```

In the config above replace `{{ ... }}` placeholders with actual ParaTime IDs:

* `{{ emerald_paratime_id }}`:
  * Emerald on [Mainnet][mainnet-emerald]: `000000000000000000000000000000000000000000000000e2eaa99fc008f87f`
  * Emerald on [Testnet][testnet-emerald]: `00000000000000000000000000000000000000000000000072c8215e60d5bca7`
* `{{ sapphire_paratime_id }}`:
  * Sapphire on [Mainnet][mainnet-sapphire]: `000000000000000000000000000000000000000000000000f80306c9858e7279`
  * Sapphire on [Testnet][testnet-sapphire]: `000000000000000000000000000000000000000000000000a6d1e3ebf60dff6c`

### PostgreSQL

The Web3 gateway stores blockchain data in a
[PostgreSQL](https://www.postgresql.org/) database version **13.3** or higher.
Install it by following instructions specific to your operating system and
environment.

Because each ParaTime requires its own instance of the Web3 gateway, you will
have to create a separate database and a separate user for each Web3 instance.

## Download Oasis Web3 Gateway

Check the required version of the Web3 gateway for the network you will be
deploying it to: [Mainnet], [Testnet]. Next, download the Oasis-provided
binaries from the [official GitHub repository][github-releases].

Alternatively, you can download the source release and compile it yourself.
Consult the [README.md] file for more information.

## Running the Web3 Gateway

Copy the content below to the config file of your Web3 gateway.

```yaml title='gateway.yml'
# Uncomment the runtime_id below.
runtime_id: {{ paratime_id }}
# Path to your internal.sock file in the root Oasis node datadir.
node_address: "unix:{{ oasis_node_unix_socket }}"

# By default, we index the entire blockchain history.
# If you are low on disk space or you use the gateway just for submitting transactions, enable
# pruning below.
enable_pruning: false
pruning_step: 100000
indexing_start: 0

log:
  level: debug
  format: json

database:
  # Change host and port, if PostgreSQL is running somewhere else.
  host: "127.0.0.1"
  port: 5432
  # Enter your database name, username and password.
  db: {{ postgresql_db }}
  user: {{ postgresql_user }}
  password: {{ postgresql_password }}
  dial_timeout: 5
  read_timeout: 10
  write_timeout: 5
  max_open_conns: 0

gateway:
  chain_id: {{ chain_id }}
  http:
    # Change host to your external IP address if you have users accessing Web3 from the outside.
    host: "localhost"
    # Use different port for each Web3 gateway instance, if all run locally.
    port: 8545
    cors: ["*"]
  ws:
    # Change host to your external IP address if you have users accessing Web3 from the outside.
    host: "localhost"
    # Use different port for each Web3 gateway instance, if all run locally.
    port: 8546
    origins: ["*"]
  method_limits:
    get_logs_max_rounds: 100
```

Use the following placeholder values:

* `{{ paratime_id }}`: The ID of the Emerald or Sapphire ParaTime which you are
  configuring the Web3 gateway for (see [above](#oasis-paratime-client-node)).
* `{{ oasis_node_unix_socket }}`: Path to the `internal.sock` file created by
  the Oasis node.
* `{{ postgresql_db }}`, `{{ postgresql_user }}`, `{{ postgresql_password }}`:
  Database name and credentials for your PostgreSQL database.
* `{{ chain_id }}`: The chain ID of your EVM network:
  * Emerald on [Mainnet][emerald-mainnet]: `42262`
  * Emerald on [Testnet][emerald-testnet]: `42261`
  * Sapphire on [Mainnet][sapphire-mainnet]: `23294`
  * Sapphire on [Testnet][sapphire-testnet]: `23295`

**Tip**:

All configuration settings can also be set via environment variables. For
example, instead of setting up the database password in the config file above
you can export:

```shell
DATABASE__PASSWORD=your_password_here
```

To start the Web3 gateway invoke:

```shell
./oasis-web3-gateway --config gateway.yml
```

The Web3 gateway will connect to your Oasis node and start indexing available
blocks (i.e. from the last network upgrade). This may — depending on your
hardware and the size of the blockchain — take hours.

If your database contains any tables populated by the previous version of the
Web3 gateway, migration scripts will automatically be applied upon startup.

If you want to migrate the database separately, run:

```shell
./oasis-web3-gateway migrate-db --config gateway.yml
```

**Caution**:

Above, we are invoking the `oasis-web3-gateway` process directly from the
shell, so you can quickly start using it. If you are setting up a production
environment, you should [configure the Web3 gateway as a system service][system
service] and register it in the service manager for your platform.

### Metrics

Web3 Gateway can report a number of metrics to Prometheus server.
Metrics collection is not enabled by default. Enable metrics by configuring
the `monitoring` section in the config file of the Web3 gateway.

```yaml title='gateway.yml'
...
# Existing fields omitted ...
gateway:
# Existing fields omitted ...
  monitoring:
    host: "localhost"
    # Use different port for each Web3 gateway instance, if all run locally.
    port: 9999
```

Oasis Web3 Gateway reports metrics starting with `oasis_web3_gateway_`.

The following metrics are currently reported:

| Name                                                | Type      | Description                                                                                     | Labels       | Package                                                                                                     |
| --------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| oasis\_web3\_gateway\_gas\_oracle\_node\_min\_price | Gauge     | Min gas price queried from the node.                                                            |              | [gas](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/gas/backend.go)                         |
| oasis\_web3\_gateway\_gas\_oracle\_computed\_price  | Gauge     | Computed recommended gas price based on recent full blocks. -1 if none (no recent full blocks). |              | [gas](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/gas/backend.go)                         |
| oasis\_web3\_gateway\_cache\_hits                   | Gauge     | Number of cache hits.                                                                           | cache        | [indexer](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/indexer/backend_cache.go)           |
| oasis\_web3\_gateway\_cache\_misses                 | Gauge     | Number of cache misses.                                                                         | cache        | [indexer](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/indexer/backend_cache.go)           |
| oasis\_web3\_gateway\_cache\_hit\_ratio             | Gauge     | Percent of Hits over all accesses (Hits + Misses).                                              | cache        | [indexer](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/indexer/backend_cache.go)           |
| oasis\_web3\_gateway\_block\_indexed                | Gauge     | Indexed block heights.                                                                          |              | [indexer](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/indexer/indexer.go)                 |
| oasis\_web3\_gateway\_block\_pruned                 | Gauge     | Pruned block heights.                                                                           |              | [indexer](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/indexer/indexer.go)                 |
| oasis\_web3\_gateway\_indexer\_health               | Gauge     | 1 if gateway indexer healthcheck is reporting as healthy, 0 otherwise.                          |              | [indexer](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/indexer/indexer.go)                 |
| oasis\_web3\_gateway\_subscription\_seconds         | Histogram | Histogram for the eth subscription API subscriptions duration.                                  | method\_name | [rpc/eth/filters](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/eth/filters/metrics.go) |
| oasis\_web3\_gateway\_subscription\_inflight        | Gauge     | Number of concurrent eth inflight subscriptions.                                                | method\_name | [rpc/eth/filters](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/eth/filters/metrics.go) |
| oasis\_web3\_gateway\_api\_request\_heights         | Histogram | Histogram of eth API request heights (difference from the latest  height).                      | method\_name | [rpc/eth/metrics](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/eth/metrics/api.go)     |
| oasis\_web3\_gateway\_signed\_queries               | Counter   | Number of eth\_call signed queries.                                                             |              | [rpc/eth/metrics](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/eth/metrics/api.go)     |
| oasis\_web3\_gateway\_api\_seconds                  | Histogram | Histogram for the eth API requests duration.                                                    | method\_name | [rpc/metrics](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/metrics/metrics.go)         |
| oasis\_web3\_gateway\_api\_request                  | Counter   | Counter for API requests.                                                                       | method\_name | [rpc/metrics](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/metrics/metrics.go)         |
| oasis\_web3\_gateway\_api\_failure                  | Counter   | Counter for API request failures.                                                               | method\_name | [rpc/metrics](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/metrics/metrics.go)         |
| oasis\_web3\_gateway\_api\_success                  | Counter   | Counter for API successful requests.                                                            | method\_name | [rpc/metrics](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/metrics/metrics.go)         |
| oasis\_web3\_gateway\_api\_inflight                 | Gauge     | Number of inflight API request.                                                                 | method\_name | [rpc/metrics](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/rpc/metrics/metrics.go)         |
| oasis\_web3\_gateway\_health                        | Gauge     | 1 if gateway healthcheck is reporting as healthy, 0 otherwise.                                  |              | [server](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/server/json_rpc.go)                  |
| oasis\_web3\_gateway\_psql\_query\_seconds          | Histogram | Histogram for the postgresql query duration.                                                    | query        | [storage/psql](https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/storage/psql/metrics.go)       |

## Archive Web3 Gateway

Each Oasis Web3 gateway can only connect to and synchronize blocks from a
single Oasis node instance. To enable access to older EVM blocks, you can
configure the Web3 gateway to behave as a proxy to another — archive — instance
of the Web3 gateway.

First, set up an instance of the [Oasis archive node]. Then, repeat the similar
process of setting up a Web3 gateway as you would normally do, but configure it
to use the newly set up Oasis archive node.

Suppose the archive instances of the Web3 gateway and Oasis nodes are up
and running and the archive Web3 gateway is listening on the local port `8543`.
Enable the proxy for historical blocks by adding the following to your (live)
Web3 gateway config and restart it:

```yaml title='gateway.yml'
# URI of an archive web3 gateway instance for servicing historical queries.
archive_uri: 'http://localhost:8543'
```

If a query requires information on the block which isn't stored in the
live version of the Web3 gateway, the gateway will pass the query to the
configured archive instance and return the obtained result.

**Info**:

Historical estimate gas calls are not supported.

## Troubleshooting

### Wipe state to force a complete reindex

If you encounter database or hardware issues, you may need to wipe the
database and reindex all blocks. First, run the `truncate-db` subcommand:

```bash
oasis-web3-gateway truncate-db --config gateway.yml --unsafe
```

Then, execute the `oasis-web3-gateway` normally to start reindexing the
blocks.

**Danger**:

This will wipe all existing state in the PostgreSQL database and can lead to
extended downtime while the Web3 Gateway is reindexing the blocks.

[Emerald]: https://docs.oasis.io/build/tools/other-paratimes/emerald.md

[Emerald Mainnet launch]: https://medium.com/oasis-protocol-project/oasis-emerald-evm-paratime-is-live-on-mainnet-13afe953a4c9

[emerald-mainnet]: https://docs.oasis.io/build/tools/other-paratimes/emerald/network.md

[emerald-testnet]: https://docs.oasis.io/build/tools/other-paratimes/emerald/network.md

[github-releases]: https://github.com/oasisprotocol/oasis-web3-gateway/releases

[Mainnet]: https://docs.oasis.io/node/network/mainnet.md

[mainnet-emerald]: https://docs.oasis.io/node/network/mainnet.md#emerald

[mainnet-sapphire]: https://docs.oasis.io/node/network/mainnet.md#sapphire

[Oasis archive node]: https://docs.oasis.io/node/run-your-node/archive-node.md

[README.md]: https://github.com/oasisprotocol/oasis-web3-gateway/blob/main/README.md#building-and-testing

[Sapphire]: https://docs.oasis.io/build/sapphire.md

[sapphire-testnet]: https://docs.oasis.io/build/sapphire/network.md

[sapphire-mainnet]: https://docs.oasis.io/build/sapphire/network.md

[system service]: https://docs.oasis.io/node/run-your-node/prerequisites/system-configuration.md#create-a-user

[Testnet]: https://docs.oasis.io/node/network/testnet.md

[testnet-emerald]: https://docs.oasis.io/node/network/testnet.md#emerald

[testnet-sapphire]: https://docs.oasis.io/node/network/testnet.md#sapphire

## See also

* [Run your node](https://docs.oasis.io/node/run-your-node.md)

* [gRPC proxy for your Oasis node](https://docs.oasis.io/node/grpc.md)

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
