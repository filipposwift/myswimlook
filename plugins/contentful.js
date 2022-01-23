// import config from '@/nuxt.config'
const contentful = require('contentful')

export function createClient() {
  return contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,

    environment: 'master',
  })
}
