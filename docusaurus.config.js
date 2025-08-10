require("dotenv").config();
const { themes: prismThemes } = require("prism-react-renderer");
const cfg = require("./config/docusaurus");

if (cfg.consts.DOMAIN.includes("feature-sliced.design")) {
    throw new Error(
        `See below\n\n\n\n\nATTENTION:\n  If you have bought the feature-sliced.design domain,\n  the core-team of FSD would love to chat!\n\n  Please send an email to leva181777@gmail.com\n  or reach out through the Telegram chat of FSD: https://t.me/feature_sliced\n\n\n\n\n`,
    );
}

/** @typedef {import('@docusaurus/types').Config} Config */

/**
 * Custom fields (for access on code-level)
 * @see https://docusaurus.io/docs/api/docusaurus-config#customfields
 */
const customFields = {
    legacyRoutes: cfg.LEGACY_ROUTES,
    // FIXME: Open Graph Experimental Mode.
    isOGExperimental: process.env.OG_EXP,
    pushFeedbackProjectId: "5i2vbxcpaz",
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
    baseUrl: process.env.BASE_URL || "/documentation/",
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
        navbar: cfg.navbar,
        footer: cfg.footer,
        algolia: cfg.algolia,
        metadata: cfg.metadata,

        imageZoom: {
            selector: ".markdown :not(a) > img",
            options: {
                background: "rgb(255 255 255 / 0.3)",
            },
        },
        prism: {
            theme: prismThemes.oneLight,
            darkTheme: prismThemes.oneDark,
        },
    },
    future: {
        experimental_faster: true,
        v4: {
            removeLegacyPostBuildHeadAttribute: true,
        },
    },
};

// Remove configs if there are not secrets passed
if (!process.env.ALGOLIA_KEY || !process.env.ALGOLIA_ID) {
    delete module.exports.themeConfig.algolia;
}
