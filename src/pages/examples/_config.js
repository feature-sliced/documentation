export const VERSIONS = {
    V0: "v0",
    V1: "v1",
    FDD: "feature-driven",
    V2: "v2",
};

/**
 * List of site examples
 * @remark Add site here only if you're sure that its allowed to share website link / codebase
 * @example How to add new site?
 * 1. Add new item in `examples` const
 * 2. Fill details:
 *  - *title (should be unique)
 *  - *description (shortly)
 *  - *preview (image preview - `/pages/examples/img/{YOUR_SITE}.[png|jpg|jpeg]`)
 *  - *updatetAt (date of adding on examples list, for highlighting first two weeks)
 *  - *version (FSD version which implemented in your codebase)
 *  - website, source (links for your site, optional but recommended)
 *  - tech (used UI/state-management tech, optional but recommended)
 * 3. Profit!
 */
export const examples = [
    {
        title: "Cardbox",
        description: "The best solutions from developers in one place",
        source: "https://github.com/cardbox/frontend",
        preview: require("./img/cardbox.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-12",
        tech: ["react", "effector"],
    },
    {
        title: "Github Client",
        description: "React & GraphQL powered github web-client",
        website: "http://github-client.gq/",
        source: "https://github.com/ani-team/github-client",
        preview: require("./img/github-client.png"),
        version: VERSIONS.FDD,
        updatedAt: "2021-07-05",
        tech: ["react", "graphql", "antd"],
    },
    {
        title: "Todo App (React)",
        description: "QuickStart todo-app example for React developers",
        website: "https://7b64m.csb.app/",
        source: "https://github.com/feature-sliced/examples/tree/master/todo-app",
        preview: require("./img/todo-app-react.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-07-05",
        tech: ["react", "effector", "antd"],
    },
    {
        title: "Todo App (Vue 3)",
        description: "QuickStart todo-app example for Vue developers",
        website: "https://fccls.sse.codesandbox.io/",
        source: "https://github.com/EliseyMartynov/fs-vue",
        preview: require("./img/todo-app-vue.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-12-27",
        tech: ["vue", "vuex", "antd"],
    },
    {
        title: "Todo App (Angular 13)",
        description: "QuickStart todo-app example for Angular developers",
        website: "https://angular-feature-sliced-architecture.netlify.app/",
        source: "https://github.com/Affiction/angular-feature-sliced",
        preview: require("./img/todo-app-angular.png"),
        version: VERSIONS.V2,
        updatedAt: "2022-01-31",
        tech: ["angular", "rxjs"],
    },
    {
        title: "Sharead (demo)",
        description: "Book Marketplace",
        website: "https://dev-sharead.netlify.app/",
        source: "https://github.com/select-name/sharead-frontend",
        preview: require("./img/sharead.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-06",
        tech: ["react", "effector", "antd"],
    },
    {
        title: "Projentry (demo)",
        description: "Assistant for your projects",
        website: "https://projentry.netlify.app/",
        source: "https://github.com/ani-team/projentry",
        preview: require("./img/projentry.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-06",
        tech: ["react", "antd"],
    },
    {
        title: "Loripsum generator",
        description: "Simple fish text generator",
        website: "https://loripsum-generator.vercel.app",
        source: "https://github.com/yesnoruly/loripsum-generator",
        preview: require("./img/loripsum-generator.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-17",
        tech: ["react", "effector"],
    },
    {
        title: "Cast",
        description: "A podcast listening PWA with automated quality assurance",
        website: "https://cast-iu.pages.dev/",
        source: "https://github.com/aabounegm/cast",
        preview: require("./img/cast.png"),
        version: VERSIONS.V2,
        updatedAt: "2022-05-31",
        tech: ["svelte"],
    },
];
