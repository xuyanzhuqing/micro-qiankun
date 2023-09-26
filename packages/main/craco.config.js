const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/'
const cdn = new Map([
  ['https://unpkg.com/react@18.2.0/umd/react.production.min.js', ['react', 'React']],
  ['https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js', ['react-dom/client', 'ReactDOM']]
])

module.exports = {
  plugins: [
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // webpackConfig.externals = Array.from(cdn.values())
      //   .reduce((acc, curr) => {
      //     acc[curr[0]] = curr[1]
      //     return acc
      //   }, {})
      // webpackConfig.externals = {
      //   react: 'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
      //   'react-dom': 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'
      // }

      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env.cnd': JSON.stringify(Array.from(cdn.keys()))
        })
      )

      // const htmlWebpackPlugin = webpackConfig.plugins.find(plugin => plugin instanceof HtmlWebpackPlugin)
      // htmlWebpackPlugin.options = {
      //   title: 'hello cungen'
      // }

      webpackConfig.output.publicPath = publicPath
      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    devServerConfig.proxy = {
      '/api': 'http://localhost:4000',
    }
    return devServerConfig
  }
};
