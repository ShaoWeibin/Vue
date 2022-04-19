const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const path = require('path')
const ElementPlus = require('unplugin-element-plus/webpack')
const mockServer = require('./mock/mock-server.js')

const {
  title = 'Vue3 Element-Plus Template',
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  devServerPort,
  // mockServerPort = '9999',
} = require('./src/config/default/vue.custom.config')

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 8888 npm run dev OR npm run dev --port = 8888
const devPort = process.env.port || process.env.npm_config_port || devServerPort || 8888 // dev server port

module.exports = defineConfig({
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies: true,
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      // start mock server
      mockServer(devServer.app)

      return middlewares
    },
    port: devPort,
    // open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true,
    // },
    proxy: {
      // use for mock-express
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `http://127.0.0.1:${mockServerPort}`,
      //   changeOrigin: true, // needed for virtual hosted sites
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: '/mock-api/v1',
      //   },
      // },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "~@/styles/element-variables.scss" as *;`,
      },
    },
  },
  configureWebpack() {
    return {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: title,
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
          assets: resolve('src/assets'),
        },
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
      // plugins: [
      //   ElementPlus({
      //     useSource: true,
      //   }),
      // ],
    }
  },
  chainWebpack(config) {
    config.module
      .rule('i18n-resource')
      .test(/\.(json5?|ya?ml)$/)
      .include.add(path.resolve(__dirname, './src/locales'))
      .end()
      .type('javascript/auto')
      .use('i18n-resource')
      .loader('@intlify/vue-i18n-loader')

    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
  },
})
