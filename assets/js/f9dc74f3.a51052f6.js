"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[5651],{18520:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>a,toc:()=>h});const a=JSON.parse('{"id":"build/rofl/app","title":"Application","description":"This chapter will show you how to quickly create, build and test a minimal","source":"@site/docs/build/rofl/app.mdx","sourceDirName":"build/rofl","slug":"/build/rofl/app","permalink":"/build/rofl/app","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/oasis-sdk/edit/main/docs/rofl/app.mdx","tags":[],"version":"current","lastUpdatedAt":1744030005000,"frontMatter":{},"sidebar":"developers","previous":{"title":"Prerequisites","permalink":"/build/rofl/prerequisites"},"next":{"title":"Deployment","permalink":"/build/rofl/deployment"}}');var r=t(74848),i=t(28453),s=t(65537),o=t(79329);const l={},c="Application",d={},h=[{value:"How do ROFL Apps Work?",id:"how-do-rofl-apps-work",level:2},{value:"App Directory and Manifest",id:"app-directory-and-manifest",level:2},{value:"Create",id:"create",level:2},{value:"Oracle Contract",id:"oracle-contract",level:2},{value:"Define Containerized Services",id:"define-containerized-services",level:2},{value:"Build",id:"build",level:2},{value:"Update On-chain App Config",id:"update-on-chain-app-config",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"application",children:"Application"})}),"\n",(0,r.jsxs)(n.p,{children:["This chapter will show you how to quickly create, build and test a minimal\ncontainerized ROFL app that communicated with a confidential smart contract on\n",(0,r.jsx)(n.a,{href:"/build/sapphire/",children:"Oasis Sapphire"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"ROFL apps come in different flavors and the right choice is a tradeoff between\nTCB size and ease of use. The easiest to use are TDX container-based apps which\nare presented in this guide and more advanced flavors with smaller TCBs are\ndescribed separately."}),"\n",(0,r.jsx)(n.h2,{id:"how-do-rofl-apps-work",children:"How do ROFL Apps Work?"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"ROFL diagram",src:t(86628).A+""})}),"\n",(0,r.jsxs)(n.p,{children:["Each ROFL app runs in its own Trusted Execution Environment (TEE) which is\nprovisioned by an Oasis Node from its ",(0,r.jsx)(n.em,{children:"bundle"})," (a zip archive containing the\nprogram binaries and metadata required for execution). ROFL apps register to\nthe Oasis Network in order to be able to easily authenticate to on-chain smart\ncontracts and transparently gain access to the decentralized per-app key\nmanagement system."]}),"\n",(0,r.jsxs)(n.p,{children:["Inside the TEE, the ROFL app performs important functions that ensure its\nsecurity and enable secure communication with the outside world. This includes\nusing a light client to establish a fresh view of the Oasis consensus layer\nwhich provides a source of rough time and integrity for verification of all\non-chain state. The ROFL app also generates a set of ephemeral cryptographic\nkeys which are used in the process of remote attestation and on-chain\nregistration. These processes ensure that the ROFL app can authenticate to\non-chain modules (e.g. smart contracts running in the ",(0,r.jsx)(n.a,{href:"/build/sapphire/",children:"Sapphire runtime"}),") by\nsigning and submitting special transactions."]}),"\n",(0,r.jsx)(n.p,{children:"The ROFL app can then perform arbitrary work and interact with the outside world\nthrough (properly authenticated) network connections. Connections can be\nauthenticated via HTTPS/TLS or use other methods (e.g. light clients for other\nchains)."}),"\n",(0,r.jsx)(n.h2,{id:"app-directory-and-manifest",children:"App Directory and Manifest"}),"\n",(0,r.jsx)(n.p,{children:"First we create the basic directory structure for the ROFL app using the Oasis\nCLI:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl init myapp\n"})}),"\n",(0,r.jsxs)(n.p,{children:["This will create the ",(0,r.jsx)(n.code,{children:"myapp"})," directory and initialize some boilerplate needed to\nbuild a TDX container-based ROFL app. The rest of the guide assumes that you are\nexecuting commands from within this directory."]}),"\n",(0,r.jsx)(n.p,{children:"The command will output a summary of what is being created:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Creating a new ROFL app with default policy...\nName:     myapp\nVersion:  0.1.0\nTEE:      tdx\nKind:     container\nCreated manifest in 'rofl.yaml'.\nRun `oasis rofl create` to register your ROFL app and configure an app ID.\n"})}),"\n",(0,r.jsx)(n.p,{children:"The directory structure will look as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"myapp\n\u251c\u2500\u2500 compose.yaml        # Container compose file.\n\u2514\u2500\u2500 rofl.yaml           # ROFL app manifest.\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The manifest contains things like ROFL app metadata, ",(0,r.jsx)(n.a,{href:"/build/rofl/features#secrets",children:"secrets"}),",\n",(0,r.jsx)(n.a,{href:"/build/rofl/resources",children:"requested resources"})," and can be modified either manually or by using the CLI\ncommands."]}),"\n",(0,r.jsx)(n.h2,{id:"create",children:"Create"}),"\n",(0,r.jsx)(n.p,{children:"Before the ROFL app can be built it needs to be created on chain to assign it a\nunique identifier (the app ID) which can be used by on-chain smart contracts to\nensure that they are talking to the right app and also gives the app access to a\ndecentralized key management system."}),"\n",(0,r.jsx)(n.p,{children:"Anyone with enough funds can create an app. Currently, this threshold is 100\nTEST on Sapphire Testnet and Localnet (funded automatically). ROFL registration\non Sapphire Mainnet is yet to be enabled."}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["In order to obtain TEST tokens needed for creating and running your ROFL apps\nuse ",(0,r.jsx)(n.a,{href:"https://faucet.testnet.oasis.io/?paratime=sapphire",children:"the faucet"})," or ",(0,r.jsx)(n.a,{href:"/get-involved/#social-media-channels",children:"ask on Discord"}),". To make things easier you should\n",(0,r.jsxs)(n.a,{href:"/general/manage-tokens/cli/wallet",children:["create or import a ",(0,r.jsx)(n.code,{children:"secp256k1-bip44"})," account"]})," that you can also use with the\nEthereum-compatible tooling like Hardhat."]})}),"\n",(0,r.jsxs)(n.p,{children:["We also need to select the network (in this case ",(0,r.jsx)(n.code,{children:"testnet"}),") and the account\nthat will be the initial administrator of the ROFL app (in this case\n",(0,r.jsx)(n.code,{children:"myaccount"}),"). The CLI will automatically update the app manifest (",(0,r.jsx)(n.code,{children:"rofl.yaml"}),")\nwith the assigned app identifier."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl create --network testnet --account myaccount\n"})}),"\n",(0,r.jsx)(n.p,{children:"After successful creation, the CLI will also output the new identifier:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Created ROFL application: rofl1qqn9xndja7e2pnxhttktmecvwzz0yqwxsquqyxdf\n"})}),"\n",(0,r.jsx)(n.p,{children:"The app deployer account automatically becomes the initial admin of the app so\nit can update the app's configuration. The admin address can always be changed\nby the current admin."}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsx)(n.p,{children:"While the CLI implements a simple governance mechanism where the admin of the\nROFL app is a single account, even a smart contract can be the admin. This\nallows for implementation of advanced agent governance mechanisms, like using\nmulti-sigs or DAOs with veto powers to control the upgrade process."})}),"\n",(0,r.jsxs)(n.admonition,{title:"App ID calculation",type:"tip",children:[(0,r.jsx)(n.p,{children:"App ID is derived using one of the two schemes:"}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Creator address + creator account nonce (default)"}),": This approach is\nsuitable for running tests (e.g. in ",(0,r.jsx)(n.a,{href:"/build/tools/localnet",children:(0,r.jsx)(n.code,{children:"sapphire-localnet"})}),") where you want\ndeterministic app ID."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:["Creator address + block round number + index of the ",(0,r.jsx)(n.code,{children:"rofl.Create"}),"\ntransaction in the block"]}),": This approach is non-deterministic and preferred\nin production environments so that the potential attacker cannot simply\ndetermine ROFL app ID in advance, even if they knew what the creator address\nis."]}),"\n"]}),(0,r.jsxs)(n.p,{children:["You can select the app ID derivation scheme by passing the\n",(0,r.jsxs)(n.a,{href:"/general/manage-tokens/cli/rofl#create",children:[(0,r.jsx)(n.code,{children:"--scheme"})," parameter"]}),"."]})]}),"\n",(0,r.jsx)(n.h2,{id:"oracle-contract",children:"Oracle Contract"}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["While we are using ",(0,r.jsx)(n.a,{href:"/build/sapphire/",children:"EVM-based smart contracts"})," in this example, the on-chain\npart can be anything from a ",(0,r.jsx)(n.a,{href:"/build/tools/other-paratimes/cipher/",children:"WASM-based smart contract"})," to a dedicated\n",(0,r.jsx)(n.a,{href:"/build/tools/build-paratime/modules",children:"runtime module"}),"."]})}),"\n",(0,r.jsxs)(n.p,{children:["We have prepared a simple oracle contract for this example. You can find it by\nchecking out the ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/oasis-sdk/tree/main/examples/runtime-sdk/rofl-oracle/oracle",children:"prepared example project"})," from the Oasis SDK repository. It\ncontains a simple ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/oasis-sdk/blob/main/examples/runtime-sdk/rofl-oracle/oracle/contracts/Oracle.sol",children:"Oracle.sol"})," contract which collects observations from\nauthenticated ROFL app instances, performs trivial aggregation and stores the\nfinal aggregated result. Read the ",(0,r.jsx)(n.a,{href:"/build/sapphire/quickstart",children:"Sapphire quickstart"})," chapter to learn how to\nbuild and deploy Sapphire smart contracts, but to get you up and running for\nthis part, simply copy the example project from above, install dependencies and\ncompile the smart contract by executing:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"npm install\nnpx hardhat compile\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Configure the ",(0,r.jsx)(n.code,{children:"PRIVATE_KEY"})," of the deployment account and the ROFL app\nidentifier (be sure to use the identifier that you received during\nregistration), then deploy the contract by running, for example:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" \\\nnpx hardhat deploy rofl1qqn9xndja7e2pnxhttktmecvwzz0yqwxsquqyxdf --network sapphire-testnet\n'})}),"\n",(0,r.jsx)(n.p,{children:"After successful deployment you will see a message like:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Oracle for ROFL app rofl1qqn9xndja7e2pnxhttktmecvwzz0yqwxsquqyxdf deployed to 0x1234845aaB7b6CD88c7fAd9E9E1cf07638805b20\n"})}),"\n",(0,r.jsx)(n.p,{children:"You can now proceed to building and deploying the ROFL app itself. Remember the\naddress where the oracle contract was deployed to as you will need it in the\nnext step."}),"\n",(0,r.jsx)(n.h2,{id:"define-containerized-services",children:"Define Containerized Services"}),"\n",(0,r.jsxs)(n.p,{children:["What the core of the ROFL app does is defined with services running in Podman\ncontainers defined in ",(0,r.jsx)(n.a,{href:"https://docs.docker.com/reference/compose-file/",children:"the compose file"}),". Anything that can run as a bunch of\ncontainers can also be run as a ROFL app."]}),"\n",(0,r.jsxs)(n.p,{children:["For an easier start, we will use the ",(0,r.jsx)(n.code,{children:"oasisprotocol/demo-rofl"})," container which\nis defined in ",(0,r.jsxs)(n.a,{href:"https://github.com/oasisprotocol/demo-rofl/tree/main/docker",children:["the ",(0,r.jsx)(n.code,{children:"demo-rofl"})," repository"]})," and implements ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/demo-rofl/blob/main/docker/app.sh",children:"a trivial oracle"})," in\na shell script."]}),"\n",(0,r.jsxs)(n.p,{children:["The compose file (",(0,r.jsx)(n.code,{children:"compose.yaml"}),") looks as follows:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="compose.yaml"',children:"services:\n  oracle:\n    # See the 'docker' subdirectory in demo-rofl for the content of this image.\n    # Note that we are using the sha256 hash of the image to ensure integrity.\n    image: docker.io/oasisprotocol/demo-rofl:latest@sha256:42c32ccfe0a0c84ac5969a1399e4658bed8e8d1517cc6b26cdce67439c66c910\n    environment:\n      # Address of the oracle contract deployed on Sapphire Testnet.\n      - CONTRACT_ADDRESS=1234845aaB7b6CD88c7fAd9E9E1cf07638805b20\n      # Ticker.\n      - TICKER=ROSEUSDT\n    volumes:\n      - /run/rofl-appd.sock:/run/rofl-appd.sock\n"})}),"\n",(0,r.jsx)(n.admonition,{title:"Always specify FQDN image URL",type:"warning",children:(0,r.jsxs)(n.p,{children:["When specifying the container image URL, make sure to use fully qualified domain\nname e.g. ",(0,r.jsx)(n.code,{children:"docker.io/ollama/ollama"})," and not just ",(0,r.jsx)(n.code,{children:"ollama/ollama"}),"."]})}),"\n",(0,r.jsx)(n.h2,{id:"build",children:"Build"}),"\n",(0,r.jsx)(n.p,{children:"Whenever you make changes to your ROFL app and want to deploy it, you first need\nto build it. The build process takes the compose file together with other ROFL\napp artifacts and deterministically generates a bundle that can later be\ndeployed."}),"\n",(0,r.jsxs)(n.p,{children:["The build process also computes the ",(0,r.jsx)(n.em,{children:"enclave identity"})," of the bundle which is\nused during the process of remote attestation to authenticate the app instances\nbefore granting them access to the key management system and ",(0,r.jsx)(n.a,{href:"/build/rofl/features",children:"other features"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"To build a ROFL app and update the enclave identity in the app manifest, simply\nrun:"}),"\n",(0,r.jsxs)(s.A,{children:[(0,r.jsx)(o.A,{value:"Native Linux",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl build\n"})})}),(0,r.jsx)(o.A,{value:"Docker (Windows, Mac, Linux)",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"docker run --platform linux/amd64 --volume .:/src -it ghcr.io/oasisprotocol/rofl-dev:main oasis rofl build\n"})})})]}),"\n",(0,r.jsx)(n.p,{children:"This will generate the resulting ROFL app bundle which can be used for later\ndeployment and output something like:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ROFL app built and bundle written to 'myapp.default.orc'.\n"})}),"\n",(0,r.jsx)(n.h2,{id:"update-on-chain-app-config",children:"Update On-chain App Config"}),"\n",(0,r.jsx)(n.p,{children:"After any changes to the ROFL app policy defined in the manifest, the on-chain\napp config needs to be updated in order for the changes to take effect."}),"\n",(0,r.jsx)(n.p,{children:"The designated admin account is able to update this policy by issuing an update\ntransaction which can be done via the CLI by running:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl update\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},79329:(e,n,t)=>{t.d(n,{A:()=>s});t(96540);var a=t(34164);const r={tabItem:"tabItem_Ymn6"};var i=t(74848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,a.A)(r.tabItem,s),hidden:t,children:n})}},65537:(e,n,t)=>{t.d(n,{A:()=>w});var a=t(96540),r=t(34164),i=t(65627),s=t(56347),o=t(50372),l=t(30604),c=t(11861),d=t(78749);function h(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:r}}=e;return{value:n,label:t,attributes:a,default:r}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function u(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const r=(0,s.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(i),(0,a.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(r.location.search);n.set(i,e),r.replace({...r.location,search:n.toString()})}),[i,r])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,i=p(e),[s,l]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!u({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:i}))),[c,h]=m({queryString:t,groupId:r}),[f,b]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,i]=(0,d.Dv)(t);return[r,(0,a.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:r}),g=(()=>{const e=c??f;return u({value:e,tabValues:i})?e:null})();(0,o.A)((()=>{g&&l(g)}),[g]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!u({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),h(e),b(e)}),[h,b,i]),tabValues:i}}var b=t(9136);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(74848);function y(e){let{className:n,block:t,selectedValue:a,selectValue:s,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),d=e=>{const n=e.currentTarget,t=l.indexOf(n),r=o[t].value;r!==a&&(c(n),s(r))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:i}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:a===n?0:-1,"aria-selected":a===n,ref:e=>{l.push(e)},onKeyDown:h,onClick:d,...i,className:(0,r.A)("tabs__item",g.tabItem,i?.className,{"tabs__item--active":a===n}),children:t??n},n)}))})}function j(e){let{lazy:n,children:t,selectedValue:i}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===i));return e?(0,a.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function v(e){const n=f(e);return(0,x.jsxs)("div",{className:(0,r.A)("tabs-container",g.tabList),children:[(0,x.jsx)(y,{...n,...e}),(0,x.jsx)(j,{...n,...e})]})}function w(e){const n=(0,b.A)();return(0,x.jsx)(v,{...e,children:h(e.children)},String(n))}},86628:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/rofl-4b37738482ae3fbcdc86c669ce43d2f3.svg"},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>o});var a=t(96540);const r={},i=a.createContext(r);function s(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);