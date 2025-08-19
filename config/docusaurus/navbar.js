const { DISCORD, GITHUB_DOCS } = require("./consts");

/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["navbar"]} */
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
            label: "📖 Docs",
            to: "/docs/get-started/overview",
            activeBaseRegex: "/docs(/.*)?$",
            position: "left",
        },
        {
            label: "💫 Community",
            to: "/community",
            position: "left",
        },
        {
            label: "📝 Blog",
            to: "/blog",
            position: "left",
        },
        {
            label: "🛠 Examples",
            to: "/examples",
            position: "left",
        },
        // right
        {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
                {
                    to: "https://feature-sliced.github.io/featureslices.dev/v1.0.html",
                    label: "v1.0",
                },
                {
                    to: "https://feature-sliced.github.io/featureslices.dev/v0.1.html",
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
            href: DISCORD,
            position: "right",
            className: "ext-link discord",
            "aria-label": "Discord community server",
        },
        {
            href: GITHUB_DOCS,
            position: "right",
            className: "ext-link github",
            "aria-label": "GitHub repository",
        },
    ],
};

module.exports = { navbar };
