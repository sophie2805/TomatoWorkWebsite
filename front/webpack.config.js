const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.(eot|woff|ttf)$/, 
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
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
};