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
          label: 'Open Collective',
          href: 'https://opencollective.com/feature-sliced',
        },
        // TODO: Добавить ссыль на twitter позднее (как доработаем)
        // {
        //   label: 'Twitter',
        //   href: 'https://twitter.com/docusaurus',
        // },
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
        editUrl:
          `${GITHUB_DOCS}/edit/master/website/`,
      },
      // blog: {
      //   showReadingTime: true,
      //   // Please change this to your repo.
      //   editUrl:
      //     `${GITHUB_DOCS}/edit/master/website/blog/`,
      // },
      theme: {
        customCss: require.resolve('./src/css/custom.css'),
      },
    },
  ],
];

/** @type {Config["themeConfig"]["announcementBar"]} */
const announcementBar = {
  id: 'wip', // Any value that will identify this message.
  content: `<b>WIP:</b> Работа над методологией в процессе и окончательный вид <i>может поменяться</i>.
  Пока <b>не рекомендуется применять текущую версию</b> в рабочих проектах <i>(только на свой страх и риск)</i>`,
  backgroundColor: '#af272b', // Defaults to `#fff`.
  textColor: "#fff",
  // textColor: '#091E42', // Defaults to `#000`.
  isCloseable: false, // Defaults to `true`.
}

/** @type {Config} */
module.exports = {
  title: 'feature-sliced',
  // tagline: 'Методология для проектирования frontend проектов, нацеленная на разделение приложения согласно бизнес-логике и областям ответственности.',
  tagline: 'Structural pattern for Frontend projects',
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
};
