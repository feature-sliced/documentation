"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9256],{4137:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||a;return n?o.createElement(h,i(i({ref:t},u),{},{components:n})):o.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3410:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var o=n(3117),r=n(102),a=(n(7294),n(4137)),i=["components"],l={sidebar_position:1},s="Mission",p={unversionedId:"about/mission",id:"about/mission",isDocsHomePage:!1,title:"Mission",description:"Here we describe the goals and limitations of the applicability of the methodology-which we are guided by when developing the methodology",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/about/mission.md",sourceDirName:"about",slug:"/about/mission",permalink:"/en/docs/about/mission",editUrl:"https://github.com/feature-sliced/documentation/edit/master/website/i18n/en/docusaurus-plugin-content-docs/current/about/mission.md",tags:[],version:"current",lastUpdatedAt:1641863144,formattedLastUpdatedAt:"1/11/2022",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"aboutSidebar",previous:{title:"\ud83c\udf70 About",permalink:"/en/docs/about"},next:{title:"Team",permalink:"/en/docs/about/team"}},u=[{value:"Goals",id:"goals",children:[{value:"Intuitive clarity for a wide range of developers",id:"intuitive-clarity-for-a-wide-range-of-developers",children:[],level:3},{value:"Solving everyday problems",id:"solving-everyday-problems",children:[],level:3}],level:2},{value:"Restrictions",id:"restrictions",children:[],level:2},{value:"See also",id:"see-also",children:[],level:2}],c={toc:u};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"mission"},"Mission"),(0,a.kt)("p",null,"Here we describe the goals and limitations of the applicability of the methodology-which we are guided by when developing the methodology"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"We see our goal as a balance between ideology and simplicity"),(0,a.kt)("li",{parentName:"ul"},"We won't be able to make a silver bullet that fits everyone")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Nevertheless, the methodology should be close and accessible to a fairly wide range of developers")),(0,a.kt)("h2",{id:"goals"},"Goals"),(0,a.kt)("h3",{id:"intuitive-clarity-for-a-wide-range-of-developers"},"Intuitive clarity for a wide range of developers"),(0,a.kt)("p",null,"The methodology should be accessible - for most of the team in projects"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Because even with all the future tools , it will not be enough, if only experienced seniors/leads will understand the methodology")),(0,a.kt)("h3",{id:"solving-everyday-problems"},"Solving everyday problems"),(0,a.kt)("p",null,"The methodology should set out the reasons and solutions to our everyday problems when developing projects"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"And also-attach tools to all this (cli, linters)")),(0,a.kt)("p",null,"So that developers can use a ",(0,a.kt)("em",{parentName:"p"},"battle-tested")," approach that allows them to bypass long-standing problems of architecture and development"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("em",{parentName:"p"},"@sergeysova: Imagine, that a developer writes code within the framework of the methodology and he has problems 10 times less often, simply because other people have thought out the solution to many problems."))),(0,a.kt)("h2",{id:"restrictions"},"Restrictions"),(0,a.kt)("p",null,"We do not want to ",(0,a.kt)("em",{parentName:"p"},"impose our point of view"),", and at the same time we understand that ",(0,a.kt)("em",{parentName:"p"},"many of our habits, as developers, interfere from day to day")),(0,a.kt)("p",null,"Everyone has their own level of experience in designing and developing systems, ",(0,a.kt)("strong",{parentName:"p"},"therefore, it is worth understanding the following:")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Will not work"),": very simple, very clear, for everyone"),(0,a.kt)("blockquote",{parentName:"li"},(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("em",{parentName:"p"},"@sergeysova: Some concepts cannot be intuitively understood until you encounter problems and spend years solving them.")),(0,a.kt)("ul",{parentName:"blockquote"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"In math world: is graph theory.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"In physics: quantum mechanics.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"In programming: application architecture."))))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Possible and desirable"),": simplicity, extensibility"))),(0,a.kt)("h2",{id:"see-also"},"See also"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/concepts/architecture#problems"},"Architecture problems"))))}d.isMDXComponent=!0}}]);