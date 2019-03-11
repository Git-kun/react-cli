const webpack_path = require('./webpack.path');
const webpack_module = require('./webpack.module');
const webpack_devServer = require('./webpack.devserver');
const webpack_dev_plugin = require('./webpack.dev.plugins');
const webpack_prod_plugin = require('./webpack.prod.plugins');


const isProduction = process.env.NODE_ENV === 'production';

console.log('当前环境: ' + process.env.NODE_ENV)

const oneFiles = [
  webpack_path.entry_main,
  webpack_path.entry_polyfills,
  webpack_path.entry_vendors,
  webpack_path.entry_styles
]

module.exports = {
  // entry: {
  //   app: webpack_path.entry_main,
  //   polyfill: webpack_path.entry_polyfills,
  //   vendor: webpack_path.entry_vendors,
  //   style: webpack_path.entry_styles
  // },
  entry: {
    app: oneFiles
  },
  output: {
    path: webpack_path.output_dir,
    filename: webpack_path.js_path
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json', '.css', '.svg' ],
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
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor'
  //       }
  //     }
  //   }
  // },
  module: webpack_module,
  plugins: isProduction ? webpack_prod_plugin : webpack_dev_plugin
}


