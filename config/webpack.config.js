const path = require('path');
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

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        app: path.resolve(__dirname, "./src/main.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: './public/js/[name].[hash].js'
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.css', '.svg'],
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
    devServer: {
        historyApiFallback: true,
        https: false,
        contentBase: __dirname,
        disableHostCheck: true,
        hot: true,
        inline: true,
        progress: true,
        port: 8080,
        open: false
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor'
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: [
                    "awesome-typescript-loader"
                ],
                include: path.resolve(__dirname, 'src')
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.jsx?$/,
                use: ['happypack/loader?id=jsx'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './public/img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: './public/fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/, // src 里面的 css 使用 css modules
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true,
                        }
                    },
                    'postcss-loader'
                ],
                include: path.resolve(__dirname, 'src')
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ModuleConcatenationPlug(), // 作用域提升
        new webpack.HashedModuleIdsPlugin(), //保持其他包的hash不会变
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
        new HappyPack({
            id: "jsx",
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
        }),
        // new HappyPack({                  //有问题先不用
        //     id: "tsx",
        //     loaders: ['awesome-typescript-loader'],
        //     threadPool: happyThreadPool,
        // }),
        new MiniCssExtractPlugin({
            filename: "./public/css/[name].[chunkhash].css"
        }),
        new HtmlWebpackPlugin({
            vendorCssName: bundleConfig.vendor.css,
            vendorJsName: bundleConfig.vendor.js,
            filename: 'index.html',
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            template: path.resolve(__dirname, './public/index.html'),
            hash: true,
            minify: {
                caseSensitive: false, //是否大小写敏感
                collapseBooleanAttributes: true, //是否简写boolean格式的属性,
                removeEmptyAttributes: true, //去掉空属性
                removeComments: true, //去掉注释
                collapseWhitespace: true //是否去除空格
            }
        })
    ]
}

const productionPlugins = [
    new CleanWebpackPlugin([path.resolve(__dirname, './dist')]),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, "./public"),
        to: path.resolve(__dirname, "./dist/public"),
        ignore: ['favicon.ico', 'index.html']
    }]),
    new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8
    }),
];

if (isProduction) {
    config.plugins.push(...productionPlugins);
}


module.exports = config