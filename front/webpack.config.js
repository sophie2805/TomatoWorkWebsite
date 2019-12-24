const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = require('path').resolve
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(eot|woff|ttf|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          esModule: false
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        // 匹配的需要写在前面，否则会打包报错
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: {
          inline: true,    // 将 worker 内联为一个 BLOB
          fallback: false, // 禁用 chunk
          name: '[name]:[hash:8].js'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};