const { COMMUNITY } = require("./consts");

/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["footer"]} */
const footer = {
    style: "dark",
    links: [
        {
            title: "Specs",
            items: [
                { label: "Documentation", to: "/docs" },
                { label: "Community", to: "/community" },
                { label: "Discussions", to: `${COMMUNITY.GITHUB_DOCS}/discussions` },
            ],
        },
        {
            title: "Community",
            items: [
                { label: "Discord", href: COMMUNITY.DISCORD },
                { label: "Telegram (RU)", href: COMMUNITY.TELEGRAM },
                { label: "Twitter", href: COMMUNITY.TWITTER },
                { label: "Open Collective", href: COMMUNITY.OPEN_COLLECTIVE },
                { label: "YouTube", href: COMMUNITY.YOUTUBE },
            ],
        },
        {
            title: "More",
            items: [
                // TODO: Добавить ссыль на dev.to позднее (как доработаем)
                // { label: 'Blog', to: '/blog' },
                { label: "GitHub", href: COMMUNITY.GITHUB_ORG },
                {
                    label: "Contribution Guide",
                    href: `${COMMUNITY.GITHUB_DOCS}/blob/master/CONTRIBUTING.md`,
                },
                {
                    label: "License",
                    href: `${COMMUNITY.GITHUB_DOCS}/blob/master/LICENSE`,
                },
                { label: "Privacy", href: "/docs/privacy" },
            ],
        },
    ],
    logo: {
        alt: "Feature-Sliced Design - Architectural methodology for frontend projects",
        src: "img/brand/logo-monochrome.png",
        href: COMMUNITY.GITHUB_ORG,
        width: 160,
    },
    copyright: `Copyright © ${new Date().getFullYear()}  Feature-Sliced Design`,
};

module.exports = { footer };
