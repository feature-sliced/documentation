const { COMMUNITY } = require("./consts");

/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["navbar"]} */
const navbar = {
    title: "",
    logo: {
        alt: "logo",
        // FIXME: Сделать под SVG позднее
        src: "img/brand/logo-monochrome.png",
    },
    items: [
        // left
        {
            label: "Home",
            to: "/",
            activeBaseRegex: "/$",
            position: "left",
        },
        {
            label: "About",
            // TODO: [FSDCUR] Add page
            to: "#",
            position: "left",
        },
        {
            label: "Blog",
            to: "/blog",
            position: "left",
        },
        {
            label: "Community",
            to: "/community",
            position: "left",
        },
        {
            label: "Showcase",
            to: "/showcase",
            position: "left",
        },
        {
            label: "Docs",
            to: "/docs",
            // FIXME: [FSDCUR] Simplify regexp
            activeBaseRegex: "^/docs(?:/(?:get-started|reference|guides|about)/?.*)?$",
            position: "left",
        },
        {
            label: "Versions",
            to: "/versions",
            type: "docsVersion",
            position: "left",
        },
        // right
        {
            href: COMMUNITY.GITHUB_DOCS,
            position: "right",
            className: "ext-link github",
        },
        {
            href: COMMUNITY.TELEGRAM,
            position: "right",
            className: "ext-link telegram",
        },
        {
            href: COMMUNITY.TWITTER,
            position: "right",
            className: "ext-link twitter",
        },
        {
            href: COMMUNITY.DISCORD,
            position: "right",
            className: "ext-link discord",
        },
        {
            href: COMMUNITY.YOUTUBE,
            position: "right",
            className: "ext-link youtube",
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
        // TODO: [FSDCUR] Resolve local searchBox visibility
    ],
};

module.exports = { navbar };
