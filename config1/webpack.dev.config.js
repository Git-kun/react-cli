const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : ''
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: '../src',
    historyApiFallback: true, //不跳转
    hot: true, // 热加载
    inline: true, // 自动刷新
    open: true // 打开浏览器
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      favicon: '../public/favicon.ico',
      filename: 'index.html',
      template: '../public/index.html',
      // title: ' App',
      hash: true,
      minify: {
        caseSensitive: false, //是否大小写敏感
        collapseBooleanAttributes: true, //是否简写boolean格式的属性,
        removeEmptyAttributes: true, //去掉空属性
        removeComments: true, //去掉注释
        collapseWhitespace: true //是否去除空格
      }
    }),
  ]
}