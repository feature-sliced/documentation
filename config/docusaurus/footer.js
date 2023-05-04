const { COMMUNITY } = require("./consts");

// TODO: [FSDCUR] Adapt to design
/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["footer"]} */
const footer = {
    style: "dark",
    logo: {
        alt: "Feature-Sliced Design - Architectural methodology for frontend projects",
        src: "img/brand/logo-monochrome.svg",
        href: COMMUNITY.GITHUB_ORG,
        height: 32,
    },
    copyright: `Feature-Sliced Design,&nbsp;<a href="https://github.com/feature-sliced/documentation/blob/master/LICENSE" target="_blank" rel="noreferrer noopener">MIT licensed</a>, 2018-${new Date().getFullYear()}`,
    links: [
        {
            label: "Brand",
            href: "/docs/branding",
        },
        {
            label: "License",
            href: `${COMMUNITY.GITHUB_DOCS}/blob/master/LICENSE`,
        },
        {
            label: "Privacy",
            href: "/docs/privacy",
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
