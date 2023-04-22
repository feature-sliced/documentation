import { createTypesFactory, buildGraphQLSchema } from 'gqtx'

const t = createTypesFactory()

const Query = t.queryType({
  fields: () => [
    t.field({
      name: 'hello',
      type: t.String,
      resolve: () => 'world'
    })
  ]
})

export const schema = buildGraphQLSchema({ query: Query })
