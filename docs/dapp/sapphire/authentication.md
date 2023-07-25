---
description: Authenticate users with your confidential contracts
---

# View-Call Authentication

User impersonation on Ethereum and other 'Transparent EVMs' isn't a problem because everybody can see all data, however with the Sapphire confidential EVM it is necessary to prevent contracts from revealing confidential information to the wrong person so it cannot allow impersonation.

When `eth_call` is used to query a contract's `view` function the `msg.sender` parameter is set to `address(0x0)` because it is unauthenticated and anonymous.

When a transaction is submitted it is signed by a keypair, and thus costs gas and can make state updates so `msg.sender` is set to the signing account.

Intra-contract calls always set `msg.sender` appropriately, if a contract calls another contract in a way which could reveal sensitive information, the calling contract must implement access control or authentication.

When `sapphire.wrap` is used to automatically end-to-end encrypt calls to Sapphire. However, once the Sapphire wrapper is requested to sign a transaction (thus attaching the provider to a signer, or converting it into one) then subsequent `view` calls via `eth_call` will be automatically signed, these are called 'Signed Queries' meaning `msg.sender` will be set to the signing account.

However, this may not be an ideal user experience and can result in frequent pop-ups requesting they sign queries which wouldn't normally require any interaction on Transparent EVMs.

```solidity
contract Example {
    address owner;
    constructor () {
        owner = msg.sender;
    }
    function isOwner () public view returns (bool) {
        return msg.sender == owner;
    }
}
```

In the sample above, calling `isOwner` returns:

 * `false`, for `eth_call`
 * `false`, with `sapphire.wrap` but without an attached signer
 * `true`, with `sapphire.wrap` and an attached signer
 * `true`, if called via the contract which created it

## Sign-in with EIP-712

One strategy which can be used to reduce the number of transaction signing prompts when a user interacts with contracts via a dApp is to use EIP-712 to 'Sign-in', in combination with using two wrapped providers:

 1. Perform encrypted but unauthenticated view calls
 2. Performing encrypted and authenticated transactions (or view calls), where the user will be prompted to sign each action.

The code sample below uses an `authenticated` modifier to verify the sign-in

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

struct SignatureRSV {
    bytes32 r;
    bytes32 s;
    uint256 v;
}

contract SignInExample {
    bytes32 public constant EIP712_DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
    string public constant SIGNIN_TYPE = "SignIn(address user, uint32 time)";
    bytes32 public constant SIGNIN_TYPEHASH = keccak256(bytes(SIGNIN_TYPE));
    bytes32 public immutable DOMAIN_SEPARATOR;

    constructor () {
        DOMAIN_SEPARATOR = keccak256(abi.encode(
            EIP712_DOMAIN_TYPEHASH,
            keccak256("Example.SignIn"),
            keccak256("1"),
            block.chainid,
            address(this)
        ));
    }

    struct SignIn {
        address user;
        uint32 time;
        SignatureRSV rsv;
    }

    modifier authenticated(SignIn calldata auth)
    {
        // Must be signed within 24 hours ago
        require( auth.time > (block.timestamp - (60*60*24)) );

        // Validate EIP-712 sign-in authentication
        bytes32 authdataDigest = keccak256(abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(
                SIGNIN_TYPEHASH,
                auth.user,
                auth.time
            ))
        ));

        require( auth.user == ecrecover(authdataDigest, uint8(auth.rsv.v), auth.rsv.r, auth.rsv.s), "Invalid Sign-In" );

        _;
    }

    function authenticatedViewCall(
        SignIn calldata auth,
        ... args
    )
        external view
        authenticated(auth)
        returns (bytes memory output)
    {
        // Use `auth.user` instead of `msg.sender`
    }
}
```

Then the frontend dApp can request the user to sign-in using EIP-712, you may wish to add additional parameters which are authenticated such as the domain name. The following code example uses Ethers:

```typescript
const time = new Date().getTime();
const user = await eth.signer.getAddress();

// Ask user to 'Sign-In' every 24 hours
const signature = await eth.signer._signTypedData({
    name: "Example.SignIn",
    version: "1",
    chainId: import.meta.env.CHAINID,
    verifyingContract: contract.address
}, {
    SignIn: [
        { name: 'user', type: "address" },
        { name: 'time', type: 'uint32' },
    ]
}, {
    user: user,
    time: time
});
const rsv = ethers.utils.splitSignature(signature);
const auth = {user, time, rsv};
// TODO: cache the result

// Then in future, authenticated view calls can be performed using the authenticated data
await contract.authenticatedViewCall(auth, ...args);
```