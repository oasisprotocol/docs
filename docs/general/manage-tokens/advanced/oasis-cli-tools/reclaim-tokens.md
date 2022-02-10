# Reclaim Delegated/Staked Tokens

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](prerequisites) and [Setup](setup) sections.

:::

When we want to reclaim escrowed tokens, we can't do that directly. Instead, we need to specify the number of shares we want to reclaim from an escrow account.

Let's assume:

* we want to reclaim 357 billion shares from our escrow account,
* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw`is our staking account address.

## Query Our Account's Info

To query our staking account's information, use the following command:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

:::info

For a detailed explanation on querying account information, see the [Get Info](get-account-info) section.

:::

Before the transaction, this outputs:

```
General Account:
  Balance: ROSE 223.492486765
  Nonce:   9
Escrow Account:
  Active:
    Balance:      ROSE 11450.38481664
    Total Shares: 10185014125910
  Debonding:
    Balance:      ROSE 0.0
    Total Shares: 0
  ...
```

We can observe that:

* General account's balance is ~223 tokens.
* Account's nonce is 9.
* ~11450 tokens are actively bounded to the escrow account.
* The amount of tokens that are currently debonding is 0.

## Generate a Reclaim Escrow Transaction

Let's generate a reclaim escrow transaction of 357 billion shares from our own escrow account and store it to `tx_reclaim.json`:

```bash
oasis-node stake account gen_reclaim_escrow \
  "${TX_FLAGS[@]}" \
  --stake.shares 357000000000 \
  --stake.escrow.account oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6 \
  --transaction.file tx_reclaim.json \
  --transaction.nonce 9 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

This will output a preview of the generated transaction:

```
You are about to sign the following transaction:
  Nonce:  9
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.ReclaimEscrow
  Body:
    Account: oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
    Shares:  357000000000
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

and ask you for confirmation.

## Submit the Transaction

To submit the generated transaction, we need to copy `tx_reclaim.json` to the online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_reclaim.json
```

## Query Our Account's Info Again

Let's check [our account's info](reclaim-tokens#query-our-accounts-info) again:

```
General Account:
  Balance: ROSE 223.492486765
  Nonce:   10
Escrow Account:
  Active:
    Balance:      ROSE 11049.031678686
    Total Shares: 9828014125910
  Debonding:
    Balance:      ROSE 401.353137954
    Total Shares: 401353137954
  ...
```

We can observe that:

* Our general account's balance decreased for 0.000002 token. This corresponds to the fee

  that we specified we will pay for this transaction.

* Our account's nonce increased to 10.
* Our escrow account's active number of shares decreased for 357 billion shares

  to 9,828,014,125,910.

* Our escrow account's active balance decreased for 401.353137954 tokens and

  is now 11049.031678686 tokens.

* Our escrow account's debonding balance increased to 401.353137954 tokens

  and its number of shares to the same amount.

### Computation of Reclaimed Tokens

When a delegator wants to reclaim a certain number of escrowed tokens, the **token price** (in shares) must be calculated based on the escrow account's current active balance and the number of issued shares:

```
tokens_per_share = account_delegated_tokens / account_issued_shares
```

In our case, the current token price (i.e. `tokens_per_share`) is 11450.384816640 / 10,185,014,125,910 which is 1.124238481664054 * 10^-9 token per share.

For 357 billion shares, the amount of tokens that will be reclaimed is thus 357 * 10^9 * 1.124238481664054 * 10^-9 which is 401.35313795406726 tokens (rounded to 401.353137954 tokens).

Hence, the escrow account's active balance decreased for 401.353137954 tokens and the debonding balance increased for the same amount.

:::caution

While the number of debonding shares currently equals the number of base units that are currently subject to debonding and hence, the amount of tokens we can except to reclaim after debonding period is over is a little over 401 tokens, there is no guarantee that this stays the same until the end of the debonding period. Any slashing (e.g. for double signing) could change shares' price.

:::

### Debonding Period

The debonding period is specified by the `staking.params.debonding_interval` consensus parameter and is represented as a number of epochs that need to pass.

To obtain its value from the genesis file, run:

```bash
cat $GENESIS_FILE | \
  python3 -c 'import sys, json; \
  print(json.load(sys.stdin)["staking"]["params"]["debonding_interval"])'
```

For our example network, this returns:

```
10
```

After the debonding period has passed, the network will automatically move an escrow account's debonding balance into the general account.

