require("dotenv").config();
const path = require("path");
const { REDIRECTS, SECTIONS, LEGACY_ROUTES } = require("./routes.config");

const DOMAIN = "https://feature-sliced.design/";
const GITHUB_ORG = "https://github.com/feature-sliced";
const GITHUB_DOCS = "https://github.com/feature-sliced/documentation";
const TELEGRAM = "https://t.me/feature_sliced";
const YOUTUBE = "https://www.youtube.com/c/FeatureSlicedDesign";
const TWITTER = "https://twitter.com/feature_sliced";
const OPEN_COLLECTIVE = "https://opencollective.com/feature-sliced";
const DEFAULT_LOCALE = "ru";

const DOCUSAURUS_PLUGIN_OG = [
    path.resolve(__dirname, "./plugins/docusaurus-plugin-og"),
    {
        templatesDir: path.resolve(__dirname, "config/og"),
    },
];

/** @typedef {import('@docusaurus/types').DocusaurusConfig} Config */

/** @type {Config["themeConfig"]["navbar"]} */
const navbar = {
    title: "",
    logo: {
        alt: "logo",
        // FIXME: Сделать под SVG позднее
        src: "img/brand/logo-primary.png",
    },
    items: [
        // left
        {
            type: "dropdown",
            label: "📖 Docs",
            position: "left",
            items: [
                {
                    label: "🔎 Intro",
                    to: SECTIONS.INTRO.fullPath,
                    activeBasePath: SECTIONS.INTRO.fullPath,
                },
                {
                    label: "🚀 Get Started",
                    to: SECTIONS.GET_STARTED.shortPath,
                    activeBasePath: SECTIONS.GET_STARTED.shortPath,
                },
                {
                    label: "🎯 Guides",
                    to: SECTIONS.GUIDES.shortPath,
                    activeBasePath: SECTIONS.GUIDES.shortPath,
                },
                {
                    label: "🧩 Concepts",
                    to: SECTIONS.CONCEPTS.shortPath,
                    activeBasePath: SECTIONS.CONCEPTS.shortPath,
                },
                {
                    label: "📚 Reference",
                    to: SECTIONS.REFERENCE.shortPath,
                    activeBasePath: SECTIONS.REFERENCE.shortPath,
                },
                {
                    label: "🍰 About",
                    to: SECTIONS.ABOUT.shortPath,
                    activeBasePath: SECTIONS.ABOUT.shortPath,
                },
                {
                    label: "💫 Community",
                    to: SECTIONS.COMMUNITY.shortPath,
                    activeBasePath: SECTIONS.COMMUNITY.shortPath,
                },
            ],
        },
        {
            label: "🛠 Examples",
            to: SECTIONS.EXAMPLES.fullPath,
            position: "left",
        },
        {
            label: "❔ Help",
            to: "/nav",
            position: "left",
        },
        // right
        {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
                {
                    to: "https://featureslices.dev/v1.0.html",
                    label: "v1.0",
                },
                {
                    to: "https://featureslices.dev/v0.1.html",
                    label: "v0.1",
                },
                {
                    to: "https://github.com/feature-sliced/documentation/tree/rc/feature-driven",
                    label: "feature-driven",
                },
                {
                    to: "/versions",
                    // TODO: (i18n) Add translation
                    label: "All versions",
                },
            ],
        },
        {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
                {
                    href: "https://github.com/feature-sliced/documentation/issues/244",
                    label: "Help Us Translate",
                },
            ],
        },
        {
            "href": TELEGRAM,
            "position": "right",
            "className": "ext-link telegram",
            "aria-label": "Telegram community chat",
        },
        {
            "href": GITHUB_DOCS,
            "position": "right",
            "className": "ext-link github",
            "aria-label": "GitHub repository",
        },
    ],
};

/** @type {Config["themeConfig"]["footer"]} */
const footer = {
    style: "dark",
    links: [
        {
            title: "Specs",
            items: [
                { label: "Documentation", to: "/docs/intro" },
                { label: "Discussions", to: `${GITHUB_DOCS}/discussions` },
            ],
        },
        {
            title: "Community",
            items: [
                { label: "Telegram", href: TELEGRAM },
                { label: "Twitter", href: TWITTER },
                { label: "Open Collective", href: OPEN_COLLECTIVE },
                { label: "YouTube", href: YOUTUBE },
            ],
        },
        {
            title: "More",
            items: [
                // TODO: Добавить ссыль на dev.to позднее (как доработаем)
                // { label: 'Blog', to: '/blog' },
                { label: "GitHub", href: GITHUB_ORG },
                {
                    label: "Contribution Guide (RU)",
                    href: `${GITHUB_DOCS}/blob/master/CONTRIBUTING.md`,
                },
                {
                    label: "License",
                    href: `${GITHUB_DOCS}/blob/master/LICENSE`,
                },
                { label: "Privacy", href: "/docs/privacy" },
            ],
        },
    ],
    logo: {
        alt: "Feature-Sliced Design - Architectural methodology for frontend projects",
        src: "img/brand/logo-primary.png",
        href: GITHUB_ORG,
    },
    copyright: `Copyright © ${new Date().getFullYear()}  Feature-Sliced Design`,
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

/** @type {Config["presets"]} */
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
                customCss: require.resolve("./src/app/index.scss"),
            },
            // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap
            sitemap: {
                changefreq: "weekly",
                priority: 0.5,
                trailingSlash: false,
            },
        },
    ],
];

/** @type {Config["plugins"]} */
const plugins = [
    [
        "@docusaurus/plugin-content-docs",
        {
            id: "community",
            path: `i18n/${DEFAULT_LOCALE}/docusaurus-plugin-content-docs/community`,
            editLocalizedFiles: true,
            routeBasePath: "community",
            editUrl: `${GITHUB_DOCS}/edit/master/`,
            sidebarPath: require.resolve("./sidebars.community.js"),
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
        },
    ],
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

/** @type {Config["themeConfig"]["algolia"]} */
const algolia = {
    appId: process.env.ALGOLIA_ID,
    apiKey: process.env.ALGOLIA_KEY,
    indexName: "feature-sliced",
    // FIXME: При включении отрубает поиск (исправить поздней)
    // // Для поиска с учетом версий (на будущее)
    // contextualSearch: true,
};

/** @type {Config["themeConfig"]["announcementBar"]} */
const announcementBar = {
    id: "bar", // Any value that will identify this message.
    // content: `<b>WIP:</b> Текущая версия методологии находится на стадии разработки и некоторые детали <i>могут измениться</i>`,
    // backgroundColor: '#e6a700', // As caution by docusaurus (defaults was `#fff`)
    // FIXME: (i18n) translate by locale later (how to?)
    // content: `If you are using the methodology <a href="/versions">(v0 / v1 / v2)</a> at work or in personal projects, <a href="https://github.com/feature-sliced/documentation/issues/131" target="_blank" rel="noreferrer noopener">tell, us!</a>`,
    // content: `📚 Documentation refinements are in progress. <a href="https://github.com/feature-sliced/documentation/issues/263" target="_blank" rel="noreferrer noopener">Stay tuned for updates</a> and <a href="https://forms.gle/nsYua6bMMG5iBB3v7" target="_blank" rel="noreferrer noopener">share your feedback</a>`,
    // backgroundColor: "#5c9cb5", // As primary theme
    // backgroundColor: "#0367d2",
    content: `🍰 We're <a href="/blog/rebranding-stable">rebranding!</a>&nbsp;&nbsp;|&nbsp;&nbsp;☮️ Stop the war in Ukraine! #NoWar`, // #nowar
    backgroundColor: "#000000", // #nowar
    textColor: "#fff", // Defaults to `#000`.
    isCloseable: false, // Defaults to `true`.
};

/** @type {Config["themeConfig"]["colorMode"]} */
const colorMode = {
    respectPrefersColorScheme: true,
};

/**
 * @type {Config["themeConfig"]["metadatas"]}
 * @see https://docusaurus.io/docs/api/themes/configuration#meta-image
 * @see https://docusaurus.io/docs/api/themes/configuration#metadatas
 */
const metadatas = [
    { name: "twitter:site", content: "@feature_sliced" },
    { name: "twitter:card", content: "summary_large_image" },
    // NOTE: uncomment if need
    // { name: "description", content: description },
    // { name: "og:image", content: `/img/preview.png` }, // ~ inherits from themeConfig.image
    // { name: "og:title", content: title },
    // { name: "og:type", content: "website" },
    // { name: "og:description", content: description },
    // { name: "twitter:image", content: `/img/preview.png` }, // ~ inherits from themeConfig.image
    // { name: "twitter:title", content: title },
    // { name: "twitter:description", content: description },
];

/**
 * Custom fields (for access on code-level)
 * @see https://docusaurus.io/docs/api/docusaurus-config#customfields
 */
const customFields = {
    legacyRoutes: LEGACY_ROUTES,
    // FIXME: Open Graph Experimental Mode.
    isOGExperimental: process.env.OG_EXP,
};

/** @type {Config} */
module.exports = {
    title: "Feature-Sliced Design",
    // tagline: 'Методология для проектирования frontend проектов, нацеленная на разделение приложения согласно бизнес-логике и областям ответственности.',
    tagline: "Architectural methodology for frontend projects",
    url: DOMAIN,
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "error",
    onDuplicateRoutes: "warn",
    favicon: "img/favicon.ico",
    trailingSlash: false, // For unified routes (FEEDBACK-337)
    organizationName: "feature-sliced", // Usually your GitHub org/user name.
    projectName: "documentation", // Usually your repo name.
    themeConfig: {
        image: "img/preview.png",
        metadatas,
        colorMode,
        navbar,
        footer,
        announcementBar,
        algolia,
        hideableSidebar: true,
        ...metrics,
    },
    i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: ["ru", "en"],
        localeConfigs: {
            ru: {
                label: "Русский",
            },
            en: {
                label: "English (WIP)",
            },
        },
    },
    presets,
    plugins,
    customFields,
};

// Remove configs if there are not secrets passed
if (!process.env.ALGOLIA_KEY || !process.env.ALGOLIA_ID) {
    delete module.exports.themeConfig.algolia;
}
if (!process.env.GA_ID) {
    delete module.exports.themeConfig.gtag;
    delete module.exports.themeConfig.googleAnalytics;
}
if (!process.env.HOTJAR_ID) {
    delete module.exports.themeConfig.hotjar;
}
