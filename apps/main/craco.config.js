const webpack = require('webpack')
const { merge } = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

function webpackCommonEnv(config) {
  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
    ],
    output: {
      publicPath: '/'
    }
  }
}

function webpackDevEnv(config) {
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
  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.microConfig': JSON.stringify(miroConfig),
      }),
    ],
    devServer: {
      proxy: {
        '/api': 'http://localhost:4000',
      }
    }
  }
}

function webpackProEnv(config) {
  const cdn = new Map([
    // ['https://unpkg.com/react@18.2.0/umd/react.production.min.js', ['react', 'React']],
    // ['https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js', ['react-dom/client', 'ReactDOM']],
    // ['https://unpkg.com/axios@1.5.1/dist/axios.min.js', ['axios', 'axios']],
    // ['https://unpkg.com/i18next@23.6.0/i18next.min.js', ['i18next', 'i18next']],
  ])

  const externals = Array.from(cdn.values())
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1]
      return acc
    }, {})

  const htmlWebpackPlugin = config.plugins.find(plugin => plugin instanceof HtmlWebpackPlugin)
  htmlWebpackPlugin.userOptions.jsCdns = Array.from(cdn.keys())

  return {
    externals,
    plugins: [
      htmlWebpackPlugin,
      // new BundleAnalyzerPlugin()
    ]
  }
}

module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      const common = merge(config, webpackCommonEnv(config))
      if (env === 'development') {
        return merge(common, webpackDevEnv(config))
      }
      return merge(common, webpackProEnv(config))
    },
  }
};
