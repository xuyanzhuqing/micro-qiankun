const { name } = require("./package");
const config = require("dotenv").config();
const { cdns, externals } = require('@dnt/config/cdn.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
  ],
  webpack: {
    configure: (config, { env, paths }) => {
      const library = config.output.library || {};
      library.name = `${name}-[name]`;
      library.type = "umd";
      config.output.library = library;
      config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
      config.output.globalObject = "window";

      if (env === "production") {
        config.output.publicPath = "/child/" + name;
        // 采用主应用加载的第三方库
        config.externals = externals
        // config.plugins.push(new BundleAnalyzerPlugin())
      }
      // 不打开浏览器
      process.env["BROWSER"] = "none";

      return config;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    /* ... */
    // Create the default config by calling configFunction with the proxy/allowedHost parameters
    devServerConfig.port = config.parsed.PORT;

    devServerConfig.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    devServerConfig.historyApiFallback = true;
    devServerConfig.hot = false;
    devServerConfig.liveReload = true;
    devServerConfig.client.webSocketURL.port = config.parsed.PORT;
    devServerConfig.open = false;

    // Return your customised Webpack Development Server config.
    return devServerConfig;
  },
};
