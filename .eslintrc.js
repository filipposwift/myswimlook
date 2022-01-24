module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/no-v-html': 0,
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'Hero',
          'Carousel',
          'default',
          'error',
          'home',
          'privacy',
          'contact',
        ],
      },
    ],
  },
}
