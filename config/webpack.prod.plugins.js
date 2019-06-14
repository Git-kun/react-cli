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

//// css tree shaking
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const JavaScriptObfuscator = require('webpack-obfuscator');
const WorkboxPlugin = require('workbox-webpack-plugin');
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const PrerenderSPAPlugin = require('prerender-spa-plugin');

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
  // 清除无用 css
  new PurifyCSS({
    paths: glob.sync([
      // 要做 CSS Tree Shaking 的路径文件
      path.resolve(__dirname, './public/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
      path.resolve(__dirname, './src/*.js')
    ])
  }),
  // 代码混淆
  new JavaScriptObfuscator ({
    rotateUnicodeArray: true
  }, ['excluded_bundle_name.js']),
  ///// 输出资源文件
  new AssetsPlugin({
    fileName: 'manifest.json',
    publicPath: webpackPath.asset_manifest,
  }),
  new WorkboxPlugin.GenerateSW({
    clientsClaim: true, //让浏览器立即servece worker被接管
    skipWaiting: true,  // 更新sw文件后，立即插队到最前面
    importWorkboxFrom: 'local',
    include: [/\.js$/, /\.css$/, /\.html$/,/\.jpg/,/\.jpeg/,/\.svg/,/\.webp/,/\.png/],
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
  // 预加载
  new PreloadWebpackPlugin({
    rel: 'preload',
    as(entry) {
      if (/\.css$/.test(entry)) return 'style';
      if (/\.woff$/.test(entry)) return 'font';
      if (/\.png$/.test(entry)) return 'image';
      return 'script';
    },
    include: 'allChunks'
    //include: ['app']
  }),
  // 预渲染
  new PrerenderSPAPlugin({
    routes: ['/','/home','/shop'],
    staticDir: resolve(__dirname, '../dist'),
  }),
];
