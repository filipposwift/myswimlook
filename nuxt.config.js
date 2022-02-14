// import path from 'path'
// import fs from 'fs'
// import { createSEOMeta } from './utils/seo'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
  //   },
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MySwimLook',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: '' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Be inspired by the best swimsuit designers, discover stylish swimwear, share your look',
      },

      {
        name: 'facebook-domain-verification',
        content: '2xmkd1wqtbivo729p1dbsbt9k323o9',
      },

      {
        property: 'fb:app_id',
        content: '2298068076999981',
      },

      {
        property: 'og:site_name',
        content:
          'Be inspired by the best swimsuit designers, discover stylish swimwear, share your look',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://myswimlook.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content:
          'Be inspired by the best swimsuit designers, discover stylish swimwear, share your look',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Discover who is wearing the last trending swimsuits, check prices from over 40 different brands ando more the 100 models',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://myswimlook.com/social-media-card.jpg',
      },
      { hid: 'og:image:height', property: 'og:image:height', content: '630' },
      { hid: 'og:image:width', property: 'og:image:width', content: '1200' },

      { name: 'twitter:site', content: '' },
      { name: 'twitter:card', content: '' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: '',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: '',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: '',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'canonical', rel: 'canonical', href: 'https://myswimlook.com' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/app'],

  // privateRuntimeConfig: {
  //   contentfulSpace: process.env.CONTENTFUL_SPACE,
  //   contentfulToken: process.env.CONTENTFUL_TOKEN,
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-dompurify', '~/plugins/contentful.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxt/image',
    'nuxt-gsap-module',
    'nuxt-font-loader',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/markdownit',
    // '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://cdn.contentful.com',
  },

  // sitemap: {
  //   hostname: 'https://myswimlook.com',
  //   gzip: true,
  //   exclude: ['/thank-you', '/newProva'],
  // },

  markdownit: {
    preset: 'default',
    runtime: true,
    breaks: true,

    // injected: true,
  },

  styleResources: {
    scss: [
      '~/assets/css/base/_variables.scss',
      '~/assets/css/base/mixins/_generic-get.scss',
      '~/assets/css/base/mixins/_media-query.scss',
      '~/assets/css/base/mixins/_shared.scss',
    ],
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/swimlook/image/upload/',
    },

    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1440,
      xxl: 1920,
    },
  },

  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true,
    },
    extraEases: {
      expoScaleEase: true,
    },
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
    ],
    // seo: true,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          homePage: 'Home',
          siteMap: 'Site map',
          getInTouch: 'Get in touch',
          pageNotFoundTitle: 'Page not found!',
          pageNotFoundMessage:
            "The page that you're looking for was not found.",
          otherErrorTitle: "Oops, something's gone wrong!",
          otherErrorMessage: "It's not you - it's us. Sorry for that.",
        },
      },
    },
  },

  router: {
    linkExactActiveClass: 'linkExactActiveClass',
  },

  fontLoader: {
    url: {
      local: '/fonts/font-face.css',
      google:
        'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,500;1,300&display=swap',
    },
    prefetch: true,
    preconnect: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
