# Governance

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](../../general/manage-tokens/advanced/oasis-cli-tools/prerequisites) and [Setup](../../general/manage-tokens/advanced/oasis-cli-tools/setup.md) sections of the _Use Your Tokens_ docs.

:::

## Listing Active Proposals

In order to list all active governance proposals, you can use the following command:

```bash
oasis-node governance list_proposals -a $ADDR
```

In case there are currently any active proposals this should return a list of them similar to the following:

```javascript
[{
    "id":1,
    "submitter":"oasis1qrs2dl6nz6fcxxr3tq37laxlz6hxk6kuscnr6rxj",
    "state":"active",
    "deposit":"10000000000000",
    "content":{
        "upgrade":{
            "v":1,
            "handler":"1304_testnet_upgrade",
            "target":{
                "runtime_host_protocol":{"major":2},
                "runtime_committee_protocol":{"major":2},
                "consensus_protocol":{"major":4}
            },
            "epoch":5662
        }
    },
    "created_at":5633,
    "closes_at":5645
}]
```

## View Votes for a Proposal

To view votes for a given proposal, you can use the following command:

```bash
oasis-node governance proposal_votes -a $ADDR --proposal.id <PROPOSAL-ID>
```

replacing `<PROPOSAL-ID>` with the id of the proposal you want see.

It should return a list of cast votes for the chosen proposal similar to the following:

```bash
[
  {
    "voter": "oasis1qq2vzcvxn0js5unsch5me2xz4kr43vcasv0d5eq4",
    "vote": "yes"
  },
  {
    "voter": "oasis1qqv25adrld8jjquzxzg769689lgf9jxvwgjs8tha",
    "vote": "yes"
  },
  {
    "voter": "oasis1qz2tg4hsatlxfaf8yut9gxgv8990ujaz4sldgmzx",
    "vote": "yes"
  },
  {
    "voter": "oasis1qz424yg28jqmgfq3xvly6ky64jqnmlylfc27d7cp",
    "vote": "no"
  },
  {
    "voter": "oasis1qr37y56g92chzvsew54kj7gu47cxyly7jytt5rm0",
    "vote": "yes"
  }
]
```

## Voting for a Proposal

:::info

At this time only entities which have active validator nodes scheduled in the validator set are eligible to vote for governance proposals.

:::

If you want to vote for an active proposal, you can use the following command to generate a suitable transaction:

```bash
oasis-node governance gen_cast_vote \
  "${TX_FLAGS[@]}" \
  --vote.proposal.id 1 \
  --vote yes \
  --transaction.file tx_cast_vote.json \
  --transaction.nonce 1 \
  --transaction.fee.gas 2000 \
  --transaction.fee.amount 2000
```

This will output a preview of the generated transaction:

```bash
You are about to sign the following transaction:
  Method: governance.CastVote
  Body:
    Proposal ID: 1
    Vote:        yes
  Nonce:  1
  Fee:
    Amount: 0.000002 ROSE
    Gas limit: 2000
    (gas price: 0.000000001 ROSE per gas unit)
Other info:
  Genesis document's hash: 9ce956ef5999024e148f0c21f1e8a05ab4fc98a44c4696b289770705aeb1dd77
```

and ask you for confirmation.

## Submit the Transaction

To submit the generated transaction, we need to copy `tx_cast_vote.json` to the online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_cast_vote.json
```
