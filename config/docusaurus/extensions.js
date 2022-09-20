const path = require("path");
const { GITHUB_DOCS, DEFAULT_LOCALE } = require("./consts");
const { REDIRECTS } = require("./routes");

const DOCUSAURUS_PLUGIN_OG = [
    path.resolve(__dirname, "./plugins/docusaurus-plugin-og"),
    {
        templatesDir: path.resolve(__dirname, "config/og"),
    },
];

/** @type {import('@docusaurus/types').DocusaurusConfig["presets"]} */
const presets = [
    [
        "@docusaurus/preset-classic",
        {
            docs: {
                path: `i18n/${DEFAULT_LOCALE}/docusaurus-plugin-content-docs/current`,
                editLocalizedFiles: true,
                sidebarPath: require.resolve("./sidebars.docs.js"),
                // Please change this to your repo.
                editUrl: `${GITHUB_DOCS}/edit/master/`,
                // // Equivalent to `enableUpdateBy`.
                // showLastUpdateAuthor: true,
                // Equivalent to `enableUpdateTime`.
                // FIXME: convert DD/MM/YYYY format
                showLastUpdateTime: true,
                versions: {
                    current: {
                        label: `v2.0-beta 🍰`,
                    },
                },
            },
            blog: {
                showReadingTime: true,
                editUrl: `${GITHUB_DOCS}/edit/master/blog/`,
            },
            theme: {
                customCss: require.resolve("../../src/app/index.scss"),
            },
            // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap
            sitemap: {
                changefreq: "weekly",
                priority: 0.5,
                trailingSlash: false,
                gtag: process.env.GA_ID ? metrics.gtag : undefined,
                googleAnalytics: process.env.GA_ID ? metrics.googleAnalytics : undefined,
            },
        },
    ],
];

/** @type {import('@docusaurus/types').DocusaurusConfig["plugins"]} */
const plugins = [
    // https://docusaurus.io/docs/docs-multi-instance
    [
        "@docusaurus/plugin-content-docs",
        {
            id: "community",
            // !!! FIXME: Adapt for i18n
            path: `i18n/en/docusaurus-plugin-content-docs/community`,
            editLocalizedFiles: true,
            routeBasePath: "community",
            editUrl: `${GITHUB_DOCS}/edit/master/`,
            sidebarPath: require.resolve("./sidebars.community.js"),
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
        },
    ],
    // https://www.npmjs.com/package/docusaurus-plugin-sass
    "docusaurus-plugin-sass",
    // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
    [
        "@docusaurus/plugin-client-redirects",
        {
            // NOTE: Редиректы работают при прямом переходе по ссылке в адресной строке
            // Если же переходить чисто по ссылкам, то редиректа не будет (только при обновлении страницы)
            // TODO: Сделать позже, чтоб редирект работал и при переходе с внутренних ссылок
            // И убрать хардкод с доки и конфига
            redirects: REDIRECTS,
        },
    ],
    // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-ideal-image
    [
        "@docusaurus/plugin-ideal-image",
        {
            quality: 70,
            max: 1030, // max resized image's size.
            min: 640, // min resized image's size. if original is lower, use that size.
            steps: 2, // the max number of images generated between min and max (inclusive)
        },
    ],
    process.env.HOTJAR_ID && "docusaurus-plugin-hotjar", // For preventing crashing
    // FIXME: Docusaurus Open Graph Plugin Experimental.
    process.env.OG_EXP && DOCUSAURUS_PLUGIN_OG,
].filter(Boolean);

/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["algolia"]} */
const algolia = {
    appId: process.env.ALGOLIA_ID,
    apiKey: process.env.ALGOLIA_KEY,
    indexName: "feature-sliced",
    // FIXME: При включении отрубает поиск (исправить поздней)
    // Для поиска с учетом версий (на будущее)
    contextualSearch: false,
};

// We use metrics only for analyze and refinement website discovery experience
// @see Privacy
const metrics = {
    gtag: {
        trackingID: process.env.GA_ID, // the Google Analytics Tracking ID
        anonymizeIP: true, // Should IPs be anonymized?
    },
    googleAnalytics: {
        trackingID: process.env.GA_ID, // the Google Analytics Tracking ID
        anonymizeIP: true, // Should IPs be anonymized?
    },
    // to integrate Hotjar feedback
    // @see https://github.com/symblai/docusaurus-plugin-hotjar
    hotjar: {
        applicationId: process.env.HOTJAR_ID,
    },
};

module.exports = { presets, plugins, algolia, metrics };
