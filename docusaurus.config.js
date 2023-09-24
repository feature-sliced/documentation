require("dotenv").config();
const cfg = require("./config/docusaurus");

/** @typedef {import('@docusaurus/types').DocusaurusConfig} Config */

/**
 * Custom fields (for access on code-level)
 * @see https://docusaurus.io/docs/api/docusaurus-config#customfields
 */
const customFields = {
    legacyRoutes: cfg.LEGACY_ROUTES,
    // FIXME: Open Graph Experimental Mode.
    isOGExperimental: process.env.OG_EXP,
};

/** @type {Config} */
module.exports = {
    // General
    title: "Feature-Sliced Design",
    tagline: "Architectural methodology for frontend projects",
    organizationName: "feature-sliced", // Usually your GitHub org/user name.
    projectName: "documentation", // Usually your repo name.
    url: cfg.consts.DOMAIN,
    favicon: "img/favicon/classic.png",
    baseUrl: "/",
    // Extensions
    i18n: cfg.i18n,
    presets: cfg.presets,
    plugins: cfg.plugins,
    // Build & Dev
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    onDuplicateRoutes: "warn",
    customFields,
    trailingSlash: false,
    // Theme
    themeConfig: {
        image: "img/preview.png",
        // @see https://docusaurus.io/docs/sidebar#hideable-sidebar
        docs: { sidebar: { hideable: true, autoCollapseCategories: true } },
        colorMode: { respectPrefersColorScheme: true },
        announcementBar: cfg.announcementBar,
        navbar: cfg.navbar,
        footer: cfg.footer,
        algolia: cfg.algolia,
        metadata: cfg.metadata,
        hotjar: cfg.metrics.hotjar,
        imageZoom: {
            options: {
                background: "rgb(255 255 255 / 0.3)",
            },
        },
    },
};

// Remove configs if there are not secrets passed
if (!process.env.ALGOLIA_KEY || !process.env.ALGOLIA_ID) {
    delete module.exports.themeConfig.algolia;
}
if (!process.env.HOTJAR_ID) {
    delete module.exports.themeConfig.hotjar;
}
