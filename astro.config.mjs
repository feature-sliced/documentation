// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkHeaderId from "remark-heading-id";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
    outDir: "./build",
    site: "https://fsd.how",
    redirects: {
        "/": "/docs/get-started/overview",
        "/ru": "/ru/docs/get-started/overview",
        "/uz": "/uz/docs/get-started/overview",
        "/kr": "/kr/docs/get-started/overview",
        "/ja": "/ja/docs/get-started/overview",
        "/vi": "/vi/docs/get-started/overview",
        "/zh": "/zh/docs/get-started/overview",
    },
    markdown: {
        // @ts-ignore
        remarkPlugins: [remarkHeaderId],
    },
    integrations: [
        starlight({
            title: "Feature-Sliced Design",
            description: "Architectural methodology for frontend projects",
            defaultLocale: "root",
            customCss: ["./src/styles/custom.css"],
            components: {
                ThemeProvider: "./src/components/ThemeProvider.astro",
            },
            head: [
                {
                    tag: "meta",
                    attrs: { property: "og:type", content: "website" },
                },
                {
                    tag: "meta",
                    attrs: {
                        property: "og:title",
                        content: "Feature-Sliced Design",
                    },
                },
                {
                    tag: "meta",
                    attrs: {
                        property: "og:description",
                        content:
                            "Architectural methodology for frontend projects",
                    },
                },
                {
                    tag: "meta",
                    attrs: {
                        property: "og:image",
                        content: "https://fsd.how/img/preview.png",
                    },
                },
                {
                    tag: "meta",
                    attrs: { property: "og:url", content: "https://fsd.how" },
                },
                {
                    tag: "meta",
                    attrs: {
                        name: "twitter:card",
                        content: "summary_large_image",
                    },
                },
                {
                    tag: "meta",
                    attrs: {
                        name: "twitter:title",
                        content: "Feature-Sliced Design",
                    },
                },
                {
                    tag: "meta",
                    attrs: {
                        name: "twitter:description",
                        content:
                            "Architectural methodology for frontend projects",
                    },
                },
                {
                    tag: "meta",
                    attrs: {
                        name: "twitter:image",
                        content: "https://fsd.how/img/preview.png",
                    },
                },
            ],
            logo: {
                src: "./static/img/brand/logo-primary.png",
                replacesTitle: true,
            },
            plugins: [
                starlightLlmsTxt(),
                starlightLinksValidator({
                    errorOnFallbackPages: false,
                    errorOnInconsistentLocale: true,
                }),
            ],
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
                    label: "Get Started",
                    translations: {
                        ru: "Начало работы",
                        ja: "はじめに",
                    },
                    autogenerate: { directory: "docs/get-started" },
                },
                {
                    label: "Guides",
                    translations: {
                        ru: "Гайды",
                        ja: "ガイド",
                    },
                    items: [
                        {
                            label: "Examples",
                            translations: {
                                ru: "Примеры",
                                ja: "例",
                            },
                            autogenerate: { directory: "docs/guides/examples" },
                        },
                        {
                            label: "Migration",
                            translations: {
                                ru: "Миграция",
                                ja: "移行",
                                uz: "Migratsiya",
                            },
                            autogenerate: {
                                directory: "docs/guides/migration",
                            },
                        },
                        {
                            label: "Tech",
                            translations: {
                                ru: "Технологии",
                                ja: "技術",
                                uz: "Texnologiya",
                            },
                            autogenerate: { directory: "docs/guides/tech" },
                        },
                        {
                            label: "Code smells & Issues",
                            translations: {
                                ru: "Известные проблемы",
                                ja: "コード臭いと問題",
                                uz: "Muammolar",
                            },
                            autogenerate: { directory: "docs/guides/issues" },
                        },
                    ],
                },
                {
                    label: "Reference",
                    translations: {
                        ru: "Справочник",
                        ja: "参考書",
                    },
                    autogenerate: { directory: "docs/reference" },
                },
                {
                    label: "About",
                    translations: {
                        ru: "О нас",
                        ja: "メソッドについて",
                    },
                    items: [
                        {
                            slug: "docs/about/mission",
                        },
                        {
                            slug: "docs/about/motivation",
                        },
                        {
                            slug: "docs/about/alternatives",
                        },
                        {
                            label: "Understanding",
                            translations: {
                                ru: "Понимание",
                                ja: "理解",
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
                                ja: "プロモート",
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
