const DOMAIN = 'https://feature-sliced.design/';
const GITHUB_ORG = 'https://github.com/feature-sliced'
const GITHUB_DOCS = 'https://github.com/feature-sliced/documentation';

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
    {
      type: 'doc',
      docId: 'readme',
      position: 'left',
      label: 'Docs',
    },
    { label: 'Getting Started', to: 'docs/get-started/quick-start', position: 'left' },
    { label: 'Concepts', to: 'docs/concepts/architecture', position: 'left' },
    { label: 'Guides', to: 'docs/guides/migration-from-v1', position: 'left' },
    { label: 'Reference', to: 'docs/reference/glossary', position: 'left' },
    { label: 'About', to: 'docs/about/mission', position: 'left' },
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
            label: `v2.0-beta`,
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
          from: ['/docs'],
          to: '/docs/intro',
        },
      ],
    },
  ],
];

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
