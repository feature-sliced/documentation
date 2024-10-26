"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[9648],{8673:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var t=n(6070),i=n(1100);const r={sidebar_position:10},c="SvelteKit\u3068\u306e\u4f75\u7528",l={id:"guides/tech/with-sveltekit",title:"SvelteKit\u3068\u306e\u4f75\u7528",description:"SvelteKit\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3067FSD\u3092\u5b9f\u88c5\u3059\u308b\u3053\u3068\u306f\u53ef\u80fd\u3067\u3059\u304c\u3001SvelteKit\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u69cb\u9020\u8981\u4ef6\u3068FSD\u306e\u539f\u5247\u306e\u9055\u3044\u306b\u3088\u308a\u3001\u4ee5\u4e0b\u306e2\u70b9\u3067\u30b3\u30f3\u30d5\u30ea\u30af\u30c8\u304c\u767a\u751f\u3057\u3066\u3057\u307e\u3044\u307e\u3059\u3002",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/guides/tech/with-sveltekit.mdx",sourceDirName:"guides/tech",slug:"/guides/tech/with-sveltekit",permalink:"/ja/docs/guides/tech/with-sveltekit",draft:!1,unlisted:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/ja/docusaurus-plugin-content-docs/current/guides/tech/with-sveltekit.mdx",tags:[],version:"current",lastUpdatedAt:1729962379e3,sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"guidesSidebar",previous:{title:"React Query\u3068\u306e\u4f75\u7528",permalink:"/ja/docs/guides/tech/with-react-query"},next:{title:"\u30c7\u30bb\u30b0\u30e1\u30f3\u30c6\u30fc\u30b7\u30e7\u30f3",permalink:"/ja/docs/guides/issues/desegmented"}},d={},a=[{value:"\u30b3\u30f3\u30d5\u30a3\u30b0\u30d5\u30a1\u30a4\u30eb\u306e\u8a2d\u5b9a",id:"\u30b3\u30f3\u30d5\u30a3\u30b0\u30d5\u30a1\u30a4\u30eb\u306e\u8a2d\u5b9a",level:2},{value:"<code>src/app</code>\u5185\u3078\u306e\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306e\u79fb\u52d5",id:"srcapp\u5185\u3078\u306e\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306e\u79fb\u52d5",level:2},{value:"\u53c2\u7167",id:"\u53c2\u7167",level:2}];function o(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"sveltekit\u3068\u306e\u4f75\u7528",children:"SvelteKit\u3068\u306e\u4f75\u7528"})}),"\n",(0,t.jsx)(s.p,{children:"SvelteKit\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3067FSD\u3092\u5b9f\u88c5\u3059\u308b\u3053\u3068\u306f\u53ef\u80fd\u3067\u3059\u304c\u3001SvelteKit\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u69cb\u9020\u8981\u4ef6\u3068FSD\u306e\u539f\u5247\u306e\u9055\u3044\u306b\u3088\u308a\u3001\u4ee5\u4e0b\u306e2\u70b9\u3067\u30b3\u30f3\u30d5\u30ea\u30af\u30c8\u304c\u767a\u751f\u3057\u3066\u3057\u307e\u3044\u307e\u3059\u3002"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["SvelteKit\u306f",(0,t.jsx)(s.code,{children:"src/routes"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u5185\u3067\u30d5\u30a1\u30a4\u30eb\u69cb\u9020\u3092\u4f5c\u6210\u3059\u308b\u3053\u3068\u3092\u63d0\u6848\u3057\u3066\u3044\u308b\u304c\u3001FSD\u3067\u306f\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306f",(0,t.jsx)(s.code,{children:"app"}),"\u5c64\u306e\u4e00\u90e8\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308b"]}),"\n",(0,t.jsxs)(s.li,{children:["SvelteKit\u306f\u3001\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306b\u95a2\u4fc2\u306e\u306a\u3044\u3059\u3079\u3066\u306e\u3082\u306e\u3092",(0,t.jsx)(s.code,{children:"src/lib"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u306b\u5165\u308c\u308b\u3053\u3068\u3092\u63d0\u6848\u3057\u3066\u3044\u308b"]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"\u30b3\u30f3\u30d5\u30a3\u30b0\u30d5\u30a1\u30a4\u30eb\u306e\u8a2d\u5b9a",children:"\u30b3\u30f3\u30d5\u30a3\u30b0\u30d5\u30a1\u30a4\u30eb\u306e\u8a2d\u5b9a"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-ts",metastring:'title="svelte.config.ts"',children:"import adapter from '@sveltejs/adapter-auto';\nimport { vitePreprocess } from '@sveltejs/vite-plugin-svelte';\n\n/** @type {import('@sveltejs/kit').Config}*/\nconst config = {\n  preprocess: [vitePreprocess()],\n  kit: {\n    adapter: adapter(),\n    files: {\n      routes: 'src/app/routes', // \u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u3092app\u5c64\u5185\u306b\u79fb\u52d5\n      lib: 'src',\n      appTemplate: 'src/app/index.html', // \u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306e\u30a8\u30f3\u30c8\u30ea\u30fc\u30dd\u30a4\u30f3\u30c8\u3092app\u5c64\u5185\u306b\u79fb\u52d5\n      assets: 'public'\n    },\n    alias: {\n        '@/*': 'src/*' // src\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u30a8\u30a4\u30ea\u30a2\u30b9\u3092\u4f5c\u6210\n    }\n  }\n};\nexport default config;\n"})}),"\n",(0,t.jsxs)(s.h2,{id:"srcapp\u5185\u3078\u306e\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306e\u79fb\u52d5",children:[(0,t.jsx)(s.code,{children:"src/app"}),"\u5185\u3078\u306e\u30d5\u30a1\u30a4\u30eb\u30eb\u30fc\u30c6\u30a3\u30f3\u30b0\u306e\u79fb\u52d5"]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"app"}),"\u5c64\u3092\u4f5c\u6210\u3057\u3001\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306e\u30a8\u30f3\u30c8\u30ea\u30fc\u30dd\u30a4\u30f3\u30c8\u3067\u3042\u308b",(0,t.jsx)(s.code,{children:"index.html"}),"\u3092\u79fb\u52d5\u3057\u3001",(0,t.jsx)(s.code,{children:"routes"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u3092\u4f5c\u6210\u3057\u307e\u3059\u3002\n\u6700\u7d42\u7684\u306b\u30d5\u30a1\u30a4\u30eb\u69cb\u9020\u306f\u6b21\u306e\u3088\u3046\u306b\u306a\u308a\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sh",children:"\u251c\u2500\u2500 src\n\u2502   \u251c\u2500\u2500 app\n\u2502   \u2502   \u251c\u2500\u2500 index.html\n\u2502   \u2502   \u251c\u2500\u2500 routes\n\u2502   \u251c\u2500\u2500 pages # FSD\u306b\u5272\u308a\u5f53\u3066\u3089\u308c\u305fpages\u30d5\u30a9\u30eb\u30c0\u30fc\n"})}),"\n",(0,t.jsxs)(s.p,{children:["\u3053\u308c\u3067\u3001",(0,t.jsx)(s.code,{children:"app"}),"\u5185\u306b\u30da\u30fc\u30b8\u306e\u30eb\u30fc\u30c8\u3092\u4f5c\u6210\u3057\u305f\u308a\u3001",(0,t.jsx)(s.code,{children:"pages"}),"\u304b\u3089\u306e\u30da\u30fc\u30b8\u3092\u30eb\u30fc\u30c8\u306b\u63a5\u7d9a\u3057\u305f\u308a\u3067\u304d\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(s.p,{children:"\u4f8b\u3048\u3070\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306b\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u3092\u8ffd\u52a0\u3059\u308b\u306b\u306f\u3001\u6b21\u306e\u624b\u9806\u3092\u5b9f\u884c\u3057\u307e\u3059\u3002"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"pages"}),"\u5c64\u5185\u306b\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u30b9\u30e9\u30a4\u30b9\u3092\u8ffd\u52a0\u3059\u308b"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"app"}),"\u5c64\u306e",(0,t.jsx)(s.code,{children:"routes"}),"\u30d5\u30a9\u30eb\u30c0\u30fc\u306b\u5bfe\u5fdc\u3059\u308b\u30eb\u30fc\u30c8\u3092\u8ffd\u52a0\u3059\u308b"]}),"\n",(0,t.jsx)(s.li,{children:"\u30b9\u30e9\u30a4\u30b9\u306e\u30da\u30fc\u30b8\u3068\u30eb\u30fc\u30c8\u3092\u7d71\u5408\u3059\u308b"}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u30b9\u30e9\u30a4\u30b9\u3092\u4f5c\u6210\u3059\u308b\u306b\u306f\u3001",(0,t.jsx)(s.a,{href:"https://github.com/feature-sliced/cli",children:"CLI"}),"\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-shell",children:"fsd pages home\n"})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"ui"}),"\u30bb\u30b0\u30e1\u30f3\u30c8\u5185\u306b",(0,t.jsx)(s.code,{children:"home-page.svelte"}),"\u30d5\u30a1\u30a4\u30eb\u3092\u4f5c\u6210\u3057\u3001\u516c\u958bAPI\u3092\u4ecb\u3057\u3066\u30a2\u30af\u30bb\u30b9\u3067\u304d\u308b\u3088\u3046\u306b\u3057\u307e\u3059\u3002\u3000"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-ts",metastring:'title="src/pages/home/index.ts"',children:"export { default as HomePage } from './ui/home-page';\n"})}),"\n",(0,t.jsxs)(s.p,{children:["\u3053\u306e\u30da\u30fc\u30b8\u306e\u30eb\u30fc\u30c8\u3092",(0,t.jsx)(s.code,{children:"app"}),"\u5c64\u5185\u306b\u4f5c\u6210\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sh",children:"\n\u251c\u2500\u2500 src\n\u2502   \u251c\u2500\u2500 app\n\u2502   \u2502   \u251c\u2500\u2500 routes\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 +page.svelte\n\u2502   \u2502   \u251c\u2500\u2500 index.html\n\u2502   \u251c\u2500\u2500 pages\n\u2502   \u2502   \u251c\u2500\u2500 home\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 ui\n\u2502   \u2502   \u2502   \u2502   \u251c\u2500\u2500 home-page.svelte\n\u2502   \u2502   \u2502   \u251c\u2500\u2500 index.ts\n"})}),"\n",(0,t.jsxs)(s.p,{children:["\u6700\u5f8c\u306b",(0,t.jsx)(s.code,{children:"index.svelte"}),"\u30d5\u30a1\u30a4\u30eb\u5185\u306b\u30da\u30fc\u30b8\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u3092\u8ffd\u52a0\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-html",metastring:'title="src/app/routes/+page.svelte"',children:"<script>\n  import { HomePage } from '@/pages/home';\n<\/script>\n\n\n<HomePage/>\n"})}),"\n",(0,t.jsx)(s.h2,{id:"\u53c2\u7167",children:"\u53c2\u7167"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:(0,t.jsx)(s.a,{href:"https://kit.svelte.dev/docs/configuration#files",children:"SvelteKit\u306e\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u8a2d\u5b9a\u5909\u66f4\u306b\u95a2\u3059\u308b\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8"})}),"\n"]})]})}function p(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},1100:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>l});var t=n(758);const i={},r=t.createContext(i);function c(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);