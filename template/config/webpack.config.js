const webpack_path = require('./webpack.path');
const webpack_module = require('./webpack.module');
const webpack_devServer = require('./webpack.devserver');
const webpack_dev_plugin = require('./webpack.dev.plugins');
const webpack_prod_plugin = require('./webpack.prod.plugins');


const isProduction = process.env.NODE_ENV === 'production';

console.log('当前环境: ' + process.env.NODE_ENV)

const oneFiles = {
    app: [
        webpack_path.entry_main,
        webpack_path.entry_polyfills,
        webpack_path.entry_vendors,
        webpack_path.entry_styles
    ]
};
const moreFiles = {
    app: webpack_path.entry_main,
    polyfill: webpack_path.entry_polyfills,
    vendor: webpack_path.entry_vendors,
    style: webpack_path.entry_styles
}


const config = {
    bail: true,
    entry: isProduction ? moreFiles : oneFiles,
    output: {
        path: webpack_path.output_dir,
        filename: webpack_path.js_path
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.json', '.svg'],
        mainFields: [
            "browser",
            "module",
            "main"
        ],
        modules: [
            "./src",
            "./node_modules"
        ],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
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
    optimization: {
        minimizer: isProduction ? [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            }),
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
                        beautify: false,
                        //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                        comments: false
                    },
                    compress: {
                        //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出
                        warnings: false,
                        //是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
                        drop_console: true,
                        //是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为否
                        collapse_vars: true,
                    }
                }
            })
        ] : [],
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -20,
                    chunks: 'all'
                }
            }
        }
    },

    module: webpack_module,
    plugins: isProduction ? webpack_prod_plugin : webpack_dev_plugin
}

module.exports = config