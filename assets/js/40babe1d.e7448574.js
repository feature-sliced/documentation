"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([["4310"],{8378:function(e,s,n){n.r(s),n.d(s,{metadata:()=>t,contentTitle:()=>o,default:()=>h,assets:()=>l,toc:()=>d,frontMatter:()=>a});var t=JSON.parse('{"id":"reference/layers","title":"Layers","description":"Layers are the first level of organisational hierarchy in Feature-Sliced Design. Their purpose is to separate code based on how much responsibility it needs and how many other modules in the app it depends on. Every layer carries special semantic meaning to help you determine how much responsibility you should allocate to your code.","source":"@site/i18n/en/docusaurus-plugin-content-docs/current/reference/layers.mdx","sourceDirName":"reference","slug":"/reference/layers","permalink":"/docs/reference/layers","draft":false,"unlisted":false,"editUrl":"https://github.com/feature-sliced/documentation/edit/master/i18n/en/docusaurus-plugin-content-docs/current/reference/layers.mdx","tags":[],"version":"current","lastUpdatedAt":1735934763000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1,"pagination_next":"reference/slices-segments"},"sidebar":"referenceSidebar","previous":{"title":"\uD83D\uDCDA Reference","permalink":"/docs/reference/"},"next":{"title":"Slices and segments","permalink":"/docs/reference/slices-segments"}}'),i=n("2676"),r=n("9938");let a={sidebar_position:1,pagination_next:"reference/slices-segments"},o="Layers",l={},d=[{value:"Import rule on layers",id:"import-rule-on-layers",level:2},{value:"Layer definitions",id:"layer-definitions",level:2},{value:"Shared",id:"shared",level:3},{value:"Entities",id:"entities",level:3},{value:"Entity relationships",id:"entity-relationships",level:4},{value:"Features",id:"features",level:3},{value:"Widgets",id:"widgets",level:3},{value:"Pages",id:"pages",level:3},{value:"Processes",id:"processes",level:3},{value:"App",id:"app",level:3}];function c(e){let s={a:"a",admonition:"admonition",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"layers",children:"Layers"})}),"\n",(0,i.jsx)(s.p,{children:"Layers are the first level of organisational hierarchy in Feature-Sliced Design. Their purpose is to separate code based on how much responsibility it needs and how many other modules in the app it depends on. Every layer carries special semantic meaning to help you determine how much responsibility you should allocate to your code."}),"\n",(0,i.jsxs)(s.p,{children:["There are ",(0,i.jsx)(s.strong,{children:"7 layers"})," in total, arranged from most responsibility and\xa0dependency to least:"]}),"\n",(0,i.jsx)("img",{src:"/img/layers/folders-graphic-light.svg#light-mode-only",width:"180",style:{float:"right",margin:"0 1em"},alt:"A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out."}),"\n",(0,i.jsx)("img",{src:"/img/layers/folders-graphic-dark.svg#dark-mode-only",width:"180",style:{float:"right",margin:"0 1em"},alt:"A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out."}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsx)(s.li,{children:"App"}),"\n",(0,i.jsx)(s.li,{children:"Processes (deprecated)"}),"\n",(0,i.jsx)(s.li,{children:"Pages"}),"\n",(0,i.jsx)(s.li,{children:"Widgets"}),"\n",(0,i.jsx)(s.li,{children:"Features"}),"\n",(0,i.jsx)(s.li,{children:"Entities"}),"\n",(0,i.jsx)(s.li,{children:"Shared"}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"You don't have to use every layer in your project \u2014 only add them if you think it brings value to your project. Typically, most frontend projects will have at least the Shared, Pages, and App layers."}),"\n",(0,i.jsxs)(s.p,{children:["In practice, layers are folders with lowercase names (for example, ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 shared"}),", ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 pages"}),", ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 app"}),"). Adding new layers is ",(0,i.jsx)(s.em,{children:"not recommended"})," because their semantics are standardized."]}),"\n",(0,i.jsx)(s.h2,{id:"import-rule-on-layers",children:"Import rule on layers"}),"\n",(0,i.jsxs)(s.p,{children:["Layers are made up of ",(0,i.jsx)(s.em,{children:"slices"})," \u2014 highly cohesive groups of modules. Dependencies between slices are regulated by ",(0,i.jsx)(s.strong,{children:"the import rule on layers"}),":"]}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.em,{children:"A module (file) in a slice can only import other slices when they are located on layers strictly below."})}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["For example, the folder ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ~/features/aaa"}),' is a slice with the name "aaa". A file inside of it, ',(0,i.jsx)(s.code,{children:"~/features/aaa/api/request.ts"}),", cannot import code from any file in ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ~/features/bbb"}),", but can import code from ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ~/entities"})," and ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ~/shared"}),", as well as any sibling code from ",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ~/features/aaa"}),", for example, ",(0,i.jsx)(s.code,{children:"~/features/aaa/lib/cache.ts"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:["Layers App and Shared are ",(0,i.jsx)(s.strong,{children:"exceptions"})," to this rule \u2014 they are both a layer and a slice at the same time. Slices partition code by business domain, and these two layers are exceptions because Shared does not have business domains, and App combines all business domains."]}),"\n",(0,i.jsx)(s.p,{children:"In practice, this means that layers App and Shared are made up of segments, and segments can import each other freely."}),"\n",(0,i.jsx)(s.h2,{id:"layer-definitions",children:"Layer definitions"}),"\n",(0,i.jsx)(s.p,{children:"This section describes the semantic meaning of each layer to create an intuition for what kind of code belongs there."}),"\n",(0,i.jsx)(s.h3,{id:"shared",children:"Shared"}),"\n",(0,i.jsx)(s.p,{children:"This layer forms a foundation for the rest of the app. It's a place to create connections with the external world, for example, backends, third-party libraries, the environment. It is also a place to define your own highly contained libraries."}),"\n",(0,i.jsxs)(s.p,{children:["This layer, like the App layer, ",(0,i.jsx)(s.em,{children:"does not contain slices"}),". Slices are intended to divide the layer into business domains, but business domains do not exist in Shared. This means that all files in Shared can reference and import from each other."]}),"\n",(0,i.jsx)(s.p,{children:"Here are the segments that you can typically find in this layer:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 api"})," \u2014 the API client and potentially also functions to make requests to specific backend endpoints."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ui"})," \u2014 the application's UI kit.",(0,i.jsx)(s.br,{}),"\n","Components on this layer should not contain business logic, but it's okay for them to be business-themed. For example, you can put the company logo and page layout here. Components with UI logic are also allowed (for example, autocomplete or a search bar)."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 lib"})," \u2014 a collection of internal libraries.",(0,i.jsx)(s.br,{}),"\n","This folder should not be treated as helpers or utilities (",(0,i.jsx)(s.a,{href:"https://dev.to/sergeysova/why-utils-helpers-is-a-dump-45fo",children:"read here why these folders often turn into a dump"}),"). Instead, every library in this folder should have one area of focus, for example, dates, colors, text manipulation, etc. That area of focus should be documented in a README file. The developers in your team should know what can and cannot be added to these libraries."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 config"})," \u2014 environment variables, global feature flags and other global configuration for your app."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 routes"})," \u2014 route constants or patterns for matching routes."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 i18n"})," \u2014 setup code for translations, global translation strings."]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["You are free to add more segments, but make sure that the name of these segments describes the purpose of the content, not its essence. For example, ",(0,i.jsx)(s.code,{children:"components"}),", ",(0,i.jsx)(s.code,{children:"hooks"}),", and ",(0,i.jsx)(s.code,{children:"types"})," are bad segment names because they aren't that helpful when you're looking for code."]}),"\n",(0,i.jsx)(s.h3,{id:"entities",children:"Entities"}),"\n",(0,i.jsx)(s.p,{children:"Slices on this layer represent concepts from the real world that the project is working with. Commonly, they are the terms that the business uses to describe the product. For example, a social network might work with business entities like User, Post, and Group."}),"\n",(0,i.jsxs)(s.p,{children:["An entity slice might contain the data storage (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 model"}),"), data validation schemas (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 model"}),"), entity-related API request functions (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 api"}),"), as well as the visual representation of this entity in the interface (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ui"}),"). The visual representation doesn't have to produce a complete UI block \u2014 it is primarily meant to reuse the same appearance across several pages in the app, and different business logic may be attached to it through props or slots."]}),"\n",(0,i.jsx)(s.h4,{id:"entity-relationships",children:"Entity relationships"}),"\n",(0,i.jsx)(s.p,{children:"Entities in FSD are slices, and by default, slices cannot know about each other. In real life, however, entities often interact with each other, and sometimes one entity owns or contains other entities. Because of that, the business logic of these interactions is preferably kept in higher layers, like Features or Pages."}),"\n",(0,i.jsxs)(s.p,{children:["When one entity's data object contains other data objects, usually it's a good idea to make the connection between the entities explicit and side-step the slice isolation by making a cross-reference API with the ",(0,i.jsx)(s.code,{children:"@x"})," notation. The reason is that connected entities need to be refactored together, so it's best to make the connection impossible to miss."]}),"\n",(0,i.jsx)(s.p,{children:"For example:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-ts",metastring:'title="entities/artist/model/artist.ts"',children:'import type { Song } from "entities/song/@x/artist";\n\nexport interface Artist {\n  name: string;\n  songs: Array<Song>;\n}\n'})}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-ts",metastring:'title="entities/song/@x/artist.ts"',children:'export type { Song } from "../model/song.ts";\n'})}),"\n",(0,i.jsxs)(s.p,{children:["Learn more about the ",(0,i.jsx)(s.code,{children:"@x"})," notation in the ",(0,i.jsx)(s.a,{href:"/docs/reference/public-api#public-api-for-cross-imports",children:"Public API for cross-imports"})," section."]}),"\n",(0,i.jsx)(s.h3,{id:"features",children:"Features"}),"\n",(0,i.jsx)(s.p,{children:"This layer is for the main interactions in your app, things that your users care to do. These interactions often involve business entities, because that's what the app is about."}),"\n",(0,i.jsxs)(s.p,{children:["A crucial principle for using the Features layer effectively is: ",(0,i.jsx)(s.strong,{children:"not everything needs to be a feature"}),". A good indicator that something needs to be a feature is the fact that it is reused on several pages."]}),"\n",(0,i.jsx)(s.p,{children:"For example, if the app has several editors, and all of them have comments, then comments are a reused feature. Remember that slices are a mechanism for finding code quickly, and if there are too many features, the important ones are drowned out."}),"\n",(0,i.jsx)(s.p,{children:"Ideally, when you arrive in a new project, you would discover its functionality by looking through the pages and features. When deciding on what should be a feature, optimize for the experience of a newcomer to the project to quickly discover large important areas of code."}),"\n",(0,i.jsxs)(s.p,{children:["A feature slice might contain the UI to perform the interaction like a form (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ui"}),"), the API calls needed to make the action (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 api"}),"), validation and internal state (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 model"}),"), feature flags (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 config"}),")."]}),"\n",(0,i.jsx)(s.h3,{id:"widgets",children:"Widgets"}),"\n",(0,i.jsx)(s.p,{children:"The Widgets layer is intended for large self-sufficient blocks of UI. Widgets are most useful when they are reused across multiple pages, or when the page that they belong to has multiple large independent blocks, and this is one of them."}),"\n",(0,i.jsxs)(s.p,{children:["If a block of UI makes up most of the interesting content on a page, and is never reused, it ",(0,i.jsx)(s.strong,{children:"should not be a widget"}),", and instead it should be placed directly inside that page."]}),"\n",(0,i.jsxs)(s.admonition,{type:"tip",children:[(0,i.jsxs)(s.p,{children:["If you're using a nested routing system (like the router of ",(0,i.jsx)(s.a,{href:"https://remix.run",children:"Remix"}),"), it may be helpful to use the Widgets layer in the same way as a flat routing system would use the Pages layer \u2014 to create full router blocks, complete with related data fetching, loading states, and error boundaries."]}),(0,i.jsx)(s.p,{children:"In the same way, you can store page layouts on this layer."})]}),"\n",(0,i.jsx)(s.h3,{id:"pages",children:"Pages"}),"\n",(0,i.jsx)(s.p,{children:"Pages are what makes up websites and applications (also known as screens or activities). One page usually corresponds to one slice, however, if there are several very similar pages, they can be grouped into one slice, for example, registration and login forms."}),"\n",(0,i.jsx)(s.p,{children:"There's no limit to how much code you can place in a page slice as long as your team still finds it easy to navigate. If a UI block on a page is not reused, it's perfectly fine to keep it inside the page slice."}),"\n",(0,i.jsxs)(s.p,{children:["In a page slice you can typically find the page's UI as well as loading states and error boundaries (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 ui"}),") and the data fetching and mutating requests (",(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 api"}),"). It's not common for a page to have a dedicated data model, and tiny bits of state can be kept in the components themselves."]}),"\n",(0,i.jsx)(s.h3,{id:"processes",children:"Processes"}),"\n",(0,i.jsx)(s.admonition,{type:"caution",children:(0,i.jsxs)(s.p,{children:["This layer has been deprecated. The current version of the spec recommends avoiding it and moving its contents to ",(0,i.jsx)(s.code,{children:"features"})," and ",(0,i.jsx)(s.code,{children:"app"})," instead."]})}),"\n",(0,i.jsx)(s.p,{children:"Processes are escape hatches for multi-page interactions."}),"\n",(0,i.jsx)(s.p,{children:"This layer is deliberately left undefined. Most applications should not use this layer, and keep router-level and server-level logic on the App layer. Consider using this layer only when the App layer grows large enough to become unmaintainable and needs unloading."}),"\n",(0,i.jsx)(s.h3,{id:"app",children:"App"}),"\n",(0,i.jsx)(s.p,{children:"All kinds of app-wide matters, both in the technical sense (e.g., context providers) and in the business sense (e.g., analytics)."}),"\n",(0,i.jsx)(s.p,{children:"This layer usually doesn't contain slices, as well as Shared, instead having segments directly."}),"\n",(0,i.jsx)(s.p,{children:"Here are the segments that you can typically find in this layer:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 routes"})," \u2014 the router configuration"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 store"})," \u2014 global store configuration"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 styles"})," \u2014 global styles"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"\uD83D\uDCC1 entrypoint"})," \u2014 the entrypoint to the application code, framework-specific"]}),"\n"]})]})}function h(e={}){let{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},9938:function(e,s,n){n.d(s,{Z:function(){return o},a:function(){return a}});var t=n(5271);let i={},r=t.createContext(i);function a(e){let s=t.useContext(r);return t.useMemo(function(){return"function"==typeof e?e(s):{...s,...e}},[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);