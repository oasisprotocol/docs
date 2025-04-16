"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[9947],{36943:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"adrs/0017-app-standards","title":"ADR 0017: ParaTime Application Standard Proposal Process","description":"Component","source":"@site/docs/adrs/0017-app-standards.md","sourceDirName":"adrs","slug":"/adrs/0017-app-standards","permalink":"/adrs/0017-app-standards","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/adrs/edit/main/0017-app-standards.md","tags":[],"version":"current","lastUpdatedAt":1736244914000,"frontMatter":{},"sidebar":"adrs","previous":{"title":"ADR 0016: Consensus Parameters Change Proposal","permalink":"/adrs/0016-consensus-parameters-change-proposal"},"next":{"title":"ADR 0020: Governance Support for Delegator Votes","permalink":"/adrs/0020-governance-delegator-votes"}}');var s=i(74848),a=i(28453);const r={},o="ADR 0017: ParaTime Application Standard Proposal Process",c={},l=[{value:"Component",id:"component",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Naming Conventions",id:"naming-conventions",level:3},{value:"Changes to the ADR template",id:"changes-to-the-adr-template",level:3},{value:"New Section Requirements",id:"new-section-requirements",level:3},{value:"Decision: Specification &amp; Reference Implementation",id:"decision-specification--reference-implementation",level:4},{value:"Security Considerations",id:"security-considerations",level:4},{value:"Acceptance Requirements",id:"acceptance-requirements",level:3},{value:"Alternatives",id:"alternatives",level:2},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"Neutral",id:"neutral",level:3},{value:"References",id:"references",level:2}];function d(e){const n={a:"a",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"adr-0017-paratime-application-standard-proposal-process",children:"ADR 0017: ParaTime Application Standard Proposal Process"})}),"\n",(0,s.jsx)(n.h2,{id:"component",children:"Component"}),"\n",(0,s.jsx)(n.p,{children:"ADRs"}),"\n",(0,s.jsx)(n.h2,{id:"changelog",children:"Changelog"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"2022-10-05: Initial version"}),"\n",(0,s.jsx)(n.li,{children:"2022-10-12: Accepted"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"status",children:"Status"}),"\n",(0,s.jsx)(n.p,{children:"Accepted"}),"\n",(0,s.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,s.jsxs)(n.p,{children:["Applications running within a ParaTime having a novel runtime environment\n(e.g., Sapphire, Cipher) benefit from interoperability standards. For example,\n",(0,s.jsx)(n.a,{href:"https://github.com/ethereum/EIPs",children:"ERCs"})," in Ethereum. ADRs are already present in the Oasis ecosystem and so are a\nstarting point, but these are intended for lightweight recording of decisions,\nnot gathering consensus around community contributions. This ADR proposes a\ntemplate and process amendment for ADRs introducing ParaTime-specific\napplication standards."]}),"\n",(0,s.jsx)(n.h2,{id:"decision",children:"Decision"}),"\n",(0,s.jsx)(n.p,{children:"ADRs will be used for application standards because they are already well\nsupported within the Oasis ecosystem, and have most of the structure needed\nfor application standards. Although adapting another project's process would be\neasy, having multiple proposal repositories could lead to confusion."}),"\n",(0,s.jsx)(n.p,{children:"For use with application standards, ADRs shall have more structure to make\ncontributions fair and straightforward. Specifically, additional required\nsections and concrete requirements for acceptance."}),"\n",(0,s.jsxs)(n.p,{children:["Although community standards are only proposals, the ",(0,s.jsx)(n.em,{children:"Decision"})," section will\nkeep its name for compatibility with the existing template. The decision in this\ncontext will be to accept the standard for distribution to a wider audience."]}),"\n",(0,s.jsx)(n.h3,{id:"naming-conventions",children:"Naming Conventions"}),"\n",(0,s.jsx)(n.p,{children:"App standard ADRs shall be referred to as ADR-<number> regardless of the\ntargeted ParaTime."}),"\n",(0,s.jsx)(n.h3,{id:"changes-to-the-adr-template",children:"Changes to the ADR template"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["add a new ",(0,s.jsx)(n.em,{children:"Apps"})," component, which has the ParaTime as its sub-component"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"new-section-requirements",children:"New Section Requirements"}),"\n",(0,s.jsx)(n.h4,{id:"decision-specification--reference-implementation",children:"Decision: Specification & Reference Implementation"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.em,{children:"Decision"})," section gets two new sub-sections:"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Specification"}),": A complete description of the interface of the standard,\nincluding the threat/trust model, rationale for design decisions, alternative\napproaches, and references to related work. This section will generally be\nmostly prose with sprinkles of code for illustration."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Reference Implementation"}),": A basic implementation of the proposed standard\nwritten in a common language that targets the ParaTime runtime environment.\nThe reference implementation in the ADR should be executable."]}),"\n",(0,s.jsx)(n.h4,{id:"security-considerations",children:"Security Considerations"}),"\n",(0,s.jsx)(n.p,{children:"This new section details any weak points of the proposal or common security\nflaws that a re-implementation of the specification may run into, as well as\nsuggestions for avoiding security issues."}),"\n",(0,s.jsx)(n.h3,{id:"acceptance-requirements",children:"Acceptance Requirements"}),"\n",(0,s.jsxs)(n.p,{children:["Like all ADRs, an Apps component ADR will start as ",(0,s.jsx)(n.em,{children:"Proposed"})," and end up merged\nonce ",(0,s.jsx)(n.em,{children:"Accepted"}),". An application standard ADR following the above format will be\naccepted once:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"there is consensus within the ParaTime's own community that the standard meets\nits design goals"}),"\n",(0,s.jsx)(n.li,{children:"there are no outstanding compatibility or security issues"}),"\n",(0,s.jsx)(n.li,{children:"an ADR repo committer has signed off on the structure and format of the ADR"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"alternatives",children:"Alternatives"}),"\n",(0,s.jsxs)(n.p,{children:["One alternative is to fit the ParaTime-specific application standard proposals\ninto the existing ADR template, but this would cause the ",(0,s.jsx)(n.em,{children:"Decision"})," section to\nbecome overloaded with the necessary information in an ad-hoc way."]}),"\n",(0,s.jsx)(n.p,{children:"Another alternative is to encourage ParaTimes to do whatever they think most\neffective. That's always allowed, of course, and it may sometimes be useful to\nwholesale copy the best practices of another community. However, if we make the\nADR process convenient enough, the community can focus its collective effort on\nthe single ADR repo."}),"\n",(0,s.jsxs)(n.p,{children:["Within the chosen decision, there were many choices of structure from the now\nseveral EIP-like repos. The ones chosen were the minimum we need to get going,\nin the spirit of the lightweight ADR process. If more structure is needed in\nthe future, we can amend this process or switch to a new system entirely, at\nwhich point this ADR shall be marked as ",(0,s.jsx)(n.em,{children:"Superseded"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"consequences",children:"Consequences"}),"\n",(0,s.jsx)(n.h3,{id:"positive",children:"Positive"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"The community has a rallying point for standard development."}),"\n",(0,s.jsx)(n.li,{children:"We can reuse existing process."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"negative",children:"Negative"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"The app standard process might still not be ideal even after this proposal."}),"\n",(0,s.jsx)(n.li,{children:"ADR-NNN naming convention is not forwards compatible."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"neutral",children:"Neutral"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"We will need to maintain additional ADR process going forward."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/ethereum/EIPs",children:"Ethereum Improvement Proposals"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.rfc-editor.org/pubprocess/",children:"RFCs"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/cosmos/ibc/blob/main/spec/ics-template.md",children:"Inter-Chain Standards"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>o});var t=i(96540);const s={},a=t.createContext(s);function r(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);