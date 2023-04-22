import * as path from 'node:path'
import { packageDirectory } from 'pkg-dir'

import { routeMap } from './src/pages/route-map.mjs'

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages = async ({ graphql, actions }) => {
  const rootPath = await packageDirectory()
  if (!rootPath) throw new Error('package root not found')

  actions.createPage({
    path: routeMap.notFound,
    component: path.join(rootPath, 'src/pages/404.tsx'),
  })

  actions.createPage({
    path: routeMap.home,
    component: path.join(rootPath, 'src/pages/home.tsx'),
  })

  ;['kek', 'wait'].forEach(article => {
    actions.createPage({
      path: routeMap.docs.article(article),
      component: path.join(rootPath, 'src/pages/docs-article.tsx')
    })
  })
}
