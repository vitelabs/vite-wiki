module.exports = {
  head: {
    title: 'Vite',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: 'cyan' },
  build: {
    extractCSS: true,
    vendor: ['vue-i18n', 'babel-polyfill'],
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false // Fix bulma css warnings
        }
      }
    }
  },
  router: {
    middleware: 'i18n'
  },
  plugins: ['~/plugins/i18n.js'],
  generate: {
    routes: ['/', '/about', '/fr', '/fr/about']
  },
  modules: [
    '@nuxtjs/pwa',
    ['xui-module', {
      'mdi': {
        active: false // Do not load Material Design Icons
      }
    }]
  ]
}
