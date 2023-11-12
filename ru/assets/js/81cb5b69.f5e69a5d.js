"use strict";(self.webpackChunk_feature_sliced_documentation=self.webpackChunk_feature_sliced_documentation||[]).push([[6254],{6566:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>a,frontMatter:()=>l,metadata:()=>d,toc:()=>h});var s=i(1527),r=i(6736);const l={sidebar_position:1},t="\u041e\u0431 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0435",d={id:"about/understanding/architecture",title:"\u041e\u0431 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0435",description:"\u041f\u0440\u043e\u0431\u043b\u0435\u043c\u044b",source:"@site/i18n/ru/docusaurus-plugin-content-docs/current/about/understanding/architecture.md",sourceDirName:"about/understanding",slug:"/about/understanding/architecture",permalink:"/ru/docs/about/understanding/architecture",draft:!1,unlisted:!1,editUrl:"https://github.com/feature-sliced/documentation/edit/master/i18n/ru/docusaurus-plugin-content-docs/current/about/understanding/architecture.md",tags:[],version:"current",lastUpdatedAt:1699780674,formattedLastUpdatedAt:"12 \u043d\u043e\u044f\u0431. 2023 \u0433.",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"aboutSidebar",previous:{title:"\u0410\u043b\u044c\u0442\u0435\u0440\u043d\u0430\u0442\u0438\u0432\u044b",permalink:"/ru/docs/about/alternatives"},next:{title:"\u041f\u043e\u043d\u0438\u043c\u0430\u043d\u0438\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043d\u043e\u0441\u0442\u0435\u0439",permalink:"/ru/docs/about/understanding/needs-driven"}},c={},h=[{value:"\u041f\u0440\u043e\u0431\u043b\u0435\u043c\u044b",id:"problems",level:2},{value:"Bus-factor &amp; Onboarding",id:"bus-factor--onboarding",level:3},{value:"\u041d\u0435\u044f\u0432\u043d\u044b\u0435 \u0438 \u043d\u0435\u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u0435\u043c\u044b\u0435 \u043f\u043e\u0441\u043b\u0435\u0434\u0441\u0442\u0432\u0438\u044f",id:"implicit-and-uncontrolled-consequences",level:3},{value:"\u041d\u0435\u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u0435\u043c\u043e\u0435 \u043f\u0435\u0440\u0435\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u043e\u0433\u0438\u043a\u0438",id:"uncontrolled-reuse-of-logic",level:3},{value:"\u0422\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f",id:"requirements",level:2},{value:"Explicitness",id:"explicitness",level:3},{value:"Control",id:"control",level:3},{value:"Adaptability",id:"adaptability",level:3},{value:"\u0421\u043c. \u0442\u0430\u043a\u0436\u0435",id:"see-also",level:2}];function o(e){const n=Object.assign({h1:"h1",h2:"h2",p:"p",h3:"h3",strong:"strong",ul:"ul",li:"li",em:"em",a:"a",code:"code",admonition:"admonition"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"\u043e\u0431-\u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0435",children:"\u041e\u0431 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0435"}),"\n",(0,s.jsx)(n.h2,{id:"problems",children:"\u041f\u0440\u043e\u0431\u043b\u0435\u043c\u044b"}),"\n",(0,s.jsx)(n.p,{children:"\u041e\u0431\u044b\u0447\u043d\u043e, \u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440 \u043e\u0431 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0435 \u043f\u043e\u0434\u043d\u0438\u043c\u0430\u0435\u0442\u0441\u044f, \u043a\u043e\u0433\u0434\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0441\u0442\u043e\u043f\u043e\u0440\u0438\u0442\u0441\u044f \u0438\u0437-\u0437\u0430 \u0442\u0435\u0445 \u0438\u043b\u0438 \u0438\u043d\u044b\u0445 \u043f\u0440\u043e\u0431\u043b\u0435\u043c \u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u0435."}),"\n",(0,s.jsx)(n.h3,{id:"bus-factor--onboarding",children:"Bus-factor & Onboarding"}),"\n",(0,s.jsx)(n.p,{children:"\u041f\u0440\u043e\u0435\u043a\u0442 \u0438 \u0435\u0433\u043e \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443 \u043f\u043e\u043d\u0438\u043c\u0430\u0435\u0442 \u043b\u0438\u0448\u044c \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043d\u044b\u0439 \u043a\u0440\u0443\u0433 \u043b\u044e\u0434\u0435\u0439"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u041f\u0440\u0438\u043c\u0435\u0440\u044b:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u0421\u043b\u043e\u0436\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430 \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0443"'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u041d\u0430 \u043a\u0430\u0436\u0434\u0443\u044e \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443 - \u0443 \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u0441\u0432\u043e\u0435 \u043c\u043d\u0435\u043d\u0438\u0435 \u043a\u0430\u043a \u043e\u0431\u0445\u043e\u0434\u0438\u0442\u044c" (\u043f\u043e\u0437\u0430\u0432\u0438\u0434\u0443\u0435\u043c \u0430\u043d\u0433\u0443\u043b\u044f\u0440\u0443)'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u041d\u0435 \u043f\u043e\u043d\u0438\u043c\u0430\u044e \u0447\u0442\u043e \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0434\u0438\u0442 \u0432 \u044d\u0442\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u043c \u043a\u0443\u0441\u043a\u0435 \u043c\u043e\u043d\u043e\u043b\u0438\u0442\u0430"'})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"implicit-and-uncontrolled-consequences",children:"\u041d\u0435\u044f\u0432\u043d\u044b\u0435 \u0438 \u043d\u0435\u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u0435\u043c\u044b\u0435 \u043f\u043e\u0441\u043b\u0435\u0434\u0441\u0442\u0432\u0438\u044f"}),"\n",(0,s.jsxs)(n.p,{children:["\u041c\u043d\u043e\u0436\u0435\u0441\u0442\u0432\u043e \u043d\u0435\u044f\u0432\u043d\u044b\u0445 \u0441\u0430\u0439\u0434-\u044d\u0444\u0444\u0435\u043a\u0442\u043e\u0432 \u043f\u0440\u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435/\u0440\u0435\u0444\u0430\u043a\u0442\u043e\u0440\u0438\u043d\u0433\u0435 ",(0,s.jsx)(n.em,{children:'("\u0432\u0441\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043e\u0442 \u0432\u0441\u0435\u0433\u043e")'})]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u041f\u0440\u0438\u043c\u0435\u0440\u044b:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u0424\u0438\u0447\u0430 \u0438\u043c\u043f\u043e\u0440\u0442\u0438\u0440\u0443\u0435\u0442 \u0444\u0438\u0447\u0443"'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u042f \u043e\u0431\u043d\u043e\u0432\u0438\u043b(\u0430) \u0441\u0442\u043e\u0440 \u043e\u0434\u043d\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b, \u0430 \u043e\u0442\u0432\u0430\u043b\u0438\u043b\u0430\u0441\u044c \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0434\u0440\u0443\u0433\u043e\u0439"'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u041b\u043e\u0433\u0438\u043a\u0430 \u0440\u0430\u0437\u043c\u0430\u0437\u0430\u043d\u0430 \u043f\u043e \u0432\u0441\u0435\u043c\u0443 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044e, \u0438 \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043e\u0442\u0441\u043b\u0435\u0434\u0438\u0442\u044c - \u0433\u0434\u0435 \u043d\u0430\u0447\u0430\u043b\u043e, \u0433\u0434\u0435 \u043a\u043e\u043d\u0435\u0446"'})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"uncontrolled-reuse-of-logic",children:"\u041d\u0435\u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u0443\u0435\u043c\u043e\u0435 \u043f\u0435\u0440\u0435\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u043e\u0433\u0438\u043a\u0438"}),"\n",(0,s.jsx)(n.p,{children:"\u0421\u043b\u043e\u0436\u043d\u043e \u043f\u0435\u0440\u0435\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c/\u043c\u043e\u0434\u0438\u0444\u0438\u0446\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0443\u044e \u043b\u043e\u0433\u0438\u043a\u0443"}),"\n",(0,s.jsxs)(n.p,{children:["\u041f\u0440\u0438 \u044d\u0442\u043e\u043c, \u043e\u0431\u044b\u0447\u043d\u043e \u0435\u0441\u0442\u044c ",(0,s.jsx)(n.a,{href:"https://github.com/feature-sliced/documentation/discussions/14",children:"\u0434\u0432\u0435 \u043a\u0440\u0430\u0439\u043d\u043e\u0441\u0442\u0438"}),":"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u041b\u0438\u0431\u043e \u043f\u043e\u0434 \u043a\u0430\u0436\u0434\u044b\u0439 \u043c\u043e\u0434\u0443\u043b\u044c \u043f\u0438\u0448\u0435\u0442\u0441\u044f \u043b\u043e\u0433\u0438\u043a\u0430 \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0441 \u043d\u0443\u043b\u044f ",(0,s.jsx)(n.em,{children:"(\u0441 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u044b\u043c\u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u0435\u043d\u0438\u044f\u043c\u0438 \u0432 \u0438\u043c\u0435\u044e\u0449\u0435\u0439\u0441\u044f \u043a\u043e\u0434\u043e\u0432\u043e\u0439 \u0431\u0430\u0437\u0435)"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u041b\u0438\u0431\u043e \u0438\u0434\u0435\u0442 \u0442\u0435\u043d\u0434\u0435\u043d\u0446\u0438\u044f \u043f\u0435\u0440\u0435\u043d\u043e\u0441\u0438\u0442\u044c \u0432\u0441\u0435-\u0432\u0441\u0435 \u0440\u0435\u0430\u043b\u0438\u0437\u0443\u0435\u043c\u044b\u0435 \u043c\u043e\u0434\u0443\u043b\u0438 \u0432 ",(0,s.jsx)(n.code,{children:"shared"})," \u043f\u0430\u043f\u043a\u0438, \u0442\u0435\u043c \u0441\u0430\u043c\u044b\u043c \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u044f \u0438\u0437 \u043d\u0435\u0435 \u0431\u043e\u043b\u044c\u0448\u0443\u044e \u0441\u0432\u0430\u043b\u043a\u0443 \u0438\u0437 \u043c\u043e\u0434\u0443\u043b\u0435\u0439 ",(0,s.jsx)(n.em,{children:"(\u0433\u0434\u0435 \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0432 \u043e\u0434\u043d\u043e\u043c \u043c\u0435\u0441\u0442\u0435)"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u041f\u0440\u0438\u043c\u0435\u0440\u044b:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u0423 \u043c\u0435\u043d\u044f \u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u0435 \u0435\u0441\u0442\u044c n-\u0440\u0435\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0439 \u043e\u0434\u043d\u043e\u0439 \u0438 \u0442\u043e\u0439 \u0436\u0435 \u0431\u0438\u0437\u043d\u0435\u0441-\u043b\u043e\u0433\u0438\u043a\u0438, \u0437\u0430 \u0447\u0442\u043e \u043f\u0440\u0438\u0445\u043e\u0434\u0438\u0442\u0441\u044f \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u043e \u0440\u0430\u0441\u043f\u043b\u0430\u0447\u0438\u0432\u0430\u0442\u044c\u0441\u044f"'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u0412 \u043f\u0440\u043e\u0435\u043a\u0442\u0435 \u0435\u0441\u0442\u044c 6 \u0440\u0430\u0437\u043d\u044b\u0445 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u043e\u0432 \u043a\u043d\u043e\u043f\u043a\u0438/\u043f\u043e\u043f\u0430\u043f\u0430/..."'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:'"\u0421\u0432\u0430\u043b\u043a\u0430 \u0445\u0435\u043b\u043f\u0435\u0440\u043e\u0432"'})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"requirements",children:"\u0422\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f"}),"\n",(0,s.jsxs)(n.p,{children:["\u041f\u043e\u044d\u0442\u043e\u043c\u0443 \u043a\u0430\u0436\u0435\u0442\u0441\u044f \u043b\u043e\u0433\u0438\u0447\u043d\u044b\u043c \u043f\u0440\u0435\u0434\u044a\u044f\u0432\u0438\u0442\u044c \u0436\u0435\u043b\u0430\u0435\u043c\u044b\u0435 ",(0,s.jsx)(n.em,{children:"\u0442\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f \u043a \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e\u0439 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0435:"})]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:['\u0412\u0435\u0437\u0434\u0435 \u0433\u0434\u0435 \u0433\u043e\u0432\u043e\u0440\u0438\u0442\u0441\u044f "\u043b\u0435\u0433\u043a\u043e", \u043f\u043e\u0434\u0440\u0430\u0437\u0443\u043c\u0435\u0432\u0430\u0435\u0442\u0441\u044f "\u043e\u0442\u043d\u043e\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u043b\u0435\u0433\u043a\u043e \u0434\u043b\u044f \u0448\u0438\u0440\u043e\u043a\u043e\u0433\u043e \u043a\u0440\u0443\u0433\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432", \u0442.\u043a. \u044f\u0441\u043d\u043e, \u0447\u0442\u043e ',(0,s.jsx)(n.a,{href:"/docs/about/mission#limitations",children:"\u043d\u0435 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0441\u044f \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0440\u0435\u0448\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u0430\u0431\u0441\u043e\u043b\u044e\u0442\u043d\u043e \u0432\u0441\u0435\u0445"})]})}),"\n",(0,s.jsx)(n.h3,{id:"explicitness",children:"Explicitness"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u0414\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c ",(0,s.jsx)(n.strong,{children:"\u043b\u0435\u0433\u043a\u043e \u043e\u0441\u0432\u0430\u0438\u0432\u0430\u0442\u044c \u0438 \u043e\u0431\u044a\u044f\u0441\u043d\u044f\u0442\u044c"})," \u043a\u043e\u043c\u0430\u043d\u0434\u0435 \u043f\u0440\u043e\u0435\u043a\u0442 \u0438 \u0435\u0433\u043e \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0443"]}),"\n",(0,s.jsxs)(n.li,{children:["\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0442\u044c \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 ",(0,s.jsx)(n.strong,{children:"\u0431\u0438\u0437\u043d\u0435\u0441-\u0446\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u0430"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u0414\u043e\u043b\u0436\u043d\u044b \u0431\u044b\u0442\u044c \u044f\u0432\u043d\u044b\u043c\u0438 ",(0,s.jsx)(n.strong,{children:"\u0441\u0430\u0439\u0434-\u044d\u0444\u0444\u0435\u043a\u0442\u044b \u0438 \u0441\u0432\u044f\u0437\u0438"})," \u043c\u0435\u0436\u0434\u0443 \u0430\u0431\u0441\u0442\u0440\u0430\u043a\u0446\u0438\u044f\u043c\u0438"]}),"\n",(0,s.jsxs)(n.li,{children:["\u0414\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c ",(0,s.jsx)(n.strong,{children:"\u043b\u0435\u0433\u043a\u043e \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0438\u0432\u0430\u0442\u044c \u0434\u0443\u0431\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u043e\u0433\u0438\u043a\u0438"}),", \u043d\u0435 \u043c\u0435\u0448\u0430\u044f \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u043c \u0440\u0435\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f\u043c"]}),"\n",(0,s.jsxs)(n.li,{children:["\u041d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c ",(0,s.jsx)(n.strong,{children:"\u0440\u0430\u0441\u043f\u044b\u043b\u0435\u043d\u0438\u044f \u043b\u043e\u0433\u0438\u043a\u0438"})," \u043f\u043e \u0432\u0441\u0435\u043c\u0443 \u043f\u0440\u043e\u0435\u043a\u0442\u0443"]}),"\n",(0,s.jsxs)(n.li,{children:["\u041d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c ",(0,s.jsx)(n.strong,{children:"\u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u043d\u043e\u0433\u043e \u0440\u0430\u0437\u043d\u043e\u0440\u043e\u0434\u043d\u044b\u0445 \u0430\u0431\u0441\u0442\u0440\u0430\u043a\u0446\u0438\u0439 \u0438 \u043f\u0440\u0430\u0432\u0438\u043b"})," \u0434\u043b\u044f \u0445\u043e\u0440\u043e\u0448\u0435\u0439 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u044b"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"control",children:"Control"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u0425\u043e\u0440\u043e\u0448\u0430\u044f \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 ",(0,s.jsx)(n.strong,{children:"\u0443\u0441\u043a\u043e\u0440\u044f\u0442\u044c \u0440\u0435\u0448\u0435\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447, \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0435 \u0444\u0438\u0447"})]}),"\n",(0,s.jsx)(n.li,{children:"\u0414\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0440\u043e\u0435\u043a\u0442\u0430"}),"\n",(0,s.jsxs)(n.li,{children:["\u0414\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u043b\u0435\u0433\u043a\u043e ",(0,s.jsx)(n.strong,{children:"\u0440\u0430\u0441\u0448\u0438\u0440\u044f\u0442\u044c, \u043c\u043e\u0434\u0438\u0444\u0438\u0446\u0438\u0440\u043e\u0432\u0430\u0442\u044c, \u0443\u0434\u0430\u043b\u044f\u0442\u044c \u043a\u043e\u0434"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u0414\u043e\u043b\u0436\u043d\u0430 \u0441\u043e\u0431\u043b\u044e\u0434\u0430\u0442\u044c\u0441\u044f ",(0,s.jsx)(n.strong,{children:"\u0434\u0435\u043a\u043e\u043c\u043f\u043e\u0437\u0438\u0446\u0438\u044f \u0438 \u0438\u0437\u043e\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0441\u0442\u044c"})," \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438"]}),"\n",(0,s.jsxs)(n.li,{children:["\u041a\u0430\u0436\u0434\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442 \u0441\u0438\u0441\u0442\u0435\u043c\u044b \u0434\u043e\u043b\u0436\u0435\u043d \u0431\u044b\u0442\u044c ",(0,s.jsx)(n.strong,{children:"\u043b\u0435\u0433\u043a\u043e \u0437\u0430\u043c\u0435\u043d\u044f\u0435\u043c\u044b\u043c \u0438 \u0443\u0434\u0430\u043b\u044f\u0435\u043c\u044b\u043c"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsxs)(n.em,{children:[(0,s.jsx)(n.a,{href:"https://youtu.be/BWAeYuWFHhs?t=1631",children:"\u041d\u0435 \u043d\u0443\u0436\u043d\u043e \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e\u0434 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f"})," - \u043c\u044b \u043d\u0435 \u043c\u043e\u0436\u0435\u043c \u043f\u0440\u0435\u0434\u0441\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0431\u0443\u0434\u0443\u0449\u0435\u0435"]})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsxs)(n.em,{children:[(0,s.jsx)(n.a,{href:"https://youtu.be/BWAeYuWFHhs?t=1666",children:"\u041b\u0443\u0447\u0448\u0435 - \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e\u0434 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435"})," - \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0430\u043d\u0438\u0438 \u0442\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u0430, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0443\u0436\u0435 \u0438\u043c\u0435\u0435\u0442\u0441\u044f"]})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"adaptability",children:"Adaptability"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u0425\u043e\u0440\u043e\u0448\u0430\u044f \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u043c\u0430 ",(0,s.jsx)(n.strong,{children:"\u043a \u0431\u043e\u043b\u044c\u0448\u0438\u043d\u0441\u0442\u0432\u0443 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:"\u0421 \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u043c\u0438 \u0438\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u043d\u044b\u043c\u0438 \u0440\u0435\u0448\u0435\u043d\u0438\u044f\u043c\u0438"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.em,{children:"\u041d\u0430 \u043b\u044e\u0431\u043e\u0439 \u0441\u0442\u0430\u0434\u0438\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044f"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"\u041d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e\u0441\u0442\u0438 \u043e\u0442 \u0444\u0440\u0435\u0439\u043c\u0432\u043e\u0440\u043a\u0430 \u0438 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b"}),"\n",(0,s.jsxs)(n.li,{children:["\u0414\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c ",(0,s.jsx)(n.strong,{children:"\u043b\u0435\u0433\u043a\u043e \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442 \u0438 \u043a\u043e\u043c\u0430\u043d\u0434\u0443"}),", \u0441 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c\u044e \u043f\u0430\u0440\u0430\u043b\u043b\u0435\u043b\u0438\u0437\u0430\u0446\u0438\u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438"]}),"\n",(0,s.jsxs)(n.li,{children:["\u0414\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u043b\u0435\u0433\u043a\u043e ",(0,s.jsx)(n.strong,{children:"\u043f\u043e\u0434\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044c\u0441\u044f \u043f\u043e\u0434 \u0438\u0437\u043c\u0435\u043d\u044f\u044e\u0449\u0438\u0435\u0441\u044f \u0442\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f \u0438 \u043e\u0431\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430"})]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"see-also",children:"\u0421\u043c. \u0442\u0430\u043a\u0436\u0435"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://youtu.be/BWAeYuWFHhs",children:"(React Berlin Talk) Oleg Isonen - Feature Driven Architecture"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://t.me/feature_slices",children:"(React SPB Meetup #1) Sergey Sova - Feature Slices"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://alexmngn.medium.com/why-react-developers-should-modularize-their-applications-d26d381854c1",children:"(\u0421\u0442\u0430\u0442\u044c\u044f) \u041f\u0440\u043e \u043c\u043e\u0434\u0443\u043b\u044f\u0440\u0438\u0437\u0430\u0446\u0438\u044e \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://ryanlanciaux.com/blog/2017/08/20/a-feature-based-approach-to-react-development/",children:"(\u0421\u0442\u0430\u0442\u044c\u044f) \u041f\u0440\u043e Separation of Concerns \u0438 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u043e \u0444\u0438\u0447\u0430\u043c"})}),"\n"]})]})}const a=function(e={}){const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(o,e)})):o(e)}},6736:(e,n,i)=>{i.d(n,{Zo:()=>d,ah:()=>l});var s=i(959);const r=s.createContext({});function l(e){const n=s.useContext(r);return s.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const t={};function d({components:e,children:n,disableParentContext:i}){let d;return d=i?"function"==typeof e?e({}):e||t:l(e),s.createElement(r.Provider,{value:d},n)}}}]);