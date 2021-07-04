export const VERSIONS = {
    V0: 'v0',
    V1: 'v1',
    FDD: 'feature-driven',
    V2: 'v2',
};

// Website/Source - are optional but recommended
export const examples = [
    {
        title: 'Cardbox',
        description: 'The best solutions from developers in one place',
        website: 'https://cardbox.sova.dev/',
        source: 'https://github.com/cardbox/frontend',
        preview: require('./img/cardbox.png'),
        version: VERSIONS.V1,
    },
    {
        title: 'Github Client',
        description: 'React & GraphQL powered github web-client',
        website: 'http://github-client.gq/',
        source: 'https://github.com/ani-team/github-client',
        preview: require('./img/github-client.png'),
        version: VERSIONS.FDD,
    },
    {
        title: 'Todo App',
        description: 'QuickStart todo-app example',
        website: 'https://7b64m.csb.app/',
        source: 'https://github.com/feature-sliced/examples/tree/master/todo-app',
        preview: require('./img/todo-app.png'),
        version: VERSIONS.V2,
    },
    {
        title: 'Sharead (WIP)',
        description: 'Book Marketplace',
        website: 'https://dev-sharead.netlify.app/',
        // source: 'https://github.com/select-name/sharead-front',
        preview: require('./img/sharead.png'),
        version: VERSIONS.V2,
    },
    {
        title: 'Projentry (WIP)',
        description: 'Assistant for your projects',
        website: 'https://projentry.netlify.app/',
        // source: 'WIP',
        preview: require('./img/sharead.png'),
        version: VERSIONS.V2,
    },
]