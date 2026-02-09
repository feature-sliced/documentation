// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkHeaderId from "remark-heading-id";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
    outDir: "./build",
    site: "https://fsd.how",
    markdown: {
        remarkPlugins: [remarkHeaderId],
    },
    integrations: [
        starlight({
            title: "Feature-Sliced Design",
            favicon: "./static/img/favicon/adaptive.svg",
            defaultLocale: "root",
            customCss: ["./src/styles/custom.css"],
            logo: {
                src: "./static/img/brand/logo-primary.png",
                replacesTitle: true,
            },
            plugins: [starlightLlmsTxt()],
            locales: {
                root: {
                    label: "English",
                    lang: "en",
                },
                ru: {
                    label: "Русский",
                },
                uz: {
                    label: "O'zbekcha",
                },
                kr: {
                    label: "한국어",
                    lang: "ko",
                },
                ja: {
                    label: "日本語",
                },
                vi: {
                    label: "Tiếng Việt",
                },
                zh: {
                    label: "中文",
                },
            },
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/feature-sliced/documentation",
                },
                {
                    icon: "discord",
                    label: "Discord",
                    href: "https://discord.gg/S8MzWTUsmp",
                },
            ],
            sidebar: [
                {
                    label: "🚀 Get Started",
                    translations: {
                        ru: "🚀 Начало работы",
                    },
                    autogenerate: { directory: "docs/get-started" },
                },
                {
                    label: "🎯 Guides",
                    translations: {
                        ru: "🎯 Гайды",
                    },
                    items: [
                        {
                            label: "Examples",
                            translations: {
                                ru: "Примеры",
                            },
                            autogenerate: { directory: "docs/guides/examples" },
                        },
                        {
                            label: "Migration",
                            translations: {
                                ru: "Миграция",
                            },
                            autogenerate: {
                                directory: "docs/guides/migration",
                            },
                        },
                        {
                            label: "Tech",
                            translations: {
                                ru: "Технологии",
                            },
                            autogenerate: { directory: "docs/guides/tech" },
                        },
                        {
                            label: "Code smells & Issues",
                            translations: {
                                ru: "Известные проблемы",
                            },
                            autogenerate: { directory: "docs/guides/issues" },
                        },
                    ],
                },
                {
                    label: "📚 Reference",
                    translations: {
                        ru: "📚 Справочник",
                    },
                    autogenerate: { directory: "docs/reference" },
                },
                {
                    label: "🍰 About",
                    translations: {
                        ru: "🍰 О нас",
                    },
                    items: [
                        {
                            // label: 'Mission',
                            // translations: {
                            // ru: 'Миссия',
                            // },
                            slug: "docs/about/mission",
                        },
                        {
                            // label: 'Motivation',
                            // translations: {
                            // ru: 'Мотивация',
                            // },
                            slug: "docs/about/motivation",
                        },
                        {
                            // label: 'Alternatives',
                            // translations: {
                            // ru: 'Альтернативы',
                            // },
                            slug: "docs/about/alternatives",
                        },
                        {
                            label: "Understanding",
                            translations: {
                                ru: "Понимание",
                            },
                            autogenerate: {
                                directory: "docs/about/understanding",
                            },
                            collapsed: true,
                        },
                        {
                            label: "Promote",
                            translations: {
                                ru: "Продвижение",
                            },
                            autogenerate: { directory: "docs/about/promote" },
                            collapsed: true,
                        },
                    ],
                },
            ],
        }),
    ],
});
