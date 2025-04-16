"use strict";(self.webpackChunkdocs_oasis_io=self.webpackChunkdocs_oasis_io||[]).push([[200],{71068:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>u});const o=JSON.parse('{"id":"build/rofl/quickstart","title":"Quickstart","description":"In this tutorial we will build a simple Telegram bot that will run inside ROFL.","source":"@site/docs/build/rofl/quickstart.mdx","sourceDirName":"build/rofl","slug":"/build/rofl/quickstart","permalink":"/build/rofl/quickstart","draft":false,"unlisted":false,"editUrl":"https://github.com/oasisprotocol/oasis-sdk/edit/main/docs/rofl/quickstart.mdx","tags":[],"version":"current","lastUpdatedAt":1744030005000,"frontMatter":{},"sidebar":"developers","previous":{"title":"Build ROFL App","permalink":"/build/rofl/"},"next":{"title":"Prerequisites","permalink":"/build/rofl/prerequisites"}}');var r=t(74848),a=t(28453),s=t(65537),i=t(79329);const l={},c="Quickstart",d={},u=[{value:"Python Telegram Bot",id:"python-telegram-bot",level:2},{value:"Dockerize the Bot",id:"dockerize-the-bot",level:2},{value:"ROFLize the Bot",id:"roflize-the-bot",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",mdxAdmonitionTitle:"mdxAdmonitionTitle",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"quickstart",children:"Quickstart"})}),"\n",(0,r.jsx)(n.p,{children:"In this tutorial we will build a simple Telegram bot that will run inside ROFL.\nAlong the way we will meet one of the most powerful ROFL features\u2014how to safely\nstore your bot's Telegram API token inside a built-in ROFL key-store protected\nby the Trusted Execution Environment and the Oasis blockchain!"}),"\n",(0,r.jsx)(n.h2,{id:"python-telegram-bot",children:"Python Telegram Bot"}),"\n",(0,r.jsxs)(n.p,{children:["We will use a very simple ",(0,r.jsx)(n.a,{href:"https://pypi.org/project/python-telegram-bot/",children:"python-telegram-bot"})," wrapper. As a good python\ncitizen create a new folder for your project. Then, set up a python virtual\nenvironment and properly install the ",(0,r.jsx)(n.code,{children:"python-telegram-bot"})," dependency:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"python -m venv my_env\nsource my_env/bin/activate\necho python-telegram-bot > requirements.txt\npip install -r requirements.txt\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Create a file called ",(0,r.jsx)(n.code,{children:"bot.py"})," and paste the following bot logic that greets us\nback after greeting it with the ",(0,r.jsx)(n.code,{children:"/hello"})," command:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:'title="bot.py"',children:'import os\nfrom telegram import Update\nfrom telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes\n\n\nasync def hello(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:\n    await update.message.reply_text(f\'Hello {update.effective_user.first_name}\')\n\n\napp = ApplicationBuilder().token(os.getenv["TOKEN"]).build()\n\napp.add_handler(CommandHandler("hello", hello))\n\napp.run_polling()\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Next, we'll need to generate a Telegram API token for our bot. Search for\n",(0,r.jsx)(n.code,{children:"@BotFather"})," in your Telegram app and start a chat with the ",(0,r.jsx)(n.code,{children:"/newbot"})," command.\nThen, you'll need to input the name and a username of your bot. Finally,\n",(0,r.jsx)(n.code,{children:"@BotFather"})," will provide you a token that resembles something like\n",(0,r.jsx)(n.code,{children:"0123456789:AAGax-vgGmQsRiwf4WIQI4xq8MMf4WaQI5x"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["As you may have noticed our bot above will read its Telegram API token from the\n",(0,r.jsx)(n.code,{children:"TOKEN"})," ",(0,r.jsx)(n.em,{children:"environment variable"}),". Since we'll use this variable throughout the\ntutorial, let's export it for our session and then we can run our bot:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'export TOKEN="0123456789:AAGax-vgGmQsRiwf4WIQI4xq8MMf4WaQI5x"\npython bot.py\n'})}),"\n",(0,r.jsxs)(n.p,{children:["The bot should be up and running now, so you can search for its username in your\nTelegram app and send it a ",(0,r.jsx)(n.code,{children:"/hello"})," message:"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Python Telegram Bot",src:t(81665).A+"",width:"917",height:"554"})}),"\n",(0,r.jsx)(n.h2,{id:"dockerize-the-bot",children:"Dockerize the Bot"}),"\n",(0,r.jsxs)(n.p,{children:["Web services are best maintained if they are run in a controlled environment\nalso known as ",(0,r.jsx)(n.em,{children:"a container"}),". This includes the exact version of the operating\nsystem, both system and user libraries, and your carefully configured service.\nThe image of the container is uploaded to an ",(0,r.jsx)(n.em,{children:"OCI file server"})," (e.g. docker.io,\nghcr.io) from where the server hosting your bot downloads it."]}),"\n",(0,r.jsxs)(n.p,{children:["In our example we will use Docker to build a python-based image and add our\nTelegram bot on top of it. Go ahead and ",(0,r.jsx)(n.a,{href:"https://www.docker.com/",children:"install Docker"})," on your\nsystem. Then, inside our project folder create a file called ",(0,r.jsx)(n.code,{children:"Dockerfile"})," with\nthe following content:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-dockerfile",metastring:'title="Dockerfile"',children:'FROM python:alpine3.17\n\nWORKDIR /bot\nCOPY ./bot.py ./requirements.txt /bot\nRUN pip install -r requirements.txt\n\nENTRYPOINT ["python", "bot.py"]\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Next, create a ",(0,r.jsx)(n.code,{children:"compose.yaml"})," file which orchestrates our container:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="compose.yaml"',children:'services:\n  python-telegram-bot:\n    build: .\n    image: "ghcr.io/oasisprotocol/demo-rofl-tgbot"\n    platform: linux/amd64\n    environment:\n      - TOKEN=${TOKEN}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Let's build the docker image now and test it locally with the ",(0,r.jsx)(n.code,{children:"docker compose"}),"\ncommand:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"docker compose build\ndocker compose up\n"})}),"\n",(0,r.jsxs)(n.p,{children:["If you launch your Telegram app and send a ",(0,r.jsx)(n.code,{children:"/hello"})," message to our bot, you\nshould get the same response back as you did previously\u2014this time running inside\na Docker container."]}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsxs)(n.mdxAdmonitionTitle,{children:["Adjust ",(0,r.jsx)(n.code,{children:"image:"})," field to fit your needs"]}),(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"image:"})," field(s) in ",(0,r.jsx)(n.code,{children:"compose.yaml"})," above must point to a publicly\naccessible OCI file server where your image will be downloaded from for\nexecution. In our example, we didn't push a new image, but just used\n",(0,r.jsx)(n.code,{children:"ghcr.io/oasisprotocol/demo-rofl-tgbot"})," prepared by the Oasis team and combined\nwith our ",(0,r.jsx)(n.code,{children:"TOKEN"})," secret."]}),(0,r.jsxs)(n.p,{children:["If you wish to build and deploy your own image, replace the ",(0,r.jsx)(n.code,{children:"image:"})," field with\na fully qualified domain of the OCI server you use followed by your username,\nfor example:"]}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"docker.io/your_username/demo-rofl-tgbot"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ghcr.io/your_username/demo-rofl-tgbot"})}),"\n"]}),(0,r.jsxs)(n.p,{children:["After building and tagging the image with ",(0,r.jsx)(n.code,{children:"docker compose build"}),", run\n",(0,r.jsx)(n.code,{children:"docker compose push"})," to upload it."]})]}),"\n",(0,r.jsx)(n.h2,{id:"roflize-the-bot",children:"ROFLize the Bot"}),"\n",(0,r.jsxs)(n.p,{children:["The final step is to prepare our Docker container for execution inside the\n",(0,r.jsx)(n.em,{children:"Trusted Execution Environment (TEE)"}),". First, download the latest release of the\nOasis CLI ",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/cli/releases",children:"here"})," and install it on your computer."]}),"\n",(0,r.jsxs)(n.p,{children:["If you don't have an existing account on Oasis Sapphre Testnet chain, you will\nneed to create or import it with the ",(0,r.jsx)(n.a,{href:"/general/manage-tokens/cli/wallet#create",children:(0,r.jsx)(n.code,{children:"oasis wallet create"})})," or ",(0,r.jsx)(n.a,{href:"/general/manage-tokens/cli/wallet#import",children:(0,r.jsx)(n.code,{children:"oasis wallet import"})})," commands respectively. Then, fund the acount with ~110 TEST tokens: 100\ntokens for the ROFL registration escrow and another 10 TEST or so for paying\ndifferent kinds of gas fees. To fund the account with TEST tokens, visit the\nofficial ",(0,r.jsx)(n.a,{href:"https://faucet.testnet.oasis.io",children:"Oasis Testnet faucet"})," or reach out to us on the\n",(0,r.jsxs)(n.a,{href:"https://oasis.io/discord",children:[(0,r.jsx)(n.code,{children:"#dev-central"})," channel on Discord"]}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Next, inside our project folder, run the following command to generate the\ninitial ",(0,r.jsx)(n.code,{children:"rofl.yaml"})," manifest file and to register a new ROFL app on Sapphire\nTestnet:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl init\noasis rofl create\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Now, we will build the ",(0,r.jsx)(n.em,{children:"ROFL bundle"})," .orc. This file packs ",(0,r.jsx)(n.code,{children:"compose.yaml"}),",\nspecific operating system components and the hash of a trusted block on the\nSapphire chain. All these pieces are needed to safely execute our bot\ninside TEE."]}),"\n",(0,r.jsxs)(s.A,{children:[(0,r.jsx)(i.A,{value:"Native Linux",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl build\n"})})}),(0,r.jsx)(i.A,{value:"Docker (Windows, Mac, Linux)",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"docker run --platform linux/amd64 --volume .:/src -it ghcr.io/oasisprotocol/rofl-dev:main oasis rofl build\n"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["Do you recall the ",(0,r.jsx)(n.code,{children:"TOKEN"})," environment variable we exported above? Now, we will\nencrypt it and safely store it on-chain, so that it will be fed to our bot\ncontainer once it's started on one of the TEE provider's nodes:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'echo -n "$TOKEN" | oasis rofl secret set TOKEN -\n'})}),"\n",(0,r.jsxs)(n.p,{children:["To submit this secret and the signatures (",(0,r.jsx)(n.em,{children:"enclave IDs"}),") of our .orc bundle\ncomponents on-chain run:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl update\n"})}),"\n",(0,r.jsx)(n.p,{children:"Finally, we deploy our ROFL app to a Testnet node instance offered by one of the\nROFL providers:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"oasis rofl deploy\n"})}),"\n",(0,r.jsx)(n.p,{children:"Congratulations, you have just deployed your first ROFL app! \ud83c\udf89"}),"\n",(0,r.jsxs)(n.p,{children:["Go ahead and test it by sending the ",(0,r.jsx)(n.code,{children:"/hello"})," message in the Telegram app. You\ncan also check out your ROFL app on the ",(0,r.jsx)(n.a,{href:"https://pr-1777.oasis-explorer.pages.dev/testnet/sapphire/rofl/app/rofl1qpjsc3qplf2szw7w3rpzrpq5rqvzv4q5x5j23msu",children:"Oasis Explorer"}),":"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Oasis Explorer - ROFL app",src:t(79864).A+"",width:"1678",height:"1278"})}),"\n",(0,r.jsx)(n.admonition,{title:"Example: demo-rofl-tgbot",type:"info",children:(0,r.jsxs)(n.p,{children:["You can fetch a finished project of this tutorial from GitHub\n",(0,r.jsx)(n.a,{href:"https://github.com/oasisprotocol/demo-rofl-tgbot",children:"here"}),"."]})}),"\n",(0,r.jsx)(n.p,{children:"The tutorial above was just a Quickstart demonstrating how simple it is to run\nyour app inside a Trusted Execution Environment with Oasis ROFL. Read the\nfollowing chapters to take a deep dive into unique confidential features enabled\nby the Oasis platform."})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},79329:(e,n,t)=>{t.d(n,{A:()=>s});t(96540);var o=t(34164);const r={tabItem:"tabItem_Ymn6"};var a=t(74848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,o.A)(r.tabItem,s),hidden:t,children:n})}},65537:(e,n,t)=>{t.d(n,{A:()=>w});var o=t(96540),r=t(34164),a=t(65627),s=t(56347),i=t(50372),l=t(30604),c=t(11861),d=t(78749);function u(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,o.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:o,default:r}}=e;return{value:n,label:t,attributes:o,default:r}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const r=(0,s.W6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(a),(0,o.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=h(e),[s,l]=(0,o.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const o=t.find((e=>e.default))??t[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:n,tabValues:a}))),[c,u]=m({queryString:t,groupId:r}),[f,x]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,d.Dv)(t);return[r,(0,o.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:r}),b=(()=>{const e=c??f;return p({value:e,tabValues:a})?e:null})();(0,i.A)((()=>{b&&l(b)}),[b]);return{selectedValue:s,selectValue:(0,o.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),x(e)}),[u,x,a]),tabValues:a}}var x=t(9136);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=t(74848);function j(e){let{className:n,block:t,selectedValue:o,selectValue:s,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),d=e=>{const n=e.currentTarget,t=l.indexOf(n),r=i[t].value;r!==o&&(c(n),s(r))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:o===n?0:-1,"aria-selected":o===n,ref:e=>{l.push(e)},onKeyDown:u,onClick:d,...a,className:(0,r.A)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":o===n}),children:t??n},n)}))})}function y(e){let{lazy:n,children:t,selectedValue:a}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===a));return e?(0,o.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function v(e){const n=f(e);return(0,g.jsxs)("div",{className:(0,r.A)("tabs-container",b.tabList),children:[(0,g.jsx)(j,{...n,...e}),(0,g.jsx)(y,{...n,...e})]})}function w(e){const n=(0,x.A)();return(0,g.jsx)(v,{...e,children:u(e.children)},String(n))}},79864:(e,n,t)=>{t.d(n,{A:()=>o});const o=t.p+"assets/images/demo-rofl-tgbot-explorer-ca71adbc4f5092aaa5d8b7bdf8110e2f.png"},81665:(e,n,t)=>{t.d(n,{A:()=>o});const o=t.p+"assets/images/telegram-bot-76b6cf383527f42a973c2cd4bca72922.png"},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var o=t(96540);const r={},a=o.createContext(r);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);