const webpackPath = require( './config/webpack.path' );
const webpack_module = require( './config/webpack.module' );
const webpack_devServer = require( './config/webpack.devserver' );
const webpack_dev_plugin = require( './config/webpack.dev.plugins' );
const webpack_prod_plugin = require( './config/webpack.prod.plugins' );

const cssnano = require( 'cssnano' );

//// 压缩css
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
//// 多线程的压缩js
const TerserPlugin = require( 'terser-webpack-plugin' );

/**
 * 判断运行环境
 * @type {boolean}
 */
const isProduction = process.env.NODE_ENV === 'production';

console.log( '当前环境: ' + process.env.NODE_ENV );

module.exports = {
  bail: true,
  entry: webpackPath.entry,
  output: {
    path: webpackPath.output_dir,
    filename: webpackPath.output.js,
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.web.tsx',
      '.tsx',
      '.web.ts',
      '.ts',
      '.web.js',
      '.js',
      '.json',
      '.css'
    ],
    mainFields: [
      "browser",
      "module",
      "main"
    ],
    modules: [
      "./src",
      "./node_modules"
    ]
  },
  performance: {
    hints: 'warning', // 有性能问题时输出警告
  },
  watchOptions: {
    ignored: /node_modules/
  },
  target: 'web',
  mode: process.env.NODE_ENV,
  devtool: isProduction ? false : 'source-map',
  devServer: webpack_devServer,
  //// 用自己的压缩方案
  optimization: {
    minimizer: isProduction ? [
      new OptimizeCssAssetsPlugin( {
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      } ),
      new TerserPlugin( {
        parallel: true // 多线程
      } )
    ] : [],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  module: webpack_module,
  plugins: isProduction ? webpack_prod_plugin : webpack_dev_plugin
};





