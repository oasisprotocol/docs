---
description: >-
  We'll use this page to answer some of the most frequently asked questions we
  receive about the Oasis Network. This page will constantly be updated with new
  questions and responses.
---

# Oasis Network FAQ

## **Overview**

### **Why Oasis?**

The Oasis Network offers many unique features aimed directly at unlocking the full potential of Open Finance and Open Data. The network stands out thanks to the following:

* Cutting-edge technology
  * Not simply a new consensus layer but an entirely new architectural design
  * Scalability mechanism that is more robust, simpler to implement, and more secure than sharding
  * Confidentiality to store and analyze sensitive data
* Usability features optimized for Open Finance and Open Data apps
  * Low transaction fees and privacy-focused capabilities on the network solve some of DeFi’s biggest challenges
  * Growing ecosystem of Open Finance apps that create new markets, unlock new incentives. and enable yields not only for crypto but for data itself
  * Growing ecosystem of Open Data apps that enable increased data control and privacy protections for users
* Vibrant and dedicated community
  * Leading Validators from 6 continents stake on Oasis today
  * Largest Layer 1 University Program 
  * Growing global Ambassador Programs
* High quality team of contributors
  * International team of computer security researchers, academics, engineers, and product leaders from Apple, Google, Amazon, UC Berkeley, MIT, Harvard, Stanford, Carnegie Mellon, and more 

### **What are the key advantages of using the Oasis Network over other networks?** 

The Oasis Network offers key advantages over other blockchain networks across a wide array of performance metrics:

* Scalability 
  * Separating simple transactions from complex transactions; not to have complex transactions starve/delay simple transactions
  * High-throughput for simple transactions 
  * Parallel execution for complex transactions \(through ParaTimes\)
    * More scalable than sharding; less replication needed for the same level of security
* Efficient Verification
  * Efficient verification enabled via discrepancy detection 
  * Detects errors even for F+1 compute committee size
  * Smaller compute committee size can achieve the same level of security → less replication, lower overhead, and better scalability
    * \(“Same level of security” using concrete probabilistic security analysis\)
* Speed
  * Fast finality from BFT proof-of-stake consensus protocol; 1.5-6s blocktime and instant finality 
* Flexibility
  * Intrinsic support for a broad range of different workloads
  * Easy to add new runtime environments by creating ParaTimes
    * Anyone can develop a ParaTime
    * Anyone can register a ParaTime
    * Each ParaTime can specify its own requirements for compute nodes
    * Support both confidential runtimes and non-confidential runtimes
  * Private blockchains and public blockchains can seamlessly co-exist, with each application choosing what needs to be public vs. private
* Security
  * PoS consensus protocol
  * Simplified consensus layer; fault isolation
  * Can separately tune durability \(consensus committee size\) and integrity \(ParaTime committee size\)
* Modularity
  * Can easily update the consensus layer and ParaTimes independently
  * Clean separation of concerns with a well defined interface at the consensus layer enables a lot of flexibility in ParaTime design
* Privacy
  * Built-in support for confidential runtimes that leverage Trusted Execution Environments \(TEEs\)
  * Seamless integration of blockchain technology and secure computing
* Developer friendliness 
  * EVM compatible runtime\(s\)
  * Confidential runtimes
  * Developer tooling for building User Privacy as a Service \(UPaaS\) applications:
    * Immutable log of data rights
    * Enforcement of controlled data usage
    * Data use is fully auditable via blockchain
    * Complexities of blockchain are abstracted away to make features more accessible to app developers and users 
  * Programmable with WASM, so developers’ barrier to entry is lower than learning a network-specific language
  * WASM allows for frictionless adoption of evolving languages and language features \(e.g. Rust’s memory safety comes free\)
* Applications
  * New application domains are unlocked
    * Scalable DeFi to support more complex DeFi applications and transactions
    * Privacy-enchanced DeFi
    * Data tokenization, data staking, and data yields  

### **Is the Oasis Protocol Foundation still taking grant applications for projects that are building new dApps?**

Yes! We are still taking grant applications. You can apply any time [here](https://medium.com/oasis-protocol-project/oasis-foundation-grant-wishlist-3ad73b723d7%20). 

### **Who are your main competitors?**

We see the Oasis Network as being competitive with and having key advantages over leading Layer 1 blockchain protocols like Ethereum, Polkadot, and others. 

### **When is mainnet launch?**

We’ll have more to announce on this soon. We just started collecting final entity packages and wallet addresses from validators and will continue to do so for a few weeks. After that, it's on to building the genesis file for mainnet, reviewing it as a community, and then if all goes well...launching! 

## **Architecture**

### **What kind of blockchain is the Oasis Network? Does it use sidechains?**

The Oasis Network is a Layer 1 blockchain protocol using a BFT, proof-of-stake consensus system. The network’s innovative ParaTime architecture enables us to scale without using sidechains. For more information please refer to our [platform whitepaper](https://docsend.com/view/aq86q2pckrut2yvq).

### **What does the Oasis Network’s architecture look like?**

The Oasis Network’s architecture is composed of two key parts:

* Consensus Layer: 
  * BFT proof-of-stake consensus protocol \(Tendermint\)
* Runtime Layer - virtual machine \(VM\) / runtime support:
  * EVM/Solidity compatible
  * Smart contracts written in the Rust programming language and running in a secure enclave to enable confidential smart contracts
  * Support for building a specialized data tokenization runtime
  * The Oasis Network’s ParaTime is a term used to reference  VM instances running on top of the network. Each ParaTime is assigned a ParaTime ID and is run by a ParaTime committee. However, the same VM instance can be used to deploy the same type of ParaTime multiple times with different ParaTime committees, effectively creating several unique ParaTimes.

### **How is a ParaTime different from a Parachain?**

Unlike a Parachain, a ParaTime does not need to do consensus. ParaTimes just need to take care of compute and discrepancy detection is used to ensure correctness and integrity of execution, making ParaTimes more efficient than Parachains and other chain designs that rely on sharding. 

### **Who will be running all of these ParaTimes? Can anyone run a ParaTime?**

The network is agnostic in this regard. Anyone can run a ParaTime. It is completely left up to the devs and users to see which ones provide the functionality that they need.

### **Why do you need a new Layer 1 solution like the Oasis Network to do what Oasis is doing instead of building all of these features as an application on top of another Layer 1 solution?**

In theory you could build Oasis features on top of another Layer 1 solution. This hypothetical Layer 1 that we could use would need to provide the following to be competitive with the Oasis Network’s consensus layer in terms of performance and features:

* Instant finality \(to avoid the rollback of state during a later reorg which would require a lot of added complexity in the ParaTime layer\).
* Relatively low latency and high throughput so you can process the required ParaTime/KeyManager/Registry/Staking/RandomBeacon/... transactions in a timely fashion.
* Proper random beacon to ensure random committee elections.
* Light client support to allow ParaTime nodes to operate without the need to fully validate the consensus layer.

Theoretically speaking, any Layer 1 solution that supports some form of smart contracts could be used, but the implementation would be suboptimal. Building a Layer 1 platform specifically designed from the ground up to support our unique ParaTime execution model ensures the most efficient execution for achieving the desired performance metrics and capabilities.

For example, the Ethereum 1.0 would not be suitable since:

* It uses probabilistic finality where a chain reorg is always possible and as such this would require ParaTimes to handle such scenarios which would introduce a lot of additional complexity \(and thus potential security vulnerabilities\). ParaTimes would also inherit the longer time-to-finality.
  * High latency and low throughput would mean that consensus layer interactions would be very slow and expensive \(gas-wise\) for the ParaTime operators.
  * Implementing the required functionality in Solidity would be a pain and a huge maintenance burden due to its limitations and required workarounds for implementing the desired cryptography and serialization functions.
  * Implementation of a secure random beacon would be expensive due to the lack of native support for the required crypto operations.

### **What consensus mechanism are you running? Is it BFT?**

The Oasis Network uses Tendermint as its BFT consensus protocol. Given that the consensus layer uses a BFT protocol, the Oasis Network offers instant finality, meaning that once a block is finalized, it cannot be reverted \(at least not for full nodes\). A ParaTime commitment goes into a block and as such the ParaTime state is also finalized and cannot be reverted once a block is finalized.

### **Why doesn’t the Oasis Network do sharding? Does that mean it’s slow?** 

The Oasis Network does not use sharding. Instead, Oasis leverages a discrepancy detection model leading up to roothash updates, giving the network the same scalability benefits that sharding offers but with added benefits that come from a design that is much simpler to implement in practice. Sharding is a nice idea in theory but comes with a lot of complexity and costs that make it harder to implement in practice. From a security perspective, the complexity of sharding also makes it harder to audit and inherently more vulnerable to security breaches The Oasis Network’s discrepancy detection-based approach provides the same benefits as sharding through a cleaner, simpler, more efficient implementation. Ultimately, the Oasis Network’s unique scalability mechanism ensures that the network is not only fast \(like sharding networks purport to be\) but also versatile and secure enough to support a wide range of real-world workloads.

### **How does storage work on the Oasis Network? Do you use IPFS?**

Storage on the Oasis Network is determined by each ParaTime. There is a clear separation of concerns between the consensus layer and the runtime layer. The ParaTimes that make up the runtime layer have a lot of flexibility in how they choose to manage storage. For instance, the ParaTime being developed by Oasis Labs can support IPFS as its storage solution. Other ParaTime developers could opt to implement different storage mechanisms based on their own unique storage needs.

## **Open Finance & DeFi**

### **Does the Oasis Network have a vision for DeFi? Is it different from the mainstream view of DeFi?**

The first generation of DeFi dApps has provided the market with a huge number of protocols and primitives that are meant to serve as the foundation for the specific components of a new financial system. Despite the current focus on short-term returns, we at Oasis believe the goal of DeFi applications should be to give rise to a new financial system that removes subjectivity, bias, and inefficiencies by leveraging programmable parameters instead of status, wealth, and geography. Oasis aims to support the next wave of DeFi applications by offering better privacy and scalability features than other Layer 1 networks.

### **I’ve seen Oasis use both the terms “Open Finance” and “DeFi”? What’s the difference?**

The terms “Open Finance” and “DeFi” are interchangeable. However, we believe that “Open Finance” better represents the idea that the new financial system should be accessible to everyone who operates within the bounds of specific programmable parameters, regardless of their status, wealth, or geography**.**

### **Will Oasis provide oracle solutions for use in DeFi applications?**

We have built partnerships with several leading oracle providers. Provable is a flexible open source oracle service that leverages secure enclaves and software-based isolation, very much in line with the vision of the Oasis Network. We have also signed, but not announced, a partnership with a big big name in the world of oracles...stay tuned!

### **What aspects of DeFi require privacy? How can the Oasis Network’s focus on privacy help with DeFi applications?**

In the current generation of DeFi, some miners and traders are leveraging the inefficiencies of Ethereum to stack mining fees and interest rates, while preventing many more people from participating in the industry. Privacy can play a strong role in making the network function properly by reducing these inefficiencies. At the application level, privacy is an enabler. For instance, strong privacy guarantees can encourage established institutions to participate in the system because these institutions would be able to protect their interests and relationships. Additionally, privacy features can serve as the foundation for a reputation system, thereby unlocking the full potential of undercollateralized lending. We keep hearing that privacy is the next big thing in DeFi, and we look forward to empowering developers to build the next generation of DeFi applications. 

### **How does privacy help create a new system of Open Finance?**

Existing financial systems and data systems are not open at all. They are only accessible to a select few. Privacy has a much broader meaning than just keeping something private. Thanks to privacy-preserving computation, users can retain ownership of their information and grant others access to compute on their data without actually revealing \(or transferring\) their data. This will enable users to accrue data yields by essentially staking their data on the blockchain, unlocking a wide range of new financial opportunities. Open Finance refers to the idea that status, wealth, and geography won't block you from accessing a certain financial product. Adherence to a programmable set of parameters will determine whether someone can participate or not, making new financial opportunities open to more people around the world. For example, services such as lending protocols could offer different interest rates depending on the history of that user. What's game changing for the world of finance is that companies would not have to rely on a centralized score such as FICO - they would be able to build their own models.

### **What DeFi tools and services will be available on the Oasis Network?** 

We see DeFi applications as being composed of several different building blocks \(oracles, liquidity, exchanges, wallets, on/off ramps, etc.\). We have established partnerships with key players across all major DeFi product and tooling categories. At the same time, we are working with existing players in the space to bring their services to our network. Below are just a few examples of the DeFi partners building disruptive, high quality services on the Oasis Network:

* Keyless is a rising star in the field of passwordless authentication. Using a combination of zero-knowledge biometric authentication and key management, Keyless helps replace passwords with just who you are.
* Provable is a flexible open source oracle service that leverages secure enclaves and software-based isolation, very much in line with the Oasis Network vision. 
* Bankex is a digital asset platform that wants to bring digital money to underbanked users via social networks and messaging platforms.
* Totle is a liquidity-focused service that aggregates decentralized exchanges and synthetic asset providers to help source liquidity at the best price. Additionally, users get insurance for up to 600 ETH via Nexus Mutual.

We have also signed, but not announced, partnerships with two big names in the DeFi space - stay tuned!

### **Why would anyone choose to build a DeFi project on Oasis over Ethereum?**

There are two key factors to consider: 1\) technical features and 2\) the presence of liquidity.

From a technical perspective, in the short term, we are seeing how the slow speed of Ethereum is causing miners and yield farmers to create a “fee market.” These miners and yield farmers are able to execute just a few transactions, and the fact that the transaction is visible to everyone creates the perfect situation for a few people to skew the system towards their own financial motives. Ultimately, just a select few risk takers profit from this inefficiency \(stacking yields\) and prevent DeFi developers from building mainstream applications. The Oasis Network has a strong advantage here by offering substantial speed and scalability advantages over Ethereum.

Regarding the presence of liquidity, Ethererum currently has an advantage. However, it’s worth noting that the current DeFi space is still extremely small relative to both the blockchain industry as a whole and the FinTech industry as a whole, in terms of liquidity, so there is a lot of room for new players like the Oasis Network to come in and leverage state-of-the-art features to attract liquidity. Moreover, blockchains will become interoperable going forward, allowing for liquidity to flow freely between different blockchain networks. The Oasis Network itself will have interoperability features that will let it access liquidity available on other platforms. 

### **What is Oasis bringing to DeFi that doesn’t currently exist on other networks?**

The status quo is that there are two ways to deal with data: 1\) not revealing your data to anyone and hence not being able to consume a certain service, or 2\) revealing the data and losing ownership. The Oasis Network disrupts the status quo by introducing a third option: sharing your data but retaining ownership and control. Simply put, this is a breakthrough. This enables entirely new application use cases and new ways of collaborating that were simply not possible before. Iin addition, this enables data owners to “stake” their data and earn a yield in exchange for contributing their data to service or project. Tokenizing data and staking data to produce yields that get paid out to data owners opens up a whole new world of possibilities, bringing us closer to building a responsible data economy. You can learn more about this vision in [this blog post](https://medium.com/oasis-protocol-project/programming-data-and-money-the-data-market-yield-ad27a8b35c10). 

### **Will yield farming be possible on the Oasis Network?**

Absolutely. Being able to execute many transactions and keeping transactions private creates a much more efficient DeFi market because participants would follow rational economic principles instead of micro bubbles. We are already working with top projects to understand how to use privacy-preserving features to bring more people to the world of DeFi. We believe that privacy features can serve as key draw for both developers and users, driving sustained, long-term organic growth for DeFi applications on the Oasis Network. 

### **What are data yields?**

Every time you use an application, you generate some data that you leave with the application itself. You clearly derive some value out of the experience, but this is just a fraction of the value that data has. Given that the data is stored in places you don’t have access to or control over, there’s nothing you can do about it. Now imagine a different scenario: whenever you generate data, this data goes into a “capsule” that you control. The application through which you generate this information has “computation-only access”; every other application needs to request access to your capsule. What’s particularly interesting is that the data is not transferred anymore. Rather, your personal data is only available in a secure environment that allows a specific set of computations to be done on the data but never reveals the data itself. With this model, you can then “charge” or earn some reward for granting others the ability to compute on your data, which we call a “data yield.” You can learn more about data yields in [this blog post](https://medium.com/oasis-protocol-project/programming-data-and-money-the-data-market-yield-ad27a8b35c10). 

## **Token**

### **How will the Oasis Network’s token be used in the network when it launches?**

The Oasis Network’s token is used to run the consensus layer of the network. It can be used for staking, delegation, and transaction fees / gas. We are working on a number of partnerships that expand the utility of the token \(interoperability bridges, DeFi applications, incentive programs for users to store their data on the network, etc.\).

## **Privacy**

### **How does the Oasis Network achieve privacy and confidentiality? Is it through homomorphic encryption?**

There are many ways to achieve confidentiality. Using Trusted Execution Environments \(TEEs\) is one way. This is what we do. In effect, we provide end-to-end confidentiality for transactions where state and payload are encrypted at rest, in motion, and, more importantly, in compute. homomorphic encryption is another technique for confidentiality. At this time, anyone can build a ParaTime on the Oasis Network that uses homomorphic encryption to provide confidentiality. We are not prescriptive about what approach developers should take.

Something worth noting is that privacy and confidentiality are not equivalent. Privacy implies confidentiality but not the other way around. For privacy, there are techniques such as differential privacy that can be implemented.

## **Interoperability**

### **Can you run Ethereum smart contracts on the Oasis Network? Or if not directly run smart contracts, could you access a bridge between Ethereum ERC20 assets and Oasis?**

In short, yes! The Oasis Network supports EVM-compatible ParaTimes which will support a wide range of applications. For bridging, we are eager to implement an IBC after mainnet.   
  


