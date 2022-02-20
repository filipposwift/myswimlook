import { createClient } from '../plugins/contentful'

export const fetchSitemapRoutes = async () => {
  const client = createClient()
  const entries = await Promise.all([
    client.getEntries({
      content_type: 'designers',
    }),
    client.getEntries({
      content_type: 'provaStyles',
    }),
    client.getEntries({
      content_type: 'stories',
    }),
    client.getEntries({
      content_type: 'people',
    }),
  ]).then(([designers, styles, stories, people]) => {
    return [
      ...designers.items.map((item) => `designers/${item.fields.slug}`),
      ...styles.items.map((item) => `styles/${item.fields.slug}`),
      ...stories.items.map((item) => `stories/${item.fields.slug}`),
      ...people.items.map((item) => `people/${item.fields.slug}`),
    ]
  })

  return entries
}
