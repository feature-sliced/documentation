"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[6778],{9300:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var s=t(6070),i=t(1100);const r={sidebar_position:10},o="React Query\u3068\u306e\u4f75\u7528",a={id:"guides/tech/with-react-query",title:"React Query\u3068\u306e\u4f75\u7528",description:"\u30ad\u30fc\u3092\u3069\u3053\u306b\u7f6e\u304f\u304b\u554f\u984c",source:"@site/i18n/ja/docusaurus-plugin-content-docs/current/guides/tech/with-react-query.mdx",sourceDirName:"guides/tech",slug:"/guides/tech/with-react-query",permalink:"/ja/docs/guides/tech/with-react-query",draft:!1,unlisted:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/ja/docusaurus-plugin-content-docs/current/guides/tech/with-react-query.mdx",tags:[],version:"current",lastUpdatedAt:1729962379e3,sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"guidesSidebar",previous:{title:"NuxtJS\u3068\u306e\u4f75\u7528",permalink:"/ja/docs/guides/tech/with-nuxtjs"},next:{title:"SvelteKit\u3068\u306e\u4f75\u7528",permalink:"/ja/docs/guides/tech/with-sveltekit"}},l={},d=[{value:"\u30ad\u30fc\u3092\u3069\u3053\u306b\u7f6e\u304f\u304b\u554f\u984c",id:"\u30ad\u30fc\u3092\u3069\u3053\u306b\u7f6e\u304f\u304b\u554f\u984c",level:2},{value:"\u89e3\u6c7a\u7b56 - \u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3054\u3068\u306b\u5206\u5272\u3059\u308b",id:"\u89e3\u6c7a\u7b56---\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3054\u3068\u306b\u5206\u5272\u3059\u308b",level:3},{value:"\u4ee3\u66ff\u6848 \u2014 \u30af\u30a8\u30ea\u3092\u516c\u958b\u3067\u4fdd\u5b58\u3059\u308b",id:"\u4ee3\u66ff\u6848--\u30af\u30a8\u30ea\u3092\u516c\u958b\u3067\u4fdd\u5b58\u3059\u308b",level:3},{value:"\u554f\u984c\u300c\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u306f\u3069\u3053\u306b\uff1f\u300d",id:"\u554f\u984c\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u306f\u3069\u3053\u306b",level:2},{value:"1. \u4f7f\u7528\u5834\u6240\u306e\u8fd1\u304f\u306bAPI\u30bb\u30b0\u30e1\u30f3\u30c8\u306b\u30ab\u30b9\u30bf\u30e0\u30d5\u30c3\u30af\u3092\u5b9a\u7fa9\u3059\u308b",id:"1-\u4f7f\u7528\u5834\u6240\u306e\u8fd1\u304f\u306bapi\u30bb\u30b0\u30e1\u30f3\u30c8\u306b\u30ab\u30b9\u30bf\u30e0\u30d5\u30c3\u30af\u3092\u5b9a\u7fa9\u3059\u308b",level:3},{value:"2. \u5225\u306e\u5834\u6240\uff08Shared\u5c64\u3084Entities\u5c64\uff09\u306b\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u95a2\u6570\u3092\u5b9a\u7fa9\u3057\u3001\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u5185\u3067<code>useMutation</code>\u3092\u76f4\u63a5\u4f7f\u7528\u3059\u308b",id:"2-\u5225\u306e\u5834\u6240shared\u5c64\u3084entities\u5c64\u306b\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u95a2\u6570\u3092\u5b9a\u7fa9\u3057\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u5185\u3067usemutation\u3092\u76f4\u63a5\u4f7f\u7528\u3059\u308b",level:3},{value:"\u30af\u30a8\u30ea\u306e\u7d44\u7e54\u5316",id:"\u30af\u30a8\u30ea\u306e\u7d44\u7e54\u5316",level:2},{value:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc",id:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc",level:3},{value:"1. \u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u4f5c\u6210",id:"1-\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u4f5c\u6210",level:3},{value:"2. \u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u9069\u7528",id:"2-\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u9069\u7528",level:3},{value:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u3092\u4f7f\u7528\u3059\u308b\u5229\u70b9",id:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u3092\u4f7f\u7528\u3059\u308b\u5229\u70b9",level:3},{value:"\u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3",id:"\u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3",level:2},{value:"1. <code>getPosts</code>\u95a2\u6570\u306e\u4f5c\u6210",id:"1-getposts\u95a2\u6570\u306e\u4f5c\u6210",level:3},{value:"2. \u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3\u7528\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc",id:"2-\u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3\u7528\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc",level:3},{value:"3. \u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u4f7f\u7528",id:"3-\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u4f7f\u7528",level:3},{value:"\u30af\u30a8\u30ea\u7ba1\u7406\u7528\u306e<code>QueryProvider</code>",id:"\u30af\u30a8\u30ea\u7ba1\u7406\u7528\u306equeryprovider",level:2},{value:"1. <code>QueryProvider</code>\u306e\u4f5c\u6210",id:"1-queryprovider\u306e\u4f5c\u6210",level:3},{value:"2. <code>QueryClient</code>\u306e\u4f5c\u6210",id:"2-queryclient\u306e\u4f5c\u6210",level:3},{value:"\u30b3\u30fc\u30c9\u751f\u6210",id:"\u30b3\u30fc\u30c9\u751f\u6210",level:2},{value:"RQ\u306e\u6574\u7406\u306b\u95a2\u3059\u308b\u8ffd\u52a0\u306e\u30a2\u30c9\u30d0\u30a4\u30b9",id:"rq\u306e\u6574\u7406\u306b\u95a2\u3059\u308b\u8ffd\u52a0\u306e\u30a2\u30c9\u30d0\u30a4\u30b9",level:2},{value:"API\u30af\u30e9\u30a4\u30a2\u30f3\u30c8",id:"api\u30af\u30e9\u30a4\u30a2\u30f3\u30c8",level:3},{value:"\u53c2\u7167",id:"see-also",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"react-query\u3068\u306e\u4f75\u7528",children:"React Query\u3068\u306e\u4f75\u7528"})}),"\n",(0,s.jsx)(n.h2,{id:"\u30ad\u30fc\u3092\u3069\u3053\u306b\u7f6e\u304f\u304b\u554f\u984c",children:"\u30ad\u30fc\u3092\u3069\u3053\u306b\u7f6e\u304f\u304b\u554f\u984c"}),"\n",(0,s.jsx)(n.h3,{id:"\u89e3\u6c7a\u7b56---\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3054\u3068\u306b\u5206\u5272\u3059\u308b",children:"\u89e3\u6c7a\u7b56 - \u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3054\u3068\u306b\u5206\u5272\u3059\u308b"}),"\n",(0,s.jsx)(n.p,{children:"\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306b\u3059\u3067\u306b\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u306e\u5206\u5272\u304c\u3042\u308a\u3001\u5404\u30af\u30a8\u30ea\u304c1\u3064\u306e\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u308b\u5834\u5408\u3001\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3054\u3068\u306b\u5206\u5272\u3059\u308b\u306e\u304c\u6700\u826f\u3067\u3059\u3002\u3053\u306e\u5834\u5408\u3001\u6b21\u306e\u69cb\u9020\u3092\u4f7f\u7528\u3059\u308b\u3053\u3068\u3092\u304a\u52e7\u3081\u3057\u307e\u3059\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"\u2514\u2500\u2500 src/                                        #\n    \u251c\u2500\u2500 app/                                    #\n    |   ...                                     #\n    \u251c\u2500\u2500 pages/                                  #\n    |   ...                                     #\n    \u251c\u2500\u2500 entities/                               #\n    |     \u251c\u2500\u2500 {entity}/                         #\n    |    ...     \u2514\u2500\u2500 api/                       #\n    |                 \u251c\u2500\u2500 `{entity}.query`      # \u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u3001\u30ad\u30fc\u3068\u95a2\u6570\u304c\u5b9a\u7fa9\u3055\u308c\u3066\u3044\u308b\n    |                 \u251c\u2500\u2500 `get-{entity}`        # \u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3092\u53d6\u5f97\u3059\u308b\u95a2\u6570\n    |                 \u251c\u2500\u2500 `create-{entity}`     # \u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3092\u4f5c\u6210\u3059\u308b\u95a2\u6570\n    |                 \u251c\u2500\u2500 `update-{entity}`     # \u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u66f4\u65b0\u3059\u308b\u95a2\u6570\n    |                 \u251c\u2500\u2500 `delete-{entity}`     # \u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3092\u524a\u9664\u3059\u308b\u95a2\u6570\n    |                ...                        #\n    |                                           #\n    \u251c\u2500\u2500 features/                               #\n    |   ...                                     #\n    \u251c\u2500\u2500 widgets/                                #\n    |   ...                                     #\n    \u2514\u2500\u2500 shared/                                 #\n        ...                                     #\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u3082\u3057\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u9593\u306b\u95a2\u4fc2\u304c\u3042\u308b\u5834\u5408\uff08\u4f8b\u3048\u3070\u3001\u300c\u56fd\u300d\u306e\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u306b\u300c\u90fd\u5e02\u300d\u306e\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u4e00\u89a7\u30d5\u30a3\u30fc\u30eb\u30c9\u304c\u3042\u308b\u5834\u5408\uff09\u3001",(0,s.jsx)(n.code,{children:"@x"})," \u30a2\u30ce\u30c6\u30fc\u30b7\u30e7\u30f3\u3092\u4f7f\u7528\u3057\u305f\u7d44\u7e54\u7684\u306a\u30af\u30ed\u30b9\u30a4\u30f3\u30dd\u30fc\u30c8\u306e",(0,s.jsx)(n.a,{href:"https://github.com/feature-sliced/documentation/discussions/390#discussioncomment-5570073",children:"\u5b9f\u9a13\u7684\u30a2\u30d7\u30ed\u30fc\u30c1"}),"\u3092\u5229\u7528\u3059\u308b\u304b\u3001\u4ee5\u4e0b\u306e\u4ee3\u66ff\u6848\u3092\u691c\u8a0e\u3067\u304d\u307e\u3059\u3002"]}),"\n",(0,s.jsx)(n.h3,{id:"\u4ee3\u66ff\u6848--\u30af\u30a8\u30ea\u3092\u516c\u958b\u3067\u4fdd\u5b58\u3059\u308b",children:"\u4ee3\u66ff\u6848 \u2014 \u30af\u30a8\u30ea\u3092\u516c\u958b\u3067\u4fdd\u5b58\u3059\u308b"}),"\n",(0,s.jsx)(n.p,{children:"\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3054\u3068\u306e\u5206\u5272\u304c\u9069\u3055\u306a\u3044\u5834\u5408\u3001\u6b21\u306e\u69cb\u9020\u3092\u8003\u616e\u3067\u304d\u307e\u3059\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"\u2514\u2500\u2500 src/                                        #\n   ...                                          #\n    \u2514\u2500\u2500 shared/                                 #\n          \u251c\u2500\u2500 api/                              #\n         ...   \u251c\u2500\u2500 `queries`                    # \u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\n               |      \u251c\u2500\u2500 `document.ts`         #\n               |      \u251c\u2500\u2500 `background-jobs.ts`  #\n               |     ...                        #\n               \u2514\u2500\u2500  index.ts                    #\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u6b21\u306b\u3001",(0,s.jsx)(n.code,{children:"@/shared/api/index.ts"}),"\u306b"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="@/shared/api/index.ts"',children:'export { documentQueries } from "./queries/document";\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u554f\u984c\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u306f\u3069\u3053\u306b",children:"\u554f\u984c\u300c\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u306f\u3069\u3053\u306b\uff1f\u300d"}),"\n",(0,s.jsx)(n.p,{children:"\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u3092\u30af\u30a8\u30ea\u3068\u6df7\u5408\u3059\u308b\u3053\u3068\u306f\u63a8\u5968\u3055\u308c\u307e\u305b\u3093\u30022\u3064\u306e\u9078\u629e\u80a2\u304c\u8003\u3048\u3089\u308c\u307e\u3059\u3002"}),"\n",(0,s.jsx)(n.h3,{id:"1-\u4f7f\u7528\u5834\u6240\u306e\u8fd1\u304f\u306bapi\u30bb\u30b0\u30e1\u30f3\u30c8\u306b\u30ab\u30b9\u30bf\u30e0\u30d5\u30c3\u30af\u3092\u5b9a\u7fa9\u3059\u308b",children:"1. \u4f7f\u7528\u5834\u6240\u306e\u8fd1\u304f\u306bAPI\u30bb\u30b0\u30e1\u30f3\u30c8\u306b\u30ab\u30b9\u30bf\u30e0\u30d5\u30c3\u30af\u3092\u5b9a\u7fa9\u3059\u308b"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/features/update-post/api/use-update-title.ts"',children:"export const useUpdateTitle = () => {\n  const queryClient = useQueryClient();\n\n  return useMutation({\n    mutationFn: ({ id, newTitle }) =>\n      apiClient\n        .patch(`/posts/${id}`, { title: newTitle })\n        .then((data) => console.log(data)),\n\n    onSuccess: (newPost) => {\n      queryClient.setQueryData(postsQueries.ids(id), newPost);\n    },\n  });\n};\n"})}),"\n",(0,s.jsxs)(n.h3,{id:"2-\u5225\u306e\u5834\u6240shared\u5c64\u3084entities\u5c64\u306b\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u95a2\u6570\u3092\u5b9a\u7fa9\u3057\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u5185\u3067usemutation\u3092\u76f4\u63a5\u4f7f\u7528\u3059\u308b",children:["2. \u5225\u306e\u5834\u6240\uff08Shared\u5c64\u3084Entities\u5c64\uff09\u306b\u30df\u30e5\u30fc\u30c6\u30fc\u30b7\u30e7\u30f3\u95a2\u6570\u3092\u5b9a\u7fa9\u3057\u3001\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u5185\u3067",(0,s.jsx)(n.code,{children:"useMutation"}),"\u3092\u76f4\u63a5\u4f7f\u7528\u3059\u308b"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"const { mutateAsync, isPending } = useMutation({\n  mutationFn: postApi.createPost,\n});\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/pages/post-create/ui/post-create-page.tsx"',children:'export const CreatePost = () => {\n  const { classes } = useStyles();\n  const [title, setTitle] = useState("");\n\n  const { mutate, isPending } = useMutation({\n    mutationFn: postApi.createPost,\n  });\n\n  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>\n    setTitle(e.target.value);\n  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {\n    e.preventDefault();\n    mutate({ title, userId: DEFAULT_USER_ID });\n  };\n\n  return (\n    <form className={classes.create_form} onSubmit={handleSubmit}>\n      <TextField onChange={handleChange} value={title} />\n      <LoadingButton type="submit" variant="contained" loading={isPending}>\n        Create\n      </LoadingButton>\n    </form>\n  );\n};\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u30af\u30a8\u30ea\u306e\u7d44\u7e54\u5316",children:"\u30af\u30a8\u30ea\u306e\u7d44\u7e54\u5316"}),"\n",(0,s.jsx)(n.h3,{id:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc",children:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc"}),"\n",(0,s.jsx)(n.p,{children:"\u3053\u306e\u30ac\u30a4\u30c9\u3067\u306f\u3001\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u4f7f\u3044\u65b9\u306b\u3064\u3044\u3066\u8aac\u660e\u3057\u307e\u3059\u3002"}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u3068\u306f\u3001JS\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306e\u3053\u3068\u3067\u3001\u305d\u306e\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u30ad\u30fc\u306e\u5024\u304c\u30af\u30a8\u30ea\u30ad\u30fc\u4e00\u89a7\u3092\u8fd4\u3059\u95a2\u6570\u3067\u3042\u308b\u3002"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const keyFactory = {\n  all: () => ["entity"],\n  lists: () => [...postQueries.all(), "list"],\n};\n'})}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"queryOptions"})," - react-query@v5\u306b\u7d44\u307f\u8fbc\u307e\u308c\u305f\u30e6\u30fc\u30c6\u30a3\u30ea\u30c6\u30a3\uff08\u30aa\u30d7\u30b7\u30e7\u30f3\uff09"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"queryOptions({\n  queryKey,\n  ...options,\n});\n"})}),(0,s.jsxs)(n.p,{children:["\u3088\u308a\u9ad8\u3044\u578b\u5b89\u5168\u6027\u3068\u5c06\u6765\u306ereact-query\u306e\u30d0\u30fc\u30b8\u30e7\u30f3\u3068\u306e\u4e92\u63db\u6027\u3092\u78ba\u4fdd\u3057\u3001\u30af\u30a8\u30ea\u306e\u95a2\u6570\u3084\u30ad\u30fc\u3078\u306e\u30a2\u30af\u30bb\u30b9\u3092\u7c21\u7d20\u5316\u3059\u308b\u305f\u3081\u306b\u3001",(0,s.jsx)(n.code,{children:"@tanstack/react-query"}),"\u306e",(0,s.jsx)(n.code,{children:"queryOptions"}),"\u95a2\u6570\u3092\u4f7f\u7528\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u308b",(0,s.jsx)(n.a,{href:"https://tkdodo.eu/blog/the-query-options-api#queryoptions",children:"(\u8a73\u7d30\u306f\u3053\u3061\u3089)"}),"\u3002"]})]}),"\n",(0,s.jsx)(n.h3,{id:"1-\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u4f5c\u6210",children:"1. \u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u4f5c\u6210"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/entities/post/api/post.queries.ts"',children:'import { keepPreviousData, queryOptions } from "@tanstack/react-query";\nimport { getPosts } from "./get-posts";\nimport { getDetailPost } from "./get-detail-post";\nimport { PostDetailQuery } from "./query/post.query";\n\nexport const postQueries = {\n  all: () => ["posts"],\n\n  lists: () => [...postQueries.all(), "list"],\n  list: (page: number, limit: number) =>\n    queryOptions({\n      queryKey: [...postQueries.lists(), page, limit],\n      queryFn: () => getPosts(page, limit),\n      placeholderData: keepPreviousData,\n    }),\n\n  details: () => [...postQueries.all(), "detail"],\n  detail: (query?: PostDetailQuery) =>\n    queryOptions({\n      queryKey: [...postQueries.details(), query?.id],\n      queryFn: () => getDetailPost({ id: query?.id }),\n      staleTime: 5000,\n    }),\n};\n'})}),"\n",(0,s.jsx)(n.h3,{id:"2-\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u9069\u7528",children:"2. \u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306e\u9069\u7528"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'import { useParams } from "react-router-dom";\nimport { postApi } from "@/entities/post";\nimport { useQuery } from "@tanstack/react-query";\n\ntype Params = {\n  postId: string;\n};\n\nexport const PostPage = () => {\n  const { postId } = useParams<Params>();\n  const id = parseInt(postId || "");\n  const {\n    data: post,\n    error,\n    isLoading,\n    isError,\n  } = useQuery(postApi.postQueries.detail({ id }));\n\n  if (isLoading) {\n    return <div>Loading...</div>;\n  }\n\n  if (isError || !post) {\n    return <>{error?.message}</>;\n  }\n\n  return (\n    <div>\n      <p>Post id: {post.id}</p>\n      <div>\n        <h1>{post.title}</h1>\n        <div>\n          <p>{post.body}</p>\n        </div>\n      </div>\n      <div>Owner: {post.userId}</div>\n    </div>\n  );\n};\n'})}),"\n",(0,s.jsx)(n.h3,{id:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u3092\u4f7f\u7528\u3059\u308b\u5229\u70b9",children:"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u3092\u4f7f\u7528\u3059\u308b\u5229\u70b9"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"\u30af\u30a8\u30ea\u306e\u69cb\u9020\u5316:"})," \u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306f\u3059\u3079\u3066\u306eAPI\u30af\u30a8\u30ea\u30921\u304b\u6240\u306b\u6574\u7406\u3057\u3001\u30b3\u30fc\u30c9\u3092\u3088\u308a\u8aad\u307f\u3084\u3059\u304f\u3001\u4fdd\u5b88\u3057\u3084\u3059\u304f\u3057\u3066\u3044\u308b"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"\u30af\u30a8\u30ea\u3068\u30ad\u30fc\u3078\u306e\u4fbf\u5229\u306a\u30a2\u30af\u30bb\u30b9:"})," \u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306f\u3055\u307e\u3056\u307e\u306a\u30bf\u30a4\u30d7\u306e\u30af\u30a8\u30ea\u3068\u305d\u306e\u30ad\u30fc\u3078\u306e\u4fbf\u5229\u306a\u30e1\u30bd\u30c3\u30c9\u3092\u63d0\u4f9b\u3057\u3066\u3044\u308b"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"\u30af\u30a8\u30ea\u306e\u518d\u30d5\u30a7\u30c3\u30c1\u6a5f\u80fd:"})," \u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306f\u3001\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306e\u3055\u307e\u3056\u307e\u306a\u90e8\u5206\u3067\u30af\u30a8\u30ea\u30ad\u30fc\u3092\u5909\u66f4\u3059\u308b\u3053\u3068\u306a\u304f\u3001\u7c21\u5358\u306b\u518d\u30d5\u30a7\u30c3\u30c1\u3092\u884c\u3046\u3053\u3068\u3092\u53ef\u80fd\u306b\u3057\u3066\u3044\u308b"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"\u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3",children:"\u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3"}),"\n",(0,s.jsxs)(n.p,{children:["\u3053\u306e\u30bb\u30af\u30b7\u30e7\u30f3\u3067\u306f\u3001\u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3\u3092\u4f7f\u7528\u3057\u3066\u6295\u7a3f\u30a8\u30f3\u30c6\u30a3\u30c6\u30a3\u3092\u53d6\u5f97\u3059\u308b\u305f\u3081\u306eAPI\u30af\u30a8\u30ea\u3092\u884c\u3046",(0,s.jsx)(n.code,{children:"getPosts"}),"\u95a2\u6570\u306e\u4f8b\u3092\u6319\u3052\u307e\u3059\u3002"]}),"\n",(0,s.jsxs)(n.h3,{id:"1-getposts\u95a2\u6570\u306e\u4f5c\u6210",children:["1. ",(0,s.jsx)(n.code,{children:"getPosts"}),"\u95a2\u6570\u306e\u4f5c\u6210"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"getPosts"}),"\u95a2\u6570\u306f\u3001API\u30bb\u30b0\u30e1\u30f3\u30c8\u5185\u306e",(0,s.jsx)(n.code,{children:"get-posts.ts"}),"\u30d5\u30a1\u30a4\u30eb\u306b\u3042\u308a\u307e\u3059\u3002"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/pages/post-feed/api/get-posts.ts"',children:'import { apiClient } from "@/shared/api/base";\n\nimport { PostWithPaginationDto } from "./dto/post-with-pagination.dto";\nimport { PostQuery } from "./query/post.query";\nimport { mapPost } from "./mapper/map-post";\nimport { PostWithPagination } from "../model/post-with-pagination";\n\nconst calculatePostPage = (totalCount: number, limit: number) =>\n  Math.floor(totalCount / limit);\n\nexport const getPosts = async (\n  page: number,\n  limit: number,\n): Promise<PostWithPagination> => {\n  const skip = page * limit;\n  const query: PostQuery = { skip, limit };\n  const result = await apiClient.get<PostWithPaginationDto>("/posts", query);\n\n  return {\n    posts: result.posts.map((post) => mapPost(post)),\n    limit: result.limit,\n    skip: result.skip,\n    total: result.total,\n    totalPages: calculatePostPage(result.total, limit),\n  };\n};\n'})}),"\n",(0,s.jsx)(n.h3,{id:"2-\u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3\u7528\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc",children:"2. \u30da\u30fc\u30b8\u30cd\u30fc\u30b7\u30e7\u30f3\u7528\u306e\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"postQueries"}),"\u30af\u30a8\u30ea\u30d5\u30a1\u30af\u30c8\u30ea\u30fc\u306f\u3001\u6295\u7a3f\u306b\u95a2\u3059\u308b\u3055\u307e\u3056\u307e\u306a\u30af\u30a8\u30ea\u30aa\u30d7\u30b7\u30e7\u30f3\u3092\u5b9a\u7fa9\u3057\u3001\u4e8b\u524d\u306b\u5b9a\u7fa9\u3055\u308c\u305f\u30da\u30fc\u30b8\u3068\u30ea\u30df\u30c3\u30c8\u3092\u4f7f\u7528\u3057\u3066\u6295\u7a3f\u4e00\u89a7\u3092\u53d6\u5f97\u3059\u308b\u30af\u30a8\u30ea\u3092\u542b\u307f\u307e\u3059\u3002"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'import { keepPreviousData, queryOptions } from "@tanstack/react-query";\nimport { getPosts } from "./get-posts";\n\nexport const postQueries = {\n  all: () => ["posts"],\n  lists: () => [...postQueries.all(), "list"],\n  list: (page: number, limit: number) =>\n    queryOptions({\n      queryKey: [...postQueries.lists(), page, limit],\n      queryFn: () => getPosts(page, limit),\n      placeholderData: keepPreviousData,\n    }),\n};\n'})}),"\n",(0,s.jsx)(n.h3,{id:"3-\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u4f7f\u7528",children:"3. \u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u30b3\u30fc\u30c9\u3067\u306e\u4f7f\u7528"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/pages/home/ui/index.tsx"',children:'export const HomePage = () => {\n  const itemsOnScreen = DEFAULT_ITEMS_ON_SCREEN;\n  const [page, setPage] = usePageParam(DEFAULT_PAGE);\n  const { data, isFetching, isLoading } = useQuery(\n    postApi.postQueries.list(page, itemsOnScreen),\n  );\n  return (\n    <>\n      <Pagination\n        onChange={(_, page) => setPage(page)}\n        page={page}\n        count={data?.totalPages}\n        variant="outlined"\n        color="primary"\n      />\n      <Posts posts={data?.posts} />\n    </>\n  );\n};\n'})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"\u4f8b\u306f\u7c21\u7565\u5316\u3055\u308c\u3066\u3044\u308b\u3002"})}),"\n",(0,s.jsxs)(n.h2,{id:"\u30af\u30a8\u30ea\u7ba1\u7406\u7528\u306equeryprovider",children:["\u30af\u30a8\u30ea\u7ba1\u7406\u7528\u306e",(0,s.jsx)(n.code,{children:"QueryProvider"})]}),"\n",(0,s.jsxs)(n.p,{children:["\u3053\u306e\u30ac\u30a4\u30c9\u3067\u306f\u3001",(0,s.jsx)(n.code,{children:"QueryProvider"}),"\u3092\u3069\u306e\u3088\u3046\u306b\u69cb\u6210\u3059\u308b\u3079\u304d\u304b\u3092\u8aac\u660e\u3057\u307e\u3059\u3002"]}),"\n",(0,s.jsxs)(n.h3,{id:"1-queryprovider\u306e\u4f5c\u6210",children:["1. ",(0,s.jsx)(n.code,{children:"QueryProvider"}),"\u306e\u4f5c\u6210"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"query-provider.tsx"}),"\u30d5\u30a1\u30a4\u30eb\u306f",(0,s.jsx)(n.code,{children:"@/app/providers/query-provider.tsx"}),"\u306b\u3042\u308a\u307e\u3059\u3002"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/app/providers/query-provider.tsx"',children:'import { QueryClient, QueryClientProvider } from "@tanstack/react-query";\nimport { ReactQueryDevtools } from "@tanstack/react-query-devtools";\nimport { ReactNode } from "react";\n\ntype Props = {\n  children: ReactNode;\n  client: QueryClient;\n};\n\nexport const QueryProvider = ({ client, children }: Props) => {\n  return (\n    <QueryClientProvider client={client}>\n      {children}\n      <ReactQueryDevtools />\n    </QueryClientProvider>\n  );\n};\n'})}),"\n",(0,s.jsxs)(n.h3,{id:"2-queryclient\u306e\u4f5c\u6210",children:["2. ",(0,s.jsx)(n.code,{children:"QueryClient"}),"\u306e\u4f5c\u6210"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"QueryClient"}),"\u306fAPI\u30af\u30a8\u30ea\u3092\u7ba1\u7406\u3059\u308b\u305f\u3081\u306b\u4f7f\u7528\u3055\u308c\u308b\u30a4\u30f3\u30b9\u30bf\u30f3\u30b9\u3067\u3059\u3002",(0,s.jsx)(n.code,{children:"query-client.ts"}),"\u30d5\u30a1\u30a4\u30eb\u306f",(0,s.jsx)(n.code,{children:"@/shared/api/query-client.ts"}),"\u306b\u3042\u308a\u307e\u3059\u3002",(0,s.jsx)(n.code,{children:"QueryClient"}),"\u306f\u30af\u30a8\u30ea\u30ad\u30e3\u30c3\u30b7\u30f3\u30b0\u7528\u306e\u7279\u5b9a\u306e\u8a2d\u5b9a\u3067\u4f5c\u6210\u3055\u308c\u307e\u3059\u3002"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/shared/api/query-client.ts"',children:'import { QueryClient } from "@tanstack/react-query";\n\nexport const queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 5 * 60 * 1000,\n      gcTime: 5 * 60 * 1000,\n    },\n  },\n});\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u30b3\u30fc\u30c9\u751f\u6210",children:"\u30b3\u30fc\u30c9\u751f\u6210"}),"\n",(0,s.jsxs)(n.p,{children:["\u81ea\u52d5\u30b3\u30fc\u30c9\u751f\u6210\u306e\u305f\u3081\u306e\u30c4\u30fc\u30eb\u304c\u5b58\u5728\u3057\u307e\u3059\u304c\u3001\u3053\u308c\u3089\u306f\u4e0a\u8a18\u306e\u3088\u3046\u306b\u8a2d\u5b9a\u53ef\u80fd\u306a\u3082\u306e\u3068\u6bd4\u8f03\u3057\u3066\u67d4\u8edf\u6027\u304c\u4f4e\u3044\u3067\u3059\u3002Swagger\u30d5\u30a1\u30a4\u30eb\u304c\u9069\u5207\u306b\u69cb\u9020\u5316\u3055\u308c\u3066\u3044\u308b\u5834\u5408\u3001\u3053\u308c\u3089\u306e\u30c4\u30fc\u30eb\u306e1\u3064\u3092\u4f7f\u7528\u3057\u3066",(0,s.jsx)(n.code,{children:"@/shared/api"}),"\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u5185\u306e\u3059\u3079\u3066\u306e\u30b3\u30fc\u30c9\u3092\u751f\u6210\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002"]}),"\n",(0,s.jsx)(n.h2,{id:"rq\u306e\u6574\u7406\u306b\u95a2\u3059\u308b\u8ffd\u52a0\u306e\u30a2\u30c9\u30d0\u30a4\u30b9",children:"RQ\u306e\u6574\u7406\u306b\u95a2\u3059\u308b\u8ffd\u52a0\u306e\u30a2\u30c9\u30d0\u30a4\u30b9"}),"\n",(0,s.jsx)(n.h3,{id:"api\u30af\u30e9\u30a4\u30a2\u30f3\u30c8",children:"API\u30af\u30e9\u30a4\u30a2\u30f3\u30c8"}),"\n",(0,s.jsx)(n.p,{children:"\u5171\u6709\u5c64\u3067\u3042\u308bshared\u5c64\u3067\u30ab\u30b9\u30bf\u30e0\u306eAPI\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u30af\u30e9\u30b9\u3092\u4f7f\u7528\u3059\u308b\u3053\u3068\u3067\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u5185\u3067\u306eAPI\u8a2d\u5b9a\u3084API\u64cd\u4f5c\u3092\u6a19\u6e96\u5316\u3067\u304d\u307e\u3059\u3002\u3053\u308c\u306b\u3088\u308a\u3001\u30ed\u30b0\u8a18\u9332\u3001\u30d8\u30c3\u30c0\u30fc\u3001\u304a\u3088\u3073\u30c7\u30fc\u30bf\u4ea4\u63db\u5f62\u5f0f\uff08\u4f8b: JSON\u3084XML\uff09\u3092\u4e00\u5143\u7ba1\u7406\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002\u3053\u306e\u30a2\u30d7\u30ed\u30fc\u30c1\u306b\u3088\u308a\u3001API\u3068\u306e\u9023\u643a\u306e\u5909\u66f4\u3084\u66f4\u65b0\u304c\u7c21\u5358\u306b\u306a\u308a\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306e\u30e1\u30f3\u30c6\u30ca\u30f3\u30b9\u3084\u958b\u767a\u304c\u5bb9\u6613\u306b\u306a\u308a\u307e\u3059\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",metastring:'title="@/shared/api/api-client.ts"',children:'import { API_URL } from "@/shared/config";\n\nexport class ApiClient {\n  private baseUrl: string;\n\n  constructor(url: string) {\n    this.baseUrl = url;\n  }\n\n  async handleResponse<TResult>(response: Response): Promise<TResult> {\n    if (!response.ok) {\n      throw new Error(`HTTP error! Status: ${response.status}`);\n    }\n\n    try {\n      return await response.json();\n    } catch (error) {\n      throw new Error("Error parsing JSON response");\n    }\n  }\n\n  public async get<TResult = unknown>(\n    endpoint: string,\n    queryParams?: Record<string, string | number>,\n  ): Promise<TResult> {\n    const url = new URL(endpoint, this.baseUrl);\n\n    if (queryParams) {\n      Object.entries(queryParams).forEach(([key, value]) => {\n        url.searchParams.append(key, value.toString());\n      });\n    }\n    const response = await fetch(url.toString(), {\n      method: "GET",\n      headers: {\n        "Content-Type": "application/json",\n      },\n    });\n\n    return this.handleResponse<TResult>(response);\n  }\n\n  public async post<TResult = unknown, TData = Record<string, unknown>>(\n    endpoint: string,\n    body: TData,\n  ): Promise<TResult> {\n    const response = await fetch(`${this.baseUrl}${endpoint}`, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n      },\n      body: JSON.stringify(body),\n    });\n\n    return this.handleResponse<TResult>(response);\n  }\n}\n\nexport const apiClient = new ApiClient(API_URL);\n'})}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"\u53c2\u7167"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://tkdodo.eu/blog/the-query-options-api",children:"The Query Options API"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1100:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var s=t(758);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);