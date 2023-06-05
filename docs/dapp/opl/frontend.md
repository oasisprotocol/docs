# Frontend Application

We will need a [Pinata](https://www.pinata.cloud) development API
[key](https://docs.pinata.cloud/master) and JWT. Let's retrieve that first.

### VueJS

We will take a shortcut and bypass developing a VueJS app. Instead, we will
simply apply a sparse checkout of the complete frontend repo.

```sh
git remote add -f origin https://github.com/aefhm/opl-secret-ballot;
git config core.sparseCheckout true;
echo "frontend/" >> .git/info/sparse-checkout;
git pull main
```

Install dependencies

```sh
npm install
```

Compile and Hot-Reload for Development
```sh
npm run dev
```

Build assets for deployment
```sh
npm run build
```

We can now reference the deployed contracts in our frontend Vue app.

Modify the `.env.development` file with the appropriate addresses:
```yaml
VITE_BALLOT_BOX_V1_ADDR=0x5FbDB2315678afecb367f032d93F642f64180aa3
```
and
```yaml
VITE_DAO_V1_ADDR=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### Pinata

Additionally, we will need a [Pinata](https://www.pinata.cloud) API [key](https://docs.pinata.cloud/pinata-api/authentication) to access the pinning
service with which we store our ballots as JSON.

```yaml
VITE_PINATA_JWT=
```

### Start

Start Vue app
```sh
npm run dev
```

### MetaMask

You can use one of the deployed test accounts and associated private key with [MetaMask](https://metamask.io).

If you have not added a local network to MetaMask already, you can use this configuration.

#### Localhost

* RPC HTTP endpoint: `http://127.0.0.1:8545/`
* Chain ID:
  * Decimal: 1337

## Example

You should be able to navigate to http://localhost:5173 and create a new poll.

![Create a poll](../images/opl/create-poll.png)

Confirm and sign a transaction to create a new poll (issues a request against
the Host contract).

![Confirm new poll](../images/opl/confirm-new-poll.png)

Voting on a ballot issues a request to the Enclave contract.

![Vote on ballot](../images/opl/vote-on-ballot.png)

You should be able to see results from past polls.

![See past proposals](../images/opl/past-dao-proposals.png)

If you were able to get to this point, congrats! You have created an OPL dapp!

:::info Example

You can also try out and download a complete example from the Oasis Playground
repository.

:::
