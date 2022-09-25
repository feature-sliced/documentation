"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[6212],{4137:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(r),m=i,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||a;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,s=new Array(a);s[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<a;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4703:(e,t,r)=>{r.d(t,{ZP:()=>u});var n=r(7462),i=r(7294),a=r(4137),s=r(3699),o=r(7325);const l=e=>{let{ticket:t}=e;const r=`https://github.com/feature-sliced/documentation/issues/${t}`;return i.createElement("div",null,i.createElement("p",null,(0,o.I)({id:"shared.wip.title"})),i.createElement("p",null,(0,o.I)({id:"shared.wip.subtitle"})),i.createElement("ul",null,i.createElement("li",null,(0,o.I)({id:"shared.wip.var.feedback.base"}),i.createElement(s.Z,{to:r},(0,o.I)({id:"shared.wip.var.feedback.link"}))),i.createElement("li",null,(0,o.I)({id:"shared.wip.var.material.base"}),i.createElement(s.Z,{to:"https://t.me/feature_sliced"},(0,o.I)({id:"shared.wip.var.material.link"}))),i.createElement("li",null,(0,o.I)({id:"shared.wip.var.contribute.base"}),i.createElement(s.Z,{to:"https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md"},(0,o.I)({id:"shared.wip.var.contribute.link"})))),i.createElement("br",null),i.createElement("p",null,i.createElement("i",null,"\ud83c\udf70 Stay tuned!")))},c={toc:[]};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("admonition",{title:"WIP",type:"caution"},(0,a.kt)(l,{ticket:r.ticket,mdxType:"WIP"})))}u.isMDXComponent=!0},8444:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var n=r(7462),i=(r(7294),r(4137)),a=r(4703);const s={sidebar_position:4,sidebar_class_name:"sidebar-item--wip",pagination_next:"reference/index"},o="\u041a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b",l={unversionedId:"guides/issues/cross-imports",id:"guides/issues/cross-imports",title:"\u041a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b",description:"\u041a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b \u043f\u043e\u044f\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u0442\u043e\u0433\u0434\u0430, \u043a\u043e\u0433\u0434\u0430 \u0441\u043b\u043e\u0439/\u0430\u0431\u0441\u0442\u0440\u0430\u043a\u0446\u0438\u044f \u043d\u0430\u0447\u0438\u043d\u0430\u0435\u0442 \u0431\u0440\u0430\u0442\u044c \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u043d\u043e\u0433\u043e \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438, \u0447\u0435\u043c \u0434\u043e\u043b\u0436\u043d\u0430. \u0418\u043c\u0435\u043d\u043d\u043e \u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u043c\u0435\u0442\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u044f \u0432\u044b\u0434\u0435\u043b\u044f\u0435\u0442 \u043d\u043e\u0432\u044b\u0435 \u0441\u043b\u043e\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u044e\u0442 \u0440\u0430\u0441\u0446\u0435\u043f\u0438\u0442\u044c \u044d\u0442\u0438 \u043a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b",source:"@site/i18n/ru/docusaurus-plugin-content-docs/current/guides/issues/cross-imports.mdx",sourceDirName:"guides/issues",slug:"/guides/issues/cross-imports",permalink:"/ru/docs/guides/issues/cross-imports",draft:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/ru/docusaurus-plugin-content-docs/current/guides/issues/cross-imports.mdx",tags:[],version:"current",lastUpdatedAt:1664122407,formattedLastUpdatedAt:"25 \u0441\u0435\u043d\u0442. 2022 \u0433.",sidebarPosition:4,frontMatter:{sidebar_position:4,sidebar_class_name:"sidebar-item--wip",pagination_next:"reference/index"},sidebar:"guidesSidebar",previous:{title:"\u0420\u043e\u0443\u0442\u0438\u043d\u0433",permalink:"/ru/docs/guides/issues/routes"},next:{title:"\ud83d\udcda \u0421\u043f\u0440\u0430\u0432\u043e\u0447\u043d\u0438\u043a",permalink:"/ru/docs/reference/"}},c={},u=[{value:"\u0421\u043c. \u0442\u0430\u043a\u0436\u0435",id:"see-also",level:2}],p={toc:u};function d(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u043a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b"},"\u041a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b"),(0,i.kt)(a.ZP,{ticket:"220",mdxType:"WIP"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"\u041a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b \u043f\u043e\u044f\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u0442\u043e\u0433\u0434\u0430, \u043a\u043e\u0433\u0434\u0430 \u0441\u043b\u043e\u0439/\u0430\u0431\u0441\u0442\u0440\u0430\u043a\u0446\u0438\u044f \u043d\u0430\u0447\u0438\u043d\u0430\u0435\u0442 \u0431\u0440\u0430\u0442\u044c \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u043d\u043e\u0433\u043e \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438, \u0447\u0435\u043c \u0434\u043e\u043b\u0436\u043d\u0430. \u0418\u043c\u0435\u043d\u043d\u043e \u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u043c\u0435\u0442\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u044f \u0432\u044b\u0434\u0435\u043b\u044f\u0435\u0442 \u043d\u043e\u0432\u044b\u0435 \u0441\u043b\u043e\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u044e\u0442 \u0440\u0430\u0441\u0446\u0435\u043f\u0438\u0442\u044c \u044d\u0442\u0438 \u043a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b")),(0,i.kt)("h2",{id:"see-also"},"\u0421\u043c. \u0442\u0430\u043a\u0436\u0435"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://t.me/feature_sliced/4515"},"(\u0422\u0440\u0435\u0434) \u041f\u0440\u043e \u043f\u0440\u0435\u0434\u043f\u043e\u043b\u0430\u0433\u0430\u0435\u043c\u0443\u044e \u043d\u0435\u0438\u0437\u0431\u0435\u0436\u043d\u043e\u0441\u0442\u044c \u043a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u043e\u0432")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://t.me/feature_sliced/3678"},"(\u0422\u0440\u0435\u0434) \u041f\u0440\u043e \u0440\u0435\u0437\u043e\u043b\u0432\u0438\u043d\u0433 \u043a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u043e\u0432 \u0432 \u0441\u0443\u0449\u043d\u043e\u0441\u0442\u044f\u0445")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://t.me/feature_sliced/3287"},"(\u0422\u0440\u0435\u0434) \u041f\u0440\u043e \u043a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b \u0438 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u044c")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://t.me/feature_sliced/4021"},"(\u0422\u0440\u0435\u0434) \u041f\u0440\u043e \u0438\u043c\u043f\u043e\u0440\u0442\u044b \u043c\u0435\u0436\u0434\u0443 \u0441\u0435\u0433\u043c\u0435\u043d\u0442\u0430\u043c\u0438")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://t.me/feature_sliced/3618"},"(\u0422\u0440\u0435\u0434) \u041f\u0440\u043e \u043a\u0440\u043e\u0441\u0441-\u0438\u043c\u043f\u043e\u0440\u0442\u044b \u0432\u043d\u0443\u0442\u0440\u0438 shared"))))}d.isMDXComponent=!0}}]);