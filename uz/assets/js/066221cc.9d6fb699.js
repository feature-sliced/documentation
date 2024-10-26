"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[3120],{3760:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var i=s(6070),t=s(1100);const r={sidebar_position:1},o="Overview",a={id:"get-started/overview",title:"Overview",description:"Feature-Sliced Design (FSD) is an architectural methodology for scaffolding front-end applications. Simply put, it's a compilation of rules and conventions on organizing code. The main purpose of this methodology is to make the project more understandable and stable in the face of ever-changing business requirements.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/get-started/overview.mdx",sourceDirName:"get-started",slug:"/get-started/overview",permalink:"/uz/docs/get-started/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/en/docusaurus-plugin-content-docs/current/get-started/overview.mdx",tags:[],version:"current",lastUpdatedAt:1729962379e3,sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"getstartedSidebar",previous:{title:"\ud83d\ude80 Get Started",permalink:"/uz/docs/get-started/"},next:{title:"Tutorial",permalink:"/uz/docs/get-started/tutorial"}},l={},d=[{value:"Is it right for me?",id:"is-it-right-for-me",level:2},{value:"Basic example",id:"basic-example",level:2},{value:"Concepts",id:"concepts",level:2},{value:"Layers",id:"layers",level:3},{value:"Slices",id:"slices",level:3},{value:"Segments",id:"segments",level:3},{value:"Advantages",id:"advantages",level:2},{value:"Incremental adoption",id:"incremental-adoption",level:2},{value:"Next steps",id:"next-steps",level:2}];function c(e){const n={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"overview",children:"Overview"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Feature-Sliced Design"})," (FSD) is an architectural methodology for scaffolding front-end applications. Simply put, it's a compilation of rules and conventions on organizing code. The main purpose of this methodology is to make the project more understandable and stable in the face of ever-changing business requirements."]}),"\n",(0,i.jsxs)(n.p,{children:["Apart from a set of conventions, FSD is also a toolchain. We have a ",(0,i.jsx)(n.a,{href:"https://github.com/feature-sliced/steiger",children:"linter"})," to check your project's architecture, ",(0,i.jsx)(n.a,{href:"https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools",children:"folder generators"})," through a CLI or IDEs, as well as a rich library of ",(0,i.jsx)(n.a,{href:"/examples",children:"examples"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"is-it-right-for-me",children:"Is it right for me?"}),"\n",(0,i.jsx)(n.p,{children:"FSD can be implemented in projects and teams of any size. It is right for your project if:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["You're doing ",(0,i.jsx)(n.strong,{children:"frontend"})," (UI on web, mobile, desktop, etc.)"]}),"\n",(0,i.jsxs)(n.li,{children:["You're building an ",(0,i.jsx)(n.strong,{children:"application"}),", not a library"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"And that's it! There are no restrictions on what programming language, UI framework, or state manager you use. You can also adopt FSD incrementally, use it in monorepos, and scale to great lengths by breaking your app into packages and implementing FSD individually within them."}),"\n",(0,i.jsxs)(n.p,{children:["If you already have an architecture and you're considering a switch to FSD, make sure that the current architecture is ",(0,i.jsx)(n.strong,{children:"causing trouble"})," in your team. For example, if your project has grown too large and inter-connected to efficiently implement new features, or if you're expecting a lot of new members to join the team. If the current architecture works, maybe it's not worth changing. But if you do decide to migrate, see the ",(0,i.jsx)(n.a,{href:"/docs/guides/migration/from-custom",children:"Migration"})," section for guidance."]}),"\n",(0,i.jsx)(n.h2,{id:"basic-example",children:"Basic example"}),"\n",(0,i.jsx)(n.p,{children:"Here is a simple project that implements FSD:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 app"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 pages"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 shared"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["These top-level folders are called ",(0,i.jsx)(n.em,{children:"layers"}),". Let's look deeper:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"\ud83d\udcc2 app"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 routes"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 analytics"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"\ud83d\udcc2 pages"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 home"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"\ud83d\udcc2 article-reader"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 ui"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 api"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 settings"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"\ud83d\udcc2 shared"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 ui"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"\ud83d\udcc1 api"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Folders inside ",(0,i.jsx)(n.code,{children:"\ud83d\udcc2 pages"})," are called ",(0,i.jsx)(n.em,{children:"slices"}),". They divide the layer by domain (in this case, by pages)."]}),"\n",(0,i.jsxs)(n.p,{children:["Folders inside ",(0,i.jsx)(n.code,{children:"\ud83d\udcc2 app"}),", ",(0,i.jsx)(n.code,{children:"\ud83d\udcc2 shared"}),", and ",(0,i.jsx)(n.code,{children:"\ud83d\udcc2 pages/article-reader"})," are called ",(0,i.jsx)(n.em,{children:"segments"}),", and they divide slices (or layers) by technical purpose, i.e. what the code is for."]}),"\n",(0,i.jsx)(n.h2,{id:"concepts",children:"Concepts"}),"\n",(0,i.jsx)(n.p,{children:"Layers, slices, and segments form a hierarchy like this:"}),"\n",(0,i.jsxs)("figure",{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Hierarchy of FSD concepts, described below",src:s(9273).A+"",width:"1355",height:"754"})}),(0,i.jsxs)("figcaption",{style:{fontStyle:"italic",fontSize:"0.9em"},children:[(0,i.jsx)("p",{children:'Pictured above: three pillars, labeled left to right as "Layers", "Slices", and "Segments" respectively.'}),(0,i.jsx)("p",{children:'The "Layers" pillar contains seven divisions arranged top to bottom and labeled "app", "processes", "pages", "widgets", "features", "entities", and "shared". The "processes" division is crossed out. The "entities" division is connected to the second pillar "Slices" in a way that conveys that the second pillar is the content of "entities".'}),(0,i.jsx)("p",{children:'The "Slices" pillar contains three divisions arranged top to bottom and labeled "user", "post", and "comment". The "post" division is connected to the third pillar "Segments" in the same way such that it\'s the content of "post".'}),(0,i.jsx)("p",{children:'The "Segments" pillar contains three divisions, arranged top to bottom and labeled "ui", "model", and "api".'})]})]}),"\n",(0,i.jsx)(n.h3,{id:"layers",children:"Layers"}),"\n",(0,i.jsx)(n.p,{children:"Layers are standardized across all FSD projects. You don't have to use all of the layers, but their names are important. There are currently seven of them (from top to bottom):"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"App* \u2014 everything that makes the app run \u2014 routing, entrypoints, global styles, providers."}),"\n",(0,i.jsx)(n.li,{children:"Processes (deprecated) \u2014 complex inter-page scenarios."}),"\n",(0,i.jsx)(n.li,{children:"Pages \u2014 full pages or large parts of a page in nested routing."}),"\n",(0,i.jsx)(n.li,{children:"Widgets \u2014 large self-contained chunks of functionality or UI, usually delivering an entire use case."}),"\n",(0,i.jsxs)(n.li,{children:["Features \u2014 ",(0,i.jsx)(n.em,{children:"reused"})," implementations of entire product features, i.e. actions that bring business value to the user."]}),"\n",(0,i.jsxs)(n.li,{children:["Entities \u2014 business entities that the project works with, like ",(0,i.jsx)(n.code,{children:"user"})," or ",(0,i.jsx)(n.code,{children:"product"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"Shared* \u2014 reusable functionality, especially when it's detached from the specifics of the project/business, though not necessarily."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"* \u2014 these layers, App and Shared, unlike the other layers, don't have slices, and are made up of segments directly."})}),"\n",(0,i.jsx)(n.p,{children:"The trick with layers is that modules on one layer can only know about and import from modules from the layers strictly below."}),"\n",(0,i.jsx)(n.h3,{id:"slices",children:"Slices"}),"\n",(0,i.jsx)(n.p,{children:"Next up are slices, which partition the code by business domain. You're free to choose any names for them, and create as many as you wish. Slices make your codebase easier to navigate by keeping logically related modules close together."}),"\n",(0,i.jsx)(n.p,{children:"Slices cannot use other slices on the same layer, and that helps with high cohesion and low coupling."}),"\n",(0,i.jsx)(n.h3,{id:"segments",children:"Segments"}),"\n",(0,i.jsx)(n.p,{children:"Slices, as well as layers App and Shared, consist of segments, and segments group your code by its purpose. Segment names are not constrained by the standard, but there are several conventional names for the most common purposes:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"ui"})," \u2014 everything related to UI display: UI components, date formatters, styles, etc."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"api"})," \u2014 backend interactions: request functions, data types, mappers, etc."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"model"})," \u2014 the data model: schemas, interfaces, stores, and business logic."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"lib"})," \u2014 library code that other modules on this slice need."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"config"})," \u2014 configuration files and feature flags."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Usually these segments are enough for most layers, you would only create your own segments in Shared or App, but this is not a rule."}),"\n",(0,i.jsx)(n.h2,{id:"advantages",children:"Advantages"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Uniformity"}),(0,i.jsx)(n.br,{}),"\n","Since the structure is standardized, projects become more uniform, which makes onboarding new members easier for the team."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Stability in face of changes and refactoring"}),(0,i.jsx)(n.br,{}),"\n","A module on one layer cannot use other modules on the same layer, or the layers above.",(0,i.jsx)(n.br,{}),"\n","This allows you to make isolated modifications without unforeseen consequences to the rest of the app."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Controlled reuse of logic"}),(0,i.jsx)(n.br,{}),"\n","Depending on the layer, you can make code very reusable or very local.",(0,i.jsx)(n.br,{}),"\n","This keeps a balance between following the ",(0,i.jsx)(n.strong,{children:"DRY"})," principle and practicality."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Orientation to business and users needs"}),(0,i.jsx)(n.br,{}),"\n","The app is split into business domains and usage of the business language is encouraged in naming, so that you can do useful product work without fully understanding all other unrelated parts of the project."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"incremental-adoption",children:"Incremental adoption"}),"\n",(0,i.jsx)(n.p,{children:"If you have an existing codebase that you want to migrate to FSD, we suggest the following strategy. We found it useful in our own migration experience."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Start by slowly shaping up the App and Shared layers module-by-module to create a foundation."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Distribute all of the existing UI across Widgets and Pages using broad strokes, even if they have dependencies that violate the rules of FSD."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Start gradually resolving import violations and also extracting Entities and possibly even Features."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"It's advised to refrain from adding new large entities while refactoring or refactoring only certain parts of the project."}),"\n",(0,i.jsx)(n.h2,{id:"next-steps",children:"Next steps"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Want to get a good grasp of how to think in FSD?"})," Check out the ",(0,i.jsx)(n.a,{href:"/docs/get-started/tutorial",children:"Tutorial"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Prefer to learn from examples?"})," We have a lot in the ",(0,i.jsx)(n.a,{href:"/examples",children:"Examples"})," section."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Have questions?"})," Drop by our ",(0,i.jsx)(n.a,{href:"https://t.me/feature_sliced",children:"Telegram chat"})," and get help from the community."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},9273:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg"},1100:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var i=s(758);const t={},r=i.createContext(t);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);