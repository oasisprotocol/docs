"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[5036],{37055:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"build/sapphire/develop/deployment","title":"Deployment Patterns","description":"Deploying upgradable and deterministic contracts with proxies","source":"@site/docs/build/sapphire/develop/deployment.md","sourceDirName":"build/sapphire/develop","slug":"/build/sapphire/develop/deployment","permalink":"/build/sapphire/develop/deployment","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/sapphire-paratime/edit/main/docs/develop/deployment.md","tags":[],"version":"current","lastUpdatedAt":1743686283000,"frontMatter":{"description":"Deploying upgradable and deterministic contracts with proxies"},"sidebar":"developers","previous":{"title":"Gasless Transactions","permalink":"/build/sapphire/develop/gasless"},"next":{"title":"Security","permalink":"/build/sapphire/develop/security"}}');var i=n(74848),s=n(28453);const r={description:"Deploying upgradable and deterministic contracts with proxies"},o="Deployment Patterns",c={},l=[{value:"Implementing Proxy contracts on Oasis Sapphire",id:"implementing-proxy-contracts-on-oasis-sapphire",level:2},{value:"What are Upgradable Contracts?",id:"what-are-upgradable-contracts",level:3},{value:"EIP-1822: Universal Upgradeable Proxy Standard (UUPS)",id:"eip-1822-universal-upgradeable-proxy-standard-uups",level:4},{value:"EIP-1967: Standard Proxy Storage Slots",id:"eip-1967-standard-proxy-storage-slots",level:4},{value:"The Impact of Confidential EVM on Tooling Compatibility",id:"the-impact-of-confidential-evm-on-tooling-compatibility",level:3},{value:"Solutions for Using UUPS Proxies on Oasis Sapphire",id:"solutions-for-using-uups-proxies-on-oasis-sapphire",level:3},{value:"1. Directly Implement EIP-1822",id:"1-directly-implement-eip-1822",level:4},{value:"2. Modify Deployment Scripts",id:"2-modify-deployment-scripts",level:4},{value:"Solution for Using Deterministic Proxies on Oasis Sapphire",id:"solution-for-using-deterministic-proxies-on-oasis-sapphire",level:3},{value:"Clones",id:"clones",level:2},{value:"EIP-1167: Minimal Proxy",id:"eip-1167-minimal-proxy",level:4},{value:"Caution Against Using <code>eth_getStorageAt</code>",id:"caution-against-using-eth_getstorageat",level:2},{value:"EIP-7201: Namespaced Storage for Delegatecall Contracts",id:"eip-7201-namespaced-storage-for-delegatecall-contracts",level:3},{value:"Benefits of Namespacing over Direct Storage Access",id:"benefits-of-namespacing-over-direct-storage-access",level:3}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"deployment-patterns",children:"Deployment Patterns"})}),"\n",(0,i.jsx)(t.h2,{id:"implementing-proxy-contracts-on-oasis-sapphire",children:"Implementing Proxy contracts on Oasis Sapphire"}),"\n",(0,i.jsx)(t.p,{children:"As a confidential Ethereum Virtual Machine (EVM), Oasis prevents external\naccess to contract storage or runtime states in order to keep your secrets\nprivate. This unique feature affects how developers interact with and manage\nsmart contracts, particularly when using common Ethereum development tools."}),"\n",(0,i.jsx)(t.h3,{id:"what-are-upgradable-contracts",children:"What are Upgradable Contracts?"}),"\n",(0,i.jsx)(t.p,{children:"Upgradable contracts are smart contracts designed to allow developers to update\nfunctionality even after being deployed to a blockchain. This is particularly\nuseful for fixing bugs or adding new features without losing the existing state\nor having to deploy a new contract. Upgradability is achieved through proxy\npatterns, where a proxy contract directs calls to an underlying logic contract\nwhich developers can swap out without affecting the state stored in the proxy."}),"\n",(0,i.jsxs)(t.h4,{id:"eip-1822-universal-upgradeable-proxy-standard-uups",children:[(0,i.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-1822",children:"EIP-1822"}),": Universal Upgradeable Proxy Standard (UUPS)"]}),"\n",(0,i.jsx)(t.p,{children:"EIP-1822 introduces a method for creating upgradable contracts using a proxy\npattern and specifies a mechanism where the proxy contract itself contains the\nupgrade logic. This design reduces the complexity and potential for errors\ncompared to other proxy patterns because it consolidates upgrade functionality\nwithin the proxy and eliminates the need for additional external management."}),"\n",(0,i.jsxs)(t.h4,{id:"eip-1967-standard-proxy-storage-slots",children:[(0,i.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-1967",children:"EIP-1967"}),": Standard Proxy Storage Slots"]}),"\n",(0,i.jsx)(t.p,{children:"EIP-1967 defines standard storage slots to be used by all proxy contracts for\nconsistent and predictable storage access. This standard helps prevent storage\ncollisions and enhances security by outlining specific locations in a proxy\ncontract for storing the address of the logic contract and other administrative\ninformation. Using these predetermined slots makes managing and auditing proxy\ncontracts easier."}),"\n",(0,i.jsx)(t.h3,{id:"the-impact-of-confidential-evm-on-tooling-compatibility",children:"The Impact of Confidential EVM on Tooling Compatibility"}),"\n",(0,i.jsxs)(t.p,{children:["While the underlying proxy implementations in EIP-1822 work perfectly in\nfacilitating smart contract upgrades, the tools typically used to manage these\nproxies may not function as expected on Oasis Sapphire.\nFor example, the ",(0,i.jsx)(t.a,{href:"https://github.com/OpenZeppelin/openzeppelin-upgrades",children:"openzeppelin-upgrades"})," library, which relies on the EIP-1967\nstandard, uses ",(0,i.jsx)(t.a,{href:"https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat",children:"eth_getStorageAt"})," to access contract storage. This function\ndoes not work in a confidential environment which forbids direct storage\naccess."]}),"\n",(0,i.jsxs)(t.p,{children:["Additionally, Sapphire natively protects against replay and currently does not\nallow an empty chain ID \xe0 la pre ",(0,i.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-155",children:"EIP-155"})," transactions."]}),"\n",(0,i.jsx)(t.h3,{id:"solutions-for-using-uups-proxies-on-oasis-sapphire",children:"Solutions for Using UUPS Proxies on Oasis Sapphire"}),"\n",(0,i.jsx)(t.p,{children:"Developers looking to use UUPS proxies on Oasis Sapphire have two primary\noptions:"}),"\n",(0,i.jsx)(t.h4,{id:"1-directly-implement-eip-1822",children:"1. Directly Implement EIP-1822"}),"\n",(0,i.jsxs)(t.p,{children:["Avoid using ",(0,i.jsx)(t.a,{href:"https://github.com/OpenZeppelin/openzeppelin-upgrades",children:"openzeppelin-upgrades"})," and manually handle the proxy setup and\nupgrades with your own scripts, such as by calling the ",(0,i.jsx)(t.code,{children:"updateCodeAddress"}),"\nmethod directly."]}),"\n",(0,i.jsx)(t.h4,{id:"2-modify-deployment-scripts",children:"2. Modify Deployment Scripts"}),"\n",(0,i.jsxs)(t.p,{children:["Change deployment scripts to avoid ",(0,i.jsx)(t.code,{children:"eth_getStorageAt"}),". Alternative methods\nlike calling ",(0,i.jsx)(t.code,{children:"owner()"})," which do not require direct storage access.\n",(0,i.jsx)(t.a,{href:"https://github.com/wighawag/hardhat-deploy",children:"hardhat-deploy"})," as of ",(0,i.jsx)(t.code,{children:"0.12.4"})," supports this approach with a default proxy\nthat includes an ",(0,i.jsx)(t.code,{children:"owner()"})," function when deploying with a configuration that\nspecifies ",(0,i.jsx)(t.code,{children:"proxy: true"}),"."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:"module.exports = async ({getNamedAccounts, deployments, getChainId}) => {\n  const {deploy} = deployments;\n  const {deployer} = await getNamedAccounts();\n  await deploy('Greeter', {\n    from: deployer,\n    proxy: true,\n  });\n};\n"})}),"\n",(0,i.jsx)(t.h3,{id:"solution-for-using-deterministic-proxies-on-oasis-sapphire",children:"Solution for Using Deterministic Proxies on Oasis Sapphire"}),"\n",(0,i.jsx)(t.p,{children:"We suggest that developers interested in deterministic proxies on Oasis\nSapphire use a contract that supports replay protection."}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"hardhat-deploy"})," supports using the ",(0,i.jsx)(t.a,{href:"https://github.com/safe-global/safe-singleton-factory",children:"Safe Singleton factory"})," deployed on\nthe Sapphire ",(0,i.jsx)(t.a,{href:"https://explorer.oasis.io/mainnet/sapphire/address/0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7",children:"Mainnet"})," and ",(0,i.jsx)(t.a,{href:"https://explorer.oasis.io/testnet/sapphire/address/0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7",children:"Testnet"})," when ",(0,i.jsx)(t.code,{children:"deterministicDeployment"})," is ",(0,i.jsx)(t.code,{children:"true"}),"."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:"module.exports = async ({getNamedAccounts, deployments, getChainId}) => {\n  const {deploy} = deployments;\n  const {deployer} = await getNamedAccounts();\n  await deploy('Greeter', {\n    from: deployer,\n    deterministicDeployment: true,\n  });\n};\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Next, in your ",(0,i.jsx)(t.code,{children:"hardhat.config.ts"})," file, specify the address of the Safe\nSingleton factory:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:"  deterministicDeployment: {\n    \"97\": {\n      factory: '0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7',\n      deployer: '0xE1CB04A0fA36DdD16a06ea828007E35e1a3cBC37',\n      funding: '2000000',\n      signedTx: '',\n    },\n    \"23295\": {\n      factory: '0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7',\n      deployer: '0xE1CB04A0fA36DdD16a06ea828007E35e1a3cBC37',\n      funding: '2000000',\n      signedTx: '',\n    }\n  },\n"})}),"\n",(0,i.jsx)(t.h2,{id:"clones",children:"Clones"}),"\n",(0,i.jsxs)(t.p,{children:["Sapphire supports fixed address non-upgradable ",(0,i.jsx)(t.a,{href:"https://docs.openzeppelin.com/contracts/5.x/api/proxy#Clones",children:"clones"})," to help\ndevelopers replicate contract functionality and reduce contract deployment\ncosts."]}),"\n",(0,i.jsxs)(t.h4,{id:"eip-1167-minimal-proxy",children:[(0,i.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-1167",children:"EIP-1167"}),": Minimal Proxy"]}),"\n",(0,i.jsx)(t.p,{children:'EIP-1167 introduces a way to minimize bytecode and associated contract\ndeployment costs while copying contract functionality. "Clone" contracts\ndelegate calls to a target or fixed address which serve as a reference for the\nbehavior of the "clone." Third-party tools and users can correctly predict\nthe outcome of contract calls with minimal side effects.'}),"\n",(0,i.jsxs)(t.h2,{id:"caution-against-using-eth_getstorageat",children:["Caution Against Using ",(0,i.jsx)(t.code,{children:"eth_getStorageAt"})]}),"\n",(0,i.jsxs)(t.p,{children:["Direct storage access, such as with ",(0,i.jsx)(t.code,{children:"eth_getStorageAt"}),", is generally\ndiscouraged. It reduces contract flexibility and deviates from common practice\nwhich advocates for a standardized Solidity compatible API to both facilitate\ninteractions between contracts and allow popular libraries such as ",(0,i.jsx)(t.a,{href:"https://abitype.dev/",children:"ABIType"}),"\nand ",(0,i.jsx)(t.a,{href:"https://www.npmjs.com/package/typechain",children:"TypeChain"})," to automatically generate client bindings. Direct storage\naccess makes contracts less adaptable and complicates on-chain automation; it\ncan even complicate the use of multisig wallets.\nFor contracts aiming to maintain a standard interface and ensure future\nupgradeability, we advise sticking to ERC-defined Solidity compatible APIs and\navoiding directly interacting with contract storage."]}),"\n",(0,i.jsxs)(t.h3,{id:"eip-7201-namespaced-storage-for-delegatecall-contracts",children:[(0,i.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-7201",children:"EIP-7201"}),": Namespaced Storage for Delegatecall Contracts"]}),"\n",(0,i.jsxs)(t.p,{children:["ERC-7201 proposes a structured approach to storage in smart contracts that\nutilize ",(0,i.jsx)(t.code,{children:"delegatecall"})," which is often employed in proxy contracts for\nupgradability. This standard recommends namespacing storage to mitigate the\nrisk of storage collisions \u2014 a common issue when multiple contracts share the\nsame storage space in a ",(0,i.jsx)(t.code,{children:"delegatecall"})," context."]}),"\n",(0,i.jsx)(t.h3,{id:"benefits-of-namespacing-over-direct-storage-access",children:"Benefits of Namespacing over Direct Storage Access"}),"\n",(0,i.jsxs)(t.p,{children:["Contracts using ",(0,i.jsx)(t.code,{children:"delegatecall"}),", such as upgradable proxies, can benefit from\nnamespacing their storage through more efficient data organization which\nenhances security. This approach isolates different variables and sections of\na contract\u2019s storage under distinct namespaces, ensuring that each segment is\ndistinct and does not interfere with others. Namespacing is generally more\nrobust and preferable to using ",(0,i.jsx)(t.code,{children:"eth_getStorageAt"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["See example ERC-7201 implementation and usage:\n",(0,i.jsx)(t.a,{href:"https://gist.github.com/CedarMist/4cfb8f967714aa6862dd062742acbc7b",children:"https://gist.github.com/CedarMist/4cfb8f967714aa6862dd062742acbc7b"})]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-solidity",children:'// SPDX-License-Identifier: Apache-2.0\n\npragma solidity ^0.8.0;\n\ncontract Example7201 {\n    /// @custom:storage-location erc7201:Example7201.state\n    struct State {\n        uint256 counter;\n    }\n\n    function _stateStorageSlot()\n        private pure\n        returns (bytes32)\n    {\n        return keccak256(abi.encode(uint256(keccak256("Example7201.state")) - 1)) & ~bytes32(uint256(0xff));\n    }\n\n    function _getState()\n        private pure\n        returns (State storage state)\n    {\n        bytes32 slot = _stateStorageSlot();\n        assembly {\n            state.slot := slot\n        }\n    }\n\n    function increment()\n        public\n    {\n        State storage state = _getState();\n\n        state.counter += 1;\n    }\n\n    function get()\n        public view\n        returns (uint256)\n    {\n        State storage state = _getState();\n\n        return state.counter;\n    }\n}\n\ncontract ExampleCaller {\n    Example7201 private example;\n\n    constructor () {\n        example = new Example7201();\n    }\n    function get()\n        external\n        returns (uint256 counter)\n    {\n        (bool success, bytes memory result ) = address(example).delegatecall(abi.encodeCall(example.get, ()));\n        require(success);\n        counter = abi.decode(result, (uint256));\n    }\n\n    function increment()\n        external\n    {\n        (bool success, ) = address(example).delegatecall(abi.encodeCall(example.increment, ()));\n        require(success);\n    }\n}\n'})})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>o});var a=n(96540);const i={},s=a.createContext(i);function r(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);