"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[9136],{1928:(e,t,i)=>{i.d(t,{Ay:()=>c,RM:()=>d});var s=i(6070),n=i(1100),r=(i(758),i(6783)),o=i(7765);const a=e=>{let{ticket:t}=e;const i=`https://github.com/feature-sliced/documentation/issues/${t}`;return(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{children:(0,o.T)({id:"shared.wip.title"})}),(0,s.jsx)("p",{children:(0,o.T)({id:"shared.wip.subtitle"})}),(0,s.jsxs)("ul",{children:[(0,s.jsxs)("li",{children:[(0,o.T)({id:"shared.wip.var.feedback.base"}),(0,s.jsx)(r.A,{to:i,children:(0,o.T)({id:"shared.wip.var.feedback.link"})})]}),(0,s.jsxs)("li",{children:[(0,o.T)({id:"shared.wip.var.material.base"}),(0,s.jsx)(r.A,{to:"https://t.me/feature_sliced",children:(0,o.T)({id:"shared.wip.var.material.link"})})]}),(0,s.jsxs)("li",{children:[(0,o.T)({id:"shared.wip.var.contribute.base"}),(0,s.jsx)(r.A,{to:"https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md",children:(0,o.T)({id:"shared.wip.var.contribute.link"})})]})]}),(0,s.jsx)("br",{}),(0,s.jsx)("p",{children:(0,s.jsx)("i",{children:"\ud83c\udf70 Stay tuned!"})})]})},d=[];function l(e){const t={admonition:"admonition",...(0,n.R)(),...e.components};return(0,s.jsx)(t.admonition,{title:"WIP",type:"caution",children:(0,s.jsx)(a,{ticket:e.ticket})})}function c(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8665:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var s=i(6070),n=i(1100),r=i(1928);const o={sidebar_position:3,sidebar_class_name:"sidebar-item--wip"},a="Routing",d={id:"guides/issues/routes",title:"Routing",description:"Situation",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/guides/issues/routes.mdx",sourceDirName:"guides/issues",slug:"/guides/issues/routes",permalink:"/docs/guides/issues/routes",draft:!1,unlisted:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/en/docusaurus-plugin-content-docs/current/guides/issues/routes.mdx",tags:[],version:"current",lastUpdatedAt:1729962379e3,sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_class_name:"sidebar-item--wip"},sidebar:"guidesSidebar",previous:{title:"Desegemented",permalink:"/docs/guides/issues/desegmented"},next:{title:"Cross-imports",permalink:"/docs/guides/issues/cross-imports"}},l={},c=[...r.RM,{value:"Situation",id:"situation",level:2},{value:"Problem",id:"problem",level:2},{value:"If you ignore it",id:"if-you-ignore-it",level:2},{value:"Solution",id:"solution",level:2},{value:"See also",id:"see-also",level:2}];function u(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"routing",children:"Routing"})}),"\n",(0,s.jsx)(r.Ay,{ticket:"169"}),"\n",(0,s.jsx)(t.h2,{id:"situation",children:"Situation"}),"\n",(0,s.jsx)(t.p,{children:"Urls to pages are hardcoded in the layers below pages"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",metastring:'title="entities/post/card"',children:"\n<Card>\n    <Card.Title \n        href={`/post/${data.id}`}\n        title={data.name}\n    />\n    ...\n</Card>\n"})}),"\n",(0,s.jsx)(t.h2,{id:"problem",children:"Problem"}),"\n",(0,s.jsx)(t.p,{children:"Urls are not concentrated in the page layer, where they belong according to the scope of responsibility"}),"\n",(0,s.jsx)(t.h2,{id:"if-you-ignore-it",children:"If you ignore it"}),"\n",(0,s.jsx)(t.p,{children:"Then, when changing urls, you will have to keep in mind that these urls (and the logic of urls/redirects) can be in all layers except pages"}),"\n",(0,s.jsx)(t.p,{children:"And it also means that now even a simple product card takes part of the responsibility from the pages, which smears the logic of the project"}),"\n",(0,s.jsx)(t.h2,{id:"solution",children:"Solution"}),"\n",(0,s.jsx)(t.p,{children:"Determine how to work with urls/redirects from the page level and above"}),"\n",(0,s.jsx)(t.p,{children:"Transfer to the layers below via composition/props/factories"}),"\n",(0,s.jsx)(t.h2,{id:"see-also",children:"See also"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://t.me/feature_sliced/4389",children:'(Thread) What if I "sew up" routing in entities/features/widgets'})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://t.me/feature_sliced/3756",children:"(Thread) Why does it smear the logic of routes only in pages"})}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},1100:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>a});var s=i(758);const n={},r=s.createContext(n);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);