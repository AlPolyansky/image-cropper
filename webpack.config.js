const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const folders = new (require('./webpack/webpack.path.js'))(__dirname)
const front = folders.front
const server = folders.server

const isDevelopment = process.argv.indexOf('--development') !== -1
const entryPath = path.join(front.root, 'index.js')
const entry = isDevelopment ? [
  'webpack-hot-middleware/client?reload=true',
  'react-hot-loader/patch',
  entryPath
] : entryPath

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    __DEV__: isDevelopment
  }),
  new HtmlWebpackPlugin({
    template: path.join(front.files, 'index.html'),
    filename: 'index.html',
    path: server.files
  })
  //new webpack.NamedModulesPlugin(),
  //new webpack.HotModuleReplacementPlugin()
]

isDevelopment && plugins.push(new webpack.HotModuleReplacementPlugin())

const webpackConfig = {
  entry,
  output: {
    path: server.files,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]

      },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        exclude: /(node_modules)/,
        include: front.files,
        use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext ]'
      }
    ]
  },
  plugins
  // devServer: {
  //   contentBase: path.resolve(__dirname, './dist'),
  //   port: 3000,
  //   historyApiFallback: true,
  //   inline: true,
  //   hot: true,
  //   host: '0.0.0.0',
  //   clientLogLevel: 'none'
  // }
}

module.exports = webpackConfig
