const DOMAIN = 'https://feature-sliced.design/';
const GITHUB_ORG = 'https://github.com/feature-sliced'
const GITHUB_DOCS = 'https://github.com/feature-sliced/documentation';

// Конкретные страницы нужны, т.к. отдельно секции доки не индексируются
// FIXME: Будет исправлено позднее
const SECTIONS = {
  INTRO: {
    shortPath: '/docs',
    fullPath: '/docs/intro',
  },
  GET_STARTED: {
    shortPath: '/docs/get-started',
    fullPath: '/docs/get-started/quick-start',
  },
  CONCEPTS: {
    shortPath: '/docs/concepts',
    fullPath: '/docs/concepts/architecture',
  },
  GUIDES: {
    shortPath: '/docs/guides',
    fullPath: '/docs/guides/migration-from-v1',
  },
  REFERENCE: {
    shortPath: '/docs/reference',
    fullPath: '/docs/reference/glossary',
  },
  ABOUT: {
    shortPath: '/docs/about',
    fullPath: '/docs/about/mission',
  },
}

/** @typedef {import('@docusaurus/types').DocusaurusConfig} Config */

/** @type {Config["themeConfig"]["navbar"]} */
const navbar = {
  title: 'feature-sliced',
  logo: {
    alt: 'logo',
    // FIXME: Сделать под SVG позднее
    src: 'img/logo.png',
  },
  items: [
    // left
    { label: 'Docs', to: SECTIONS.INTRO.fullPath, position: 'left' },
    { label: 'Getting Started', to: SECTIONS.GET_STARTED.fullPath, position: 'left' },
    { label: 'Concepts', to: SECTIONS.CONCEPTS.fullPath, position: 'left' },
    { label: 'Guides', to: SECTIONS.GUIDES.fullPath, position: 'left' },
    { label: 'Reference', to: SECTIONS.REFERENCE.fullPath, position: 'left' },
    { label: 'About', to: SECTIONS.ABOUT.fullPath, position: 'left' },
    // right
    {
      href: GITHUB_DOCS,
      label: 'GitHub',
      position: 'right',
    },
    {
      type: 'docsVersionDropdown',
      position: 'right',
      dropdownActiveClassDisabled: true,
      dropdownItemsAfter: [
        {
          to: 'https://featureslices.dev/v1.0.html',
          label: 'v1.0',
        },
        {
          to: 'https://featureslices.dev/v0.1.html',
          label: 'v0.1',
        },
        {
          to: 'https://github.com/feature-sliced/documentation/tree/rc/feature-driven',
          label: 'feature-driven',
        },
        {
          to: '/versions',
          label: 'All versions',
        },
        {
          to: '/versions',
          label: `${process.env.DEBUG_KEY} (2)`,
        },
      ],
    },
    {
      type: 'localeDropdown',
      position: 'right',
    },
  ],
};

/** @type {Config["themeConfig"]["footer"]} */
const footer = {
  style: 'dark',
  links: [
    {
      title: 'Docs',
      items: [
        {
          label: 'Документация',
          to: '/docs/intro',
        },
        {
          label: 'Обсуждения',
          to: `${GITHUB_DOCS}/discussions`,
        },
      ],
    },
    {
      title: 'Community',
      items: [
        {
          label: 'Telegram',
          href: 'https://t.me/feature_sliced',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/feature_sliced',
        },
        {
          label: 'Open Collective',
          href: 'https://opencollective.com/feature-sliced',
        },
      ],
    },
    {
      title: 'More',
      items: [
        // TODO: Добавить ссыль на dev.to позднее (как доработаем)
        // {
        //   label: 'Blog',
        //   to: '/blog',
        // },
        {
          label: 'GitHub',
          href: GITHUB_ORG,
        },
      ],
    },
  ],
  logo: {
    alt: 'feature-sliced - Structural pattern for Frontend projects',
    src: 'img/logo.png',
    href: GITHUB_ORG,
  },
  copyright: `Copyright © ${new Date().getFullYear()}  Feature-Sliced`,
};

/** @type {Config["presets"]} */
const presets = [
  [
    '@docusaurus/preset-classic',
    {
      docs: {
        path: '../docs',
        sidebarPath: require.resolve('./sidebars.js'),
        // Please change this to your repo.
        editUrl: `${GITHUB_DOCS}/edit/master/website/`,
        // // Equivalent to `enableUpdateBy`.
        // showLastUpdateAuthor: true,
        // Equivalent to `enableUpdateTime`.
        // FIXME: convert DD/MM/YYYY format
        showLastUpdateTime: true,
        versions: {
          current: {
            label: `v2.0-beta 🍰`,
          },
        },
      },
      // blog: {
      //   showReadingTime: true,
      //   // Please change this to your repo.
      //   editUrl:
      //     `${GITHUB_DOCS}/edit/master/website/blog/`,
      // },
      theme: {
        customCss: require.resolve('./src/app/index.css'),
      },
      // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap
      sitemap: {
        changefreq: 'weekly',
        priority: 0.5,
        trailingSlash: false,
      },
    },
  ],
];

/** @type {Config["plugins"]} */
const plugins = [
  // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects: [
        {
          from: [SECTIONS.INTRO.shortPath],
          to: SECTIONS.INTRO.fullPath,
        },
        // NOTE: Редиректы работают при прямом переходе по ссылке в адресной строке
        // Если же переходить чисто по ссылкам, то редиректа не будет (только при обновлении страницы)
        // TODO: Сделать позже, чтоб редирект работал и при переходе с внутренних ссылок
        // И убрать хардкод с доки и конфига
        {
          from: [SECTIONS.GET_STARTED.shortPath],
          to: SECTIONS.GET_STARTED.fullPath,
        },
        {
          from: [SECTIONS.CONCEPTS.shortPath],
          to: SECTIONS.CONCEPTS.fullPath,
        },
        {
          from: [SECTIONS.GUIDES.shortPath],
          to: SECTIONS.GUIDES.fullPath,
        },
        {
          from: [SECTIONS.REFERENCE.shortPath],
          to: SECTIONS.REFERENCE.fullPath,
        },
        {
          from: [SECTIONS.ABOUT.shortPath],
          to: SECTIONS.ABOUT.fullPath,
        },
      ],
    },
  ],
];

/** @type {Config["themeConfig"]["algolia"]} */
const algolia = {
  apiKey: process.env.ALGOLIA_KEY,
  indexName: 'feature-sliced',
  // Для поиска с учетом версий (на будущее)
  contextualSearch: true,
};

/** @type {Config["themeConfig"]["announcementBar"]} */
const announcementBar = {
  id: 'wip', // Any value that will identify this message.
  content: `<b>WIP:</b> Текущая версия методологии находится на стадии разработки и некоторые детали <i>могут измениться</i>`,
  backgroundColor: '#e6a700', // As caution by docusaurus (defaults was `#fff`)
  textColor: "#fff",
  // textColor: '#091E42', // Defaults to `#000`.
  isCloseable: false, // Defaults to `true`.
}

/** @type {Config} */
module.exports = {
  title: 'feature-sliced',
  // tagline: 'Методология для проектирования frontend проектов, нацеленная на разделение приложения согласно бизнес-логике и областям ответственности.',
  tagline: 'Structural methodology for frontend projects',
  url: DOMAIN,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'error',
  onDuplicateRoutes: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'feature-sliced', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  themeConfig: {
    navbar,
    footer,
    announcementBar,
    algolia,
    hideableSidebar: true,
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
    localeConfigs: {
      'ru': {
        label: 'Русский'
      }
    },
  },
  presets,
  plugins,
};

// if (!process.env.ALGOLIA_KEY) {
//   delete module.exports.themeConfig.algolia;
// }
