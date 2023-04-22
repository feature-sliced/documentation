import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {},
  graphqlTypegen: false,
  plugins: [
    // disables default page creating by overriding it and ignoring all modules
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`,
        ignore: ['**.(mjs|cjs|ejs|jsx|js|tsx|ts)'],
      },
    },
  ],
}

export default config
