"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([["9920"],{986:function(e,t,n){n.d(t,{ZP:()=>u,d$:()=>d});var i=n("2676"),s=n("9938");n("5271");var a=n("7431"),r=n("8978");let o=e=>{let{ticket:t}=e,n=`https://github.com/feature-sliced/documentation/issues/${t}`;return(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{children:(0,r.I)({id:"shared.wip.title"})}),(0,i.jsx)("p",{children:(0,r.I)({id:"shared.wip.subtitle"})}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,r.I)({id:"shared.wip.var.feedback.base"}),(0,i.jsx)(a.Z,{to:n,children:(0,r.I)({id:"shared.wip.var.feedback.link"})})]}),(0,i.jsxs)("li",{children:[(0,r.I)({id:"shared.wip.var.material.base"}),(0,i.jsx)(a.Z,{to:"https://t.me/feature_sliced",children:(0,r.I)({id:"shared.wip.var.material.link"})})]}),(0,i.jsxs)("li",{children:[(0,r.I)({id:"shared.wip.var.contribute.base"}),(0,i.jsx)(a.Z,{to:"https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md",children:(0,r.I)({id:"shared.wip.var.contribute.link"})})]})]}),(0,i.jsx)("br",{}),(0,i.jsx)("p",{children:(0,i.jsx)("i",{children:"\uD83C\uDF70 Stay tuned!"})})]})},d=[];function c(e){let t={admonition:"admonition",...(0,s.a)(),...e.components};return(0,i.jsx)(t.admonition,{title:"WIP",type:"caution",children:(0,i.jsx)(o,{ticket:e.ticket})})}function u(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},3200:function(e,t,n){n.r(t),n.d(t,{metadata:()=>i,contentTitle:()=>d,default:()=>h,assets:()=>c,toc:()=>u,frontMatter:()=>o});var i=JSON.parse('{"id":"about/understanding/abstractions","title":"\u62BD\u8C61\u5316","description":"\u6F0F\u308C\u306E\u3042\u308B\u62BD\u8C61\u5316\u306E\u6CD5\u5247","source":"@site/i18n/ja/docusaurus-plugin-content-docs/current/about/understanding/abstractions.mdx","sourceDirName":"about/understanding","slug":"/about/understanding/abstractions","permalink":"/ja/docs/about/understanding/abstractions","draft":false,"unlisted":false,"editUrl":"https://github.com/feature-sliced/documentation/edit/master/i18n/ja/docusaurus-plugin-content-docs/current/about/understanding/abstractions.mdx","tags":[],"version":"current","lastUpdatedAt":1735934763000,"sidebarPosition":6,"frontMatter":{"sidebar_position":6,"sidebar_class_name":"sidebar-item--wip"},"sidebar":"aboutSidebar","previous":{"title":"\u30A2\u30FC\u30AD\u30C6\u30AF\u30C1\u30E3\u306E\u30B7\u30B0\u30CA\u30EB","permalink":"/ja/docs/about/understanding/signals"},"next":{"title":"\u7D71\u5408\u306E\u5074\u9762","permalink":"/ja/docs/about/promote/integration"}}'),s=n("2676"),a=n("9938"),r=n("986");let o={sidebar_position:6,sidebar_class_name:"sidebar-item--wip"},d="\u62BD\u8C61\u5316",c={},u=[...r.d$,{value:"\u6F0F\u308C\u306E\u3042\u308B\u62BD\u8C61\u5316\u306E\u6CD5\u5247",id:"the-law-of-leaky-abstractions",level:2},{value:"\u306A\u305C\u3053\u3093\u306A\u306B\u591A\u304F\u306E\u62BD\u8C61\u5316\u304C\u3042\u308B\u306E\u304B",id:"why-are-there-so-many-abstractions",level:2}];function l(e){let t={blockquote:"blockquote",h1:"h1",h2:"h2",header:"header",p:"p",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"\u62BD\u8C61\u5316",children:"\u62BD\u8C61\u5316"})}),"\n",(0,s.jsx)(r.ZP,{ticket:"186"}),"\n",(0,s.jsx)(t.h2,{id:"the-law-of-leaky-abstractions",children:"\u6F0F\u308C\u306E\u3042\u308B\u62BD\u8C61\u5316\u306E\u6CD5\u5247"}),"\n",(0,s.jsx)(t.h2,{id:"why-are-there-so-many-abstractions",children:"\u306A\u305C\u3053\u3093\u306A\u306B\u591A\u304F\u306E\u62BD\u8C61\u5316\u304C\u3042\u308B\u306E\u304B"}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsx)(t.p,{children:"\u62BD\u8C61\u5316\u306F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E\u8907\u96D1\u3055\u306B\u5BFE\u51E6\u3059\u308B\u306E\u306B\u5F79\u7ACB\u3061\u307E\u3059\u3002\u554F\u984C\u306F\u3001\u3053\u308C\u3089\u306E\u62BD\u8C61\u5316\u304C\u3053\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306B\u7279\u6709\u306E\u3082\u306E\u306B\u306A\u308B\u306E\u304B\u3001\u305D\u308C\u3068\u3082\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9\u306E\u7279\u6027\u306B\u57FA\u3065\u3044\u3066\u4E00\u822C\u7684\u306A\u62BD\u8C61\u5316\u3092\u5C0E\u304D\u51FA\u305D\u3046\u3068\u3059\u308B\u306E\u304B\u3068\u3044\u3046\u3053\u3068\u3067\u3059\u3002"}),"\n"]}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsx)(t.p,{children:"\u30A2\u30FC\u30AD\u30C6\u30AF\u30C1\u30E3\u3068\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u5168\u4F53\u306F\u5143\u3005\u8907\u96D1\u3067\u3042\u308A\u3001\u554F\u984C\u306F\u305D\u306E\u8907\u96D1\u3055\u3092\u3069\u306E\u3088\u3046\u306B\u5206\u914D\u3057\u3001\u8A18\u8FF0\u3059\u308B\u304B\u3060\u3051\u3067\u3059\u3002"}),"\n"]})]})}function h(e={}){let{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},9938:function(e,t,n){n.d(t,{Z:function(){return o},a:function(){return r}});var i=n(5271);let s={},a=i.createContext(s);function r(e){let t=i.useContext(a);return i.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);