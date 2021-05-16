const DOMAIN = 'https://feature-sliced.design/';
const GITHUB_ORG = 'https://github.com/feature-sliced'
const GITHUB_DOCS = 'https://github.com/feature-sliced/wiki';

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
    {
      type: 'doc',
      docId: 'readme',
      position: 'left',
      label: 'Документация',
    },
    {
      href: GITHUB_DOCS,
      label: 'GitHub',
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
          to: '/docs/readme',
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


/** @type {Config} */
module.exports = {
  title: 'feature-sliced',
  // tagline: 'Методология для проектирования frontend проектов, нацеленная на разделение приложения согласно бизнес-логике и областям ответственности.',
  tagline: 'Structural pattern and methodology for frontend projects',
  url: DOMAIN,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'feature-sliced', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.
  themeConfig: {
    navbar,
    footer,
    hideableSidebar: true,
  },
  presets,
};
