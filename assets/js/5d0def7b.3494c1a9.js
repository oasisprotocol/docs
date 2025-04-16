"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[966],{72059:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>m,frontMatter:()=>l,metadata:()=>n,toc:()=>u});const n=JSON.parse('{"id":"build/tools/other-paratimes/emerald/README","title":"Emerald ParaTime","description":"Emerald is our official ParaTime which executes smart contracts inside the","source":"@site/docs/build/tools/other-paratimes/emerald/README.mdx","sourceDirName":"build/tools/other-paratimes/emerald","slug":"/build/tools/other-paratimes/emerald/","permalink":"/build/tools/other-paratimes/emerald/","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/docs/edit/main/docs/build/tools/other-paratimes/emerald/README.mdx","tags":[],"version":"current","lastUpdatedAt":1744824929000,"frontMatter":{},"sidebar":"developers","previous":{"title":"Other ParaTimes","permalink":"/build/tools/other-paratimes/"},"next":{"title":"Network Information","permalink":"/build/tools/other-paratimes/emerald/network"}}');var o=r(74848),i=r(28453),s=r(20547),a=r(44117);const l={},c="Emerald ParaTime",d={},u=[{value:"Network Information",id:"network-information",level:2},{value:"See also",id:"see-also",level:2}];function h(e){const t={a:"a",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"emerald-paratime",children:"Emerald ParaTime"})}),"\n",(0,o.jsxs)(t.p,{children:["Emerald is our official ParaTime which executes smart contracts inside the\n",(0,o.jsx)(t.a,{href:"https://ethereum.org/en/developers/docs/evm/",children:"Ethereum Virtual Machine (EVM)"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Emerald allows for:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"Full EVM compatibility and easy integration with EVM-based dApps, such as\nDeFi, NFT, Metaverse and crypto gaming"}),"\n",(0,o.jsx)(t.li,{children:"Scalability: increased throughput of transactions"}),"\n",(0,o.jsx)(t.li,{children:"Low-cost: 99%+ lower fees than Ethereum"}),"\n",(0,o.jsx)(t.li,{children:"6 second finality (1 block)"}),"\n",(0,o.jsx)(t.li,{children:"Cross-chain bridge to enable cross-chain interoperability (upcoming)"}),"\n"]}),"\n",(0,o.jsxs)(t.p,{children:["If you're looking for EVM, but with confidentiality, check out the\n",(0,o.jsx)(t.a,{href:"/build/sapphire/",children:"Sapphire ParaTime"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"network-information",children:"Network Information"}),"\n",(0,o.jsxs)(t.p,{children:["See crucial network information ",(0,o.jsx)(t.a,{href:"/build/tools/other-paratimes/emerald/network",children:"here"}),"."]}),"\n",(0,o.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,o.jsx)(s.A,{items:[(0,a.$)("/general/manage-tokens/"),(0,a.$)("/node/run-your-node/paratime-node"),(0,a.$)("/node/run-your-node/paratime-client-node"),(0,a.$)("/node/web3"),(0,a.$)("/build/sapphire/"),(0,a.$)("/build/tools/other-paratimes/cipher/")]})]})}function m(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},74405:(e,t,r)=>{r.d(t,{A:()=>x});r(96540);var n=r(34164),o=r(56289),i=r(93751),s=r(81430),a=r(22887),l=r(50539),c=r(9303);const d={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var u=r(74848);function h(e){let{href:t,children:r}=e;return(0,u.jsx)(o.A,{href:t,className:(0,n.A)("card padding--lg",d.cardContainer),children:r})}function m(e){let{href:t,icon:r,title:o,description:i}=e;return(0,u.jsxs)(h,{href:t,children:[(0,u.jsxs)(c.A,{as:"h2",className:(0,n.A)("text--truncate",d.cardTitle),title:o,children:[r," ",o]}),i&&(0,u.jsx)("p",{className:(0,n.A)("text--truncate",d.cardDescription),title:i,children:i})]})}function p(e){let{item:t}=e;const r=(0,i.Nr)(t),n=function(){const{selectMessage:e}=(0,s.W)();return t=>e(t,(0,l.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return r?(0,u.jsx)(m,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??n(t.items.length)}):null}function f(e){let{item:t}=e;const r=(0,a.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",n=(0,i.cC)(t.docId??void 0);return(0,u.jsx)(m,{href:t.href,icon:r,title:t.label,description:t.description??n?.description})}function x(e){let{item:t}=e;switch(t.type){case"link":return(0,u.jsx)(f,{item:t});case"category":return(0,u.jsx)(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}},20547:(e,t,r)=>{r.d(t,{A:()=>l});r(96540);var n=r(34164),o=r(93751),i=r(74405),s=r(74848);function a(e){let{className:t}=e;const r=(0,o.$S)();return(0,s.jsx)(l,{items:r.items,className:t})}function l(e){const{items:t,className:r}=e;if(!t)return(0,s.jsx)(a,{...e});const l=(0,o.d1)(t);return(0,s.jsx)("section",{className:(0,n.A)("row",r),children:l.map(((e,t)=>(0,s.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,s.jsx)(i.A,{item:e})},t)))})}},81430:(e,t,r)=>{r.d(t,{W:()=>c});var n=r(96540),o=r(40797);const i=["zero","one","two","few","many","other"];function s(e){return i.filter((t=>e.includes(t)))}const a={locale:"en",pluralForms:s(["one","other"]),select:e=>1===e?"one":"other"};function l(){const{i18n:{currentLocale:e}}=(0,o.A)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:s(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),a}}),[e])}function c(){const e=l();return{selectMessage:(t,r)=>function(e,t,r){const n=e.split("|");if(1===n.length)return n[0];n.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const o=r.select(t),i=r.pluralForms.indexOf(o);return n[Math.min(i,n.length-1)]}(r,t,e)}}},44117:(e,t,r)=>{r.d(t,{$:()=>s});var n=r(21858),o=r(40797);function i(e){for(const t of e){const e=t.href;e&&void 0===globalThis.sidebarItemsMap[e]&&(globalThis.sidebarItemsMap[e]=t),"category"===t.type&&i(t.items)}}function s(e){const{siteConfig:t,siteMetadata:r}=(0,o.A)(),s=(0,n.r)();if(!s)throw new Error("Unexpected: cant find docsVersion in current context");if(void 0===globalThis.sidebarItemsMap){globalThis.sidebarItemsMap={};for(const e in s.docsSidebars)i(s.docsSidebars[e])}if(void 0===globalThis.sidebarItemsMap[e]){if(console.log(`Item ${e} not found. Registered sidebar items:`),console.log(globalThis.sidebarItemsMap),"throw"==t.onBrokenMarkdownLinks)throw new Error(`Unexpected: sidebar item with href ${e} does not exist.`);return globalThis.sidebarItemsMap["/general/"]}return globalThis.sidebarItemsMap[e]}},28453:(e,t,r)=>{r.d(t,{R:()=>s,x:()=>a});var n=r(96540);const o={},i=n.createContext(o);function s(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);