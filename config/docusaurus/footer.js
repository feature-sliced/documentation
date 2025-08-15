const {
    GITHUB_DOCS,
    GITHUB_ORG,
    DISCORD,
    TELEGRAM,
    TWITTER,
    OPEN_COLLECTIVE,
    YOUTUBE,
} = require("./consts");

/** @type {import('@docusaurus/types').DocusaurusConfig["themeConfig"]["footer"]} */
const footer = {
    style: "dark",
    links: [
        {
            title: "Specs",
            items: [
                { label: "Documentation", to: "/docs" },
                { label: "Community", to: "/community" },
                { label: "Help", to: "/nav" },
                { label: "Discussions", href: `${GITHUB_DOCS}/discussions` },
            ],
        },
        {
            title: "Community",
            items: [
                { label: "Discord", href: DISCORD },
                { label: "Telegram (RU)", href: TELEGRAM },
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
                    label: "Contribution Guide",
                    href: `${GITHUB_DOCS}/blob/master/CONTRIBUTING.md`,
                },
                {
                    label: "License",
                    href: `${GITHUB_DOCS}/blob/master/LICENSE`,
                },
                { label: "Docs for LLMs", to: "/docs/llms" },
            ],
        },
    ],
    logo: {
        alt: "Feature-Sliced Design - Architectural methodology for frontend projects",
        src: "img/brand/logo-primary.png",
        href: GITHUB_ORG,
        width: 160,
    },
    copyright: `Copyright © ${new Date().getFullYear()}  Feature-Sliced Design`,
};

module.exports = { footer };
