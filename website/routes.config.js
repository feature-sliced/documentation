// Custom "not-docusaurus-related" config for routes setup
// @see https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects

// FIXME: Clean up urls format (with new index-pages)
const SECTIONS = {
    INTRO: {
        shortPath: "/docs",
        fullPath: "/docs/intro",
    },
    GET_STARTED: {
        shortPath: "/docs/get-started",
        fullPath: "/docs/get-started",
    },
    CONCEPTS: {
        shortPath: "/docs/concepts",
        fullPath: "/docs/concepts",
    },
    GUIDES: {
        shortPath: "/docs/guides",
        fullPath: "/docs/guides",
    },
    REFERENCE: {
        shortPath: "/docs/reference",
        fullPath: "/docs/reference",
    },
    LAYERS: {
        shortPath: "/docs/reference/layers",
        fullPath: "/docs/reference/layers/overview",
    },
    ABOUT: {
        shortPath: "/docs/about",
        fullPath: "/docs/about",
    },
    EXAMPLES: {
        shortPath: "/examples",
        fullPath: "/examples",
    },
};

/**
 * Redirections after restructuring docs
 * @remark For compatibility with legacy links
 */
const LEGACY_ROUTES = [
    {
        group: "Get Started",
        children: [
            {
                title: "Overview",
                from: "/docs/get-started/overview",
                to: "/docs/intro",
            },
            {
                title: "QuickStart",
                from: "/docs/get-started/tutorial/quick-start",
                to: "/docs/get-started/quick-start",
            },
            {
                title: "Decompose Cheatsheet",
                from: [
                    "/docs/get-started/tutorial/decompose",
                    "/docs/get-started/tutorial/design-mock-up",
                    "/docs/get-started/tutorial/cheatsheet",
                ],
                to: "/docs/get-started/cheatsheet",
            },
        ],
    },
    {
        group: "Alternatives",
        children: [
            {
                title: "BBoM",
                from: "/docs/get-started/alternatives/big-ball-of-mud",
                to: "/docs/about/alternatives/big-ball-of-mud",
            },
            {
                title: "Design Principles",
                from: "/docs/get-started/alternatives/design-principles",
                to: "/docs/about/alternatives/design-principles",
            },
            {
                title: "DDD",
                from: "/docs/get-started/alternatives/ddd",
                to: "/docs/about/alternatives/ddd",
            },
            {
                title: "Clean Architecture",
                from: "/docs/get-started/alternatives/clean-architecture",
                to: "/docs/about/alternatives/clean-architecture",
            },
            {
                title: "Frameworks",
                from: "/docs/get-started/alternatives/frameworks",
                to: "/docs/about/alternatives/frameworks",
            },
            {
                title: "Atomic Design",
                from: "/docs/get-started/alternatives/atomic-design",
                to: "/docs/about/alternatives/atomic-design",
            },
            {
                title: "Smart & Dumb components",
                from: "/docs/get-started/alternatives/smart-dumb-components",
                to: "/docs/about/alternatives/smart-dumb-components",
            },
            {
                title: "Feature Driven",
                from: "/docs/get-started/alternatives/feature-driven",
                to: "/docs/about/alternatives/feature-driven",
            },
        ],
    },
    {
        group: "Promote",
        children: [
            {
                title: "Integration, Pros & Cons, Limitations",
                from: "/docs/get-started/onboard/pros-cons",
                to: "/docs/about/promote/integration",
            },
            {
                title: "Partial application",
                from: "/docs/get-started/onboard/partial-application",
                to: "/docs/about/promote/partial-application",
            },
            {
                title: "For team",
                from: "/docs/get-started/onboard/for-team",
                to: "/docs/about/promote/for-team",
            },
            {
                title: "For company",
                from: "/docs/get-started/onboard/promote",
                to: "/docs/about/promote/for-company",
            },
        ],
    },
];

// @returns { from, to }[]
const LEGACY_ROUTES_REDIRECTS = LEGACY_ROUTES.reduce((acc, group) => {
    const cleanItems = group.children.map(({ from, to }) => ({ from, to }));
    acc.concat(cleanItems);
    return acc;
}, []);

// FIXME: temp, resolve later
// @returns { from, to }[]
const SECTIONS_REDIRECTS = Object.values(SECTIONS)
    // Custom filtering
    .filter(({ shortPath, fullPath }) => shortPath !== fullPath)
    .map(({ shortPath, fullPath }) => ({
        from: shortPath,
        to: fullPath,
    }));

// NOTE: temp redirects, resolve later
const REDIRECTS = [...SECTIONS_REDIRECTS, ...LEGACY_ROUTES_REDIRECTS];

module.exports = {
    SECTIONS,
    LEGACY_ROUTES,
    REDIRECTS,
};
