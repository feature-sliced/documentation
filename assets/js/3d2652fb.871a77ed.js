"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[7811],{8463:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var t=s(6070),i=s(7468);const r={sidebar_position:3,pagination_next:"about/index"},o="Public API",l={id:"reference/public-api",title:"Public API",description:"Each entity of the methodology is designed as a user-friendly and integrable module.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/reference/public-api.md",sourceDirName:"reference",slug:"/reference/public-api",permalink:"/docs/reference/public-api",draft:!1,unlisted:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/en/docusaurus-plugin-content-docs/current/reference/public-api.md",tags:[],version:"current",lastUpdatedAt:1721857793e3,sidebarPosition:3,frontMatter:{sidebar_position:3,pagination_next:"about/index"},sidebar:"referenceSidebar",previous:{title:"Slices and segments",permalink:"/docs/reference/slices-segments"},next:{title:"\ud83c\udf70 About",permalink:"/docs/about/"}},a={},c=[{value:"Goals",id:"goals",level:2},{value:"Requirements for the public API",id:"requirements-for-the-public-api",level:2},{value:"1. Access Control",id:"1-access-control",level:3},{value:"Examples",id:"examples",level:4},{value:"Suspension from private imports",id:"suspension-from-private-imports",level:5},{value:"2. Sustainability for changes",id:"2-sustainability-for-changes",level:3},{value:"Examples",id:"examples-1",level:4},{value:"Abstracting from the implementation",id:"abstracting-from-the-implementation",level:5},{value:"3. Integrability",id:"3-integrability",level:3},{value:"Examples",id:"examples-2",level:4},{value:"Name collision",id:"name-collision",level:5},{value:"Flexible use",id:"flexible-use",level:5},{value:"Resolution of collisions",id:"resolution-of-collisions",level:5},{value:"About re-exports",id:"about-re-exports",level:2},{value:"Disadvantages",id:"disadvantages",level:3},{value:"Possible solutions",id:"possible-solutions",level:3},{value:"See also",id:"see-also",level:2}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"public-api",children:"Public API"}),"\n",(0,t.jsxs)(n.p,{children:["Each entity of the methodology is designed as a ",(0,t.jsx)(n.strong,{children:"user-friendly and integrable module."})]}),"\n",(0,t.jsx)(n.h2,{id:"goals",children:"Goals"}),"\n",(0,t.jsxs)(n.p,{children:["The convenience of using and integrating the module is achieved through the fulfillment of ",(0,t.jsx)(n.em,{children:"a number of goals"}),":"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["The application must be ",(0,t.jsx)(n.strong,{children:"protected from changes"})," to the internal structure of individual modules"]}),"\n",(0,t.jsxs)(n.li,{children:["The processing of the internal structure of the module ",(0,t.jsx)(n.strong,{children:"should not affect"})," other modules"]}),"\n",(0,t.jsxs)(n.li,{children:["Significant changes in the behavior of the module should be ",(0,t.jsx)(n.strong,{children:"easily detectable"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Significant changes in the behavior of the module"})," - changes that break the expectations of the user entities of the module."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"These goals can be achieved by introducing a public interface (Public API), which is a single access point to the module's capabilities and defines the \"contract\" of the module's interaction with the outside world."}),"\n",(0,t.jsx)(n.admonition,{title:"Important",type:"info",children:(0,t.jsx)(n.p,{children:"The entity structure must have a single entry point that provides a public interface"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"\u2514\u2500\u2500 features/\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0#\xa0\n       \u251c\u2500\u2500 auth-form /      # Internal structure of the feature\n       |     \u251c\u2500\u2500 ui/\xa0 \xa0 \xa0 \xa0 #\n       |     \u251c\u2500\u2500 model/\xa0 \xa0 \xa0#\n       |     \u251c\u2500\u2500 {...}/\xa0 \xa0 \xa0#\n       \u251c\u2500\u2500 index.ts         # Entrypoint features with its public API\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="**/**/index.ts"',children:'export { Form as AuthForm } from "./ui"\nexport * as authFormModel from "./model"\n'})}),"\n",(0,t.jsx)(n.h2,{id:"requirements-for-the-public-api",children:"Requirements for the public API"}),"\n",(0,t.jsxs)(n.p,{children:["Meeting these requirements allows you to reduce interaction with the module to ",(0,t.jsx)(n.strong,{children:"the implementation of a public interface-contract"})," and, thereby, achieve reliability and ease of use of the module."]}),"\n",(0,t.jsx)(n.h3,{id:"1-access-control",children:"1. Access Control"}),"\n",(0,t.jsxs)(n.p,{children:["The public API must ",(0,t.jsx)(n.strong,{children:"control access"})," to the contents of the module"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Other parts of the application can use ",(0,t.jsx)(n.strong,{children:"only those module entities that are presented in the public interface"})]}),"\n",(0,t.jsxs)(n.li,{children:["The internal part of the module outside the public interface ",(0,t.jsx)(n.strong,{children:"is accessible only to the module itself"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(n.h5,{id:"suspension-from-private-imports",children:"Suspension from private imports"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Bad"}),": There is a direct access to the internal parts of the module, bypassing the public access interface - it is dangerous, especially when refactoring the module"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'- import { Form } from "features/auth-form/components/view/form"\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Good:"})," The API exports only what is necessary and allowed in advance, the module developer now needs to think only about not breaking the Public API when refactoring"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'+ import { AuthForm } from "features/auth-form"\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"2-sustainability-for-changes",children:"2. Sustainability for changes"}),"\n",(0,t.jsx)(n.p,{children:"The public API should be sustainable for changes inside the module"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Breaking changes in the behavior of the module are reflected in the change of the Public API"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"examples-1",children:"Examples"}),"\n",(0,t.jsx)(n.h5,{id:"abstracting-from-the-implementation",children:"Abstracting from the implementation"}),"\n",(0,t.jsx)(n.p,{children:"Changing the internal structure should not lead to a change in the Public API"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Bad:"})," moving or renaming this component inside the feature will lead to the need to refactor imports in all places where the component is used."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'- import { Form } from "features/auth-form/ui/form"\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Good:"}),' the interface of the feature does not display its internal structure, external "users" of the feature will not suffer from moving or renaming the component inside the feature']}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'+ import { AuthForm } from "features/auth-form"\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"3-integrability",children:"3. Integrability"}),"\n",(0,t.jsxs)(n.p,{children:["The public API should facilitate ",(0,t.jsx)(n.strong,{children:"easy and flexible integration"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Should be convenient for use by the rest of the application, in particular, to solve the problem of name collisions"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"examples-2",children:"Examples"}),"\n",(0,t.jsx)(n.h5,{id:"name-collision",children:"Name collision"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Bad:"})," there will be a name collision"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/auth-form/index.ts"',children:'export { Form } from "./ui"\nexport * as model from "./model"\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/post-form/index.ts"',children:'export { Form } from "./ui"\nexport * as model from "./model"\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'- import { Form, model } from "features/auth-form"\n- import { Form, model } from "features/post-form"\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Good:"})," the collision is solved at the interface level"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/auth-form/index.ts"',children:'export { Form as AuthForm } from "./ui"\nexport * as authFormModel from "./model"\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/post-form/index.ts"',children:'export { Form as PostForm } from "./ui"\nexport * as postFormModel from "./model"\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'+ import { AuthForm, authFormModel } from "features/auth-form"\n+ import { PostForm, postFormModel } from "features/post-form"\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h5,{id:"flexible-use",children:"Flexible use"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Bad:"}),' it is inconvenient to write, it is inconvenient to read, the" user " of the feature suffers']}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'- import { storeActionUpdateUserDetails } from "features/auth-form"\n- dispatch(storeActionUpdateUserDetails(...))\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Good:"}),' the "user" of the feature gets access to the necessary things iteratively and flexibly']}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",children:'+ import { authFormModel } from "features/auth-form"\n+ dispatch(authFormModel.effects.updateUserDetails(...)) // redux\n+ authFormModel.updateUserDetailsFx(...) // effector\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h5,{id:"resolution-of-collisions",children:"Resolution of collisions"}),"\n",(0,t.jsx)(n.p,{children:"Name collisions should be resolved at the level of the public interface, not the implementation"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Bad:"})," name collisions are resolved at the implementation level"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/auth-form/index.ts"',children:'export { AuthForm } from "./ui"\nexport { authFormActions, authFormReducer } from "model"\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/post-form/index.ts"',children:'export { PostForm } from "./ui"\nexport { postFormActions, postFormReducer } from "model"\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Good:"})," name collisions are resolved at the interface level"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/auth-form/model.ts"',children:"export { actions, reducer }\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/auth-form/index.ts"',children:'export { Form as AuthForm } from "./ui"\nexport * as authFormModel from "./model"\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/post-form/model.ts"',children:"export { actions, reducer }\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="features/post-form/index.ts"',children:'export { Form as PostForm } from "./ui"\nexport * as postFormModel from "./model"\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"about-re-exports",children:"About re-exports"}),"\n",(0,t.jsxs)(n.p,{children:["In JavaScript, the public interface of a module is created by re-exporting entities from inside the module in an ",(0,t.jsx)(n.code,{children:"index"})," file:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="**/**/index.ts"',children:'export { Form as AuthForm } from "./ui"\nexport * as authModel from "./model"\n'})}),"\n",(0,t.jsx)(n.h3,{id:"disadvantages",children:"Disadvantages"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["In most popular bundlers, due to re-exports, ",(0,t.jsx)(n.strong,{children:"the code-splitting works worse"}),", because ",(0,t.jsx)(n.a,{href:"https://webpack.js.org/guides/tree-shaking/",children:"tree-shaking"})," with this approach, it is safe to discard only the entire module, but not part of it."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["For example, importing ",(0,t.jsx)(n.code,{children:"authModel"})," into the page model will cause the ",(0,t.jsx)(n.code,{children:"AuthForm"})," component to get into the chunk of this page, even if this component is not used there."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:'As a result, initialization of the chunk becomes more expensive, because the browser must process all the modules in it, including those that got into the bundle "for the company"'}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"possible-solutions",children:"Possible solutions"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"webpack"})," allows you to mark re-export files as ",(0,t.jsx)(n.a,{href:"https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free",children:(0,t.jsx)(n.strong,{children:"side effects free"})})," - this allows ",(0,t.jsx)(n.code,{children:"webpack"})," to use more aggressive optimizations when working with such a file"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"see-also",children:"See also"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/feature-sliced/documentation/discussions/41",children:"(Discussion) Public Abstraction API"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsxs)(n.a,{href:"https://ru.wikipedia.org/wiki/SOLID",children:["Principles ",(0,t.jsx)(n.strong,{children:"SOLID"})]})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsxs)(n.a,{href:"https://ru.wikipedia.org/wiki/GRASP",children:["Patterns ",(0,t.jsx)(n.strong,{children:"GRASP"})]})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},7468:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>l});var t=s(758);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);