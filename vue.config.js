module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  devServer: {
    writeToDisk: true,
  },
  outputDir: process.env.NODE_ENV === 'production'
    ? '/var/www/livetutor_frontend/'
    : 'dist',
  assetsDir: "static",
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false,
    },
  },

  transpileDependencies: ["vuetify", "vue-tel-input-vuetify"],
};
