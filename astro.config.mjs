// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkHeaderId from 'remark-heading-id';
import starlightLlmsTxt from 'starlight-llms-txt';

// https://astro.build/config
export default defineConfig({
  outDir: './build',
  site: 'https://fsd.how',
  markdown: {
    remarkPlugins: [remarkHeaderId],
  },
  integrations: [
    starlight({
      title: 'Feature-Sliced Design',
      favicon: './static/img/favicon/adaptive.svg',
      defaultLocale: 'root',
      customCss: [
        './src/styles/custom.css',
      ],
      logo: {
        src: './static/img/brand/logo-primary.png',
        replacesTitle: true,
      },
      plugins: [
        starlightLlmsTxt(),
      ],
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        ru: {
          label: 'Русский',
        }
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }, { icon: 'discord', label: 'Discord', href: 'https://discord.gg/S8MzWTUsmp' }],
      sidebar: [
        {
          label: '🚀 Get Started',
          autogenerate: { directory: 'docs/get-started' }
        },
        {
          label: '🎯 Guides',
          items: [
            {
              label: 'Examples',
              autogenerate: { directory: 'docs/guides/examples' }
            },
            {
              label: 'Migration',
              autogenerate: { directory: 'docs/guides/migration' }
            },
            {
              label: 'Tech',
              autogenerate: { directory: 'docs/guides/tech' }
            }
          ],
        },
        {
          label: '📚 Reference',
          autogenerate: { directory: 'docs/reference' }
        },
        {
          label: '🍰 About',
          items: [{
            label: 'Mission',
            slug: 'docs/about/mission'
          }, {
            label: 'Motivation',
            slug: 'docs/about/motivation'
          }, {
            label: 'Alternatives',
            slug: 'docs/about/alternatives'
          }, {
            label: 'Understanding',
            autogenerate: { directory: 'docs/about/understanding' },
            collapsed: true,
          }, {
            label: 'Promote',
            autogenerate: { directory: 'docs/about/promote' },
            collapsed: true,
          }],
        }
      ],
    }),
  ],
});
