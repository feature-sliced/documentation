"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[6279],{4137:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(r),m=i,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||a;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:i,o[1]=c;for(var l=2;l<a;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},4703:(e,t,r)=>{r.d(t,{ZP:()=>u});var n=r(7462),i=r(7294),a=r(4137),o=r(3699),c=r(7325);const s=e=>{let{ticket:t}=e;const r=`https://github.com/feature-sliced/documentation/issues/${t}`;return i.createElement("div",null,i.createElement("p",null,(0,c.I)({id:"shared.wip.title"})),i.createElement("p",null,(0,c.I)({id:"shared.wip.subtitle"})),i.createElement("ul",null,i.createElement("li",null,(0,c.I)({id:"shared.wip.var.feedback.base"}),i.createElement(o.Z,{to:r},(0,c.I)({id:"shared.wip.var.feedback.link"}))),i.createElement("li",null,(0,c.I)({id:"shared.wip.var.material.base"}),i.createElement(o.Z,{to:"https://t.me/feature_sliced"},(0,c.I)({id:"shared.wip.var.material.link"}))),i.createElement("li",null,(0,c.I)({id:"shared.wip.var.contribute.base"}),i.createElement(o.Z,{to:"https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md"},(0,c.I)({id:"shared.wip.var.contribute.link"})))),i.createElement("br",null),i.createElement("p",null,i.createElement("i",null,"\ud83c\udf70 Stay tuned!")))},l={toc:[]};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("admonition",{title:"WIP",type:"caution"},(0,a.kt)(s,{ticket:r.ticket,mdxType:"WIP"})))}u.isMDXComponent=!0},3706:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=r(7462),i=(r(7294),r(4137)),a=r(4703);const o={sidebar_position:10,sidebar_class_name:"sidebar-item--wip"},c="Usage with NextJS",s={unversionedId:"guides/tech/with-nextjs",id:"guides/tech/with-nextjs",title:"Usage with NextJS",description:"About the specifics of the framework and compatibility with the methodology",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/guides/tech/with-nextjs.mdx",sourceDirName:"guides/tech",slug:"/guides/tech/with-nextjs",permalink:"/docs/guides/tech/with-nextjs",draft:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/en/docusaurus-plugin-content-docs/current/guides/tech/with-nextjs.mdx",tags:[],version:"current",lastUpdatedAt:1664122407,formattedLastUpdatedAt:"Sep 25, 2022",sidebarPosition:10,frontMatter:{sidebar_position:10,sidebar_class_name:"sidebar-item--wip"},sidebar:"guidesSidebar",previous:{title:"Migration from v1",permalink:"/docs/guides/migration/from-v1"},next:{title:"Desegemented",permalink:"/docs/guides/issues/desegmented"}},l={},u=[{value:"See also",id:"see-also",level:2}],d={toc:u};function p(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"usage-with-nextjs"},"Usage with NextJS"),(0,i.kt)(a.ZP,{ticket:"225",mdxType:"WIP"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"About the specifics of the framework and compatibility with the methodology")),(0,i.kt)("h2",{id:"see-also"},"See also"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://t.me/feature_sliced/3623"},"(Thread) About the pages directory in NextJS"))))}p.isMDXComponent=!0}}]);