// import config from '@/nuxt.config'
const contentful = require('contentful')

export function createClient() {
  return contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    // space: config.privateRuntimeConfig.contentfulSpace,
    // space: 'zqs9sg48zfd4',
    environment: 'master',
    accessToken: process.env.CONTENTFUL_TOKEN,
    // accessToken: config.privateRuntimeConfig.contentfulToken,
    // accessToken: 'Y9nJfmGLjDcg0j7d2qQGQXmIa4jNbl36hc9NfcPBS74',
  })
}
