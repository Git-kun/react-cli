const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const ModuleConcatenationPlug = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const bundleConfig = require("./bundle-config.json");
const isProduction = process.env.NODE_ENV === 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const config = {
    entry: {
        app: path.resolve(__dirname, "./src/main.jsx"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: './public/js/[name].[hash].js'
    },
    target: 'web',
    performance: {
        hints: 'warning', // 有性能问题时输出警告
    },
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css', '.svg'],
        mainFields: ['jsnext: main', 'browser', 'main'],
        modules: [path.resolve(__dirname, 'node_modules')]
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
    mode: process.env.NODE_ENV,
    devtool: isProduction ? 'source-map' : false,
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        https: true,
        contentBase: __dirname,
        hot: true,
        inline: true,
        progress: true,
        port: 8080,
        open: false
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: ['happypack/loader?id=babel'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader']
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
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            minimize: true,
                            localIdentName: "[local]_[hash:base64:5]"
                        }
                    },
                    'postcss-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, './src/style')
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?minimize",
                    'postcss-loader'
                ],
                include: [
                    path.resolve(__dirname, 'node_modules'),
                ]
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.NamedModulesPlugin(),
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
            id: "babel",
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
        }),
        new ModuleConcatenationPlug(),
        new MiniCssExtractPlugin({
            filename: "./public/css/[name].[chunkhash].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            template: path.resolve(__dirname, './public/index.html'),
            vendorJsName: bundleConfig.vendor.js,
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
]

if (isProduction) {
    config.plugins.push(...productionPlugins);
}

module.exports = config