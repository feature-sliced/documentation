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
 * 2. Set title (should be unique)
 * 3. Give short description
 * 4. Add your website preview
 *  - `/pages/examples/img/{YOUR_SITE}.[png|jpg|jpeg]`
 * 5. Prepare links for your site - `website`, `source`
 *  - Website/Source - are optional but recommended
 * 6. Select feature-sliced version which implemented in your codebase
 * 7. Profit!
 */
export const examples = [
    {
        title: "Cardbox",
        description: "The best solutions from developers in one place",
        source: "https://github.com/cardbox/frontend",
        preview: require("./img/cardbox.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-12",
    },
    {
        title: "Github Client",
        description: "React & GraphQL powered github web-client",
        website: "http://github-client.gq/",
        source: "https://github.com/ani-team/github-client",
        preview: require("./img/github-client.png"),
        version: VERSIONS.FDD,
        updatedAt: "2021-07-05",
    },
    {
        title: "Todo App",
        description: "QuickStart todo-app example",
        website: "https://7b64m.csb.app/",
        source: "https://github.com/feature-sliced/examples/tree/master/todo-app",
        preview: require("./img/todo-app.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-07-05",
    },
    {
        title: "Sharead (demo)",
        description: "Book Marketplace",
        website: "https://dev-sharead.netlify.app/",
        source: "https://github.com/select-name/sharead-frontend",
        preview: require("./img/sharead.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-06",
    },
    {
        title: "Projentry (demo)",
        description: "Assistant for your projects",
        website: "https://projentry.netlify.app/",
        source: "https://github.com/ani-team/projentry",
        preview: require("./img/projentry.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-06",
    },
    {
        title: "Loripsum generator",
        description: "Simple fish text generator",
        website: "https://loripsum-generator.vercel.app",
        source: "https://github.com/yesnoruly/loripsum-generator",
        preview: require("./img/loripsum-generator.png"),
        version: VERSIONS.V2,
        updatedAt: "2021-11-17",
    },
];
