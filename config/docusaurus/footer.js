const { COMMUNITY } = require("./consts");

// TODO: [FSDCUR] Adapt to design
/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["footer"]} */
const footer = {
    style: "dark",
    logo: {
        alt: "Feature-Sliced Design - Architectural methodology for frontend projects",
        src: "img/brand/logo-monochrome.png",
        href: COMMUNITY.GITHUB_ORG,
        width: 160,
    },
    copyright: `Copyright © ${new Date().getFullYear()}  Feature-Sliced Design`,
    links: [
        {
            label: "Brand",
            href: "/docs/branding",
        },
        {
            label: "Privacy",
            href: "/docs/privacy",
        },
        {
            label: "License",
            href: `${COMMUNITY.GITHUB_DOCS}/blob/master/LICENSE`,
        },
        {
            label: "Code of Coduct",
            href: `${COMMUNITY.GITHUB_DOCS}/blob/master/CODE_OF_CONDUCT.md`,
        },
        {
            label: "Discussions",
            href: `${COMMUNITY.GITHUB_DOCS}/discussions`,
        },
        {
            label: "Contributing",
            href: `${COMMUNITY.GITHUB_DOCS}/blob/master/CONTRIBUTING.md`,
        },
    ],
};

module.exports = { footer };
