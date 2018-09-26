const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        './public/js/polyfill': 'babel-polyfill',
        './public/js/index': './src/main.tsx'
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/dist",
        publicPath: process.env.NODE_ENV === 'production' ? '/' : ''
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
    },
    devtool: 'source-map',
    mode: "development",
    devServer: {
        contentBase: './src',
        historyApiFallback: true, //不跳转
        hot: true, // 热加载
        inline: true, // 自动刷新
        open: true // 打开浏览器
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: 'public/img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'public/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon: './favicon.ico',
            filename: 'index.html',
            template: './index.html',
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
            from: __dirname + "/public",
            to: __dirname + "/dist/public"
        }]),
        new UglifyJSPlugin()
    ]
}