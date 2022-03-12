# Upgrade to Mainnet

This document provides an overview of the proposed criteria and changes to upgrade from Mainnet Beta to Mainnet. This has been [reviewed and approved by community members and validators of the Oasis Network](https://github.com/oasisprotocol/community-forum/issues/1) and is being reproduced and summarized here for easy access.

:::caution

As proposed by the community, the upgrade from Mainnet Beta to Mainnet will kick off on November 18, 2020 at 16:00 UTC.

:::

## Criteria for Mainnet

In order to transition from Mainnet Beta to Mainnet, community members have collectively suggested the following criteria be met. This is a collection of community feedback.

* [x] Validators representing more than 2/3 of stake in the initial consensus committee successfully get online to launch Mainnet Beta.
* [x] Beta network runs successfully for at least 10 days.
* [x] No major security risks on the Beta Network have been discovered or otherwise unremediated and untested in the past 10 days.
* [x] At least 50 validators run on the Network.
  * _Throughout Mainnet Beta there have been between 75 and 77 active validators on the network._
* [x] There are NO Oasis Protocol Foundation or Oasis Labs nodes serving as validators.
* [x] At least one block explorer exists to track network stability, transactions, and validator activity.
  * _There is much more. See_ [_Block Explorers & Validator Leaderboards_](/general/community-resources/community-made-resources#block-explorers-validator-leaderboards) _part of our docs._
* [x] At least one qualified custodian supports the native ROSE token.
  * _Currently, Anchorage and Finoa support the ROSE token. See_ [_Custody Providers_](/general/manage-tokens/holding-rose-tokens/custody-providers) _part of our docs._
* [x] At least one web wallet or hardware wallet supports native ROSE token.
  * _Currently, Bitpie mobile wallet and RockX Ledger-backed web wallet are available and support ROSE token transfers. Support for staking and delegation is in development. See_ [_Mobile Wallets_](/general/manage-tokens/holding-rose-tokens/bitpie-wallet) _and_ [_Web Wallets_](/general/manage-tokens/oasis-wallets/) _parts of our docs._

## Mechanics of Upgrading to Mainnet

Upgrading from Mainnet Beta to Mainnet will require a coordinated upgrade of the Network. All nodes will need to configure a new genesis file that they can generate or verify independently and reset/archive any state from Mainnet Beta. Once enough (representing 2/3+ of stake) nodes have taken this step, the network will start.

## Proposed Changes From Mainnet Beta to Mainnet

The Mainnet genesis file is intended to be as close as possible to the state of the Mainnet Beta network at the time of upgrade. That includes retaining validator token balances, retaining genesis file wallet allocations, and block height at time of the snapshot.

In addition, after receiving additional feedback from the community, the Oasis Protocol Foundation has proposed to increase the staking rewards model. In the new proposed model staking rewards will start at 20% (annualized) and range from 20% to 2% over the first 4 years of the network (see more in updated [Token Metrics and Distribution](/oasis-network-primer/token-metrics-and-distribution) doc).

:::info

The following parts of the genesis file will be updated:

* **`height`** will remain the same as at the time of the snapshot of Mainnet Beta, i.e. `702000`.
* **`genesis_time`** will be set to `2020-11-18T16:00:00Z`.
* **`chain_id`** will be set to `oasis-1`.
* **`halt_epoch`** will be set to `9940` (approximately 1 year from Mainnet launch).
* **`staking.params.disable_transfers`** will be omitted (or set to`false)`to enable transfers.
* **`staking.params.reward_schedule`** will be updated to reflect the updated reward schedule as mentioned above.
* **`staking.common_pool`** will be increased by 450M ROSE to fund increased staking rewards.
* **`staking.ledger.oasis1qrad7s7nqm4gvyzr8yt2rdk0ref489rn3vn400d6`**, which corresponds to the Community and Ecosystem Wallet, will have its `general.balance` reduced by 450M ROSE to `1183038701000000000` and transferred to the Common Pool to fund increased staking rewards.
* **`extra_data`** will be set back to the value in the [Mainnet Beta genesis file](https://github.com/oasisprotocol/mainnet-artifacts/releases/download/2020-10-01/genesis.json) to include the Oasis network's genesis quote: _”_[_Quis custodiet ipsos custodes?_](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F)_” \[submitted by Oasis Community Member Daniyar Borangaziyev\]:_

  ```diff
    "extra_data": {
      "quote": "UXVpcyBjdXN0b2RpZXQgaXBzb3MgY3VzdG9kZXM/IFtzdWJtaXR0ZWQgYnkgT2FzaXMgQ29tbXVuaXR5IE1lbWJlciBEYW5peWFyIEJvcmFuZ2F6aXlldl0="
    }
  ```

:::

See the updated [Network Parameters](../../oasis-network/network-parameters.md) for the published Mainnet genesis file.

:::info

For more detailed instructions how to verify the provided Mainnet genesis file by comparing it to network state dump, see the [Handling Network Upgrades](../../run-a-node/maintenance-guides/handling-network-upgrades.md#example-diff-for-mainnet-beta-to-mainnet-network-upgrade) guide.

:::

Mainnet will use [**Oasis Core 20.12.2**](https://github.com/oasisprotocol/oasis-core/releases/tag/v20.12.2).

## Mainnet Launch Support

The Oasis team will be offering live video support during the launch of Mainnet. Video call link and calendar details will be shared with node operators via email and Slack.

For any additional support, please reach out via the [**#nodeoperators** Oasis Community Slack channel](../../oasis-network/connect-with-us.md) with your questions, comments, and feedback related to Mainnet.

To follow the network, please use one of the many community block explorers including [oasisscan.com](https://www.oasisscan.com/).[  
](https://app.gitbook.com/@oasisprotocol/s/general/~/drafts/-MYKBZ_9kr9NSXQSnUVI/contribute-to-the-network/contribution-guidelines/@merged)

