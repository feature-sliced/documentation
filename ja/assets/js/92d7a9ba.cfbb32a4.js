"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[9840],{1058:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>d,toc:()=>o});var t=s(6070),c=s(1100);const r={sidebar_position:10},i="NuxtJS\u3068\u306e\u4f75\u7528",d={id:"guides/tech/with-nuxtjs",title:"NuxtJS\u3068\u306e\u4f75\u7528",description:"NuxtJS\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3067FSD\u3092\u5b9f\u88c5\u3059\u308b\u3053\u3068\u306f\u53ef\u80fd\u3067\u3059\u304c\u3001NuxtJS\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u69cb\u9020\u8981\u4ef6\u3068FSD\u306e\u539f\u5247\u306e\u9055\u3044\u306b\u3088\u308a\u3001\u4ee5\u4e0b\u306e2\u70b9\u3067\u30b3\u30f3\u30d5\u30ea\u30af\u30c8\u304c\u767a\u751f\u3057\u3066\u3057\u307e\u3044\u307e\u3059\u3002",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/guides/tech/with-nuxtjs.mdx",sourceDirName:"guides/tech",slug:"/guides/tech/with-nuxtjs",permalink:"/ja/docs/guides/tech/with-nuxtjs",draft:!1,unlisted:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/ja/docusaurus-plugin-content-docs/current/guides/tech/with-nuxtjs.mdx",tags:[],version:"current",lastUpdatedAt:1729962379e3,sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"guidesSidebar",previous:{title:"NextJS\u3068\u306e\u4f75\u7528",permalink:"/ja/docs/guides/tech/with-nextjs"},next:{title:"React Query\u3068\u306e\u4f75\u7528",permalink:"/ja/docs/guides/tech/with-react-query"}},l={},o=[{value:"<code>src</code>\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u30a8\u30a4\u30ea\u30a2\u30b9\u3092\u8ffd\u52a0\u3059\u308b",id:"src\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u30a8\u30a4\u30ea\u30a2\u30b9\u3092\u8ffd\u52a0\u3059\u308b",level:2},{value:"\u30eb\u30fc\u30bf\u30fc\u8a2d\u5b9a\u65b9\u6cd5\u306e\u9078\u629e",id:"\u30eb\u30fc\u30bf\u30fc\u8a2d\u5b9a\u65b9\u6cd5\u306e\u9078\u629e",level:2},{value:"\u30b3\u30f3\u30d5\u30a3\u30b0\u306b\u3088\u308b\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0",id:"\u30b3\u30f3\u30d5\u30a3\u30b0\u306b\u3088\u308b\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0",level:3},{value:"\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0",id:"\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0",level:3},{value:"<code>layouts</code>\u306b\u3064\u3044\u3066",id:"layouts\u306b\u3064\u3044\u3066",level:2},{value:"\u53c2\u7167",id:"\u53c2\u7167",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"nuxtjs\u3068\u306e\u4f75\u7528",children:"NuxtJS\u3068\u306e\u4f75\u7528"})}),"\n",(0,t.jsx)(n.p,{children:"NuxtJS\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3067FSD\u3092\u5b9f\u88c5\u3059\u308b\u3053\u3068\u306f\u53ef\u80fd\u3067\u3059\u304c\u3001NuxtJS\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u69cb\u9020\u8981\u4ef6\u3068FSD\u306e\u539f\u5247\u306e\u9055\u3044\u306b\u3088\u308a\u3001\u4ee5\u4e0b\u306e2\u70b9\u3067\u30b3\u30f3\u30d5\u30ea\u30af\u30c8\u304c\u767a\u751f\u3057\u3066\u3057\u307e\u3044\u307e\u3059\u3002"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["NuxtJS\u306f",(0,t.jsx)(n.code,{children:"src"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u306a\u3057\u3067\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306e\u30d5\u30a1\u30a4\u30eb\u69cb\u9020\u3092\u63d0\u4f9b\u3057\u3066\u3044\u308b\u3002\u3064\u307e\u308a\u3001\u30d5\u30a1\u30a4\u30eb\u69cb\u9020\u304c\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306e\u30eb\u30fc\u30c8\u306b\u914d\u7f6e\u3055\u308c\u308b\u3002"]}),"\n",(0,t.jsxs)(n.li,{children:["\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306f",(0,t.jsx)(n.code,{children:"pages"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u306b\u3042\u308b\u304c\u3001FSD\u3067\u306f\u3053\u306e\u30d5\u30a9\u30eb\u30c0\u30fc\u306f\u30d5\u30e9\u30c3\u30c8\u306a\u30b9\u30e9\u30a4\u30b9\u69cb\u9020\u306b\u5272\u308a\u5f53\u3066\u3089\u308c\u3066\u3044\u308b\u3002"]}),"\n"]}),"\n",(0,t.jsxs)(n.h2,{id:"src\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u30a8\u30a4\u30ea\u30a2\u30b9\u3092\u8ffd\u52a0\u3059\u308b",children:[(0,t.jsx)(n.code,{children:"src"}),"\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u30a8\u30a4\u30ea\u30a2\u30b9\u3092\u8ffd\u52a0\u3059\u308b"]}),"\n",(0,t.jsxs)(n.p,{children:["\u8a2d\u5b9a\u30d5\u30a1\u30a4\u30eb\u306b",(0,t.jsx)(n.code,{children:"alias"}),"\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u8ffd\u52a0\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"export default defineNuxtConfig({\n  devtools: { enabled: true }, // FSD\u306b\u306f\u95a2\u4fc2\u306a\u304f\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u8d77\u52d5\u6642\u306b\u6709\u52b9\n  alias: {\n    \"@\": '../src'\n  },\n})\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u30eb\u30fc\u30bf\u30fc\u8a2d\u5b9a\u65b9\u6cd5\u306e\u9078\u629e",children:"\u30eb\u30fc\u30bf\u30fc\u8a2d\u5b9a\u65b9\u6cd5\u306e\u9078\u629e"}),"\n",(0,t.jsxs)(n.p,{children:["NuxtJS\u306b\u306f\u3001\u30b3\u30f3\u30d5\u30a3\u30b0\u3092\u4f7f\u7528\u3059\u308b\u65b9\u6cd5\u3068\u30d5\u30a1\u30a4\u30eb\u69cb\u9020\u3092\u4f7f\u7528\u3059\u308b\u65b9\u6cd5\u306e2\u3064\u306e\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u8a2d\u5b9a\u65b9\u6cd5\u304c\u3042\u308a\u307e\u3059\u3002\n\u30d5\u30a1\u30a4\u30eb\u30d9\u30fc\u30b9\u306e\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306e\u5834\u5408\u3001",(0,t.jsx)(n.code,{children:"app/routes"}),"\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u5185\u306b",(0,t.jsx)(n.code,{children:"index.vue"}),"\u30d5\u30a1\u30a4\u30eb\u3092\u4f5c\u6210\u3057\u307e\u3059\u3002\u4e00\u65b9\u3001\u30b3\u30f3\u30d5\u30a3\u30b0\u3092\u4f7f\u7528\u3059\u308b\u5834\u5408\u306f\u3001",(0,t.jsx)(n.code,{children:"router.options.ts"}),"\u30d5\u30a1\u30a4\u30eb\u3067\u30eb\u30fc\u30c8\u3092\u8a2d\u5b9a\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.h3,{id:"\u30b3\u30f3\u30d5\u30a3\u30b0\u306b\u3088\u308b\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0",children:"\u30b3\u30f3\u30d5\u30a3\u30b0\u306b\u3088\u308b\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u306b",(0,t.jsx)(n.code,{children:"router.options.ts"}),"\u30d5\u30a1\u30a4\u30eb\u3092\u4f5c\u6210\u3057\u3001\u8a2d\u5b9a\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="app/router.options.ts"',children:"import type { RouterConfig } from '@nuxt/schema';\n\nexport default <RouterConfig> {\n  routes: (_routes) => [],\n};\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306b\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u3092\u8ffd\u52a0\u3059\u308b\u306b\u306f\u3001\u6b21\u306e\u624b\u9806\u3092\u884c\u3044\u307e\u3059\u3002"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"pages"}),"\u5c64\u5185\u306b\u30da\u30fc\u30b8\u30b9\u30e9\u30a4\u30b9\u3092\u8ffd\u52a0\u3059\u308b"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"app/router.config.ts"}),"\u306e\u30b3\u30f3\u30d5\u30a3\u30b0\u306b\u9069\u5207\u306a\u30eb\u30fc\u30c8\u3092\u8ffd\u52a0\u3059\u308b"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["\u30da\u30fc\u30b8\u30b9\u30e9\u30a4\u30b9\u3092\u4f5c\u6210\u3059\u308b\u306b\u306f\u3001",(0,t.jsx)(n.a,{href:"https://github.com/feature-sliced/cli",children:"CLI"}),"\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"fsd pages home\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"home-page.vue"}),"\u30d5\u30a1\u30a4\u30eb\u3092",(0,t.jsx)(n.code,{children:"ui"}),"\u30bb\u30b0\u30e1\u30f3\u30c8\u5185\u306b\u4f5c\u6210\u3057\u3001\u516c\u958bAPI\u3092\u4ecb\u3057\u3066\u30a2\u30af\u30bb\u30b9\u3067\u304d\u308b\u3088\u3046\u306b\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="src/pages/home/index.ts"',children:"export { default as HomePage } from './ui/home-page';\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u3053\u306e\u3088\u3046\u306b\u3001\u30d5\u30a1\u30a4\u30eb\u69cb\u9020\u306f\u6b21\u306e\u3088\u3046\u306b\u306a\u308a\u307e\u3059\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"|\u2500\u2500 src\n\u2502   \u251c\u2500\u2500 app\n\u2502   \u2502   \u251c\u2500\u2500 router.config.ts\n\u2502   \u251c\u2500\u2500 pages\n\u2502   \u2502   \u251c\u2500\u2500 home\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 ui\n\u2502   \u2502   \u2502   \u2502   \u251c\u2500\u2500 home-page.vue\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 index.ts\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u6700\u5f8c\u306b\u3001\u30eb\u30fc\u30c8\u3092\u30b3\u30f3\u30d5\u30a3\u30b0\u306b\u8ffd\u52a0\u3057\u307e\u3059\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="app/router.config.ts"',children:"import type { RouterConfig } from '@nuxt/schema'\n\nexport default <RouterConfig> {\n  routes: (_routes) => [\n    {\n      name: 'home',\n      path: '/',\n      component: () => import('@/pages/home.vue').then(r => r.default || r)\n    }\n  ],\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0",children:"\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0"}),"\n",(0,t.jsxs)(n.p,{children:["\u307e\u305a\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306e\u30eb\u30fc\u30c8\u306b",(0,t.jsx)(n.code,{children:"src"}),"\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3092\u4f5c\u6210\u3057\u3001\u305d\u306e\u4e2d\u306b",(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u3068",(0,t.jsx)(n.code,{children:"pages"}),"\u5c64\u306e\u30ec\u30a4\u30e4\u30fc\u3001",(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u5185\u306b",(0,t.jsx)(n.code,{children:"routes"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u3092\u4f5c\u6210\u3057\u307e\u3059\u3002\n\u3053\u306e\u3088\u3046\u306b\u3001\u30d5\u30a1\u30a4\u30eb\u69cb\u9020\u306f\u6b21\u306e\u3088\u3046\u306b\u306a\u308a\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"\u251c\u2500\u2500 src\n\u2502   \u251c\u2500\u2500 app\n\u2502   \u2502   \u251c\u2500\u2500 routes\n\u2502   \u251c\u2500\u2500 pages # FSD\u306b\u5272\u308a\u5f53\u3066\u3089\u308c\u305fpages\u30d5\u30a9\u30eb\u30c0\u30fc\n"})}),"\n",(0,t.jsxs)(n.p,{children:["NuxtJS\u304c",(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u5185\u306e",(0,t.jsx)(n.code,{children:"routes"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u3092\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306b\u4f7f\u7528\u3059\u308b\u306b\u306f\u3001",(0,t.jsx)(n.code,{children:"nuxt.config.ts"}),"\u3092\u6b21\u306e\u3088\u3046\u306b\u5909\u66f4\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="nuxt.config.ts"',children:"export default defineNuxtConfig({\n  devtools: { enabled: true }, // FSD\u306b\u306f\u95a2\u4fc2\u306a\u304f\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u8d77\u52d5\u6642\u306b\u6709\u52b9\n  alias: {\n    \"@\": '../src'\n  },\n  dir: {\n    pages: './src/app/routes'\n  }\n})\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u3053\u308c\u3067\u3001",(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u5185\u306e\u30da\u30fc\u30b8\u306b\u5bfe\u3057\u3066\u30eb\u30fc\u30c8\u3092\u4f5c\u6210\u3057\u3001",(0,t.jsx)(n.code,{children:"pages"}),"\u5c64\u304b\u3089\u30da\u30fc\u30b8\u3092\u63a5\u7d9a\u3067\u304d\u307e\u3059\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:["\u4f8b\u3048\u3070\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306b",(0,t.jsx)(n.code,{children:"Home"}),"\u30da\u30fc\u30b8\u3092\u8ffd\u52a0\u3059\u308b\u306b\u306f\u3001\u6b21\u306e\u624b\u9806\u3092\u884c\u3044\u307e\u3059\u3002"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"pages"}),"\u5c64\u5185\u306b\u30da\u30fc\u30b8\u30b9\u30e9\u30a4\u30b9\u3092\u8ffd\u52a0\u3059\u308b"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u5185\u306b\u9069\u5207\u306a\u30eb\u30fc\u30c8\u3092\u8ffd\u52a0\u3059\u308b"]}),"\n",(0,t.jsx)(n.li,{children:"\u30b9\u30e9\u30a4\u30b9\u306e\u30da\u30fc\u30b8\u3068\u30eb\u30fc\u30c8\u3092\u7d71\u5408\u3059\u308b"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["\u30da\u30fc\u30b8\u30b9\u30e9\u30a4\u30b9\u3092\u4f5c\u6210\u3059\u308b\u306b\u306f\u3001",(0,t.jsx)(n.a,{href:"https://github.com/feature-sliced/cli",children:"CLI"}),"\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"fsd pages home\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"home-page.vue"}),"\u30d5\u30a1\u30a4\u30eb\u3092",(0,t.jsx)(n.code,{children:"ui"}),"\u30bb\u30b0\u30e1\u30f3\u30c8\u5185\u306b\u4f5c\u6210\u3057\u3001\u516c\u958bAPI\u3092\u4ecb\u3057\u3066\u30a2\u30af\u30bb\u30b9\u3067\u304d\u308b\u3088\u3046\u306b\u3057\u307e\u3059\u3002\u3000"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="src/pages/home/index.ts"',children:"export { default as HomePage } from './ui/home-page';\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u3053\u306e\u30da\u30fc\u30b8\u306e\u30eb\u30fc\u30c8\u3092",(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u5185\u306b\u4f5c\u6210\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"\n\u251c\u2500\u2500 src\n\u2502   \u251c\u2500\u2500 app\n\u2502   \u2502   \u251c\u2500\u2500 routes\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 index.vue\n\u2502   \u251c\u2500\u2500 pages\n\u2502   \u2502   \u251c\u2500\u2500 home\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 ui\n\u2502   \u2502   \u2502   \u2502   \u251c\u2500\u2500 home-page.vue\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 index.ts\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"index.vue"}),"\u30d5\u30a1\u30a4\u30eb\u5185\u306b\u30da\u30fc\u30b8\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u3092\u8ffd\u52a0\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",metastring:'title="src/app/routes/index.vue"',children:"<script setup>\n  import { HomePage } from '@/pages/home';\n<\/script>\n\n<template>\n  <HomePage/>\n</template>\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"layouts\u306b\u3064\u3044\u3066",children:[(0,t.jsx)(n.code,{children:"layouts"}),"\u306b\u3064\u3044\u3066"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"layouts"}),"\u306f",(0,t.jsx)(n.code,{children:"app"}),"\u5c64\u5185\u306b\u914d\u7f6e\u3067\u304d\u307e\u3059\u3002\u305d\u306e\u305f\u3081\u306b\u306f\u3001\u30b3\u30f3\u30d5\u30a3\u30b0\u3092\u6b21\u306e\u3088\u3046\u306b\u5909\u66f4\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="nuxt.config.ts"',children:"export default defineNuxtConfig({\n  devtools: { enabled: true }, // FSD\u306b\u306f\u95a2\u4fc2\u306a\u304f\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u8d77\u52d5\u6642\u306b\u6709\u52b9\n  alias: {\n    \"@\": '../src'\n  },\n  dir: {\n    pages: './src/app/routes',\n    layouts: './src/app/layouts'\n  }\n})\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u53c2\u7167",children:"\u53c2\u7167"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://nuxt.com/docs/api/nuxt-config#dir",children:"NuxtJS\u306e\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u8a2d\u5b9a\u5909\u66f4\u306b\u95a2\u3059\u308b\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://nuxt.com/docs/guide/recipes/custom-routing#router-config",children:"NuxtJS\u306e\u30eb\u30fc\u30bf\u30fc\u8a2d\u5b9a\u5909\u66f4\u306b\u95a2\u3059\u308b\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://nuxt.com/docs/api/nuxt-config#alias",children:"NuxtJS\u306e\u30a8\u30a4\u30ea\u30a2\u30b9\u8a2d\u5b9a\u5909\u66f4\u306b\u95a2\u3059\u308b\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},1100:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>d});var t=s(758);const c={},r=t.createContext(c);function i(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);