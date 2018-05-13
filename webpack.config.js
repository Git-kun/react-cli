const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    // publicPath: 'dist'
  },
  devtool: 'null',
  devServer: {
    contentBase: './src',
    historyApiFallback: true,//不跳转
    hot: true,      // 热加载
    inline: true,   // 自动刷新
    open: true      // 打开浏览器
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      filename: 'index.html',
      template: './index.html',
      title: 'React App',
      hash: true,
      minify: {
        caseSensitive: false, //是否大小写敏感
        collapseBooleanAttributes: true, //是否简写boolean格式的属性,
        removeEmptyAttributes: true, //去掉空属性
        removeComments: true, //去掉注释
        collapseWhitespace: true //是否去除空格
      }
    })
  ]
}