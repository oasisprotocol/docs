# Upgrade to Mainnet

Source: https://docs.oasis.io/node/reference/upgrades/mainnet-upgrade

This document provides an overview of the proposed criteria and changes to upgrade from Mainnet Beta to Mainnet. This has been [reviewed and approved by community members and validators of the Oasis Network](https://github.com/oasisprotocol/community/discussions/1) and is being reproduced and summarized here for easy access.

**Caution**:

As proposed by the community, the upgrade from Mainnet Beta to Mainnet will kick off on November 18, 2020 at 16:00 UTC.

## Criteria for Mainnet

In order to transition from Mainnet Beta to Mainnet, community members have collectively suggested the following criteria be met. This is a collection of community feedback.

* [x] Validators representing more than 2/3 of stake in the initial consensus committee successfully get online to launch Mainnet Beta.
* [x] Beta network runs successfully for at least 10 days.
* [x] No major security risks on the Beta Network have been discovered or otherwise unremediated and untested in the past 10 days.
* [x] At least 50 validators run on the Network.
  * *Throughout Mainnet Beta there have been between 75 and 77 active validators on the network.*
* [x] There are NO Oasis Protocol Foundation or Oasis Labs nodes serving as validators.
* [x] At least one block explorer exists to track network stability, transactions, and validator activity.
  * *There is much more. See* [*Block Explorers & Validator Leaderboards*][archived - block explorers] *part of our docs.*
* [x] At least one qualified custodian supports the native ROSE token.
  * *Currently, Anchorage and Finoa support the ROSE token. See* [*Custody Providers*](https://docs.oasis.io/general/manage-tokens/holding-rose-tokens/custody-providers.md) *part of our docs.*
* [x] At least one web wallet or hardware wallet supports native ROSE token.
  * *Currently, Bitpie mobile wallet and RockX Ledger-backed web wallet are available and support ROSE token transfers. Support for staking and delegation is in development. See* [*3rd Party Wallets*](https://docs.oasis.io/general/manage-tokens/holding-rose-tokens.md) *and* [*Oasis Wallets*](https://docs.oasis.io/general/manage-tokens/oasis-wallets.md) *parts of our docs.*

[archived - block explorers]: https://github.com/oasisprotocol/docs/blob/0aeeb93a6e7c9001925923661e4eb3340ec4fb4b/docs/general/community-resources/community-made-resources.md#block-explorers--validator-leaderboards-block-explorers-validator-leaderboards

## Mechanics of Upgrading to Mainnet

Upgrading from Mainnet Beta to Mainnet will require a coordinated upgrade of the Network. All nodes will need to configure a new genesis file that they can generate or verify independently and reset/archive any state from Mainnet Beta. Once enough (representing 2/3+ of stake) nodes have taken this step, the network will start.

## Proposed Changes From Mainnet Beta to Mainnet

The Mainnet genesis file is intended to be as close as possible to the state of the Mainnet Beta network at the time of upgrade. That includes retaining validator token balances, retaining genesis file wallet allocations, and block height at time of the snapshot.

In addition, after receiving additional feedback from the community, the Oasis Protocol Foundation has proposed to increase the staking rewards model. In the new proposed model staking rewards will start at 20% (annualized) and range from 20% to 2% over the first 4 years of the network (see more in updated [Token Metrics and Distribution](https://docs.oasis.io/general/oasis-network/token-metrics-and-distribution.md) doc).

**Info**:

The following parts of the genesis file will be updated:

* **`height`** will remain the same as at the time of the snapshot of Mainnet Beta, i.e. `702000`.
* **`genesis_time`** will be set to `2020-11-18T16:00:00Z`.
* **`chain_id`** will be set to `oasis-1`.
* **`halt_epoch`** will be set to `9940` (approximately 1 year from Mainnet launch).
* **`staking.params.disable_transfers`** will be omitted (or set to`false)`to enable transfers.
* **`staking.params.reward_schedule`** will be updated to reflect the updated reward schedule as mentioned above.
* **`staking.common_pool`** will be increased by 450M ROSE to fund increased staking rewards.
* **`staking.ledger.oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6`**, which corresponds to the Community and Ecosystem Wallet, will have its `general.balance` reduced by 450M ROSE to `1183038701000000000` and transferred to the Common Pool to fund increased staking rewards.
* **`extra_data`** will be set back to the value in the [Mainnet Beta genesis file](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-10-01/genesis.json) to include the Oasis network's genesis quote: *”*[*Quis custodiet ipsos custodes?*](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F)*” \[submitted by Oasis Community Member Daniyar Borangaziyev]:*

  ```diff
    "extra_data": {
      "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="
    }
  ```

See the updated [Network Parameters](https://docs.oasis.io/node/network/mainnet.md) for the published Mainnet genesis file.

**Info**:

For more detailed instructions how to verify the provided Mainnet genesis file by comparing it to network state dump, see the [Handling Network Upgrades](https://docs.oasis.io/node/run-your-node/maintenance/handling-network-upgrades.md#example-diff-for-mainnet-beta-to-mainnet-network-upgrade) guide.

Mainnet will use [**Oasis Core 20.12.2**](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.2).

## Mainnet Launch Support

The Oasis team will be offering live video support during the launch of Mainnet. Video call link and calendar details will be shared with node operators via email and Slack.

For any additional support, please reach out via the [**#node-operators** channel at the Oasis Network Community server on Discord](https://docs.oasis.io/get-involved.md) with your questions, comments, and feedback related to Mainnet.

To follow the network, please use one of the many community block explorers including [oasisscan.com](https://www.oasisscan.com/).

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
