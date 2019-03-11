const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleConcatenationPlug = require('webpack/lib/optimize/ModuleConcatenationPlugin');

// TODO:awesome-typescript-loader 配合 happypack 会报错,
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const bundleConfig = require("./bundle-config.json");

const webpack_path = require('./webpack.path')

module.exports = [
  new CleanWebpackPlugin(webpack_path.clean_dir, {
      "exclude": webpack_path.clean_exclude //排除不删除的目录，主要用于避免删除公用的文件
    }
  ),
  new CopyWebpackPlugin([ {
    from: webpack_path.copy_from_dir,
    to: webpack_path.copy_to_dir,
    ignore: [ 'favicon.ico', 'index.html' ]
  } ]),
  new webpack.HotModuleReplacementPlugin(),
  new ModuleConcatenationPlug(), // 作用域提升
  new webpack.HashedModuleIdsPlugin(), //保持其他包的hash不会变
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new HappyPack({
    id: "jsx",
    loaders: [ 'babel-loader' ],
    threadPool: happyThreadPool,
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./manifest.json'),
  }),
  // new MiniCssExtractPlugin({
  //   filename: "./public/css/[name].[chunkhash].css"
  // }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: webpack_path.favicon_path,
    template: webpack_path.indexHtml_path,
    hash: true,
    vendorCssName: bundleConfig.vendor.css,
    vendorJsName: bundleConfig.vendor.js,
    minify: {
      caseSensitive: false, //是否大小写敏感
      collapseBooleanAttributes: true, //是否简写boolean格式的属性,
      removeEmptyAttributes: true, //去掉空属性
      removeComments: true, //去掉注释
      collapseWhitespace: true //是否去除空格
    }
  }),

  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(js|css)$'),
    threshold: 10240,
    minRatio: 0.8
  }),
]