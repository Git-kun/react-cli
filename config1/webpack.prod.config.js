const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

console.log(12)

module.exports = {
  output: {
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : ''
  },
  devtool: false,
  mode: "production",
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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
    new CopyWebpackPlugin([{
      from: __dirname + "../public",
      to: __dirname + "../dist/public",
      ignore: ['favicon.ico', 'index.html']
    }]),
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        mangle: true,
        output: {
          comments: false //去掉注释
        },
        compress: {
          warnings: false  //忽略警告
        }
      },
      sourceMap: true,
      cache: true,
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}