# Frequently Asked Questions

This page tries to answer some of the most frequently asked questions about the
Oasis Network.

:::info

This page will constantly be updated with new questions and responses.

:::

## **Overview**

### **Why Oasis?**

Designed for the next generation of blockchain, the Oasis Network is the first privacy-enabled blockchain platform for open finance and a responsible data economy. Combined with its high throughput and secure architecture, the Oasis Network is able to power private, scalable DeFi, revolutionizing Open Finance and expanding it beyond traders and early adopters to a mass market. Its unique privacy features can not only redefine DeFi, but also create a new type of digital asset called Tokenized Data that can enable users to take control of the data they generate and earn rewards for staking it with applications — creating the first ever responsible data economy.

**First Privacy-Enabled Blockchain:** The Oasis Network is the world’s first scalable, privacy-enabled blockchain. ParaTimes on the Oasis Network can leverage confidential computing technology such as secure enclaves to keep data confidential — unlocking new use cases and applications for blockchain.

**Scalable, Private DeFi:** The Oasis Network’s privacy-first design can expand DeFi beyond traders and early adopters — unlocking a new mainstream market. Plus its innovative scalability design brings fast speeds and high-throughput to DeFi transactions.

**First to Enable Data Tokenization:** The Oasis Network can **Tokenize Data**, unlocking game changing use cases for blockchain, and an entirely new ecosystem of apps and projects on the network — powering the next generation of privacy-first applications.

**Rapidly Growing Community:** The Oasis Network has a thriving community of close to a thousand node operators, developers, enterprise partners, ambassadors, and nearly ten thousand community members engaged in global social channels.

**Top-Tier Team:** The Oasis Team is made up of top talent from around the world with backgrounds from Apple, Google, Amazon, Goldman Sachs, UC Berkeley, Carnegie Mellon, Stanford, Harvard and more — all committed to growing and expanding the impact of the Oasis Network.

### **Is the Oasis Protocol Foundation still taking grant applications for projects that are building new dapps?**

Yes! We are still taking grant applications. You can apply any time [here](https://medium.com/oasis-protocol-project/oasis-foundation-grant-wishlist-3ad73b723d7).

## **Architecture**

### **What kind of blockchain is the Oasis Network? Does it use sidechains?**

The Oasis Network is a Layer 1 blockchain protocol using a BFT, proof-of-stake consensus system. The network’s innovative ParaTime architecture enables us to scale without using sidechains. For more information please refer to our [platform whitepaper](https://docsend.com/view/aq86q2pckrut2yvq).

### **What does the Oasis Network’s architecture look like?**

The Oasis Network is a Layer 1, proof-of-stake, decentralized network. It has two main components, the Consensus Layer and the ParaTime Layer.

1. The **Consensus Layer** is a scalable, high-throughput, secure, proof-of-stake consensus run by a decentralized set of validator nodes.
2. The **ParaTime Layer** hosts many parallel runtimes (ParaTimes), each representing a replicated compute environment with shared state.

![Paratime Communication](../images/architecture/consensus_paratime_communication.png)

### **How is a ParaTime different from a Parachain?**

Unlike a Parachain, a ParaTime does not need to do consensus itself, making them simpler to develop and more integrated into the network as a whole. ParaTimes take care of compute and discrepancy detection is used to ensure correctness and integrity of execution, making ParaTimes more efficient than Parachains and other chain designs that rely on sharding.

### **Who will be running all of these ParaTimes? Can anyone run a ParaTime?**

The network is agnostic in this regard. Anyone can run a ParaTime. It is completely left up to the devs and users to see which ones provide the functionality that they need. Examples of ParaTimes in development include the Oasis Labs Data Sovereignty ParaTime and the [Second State Virtual Machine](https://medium.com/oasis-protocol-project/ethereum-support-on-the-oasis-blockchain-3add9e13556?source=collection_home---4------0-----------------------), an EVM compatible Runtime.

### **What consensus mechanism are you running? Is it BFT?**

The Oasis Network uses Tendermint as its BFT consensus protocol. Given that the consensus layer uses a BFT protocol, the Oasis Network offers instant finality, meaning that once a block is finalized, it cannot be reverted (at least not for full nodes). A ParaTime commitment goes into a block and as such the ParaTime state is also finalized and cannot be reverted once a block is finalized.

### **Why doesn’t the Oasis Network do sharding? Does that mean it’s slow?**

The Oasis Network does not use sharding. Instead, Oasis leverages a discrepancy detection model leading up to roothash updates, giving the network the same scalability benefits that sharding offers but with added benefits that come from a design that is much simpler to implement in practice. Sharding is a nice idea in theory but comes with a lot of complexity and costs that make it harder to implement in practice. From a security perspective, the complexity of sharding also makes it harder to audit and inherently more vulnerable to security breaches The Oasis Network’s discrepancy detection-based approach provides the same benefits as sharding through a cleaner, simpler, more efficient implementation. Ultimately, the Oasis Network’s unique scalability mechanism ensures that the network is not only fast (like sharding networks purport to be) but also versatile and secure enough to support a wide range of real-world workloads.

### **How does storage work on the Oasis Network? Do you use IPFS?**

Storage on the Oasis Network is determined by each ParaTime. There is a clear separation of concerns between the consensus layer and the runtime layer. The ParaTimes that make up the runtime layer have a lot of flexibility in how they choose to manage storage. For instance, the ParaTime being developed by Oasis Labs can support IPFS as its storage solution. Other ParaTime developers could opt to implement different storage mechanisms based on their own unique storage needs.

## **Open Finance & DeFi**

### **Does the Oasis Network have a vision for DeFi? Is it different from the mainstream view of DeFi?**

The first generation of DeFi dapps has provided the market with a huge number of protocols and primitives that are meant to serve as the foundation for the specific components of a new financial system. Despite the current focus on short-term returns, we at Oasis believe the goal of DeFi applications should be to give rise to a new financial system that removes subjectivity, bias, and inefficiencies by leveraging programmable parameters instead of status, wealth, and geography. Oasis aims to support the next wave of DeFi applications by offering better privacy and scalability features than other Layer 1 networks.

### **I’ve seen Oasis use both the terms “Open Finance” and “DeFi”? What’s the difference?**

The terms “Open Finance” and “DeFi” are interchangeable. However, we believe that “Open Finance” better represents the idea that the new financial system should be accessible to everyone who operates within the bounds of specific programmable parameters, regardless of their status, wealth, or geography**.**

### **Will Oasis provide oracle solutions for use in DeFi applications?**

Oasis recently announced a partnership with [Chainlink](https://medium.com/oasis-protocol-project/oasis-network-chainlink-integrating-secure-and-reliable-oracles-for-access-to-off-chain-data-5d31e6e4591c?source=collection_home---4------1-----------------------) as the preferred oracle provider of the Oasis Network. This integration is ongoing.

### **What aspects of DeFi require privacy? How can the Oasis Network’s focus on privacy help with DeFi applications?**

In the current generation of DeFi, some miners and traders are leveraging the inefficiencies of Ethereum to stack mining fees and interest rates, while preventing many more people from participating in the industry. Privacy can play a strong role in making the network function properly by reducing these inefficiencies. At the application level, privacy is an enabler. For instance, strong privacy guarantees can encourage established institutions to participate in the system because these institutions would be able to protect their interests and relationships. Additionally, privacy features can serve as the foundation for a reputation system, thereby unlocking the full potential of undercollateralized lending. We keep hearing that privacy is the next big thing in DeFi, and we look forward to empowering developers to build the next generation of DeFi applications.

### **How does privacy help create a new system of Open Finance?**

Existing financial systems and data systems are not open at all. They are only accessible to a select few. Privacy has a much broader meaning than just keeping something private. Thanks to privacy-preserving computation, users can retain ownership of their information and grant others access to compute on their data without actually revealing (or transferring) their data. This will enable users to accrue data yields by essentially staking their data on the blockchain, unlocking a wide range of new financial opportunities.

Open Finance refers to the idea that status, wealth, and geography won't block you from accessing a certain financial product. Adherence to a programmable set of parameters will determine whether someone can participate or not, making new financial opportunities open to more people around the world. For example, services such as lending protocols could offer different interest rates depending on the history of that user. What's game changing for the world of finance is that companies would not have to rely on a centralized score such as FICO - they would be able to build their own models.

### **Why would anyone choose to build a DeFi project on Oasis over Ethereum?**

The network’s cutting-edge scalable features can help unblock DeFi as it works today, fixing the high-transaction fees and slow throughput currently plaguing other Layer 1 networks. Combined, Oasis’ unique ability to provide scalable, private DeFi is expected to make it the leading platform for unlocking the next generation of DeFi markets and use cases.

## **Token**

### **How will the Oasis Network’s token be used in the network when it launches?**

The ROSE token will be used for transaction fees, staking, and delegation at the Consensus Layer.

## **Privacy**

### **How does the Oasis Network achieve privacy and confidentiality? Is it through homomorphic encryption?**

There are many ways to achieve confidentiality. Using Trusted Execution Environments (TEEs) is one way. This is what we do. In effect, we provide end-to-end confidentiality for transactions where state and payload are encrypted at rest, in motion, and, more importantly, in compute. homomorphic encryption is another technique for confidentiality. At this time, anyone can build a ParaTime on the Oasis Network that uses homomorphic encryption to provide confidentiality. We are not prescriptive about what approach developers should take.

Something worth noting is that privacy and confidentiality are not equivalent. Privacy implies confidentiality but not the other way around. For privacy, there are techniques such as differential privacy that can be implemented.

## **Interoperability**

### **Can you run Ethereum smart contracts on the Oasis Network? Or if not directly run smart contracts, could you access a bridge between Ethereum ERC20 assets and Oasis?**

In short, yes! The Oasis Network supports EVM-compatible ParaTimes which will support a wide range of applications.
