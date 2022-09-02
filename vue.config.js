module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  devServer: {
    writeToDisk: true,
    // proxy: {
    //   "/api": {
    //     target: "https://www.apps.livetutor.com.bd",
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
  },
  assetsDir: "static",
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false,
    },
  },

  transpileDependencies: ["vuetify", "vue-tel-input-vuetify"],
};
