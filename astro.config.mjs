// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkHeaderId from 'remark-heading-id';

// https://astro.build/config
export default defineConfig({
  outDir: './build',
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
          autogenerate: { directory: 'get-started' }
        },
        {
          label: '🎯 Guides',
          items: [
            {
              label: 'Examples',
              autogenerate: { directory: 'guides/examples' }
            },
            {
              label: 'Migration',
              autogenerate: { directory: 'guides/migration' }
            },
            {
              label: 'Tech',
              autogenerate: { directory: 'guides/tech' }
            }
          ],
        },
        {
          label: '📚 Reference',
          autogenerate: { directory: 'reference' }
        }
      ],
    }),
  ],
});
