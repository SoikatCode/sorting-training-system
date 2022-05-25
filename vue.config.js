// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    // A, remove the plugin
    config.plugins.delete('prefetch')
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.VUE_APP_SITE
    : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'default' : false,
  runtimeCompiler: true
}
