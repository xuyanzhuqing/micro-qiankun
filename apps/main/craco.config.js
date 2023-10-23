const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const publicPath = '/'
const cdn = new Map([
  ['https://unpkg.com/react@18.2.0/umd/react.production.min.js', ['react', 'React']],
  ['https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js', ['react-dom/client', 'ReactDOM']]
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
      // webpackConfig.externals = {
      //   react: 'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
      //   'react-dom': 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'
      // }

      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env.cnd': JSON.stringify(Array.from(cdn.keys())),
          'process.env.microConfig': JSON.stringify(miroConfig)
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
