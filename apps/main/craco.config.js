const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const publicPath = '/'
const cdn = new Map([
  ['https://unpkg.com/react@18/umd/react.development.js', ['react', 'React']],
  ['https://unpkg.com/react-dom@18/umd/react-dom.development.js', ['react-dom/client', 'ReactDOM']]
])
const folderPath = path.join(__dirname, '../')
const miroConfig = fs.readdirSync(folderPath)
  .map(fileName => {
    return path.join(folderPath, fileName);
  })
  .map(url => {
    const package = fs.readFileSync(path.join(url, 'package.json'), { encoding: 'utf8' })
    const env = require('dotenv').config({ path: path.join(url, '.env') })
    return {
      name: JSON.parse(package).name,
      port: env.parsed.PORT
    }
  })

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

      // webpackConfig.resolve.alias = {
      //   'react/jsx-runtime': path.join('/node_module', 'react/jsx-runtime.js'),
      //   'react/jsx-dev-runtime': path.join('/node_module', 'react/jsx-dev-runtime.js')
      // }

      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env.cnd': JSON.stringify(Array.from(cdn.keys())),
          'process.env.microConfig': JSON.stringify(miroConfig),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // new BundleAnalyzerPlugin()
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
