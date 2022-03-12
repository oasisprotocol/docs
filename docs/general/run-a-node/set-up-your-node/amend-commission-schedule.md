# Amend Commission Schedule

:::info

This example assumes you have read and followed the instructions in the [Prerequisites](../../manage-tokens/advanced/oasis-cli-tools/prerequisites.md) and [Setup](../../manage-tokens/advanced/oasis-cli-tools/setup.md) sections of the _Use Your Tokens_ docs.

:::

We can configure our account to take a commission on staking rewards given to our node(s). The **commission rate** must be within **commission rate bounds**, which we can also configure.

Let's assume:

* we want to change our commission rate bounds to allow us to set any rate between 0% - 25%, and
* change our commission rate to 10%,
* `oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6`is our staking account address.

We're not allowed to change the commission bounds too close in near future, so we'd have to make changes a number of epochs in the future.

## Commission Schedule Rules

The commission schedule rules are specified by the `staking.params.commission_schedule_rules` consensus parameter.

To obtain its value from the genesis file, run:

```bash
cat $GENESIS_FILE | \
  python3 -c 'import sys, json; \
  rules = json.load(sys.stdin)["staking"]["params"]["commission_schedule_rules"]; \
  print(json.dumps(rules, indent=4))'
```

For our example network this returns:

```javascript
{
    "rate_change_interval": 1,
    "rate_bound_lead": 336,
    "max_rate_steps": 10,
    "max_bound_steps": 10
}
```

This means that we must submit a commission rate bound at least 336 epochs in advance (`rate_bound_lead`) and that we can change a commission rate on every epoch (`rate_change_interval`).

The `max_rate_steps` and `max_bound_steps` determine the maximum number of commission rate steps and rate bound steps, respectively.

## Query Our Account's Info

To query our staking account's information, use the following command:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.address oasis1qr6swa6gsp2ukfjcdmka8wrkrwz294t7ev39nrw6
```

:::info

For a detailed explanation on querying account information, see the [Get Info](../../manage-tokens/advanced/oasis-cli-tools/get-account-info.md) section of the _Use Your Tokens_ docs.

:::

Before the transaction, this outputs:

```javascript
General Account:
  ...
  Nonce:   10
Escrow Account:
  ...
  Commission Schedule:
    Rates: (none)
    Rate Bounds: (none)
  ...
```

We can observe that:

* Account's nonce is 10.
* No commissions rates or bounds are currently set.

## Generate an Amend Commission Schedule Transaction

In this example, we'll set the bounds to start on epoch 1500. An account's default bounds are 0% maximum, so we have to wait until our new bounds go into effect to raise our rate to 10%. Because of that, we'll specify that our rate also starts on epoch 1500.

Let's generate an amend commission schedule transaction for this example and store it to `tx_amend_commission_schedule.json`:

```bash
oasis-node stake account gen_amend_commission_schedule \
  "${TX_FLAGS[@]}" \
  --stake.commission_schedule.bounds 1500/0/25000 \
  --stake.commission_schedule.rates 1500/10000 \
  --transaction.file tx_amend_commission_schedule.json \
  --transaction.nonce 10 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

:::info

Rates and minimum/maximum rates are in units of 1/100,000, so `0`, `50000`, and `100000` come out to 0%, 50%, and 100%, respectively.

:::

This will output a preview of the generated transaction:

```javascript
You are about to sign the following transaction:
  Nonce:  10
  Fee:
    Amount: ROSE 0.000002
    Gas limit: 1000
    (gas price: ROSE 0.000000002 per gas unit)
  Method: staking.AmendCommissionSchedule
  Body:
    Amendment:
      Rates:
        (1) start: epoch 1500
            rate:  10.0%
      Rate Bounds:
        (1) start:        epoch 1500
            minimum rate: 0.0%
            maximum rate: 25.0%
Other info:
  Genesis document's hash: 976c302f696e417bd861b599e79261244f4391f3887a488212ee122ca7bbf0a8
```

and ask you for confirmation.

## Submit the Transaction

To submit the generated transaction, we need to copy `tx_amend_commission_schedule.json` to the online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_amend_commission_schedule.json
```

## Query Our Account's Info Again

Let's check [our account's info](amend-commission-schedule.md#query-our-accounts-info) again:

```javascript
General Account:
  ...
  Nonce:   11
Escrow Account:
  ...
  Commission Schedule:
    Rates:
      (1) start: epoch 1500
          rate:  10.0%
    Rate Bounds:
      (1) start:        epoch 1500
          minimum rate: 0.0%
          maximum rate: 25.0%
  ...
```

We can observe that:

* Our account's nonce increased to 11.
* We set the commission rate of 10.0% to start on epoch 1500.
* We set the commission rate bounds of 0% - 25% to also start on epoch 1500.

:::info

For more information on how commissions work in general, see the [Commission](../../manage-tokens/terminology.md#commission) explanation in the _Use Your Tokens_ docs.

:::

## Setting a More Complex Commission Schedule

It is also possible to set multiple commission rate steps and rate bound steps by passing the `--stake.commission_schedule.rates` and `--stake.commission_schedule.bounds` CLI flags multiple times.

For example, setting multiple commission rate steps and rate bound steps (for the same account as in the previous example) as follows:

```
oasis-node stake account gen_amend_commission_schedule \
  "${TX_FLAGS[@]}" \
  --stake.commission_schedule.bounds 2000/10000/30000 \
  --stake.commission_schedule.bounds 3000/20000/40000 \
  --stake.commission_schedule.rates 2000/15000 \
  --stake.commission_schedule.rates 2200/20000 \
  --stake.commission_schedule.rates 2500/25000 \
  --stake.commission_schedule.rates 2800/30000 \
  --stake.commission_schedule.rates 3000/35000 \
  --transaction.file tx_amend_commission_schedule.json \
  --transaction.nonce 11 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 2000
```

would result in the following commission schedule being printed out in [our account's info](amend-commission-schedule.md#query-our-accounts-info):

```
...
Escrow Account:
  ...
  Commission Schedule:
    Rates:
      (1) start: epoch 1500
          rate:  10.0%
      (2) start: epoch 2000
          rate:  15.0%
      (3) start: epoch 2200
          rate:  20.0%
      (4) start: epoch 2500
          rate:  25.0%
      (5) start: epoch 2800
          rate:  30.0%
      (6) start: epoch 3000
          rate:  35.0%
    Rate Bounds:
      (1) start:        epoch 1500
          minimum rate: 0.0%
          maximum rate: 25.0%
      (2) start:        epoch 2000
          minimum rate: 10.0%
          maximum rate: 30.0%
      (3) start:        epoch 3000
          minimum rate: 20.0%
          maximum rate: 40.0%
  ...
```

:::info

To troubleshoot an amendment that's rejected, consult our [compendium of 23 common ways for a commission schedule amendment to fail](https://github.com/oasisprotocol/oasis-core/blob/0dee03d75b3e8cfb36293fbf8ecaaec6f45dd3a5/go/staking/api/commission_test.go#L61-L610).

:::
