---
description: Run a Hyperlane Relayer
---
# Relayer

[Relayers][relayer] are off-chain agents that transport messages between chains.

[relayer]: https://docs.hyperlane.xyz/docs/protocol/agents/relayer

## Run a Relayer

The easiest way to run a relayer is with the **[Hyperlane CLI]**.

[Hyperlane CLI]: https://docs.hyperlane.xyz/docs/reference/cli

1. Export your private key to be used with the CLI

    ```shell
    export HYP_KEY='<YOUR_PRIVATE_KEY>'
    ```
2. Start a relayer which watches `Arbitrum Sepolia` & `SapphireTestnet`

    ```shell
    hyperlane relayer --chains sapphiretestnet,arbitrumsepolia
    ```

:::info Chain Configs

If you didn't deploy the *Hyperlane Core* on `Sapphire Testnet` yourself, make
sure you have the following *Hyperlane* chain config yaml files in
`$HOME/.hyperlane/chains/sapphiretestnet`.

<details>
  <summary> metadata.yaml </summary>
    ```yaml
    # yaml-language-server: $schema=../schema.json
    blockExplorers:
      - apiUrl: https://explorer.oasis.io/testnet/sapphire
        family: other
        name: Oasis Explorer
        url: https://explorer.oasis.io/testnet/sapphire
    chainId: 23295
    displayName: Sapphire Testnet
    domainId: 23295
    isTestnet: true
    name: sapphiretestnet
    nativeToken:
      decimals: 18
      name: TEST
      symbol: TEST
    protocol: ethereum
    rpcUrls:
      - http: https://testnet.sapphire.oasis.io
    technicalStack: other
    ```
</details>
 <details>
  <summary> addresses.yaml </summary>
    ```yaml
    domainRoutingIsmFactory: "0x5eE9aE59Bc69E6B3813F0BE581f7f53069A98937"
    interchainAccountIsm: "0x3F233b5d8fa45C29bAff0bfC5902F97dE63828e5"
    interchainAccountRouter: "0x741A3F38262fFbaEBbE3Ee9D31362Da5C31D0412"
    mailbox: "0x8cd4D8103B5962dCA62E4c05C28F78D7Ae5147aF"
    proxyAdmin: "0xD1679E584b180eE4e2d6e2a1d226191A9fAeFE4E"
    staticAggregationHookFactory: "0xaECc8B121a39A8D16Edfb20143708f3a56483428"
    staticAggregationIsmFactory: "0x98e8B1D67613069DeE6D1065A1Bb44DCf94E076E"
    staticMerkleRootMultisigIsmFactory: "0x80efD5d1868A14d6f7BC3bE38aa0c14E2842AE8C"
    staticMerkleRootWeightedMultisigIsmFactory: "0x60EDA4eA956908E7f743bba62815Bb38FD386601"
    staticMessageIdMultisigIsmFactory: "0x1598602720369655a187e6AAdd3106BCD6c4bAf4"
    staticMessageIdWeightedMultisigIsmFactory: "0xEf4166c4E6b293cf80D381C783d7bD02D28adf4D"
    testRecipient: "0x826B542005fAC683ed6E289c57FbB6f2c85dD27A"
    validatorAnnounce: "0xc6fe8329797a87Cd1515E407cDa3912223Dc2053"
    ```
</details>

:::

:::tip Agents

For a more complex validator and relayer setup, check Hyperlane's **[Local Agents guide]**
or the more production ready **[Agent Operators guide]**.

:::

[Local Agents guide]: https://docs.hyperlane.xyz/docs/guides/deploy-hyperlane-local-agents
[Agent Operators guide]: https://docs.hyperlane.xyz/docs/operate/overview-agents
