const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleConcatenationPlug = require('webpack/lib/optimize/ModuleConcatenationPlugin');

const webpackPath = require('./webpack.path');

module.exports = [
  ///// 热加载
  new webpack.HotModuleReplacementPlugin(),
  ///// 作用域提升
  new ModuleConcatenationPlug(),
  ///// 保持其他包的hash不会变
  new webpack.HashedModuleIdsPlugin(),
  ///// 写入环境变量
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  ///// 处理html模板
  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: webpackPath.template.favicon,
    template: webpackPath.template.indexHtml,
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }
  })
];
