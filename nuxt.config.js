import articles from './assets/json/articles.json'
export default {
  router: {
    base: '/sketch/'
  },
  mode: 'spa',
  generate: {
    routes() {
      const articleUrls = []
      for (const article in articles) {
        articleUrls.push(
          `${articles[article].category}/${articles[article].id}`
        )
      }
      return articleUrls.map(url => {
        return url
      })
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/sketch/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500&display=swap'
      }
    ],
    script: [
      { src: 'https://aframe.io/releases/0.9.1/aframe.min.js' },
      {
        src:
          'https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.2/aframe/build/aframe-ar.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'red' },
  /*
   ** Global CSS
   */
  css: ['ress/ress.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/three', ssr: false }],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],
  styleResources: {
    scss: ['@/assets/sass/main.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.module.rules.push({
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: ['raw-loader', 'glslify-loader']
        })
      }
    }
  }
}
