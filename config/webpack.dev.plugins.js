const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleConcatenationPlug = require('webpack/lib/optimize/ModuleConcatenationPlugin');

const webpackPath = require('./webpack.path');

module.exports = [
  ///// 热加载
  // new webpack.HotModuleReplacementPlugin(),
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
      caseSensitive: false, //是否大小写敏感
      collapseBooleanAttributes: true, //是否简写boolean格式的属性,
      removeEmptyAttributes: true, //去掉空属性
      removeComments: true, //去掉注释
      collapseWhitespace: true //是否去除空格
    }
  })
];