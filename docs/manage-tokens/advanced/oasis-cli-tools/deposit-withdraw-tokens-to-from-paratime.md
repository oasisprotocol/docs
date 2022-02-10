# Deposit/Withdraw Tokens to/from ParaTime

To perform ParaTime deposits or withdrawals using a command line interface, you will need `oasis` executable which is part of the [Oasis CLI](https://github.com/oasisprotocol/oasis-sdk/tree/main/cli). `oasis` is supplemental to `oasis-node` and supports ParaTime-related operations such as deposits, withdrawals, transfers and manipulation of the smart contracts, in contrast to `oasis-node` which only supports consensus layer features.

We will assume that your already have an Oasis wallet with some ROSE and that you want to Deposit or Withdraw ROSE to or from Emerald ParaTime running on the Mainnet network.

{% hint style="info" %}
At time of writing, no precompiled `oasis` binaries are available. You will need to clone the [`oasis-sdk` git repository](https://github.com/oasisprotocol/oasis-sdk/) and compile the tool yourself. The process is straight forward - just follow the [Readme](https://github.com/oasisprotocol/oasis-sdk/blob/main/cli/README.md).
{% endhint %}

{% hint style="info" %}
This chapter describes the command line interface for depositing and withdrawing ROSE which is tailored toward advanced users such as node operators. If you are interested in the end-user wallets with a graphical user interface, consult the [How to Transfer ROSE into Emerald ParaTime](../../how-to-transfer-rose-into-emerald-paratime.md) chapter.
{% endhint %}

## Import your wallet

To sign any transaction you will need to import an Oasis wallet. Prepare your base64-encoded private key or the BIP39 mnemonic of your Oasis account and run:

```
oasis wallet import <SOME_WALLET_NAME>
```

Follow the interactive instructions that will guide you through the import procedure. If this is the first time you are running `oasis`, the imported wallet will become your default wallet and transactions will be signed with the key stored in this wallet, if not otherwise specified with the `--wallet` parameter.

{% hint style="info" %}
At time of writing, Oasis CLI supports importing ed25519 keypairs only. If you need to perform token transfers and withdrawals with Ethereum keypair, use the official [Oasis Wallet Browser Extension](../../how-to-transfer-rose-into-emerald-paratime.md) instead.
{% endhint %}

## Configure Allowance

In order to deposit ROSE to a ParaTime, you will first need to grant the ParaTime access to your Oasis account on the consensus layer. The following command allows Emerald to access up to 100 ROSE stored on your Oasis account which you will deposit afterwards:

```
$ oasis accounts allow paratime:emerald 100
Unlock your wallet.
? Passphrase: 
You are about to sign the following transaction:
Method: staking.Allow
Body:
  Beneficiary:   oasis1qqdpkrh0v9jn80kymcvgk57v38x38qwdxvvtnjfm
  Amount change: +10.0 ROSE
Nonce:  5
Fee:
  Amount: 0.0 ROSE
  Gas limit: 0
  (gas price: 0.0 ROSE per gas unit)

Network:  mainnet
Paratime: none (consensus layer)
? Sign this transaction? Yes
Broadcasting transaction...
Transaction executed successfully.
Transaction hash: a28a67b7af6bdce84760d5d61b982c0e89aa6874dda0aad01b61ef85feea8601
```

The allowance above **adds** the amount of ROSE Emerald ParaTime will be allowed to access. For example, if your run the command above 3 times, Emerald will obtain the permission to access 300 ROSE. Later, each deposit will subtract ROSE from the allowed amount.

{% hint style="info" %}
By default the Oasis CLI will execute transactions on Emerald ParaTime deployed on the Mainnet. You can always use another ParaTime and the network by using the `--paratime` and `--network` parameters respectively.
{% endhint %}

## Deposit

After setting up the allowance policy, we can execute the deposit transaction. The following command will deposit 100 ROSE from your consensus account to your ParaTime account.

```
$ oasis accounts deposit 100 --gas-price 0 
Unlock your wallet.
? Passphrase: 
You are about to sign the following transaction:
{
  "v": 1,
  "call": {
    "method": "consensus.Deposit",
    "body": "oWZhbW91bnSCSA3gtrOnZAAAQA=="
  },
  "ai": {
    "si": [
      {
        "address_spec": {
          "signature": {
            "ed25519": "OxEJPYSJW55VEDZyzJ6drxzZ6MeSwz/JuTwCAlWJ0ks="
          }
        },
        "nonce": 8
      }
    ],
    "fee": {
      "amount": {
        "Amount": "0",
        "Denomination": ""
      },
      "gas": 11284,
      "consensus_messages": 1
    }
  }
}

Network:  mainnet
Paratime: emerald
? Sign this transaction? Yes
Broadcasting transaction...
Transaction executed successfully.
Round:            564
Transaction hash: 2bccec1776df6c2028f7ece6ae9b53b8c12875f3f10b39b962d9ac82238bc60b
Waiting for deposit result...
Deposit succeeded.
```

Currently, deposit transactions are free of charge, so we can avoid spending ROSE for the gas fee by adding the `--gas-price 0` parameter. Also, keep in mind that **deposit and withdrawal fees are always paid by your ParaTime accoun.** If it doesn't contain any ROSE, you are not able to cover the fees.

To deposit ROSE to a different ParaTime account, simply add the bech32-encoded `oasis1` address to the deposit command:

```
$ oasis accounts deposit 100 oasis1qpxhsf7xnm007csw2acaa7mta2krzpwex5c90qu6 --gas-price 0
Unlock your wallet.
? Passphrase: 
You are about to sign the following transaction:
{
  "v": 1,
  "call": {
    "method": "consensus.Deposit",
    "body": "omJ0b1UATXgnxp7e/2IOV3He+2vqrDEF2TVmYW1vdW50gkkFa8deLWMQAABA"
  },
  "ai": {
    "si": [
      {
        "address_spec": {
          "signature": {
            "ed25519": "NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE="
          }
        },
        "nonce": 9
      }
    ],
    "fee": {
      "amount": {
        "Amount": "0",
        "Denomination": ""
      },
      "gas": 11310,
      "consensus_messages": 1
    }
  }
}

Network:  mainnet
Paratime: emerald
? Sign this transaction? Yes
Broadcasting transaction...
Transaction executed successfully.
Round:            710
Transaction hash: aab2262def5a4d6e28b769b6372e07d271e6a9f0857502f2b8a6a0c777ef2b05
Waiting for deposit result...
Deposit succeeded.
```

Also, Ethereum hex-encoded addresses are supported which are common in Emerald ParaTime:

```
$ oasis accounts deposit 100 0x90adE3B7065fa715c7a150313877dF1d33e777D5 --gas-price 0
Unlock your wallet.
? Passphrase: 
You are about to sign the following transaction:
{
  "v": 1,
  "call": {
    "method": "consensus.Deposit",
    "body": "omJ0b1UAeBTz2VT0G2RZ655LyPvGdn7OWqlmYW1vdW50gkgN4Lazp2QAAEA="
  },
  "ai": {
    "si": [
      {
        "address_spec": {
          "signature": {
            "ed25519": "NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE="
          }
        },
        "nonce": 10
      }
    ],
    "fee": {
      "amount": {
        "Amount": "1130900000000000",
        "Denomination": ""
      },
      "gas": 11309,
      "consensus_messages": 1
    }
  }
}

Network:  mainnet
Paratime: emerald
? Sign this transaction? Yes
Broadcasting transaction...
Transaction executed successfully.
Round:            712
Transaction hash: bd587656e92515efb326614fda554b3ce1b7ec69768880bf21895424e06bddb9
Waiting for deposit result...
Deposit succeeded.
```

{% hint style="warning" %}
The current version of the Cipher ParaTime running on Mainnet does not support gas estimation yet. If oasis CLI returns the `Error: failed to estimate gas: invalid argument: missing field` message, try enforcing the gas limit to a reasonable size, for example by adding `--gas-limit 12000` flag.
{% endhint %}

## Withdraw

To withdraw 100 ROSE from your ParaTime account to the same account on the consensus layer, run:

```
$ oasis accounts withdraw 100
Unlock your wallet.
? Passphrase: 
You are about to sign the following transaction:
{
  "v": 1,
  "call": {
    "method": "consensus.Withdraw",
    "body": "oWZhbW91bnSCSIrHIwSJ6AAAQA=="
  },
  "ai": {
    "si": [
      {
        "address_spec": {
          "signature": {
            "ed25519": "NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE="
          }
        },
        "nonce": 12
      }
    ],
    "fee": {
      "amount": {
        "Amount": "112850000000000",
        "Denomination": ""
      },
      "gas": 11285,
      "consensus_messages": 1
    }
  }
}

Network:  mainnet
Paratime: emerald
? Sign this transaction? Yes
Broadcasting transaction...
Transaction executed successfully.
Round:            727
Transaction hash: c357b0661208a93301a07edc912cec9111ba1a60a08a1d85f221c906b41ad121
Waiting for withdraw result...
Withdraw succeeded.
```

Withdraw transactions are not free of charge and the fee will be deducted **from your ParaTime balance**.

You can specify a custom Oasis address which you want to withdraw your ROSE to by appending it to the withdraw command:

```
$ oasis accounts withdraw 100 oasis1qpxhsf7xnm007csw2acaa7mta2krzpwex5c90qu6
Unlock your wallet.
? Passphrase: 
You are about to sign the following transaction:
{
  "v": 1,
  "call": {
    "method": "consensus.Withdraw",
    "body": "omJ0b1UATXgnxp7e/2IOV3He+2vqrDEF2TVmYW1vdW50gkiKxyMEiegAAEA="
  },
  "ai": {
    "si": [
      {
        "address_spec": {
          "signature": {
            "ed25519": "NcPzNW3YU2T+ugNUtUWtoQnRvbOL9dYSaBfbjHLP1pE="
          }
        },
        "nonce": 14
      }
    ],
    "fee": {
      "amount": {
        "Amount": "113100000000000",
        "Denomination": ""
      },
      "gas": 11310,
      "consensus_messages": 1
    }
  }
}

Network:  mainnet
Paratime: emerald
? Sign this transaction? Yes
Broadcasting transaction...
Transaction executed successfully.
Round:            762
Transaction hash: 85b9c65d2df54a4bb698f4ced7c89fe91462ff78a68136280e030ee38780e687
Waiting for withdraw result...
Withdraw succeeded.
```

{% content-ref url="../../how-to-transfer-rose-into-emerald-paratime.md" %}
[how-to-transfer-rose-into-emerald-paratime.md](../../how-to-transfer-rose-into-emerald-paratime.md)
{% endcontent-ref %}
