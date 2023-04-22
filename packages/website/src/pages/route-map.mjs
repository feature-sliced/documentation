// route map used both in browser and gatsby-node, so it needs to be pure es module

export const routeMap = {
  home: '/',
  search: '/search',
  docs: {
    home: '/docs',
    article: (id) => `/docs/article/${id}`,
    section: (id) => `/docs/section/${id}`,
    search: '/docs/search',
  },
  blog: {
    home: '/blog',
    search: '/blog/search',
  },
  showcase: {
    home: '/showcase',
  },
  about: {
    home: '/about',
    brand: '/about/brand',
    cases: '/about/cases',
    roadmap: '/about/roadmap',
  },
  notFound: '/404',
}
