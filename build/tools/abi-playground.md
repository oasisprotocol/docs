# ABI Playground

Source: https://docs.oasis.io/build/tools/abi-playground

The [ABI Playground][abi-playground] provides an interactive environment for
working with verified smart contracts on Oasis networks. Similar to Etherscan's
read/write contract functionality, you can execute functions on verified
contracts deployed to the Sapphire and Emerald networks.

If your contract isn't verified yet, please see our [verification] chapter.

## Access Verified Contracts

You can access verified contracts in two ways:

### Method 1: via Explorer

1. Navigate to the [Explorer].
2. Search for a verified contract using its address, e.g. Wrapped ROSE:
   `0x8Bc2B030b299964eEfb5e1e0b36991352E56D2D3`.
3. Click `Interact in ABI Playground`.

Image: Explorer

4. The ABI Playground will open with the Wrapped ROSE contract loaded.

### Method 2: Direct ABI Playground Access

1. Visit the [ABI Playground][abi-playground].
2. Enter a verified contract address, e.g., Wrapped ROSE:
   `0x8Bc2B030b299964eEfb5e1e0b36991352E56D2D3`.
3. Click `Load Contract`.

Image: ABI Playground Load

4. The ABI Playground will open with the Wrapped ROSE contract loaded.

## Working with Localnet Contracts

The ABI Playground also supports interacting with contracts deployed on a
[localnet] for testing purposes.

1. Visit the [ABI Playground][abi-playground].
2. Select `Oasis Saphhire Localnet` from the network dropdown.

Image: ABI Playground localnet

3. Enter address of the contract you deployed on localnet.
4. Paste the ABI JSON into the provided text field.
5. Click `Import ABI` to load the interface.

Image: ABI Playground import

**Info**: Finding Your Contract's ABI

When using development frameworks:

* Hardhat: Look in the `artifacts` directory
* Foundry: Check the `out` directory

If you encounter format errors, validate your ABI JSON using an online
formatter before importing.

## Troubleshooting

### Contract address not found

* **Cause**: The contract might not be verified on Sourcify or the address is incorrect.
* **Solution**: Verify the contract on Sourcify or double-check the address.

### Invalid ABI format

* **Cause**: The ABI JSON might not be following standard formatting.
* **Solution**: Use an online JSON formatter to validate and reformat the ABI before importing it.

Should you have any other problems or questions, do not hesitate to share them with us on the
[#dev-central Discord channel][discord].

[abi-playground]: https://abi-playground.oasis.io/

[Explorer]: https://explorer.oasis.io/

[localnet]: https://docs.oasis.io/build/tools/localnet.md

[verification]: https://docs.oasis.io/build/tools/verification.md

[discord]: https://oasis.io/discord

---

*To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.oasis.io/llms.txt*
