const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleConcatenationPlug = require('webpack/lib/optimize/ModuleConcatenationPlugin');
///// 输出资源文件
const AssetsPlugin = require('assets-webpack-plugin');
///// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//// 删除build目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
///// 压缩gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin');
///// 复制文件到目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackPath = require('./webpack.path');

module.exports = [
  ///// 删除build 目录
  new CleanWebpackPlugin(),
  ///// 移动文件到build目录
  new CopyWebpackPlugin([ {
    from: webpackPath.copy_from_dir,
    to: webpackPath.copy_to_dir,
    ignore: [ 'favicon.ico', 'index.html' ]
  } ]),
  ///// 作用域提升
  new ModuleConcatenationPlug(),
  ///// 保持其他包的hash不会变
  new webpack.HashedModuleIdsPlugin(),
  ///// 写入环境变量
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  ////// 提取css
  new MiniCssExtractPlugin({
    filename: webpackPath.output.css,
    chunkFilename: webpackPath.output.css,
  }),
  ///// 输出资源文件
  new AssetsPlugin({
    fileName: 'manifest.json',
    publicPath: webpackPath.asset_manifest,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: webpackPath.template.favicon,
    template: webpackPath.template.indexHtml,
    hash: true,
    chunksSortMode: 'none',
    minify: {
      caseSensitive: false, //是否大小写敏感
      collapseBooleanAttributes: true, //是否简写boolean格式的属性,
      removeEmptyAttributes: true, //去掉空属性
      removeComments: true, //去掉注释
      collapseWhitespace: true //是否去除空格
    }
  }),
  ///// 压缩gzip
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(js|css)$'),
    threshold: 10240,
    minRatio: 0.8
  }),
];