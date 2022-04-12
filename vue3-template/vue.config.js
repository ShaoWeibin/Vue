const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
const path = require('path');

const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  devPort,
} = require('./src/config/default/vue.custom.config');

const defaultSettings = require('./src/settings.js');
const name = defaultSettings.title || 'vue3 Element Template'; // page title

module.exports = defineConfig({
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies: true,
  devServer: {
    port: devPort,
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
  configureWebpack() {
    return {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: name,
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
          Assets: resolve('src/assets'),
        },
      },
    };
  },
});
