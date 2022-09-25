"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[5821],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=i,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(f,a(a({ref:t},c),{},{components:n})):r.createElement(f,a({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1748:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(7462),i=(n(7294),n(4137));const o={sidebar_position:2},a="App",l={unversionedId:"reference/units/layers/app",id:"reference/units/layers/app",title:"App",description:"When it becomes difficult to control and extend the initializing logic of the application (global styles/initialization of external libraries/routing/SSR)",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/reference/units/layers/app.md",sourceDirName:"reference/units/layers",slug:"/reference/units/layers/app",permalink:"/docs/reference/units/layers/app",draft:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/en/docusaurus-plugin-content-docs/current/reference/units/layers/app.md",tags:[],version:"current",lastUpdatedAt:1664122407,formattedLastUpdatedAt:"Sep 25, 2022",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"referenceSidebar",previous:{title:"Layer",permalink:"/docs/reference/units/layers/"},next:{title:"Processes",permalink:"/docs/reference/units/layers/processes"}},p={},s=[{value:"Description",id:"description",level:2},{value:"Examples",id:"examples",level:2},{value:"Initializing the router",id:"initializing-the-router",level:3},{value:"Initializing external libraries",id:"initializing-external-libraries",level:3},{value:"Enabling initialization",id:"enabling-initialization",level:3}],c={toc:s};function u(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,r.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"app"},"App"),(0,i.kt)("admonition",{title:"When to use?",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"When it becomes difficult to control and extend the initializing logic of the application (global styles/initialization of external libraries/routing/SSR)")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"app-themed-bordered",src:n(6918).Z,width:"1200",height:"630"})),(0,i.kt)("h2",{id:"description"},"Description"),(0,i.kt)("p",null,"There are usually placed:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"initialization of processes and other background logic"),(0,i.kt)("li",{parentName:"ul"},"initialization of providers, wrappers"),(0,i.kt)("li",{parentName:"ul"},"connecting global application styles")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"The methodology does not yet regulate the content of this layer in any way, so it depends on the specific project")),(0,i.kt)("h2",{id:"examples"},"Examples"),(0,i.kt)("h3",{id:"initializing-the-router"},"Initializing the router"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"title=app/providers/withRouter.tsx",title:"app/providers/withRouter.tsx"},"export const withRouter = (component: Component) => () => (\n    <Router>\n        <Suspense fallback={<Spin overlay />}>\n            <QueryParamProvider ReactRouterRoute={Route}>\n                {component()}\n            </QueryParamProvider>\n        </Suspense>\n    </Router>\n);\n")),(0,i.kt)("h3",{id:"initializing-external-libraries"},"Initializing external libraries"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"title=app/providers/withAntd.tsx",title:"app/providers/withAntd.tsx"},"export const withAntd = (component: Component) => () => (\n    <ConfigProvider getPopupContainer={...}>\n        {component()}\n    </ConfigProvider>\n);\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"title=app/providers/withApollo.tsx",title:"app/providers/withApollo.tsx"},"const client = new ApolloClient({ ... });\n\nexport const withApollo = (component: Component) => () => (\n    <ApolloProvider client={client}>\n        {component()}\n    </ApolloProvider>\n);\n")),(0,i.kt)("h3",{id:"enabling-initialization"},"Enabling initialization"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Only one of the methods is shown here, if you use HOC for providers and logic initialization")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"title=app/providers/index.ts",title:"app/providers/index.ts"},'import compose from "compose-function";\nimport { withRouter } from "./with-router";\nimport { withAntd } from "./with-antd";\n...\n\n// 1. The compose library is often exported from some dependencies that you already use\n// e.g.: `import { compose } from "redux"`\n// 2. It is worth considering the order of HOCs connection\n// e.g.: withHOC2 cannot be started until there is a wrapper withHOC1, etc.\nexport const withProviders = compose(withRouter, withAntd,...);\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"title=app/index.tsx",title:"app/index.tsx"},'import { withProviders } from "./providers";\n...\n\nconst App = () => { ... }\n\nexport default withProviders(App);\n')))}u.isMDXComponent=!0},6918:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/app-f2b5dd3e5531b1008447b0487b493c0f.png"}}]);