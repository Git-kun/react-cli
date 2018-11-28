const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const vendors = [
    path.resolve(__dirname, "./src/polyfills.ts"),
    path.resolve(__dirname, "./src/vendors.ts"),
    path.resolve(__dirname, "./src/styles.css")
]

module.exports = {
    output: {
        path: path.resolve(__dirname, './public/dll'),
        filename: '[name].dll.[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        vendor: vendors,
    },
    mode: 'production',
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: [
                    "awesome-typescript-loader"
                ],
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
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?minimize",
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [

        new CleanWebpackPlugin([path.resolve(__dirname, './public/dll')]),
        new webpack.HashedModuleIdsPlugin(), //保持其他包的hash不会变
        new webpack.DllPlugin({
            path: __dirname + '/manifest.json',
            name: '[name]_[chunkhash]',
            context: __dirname,
        }),
        new HappyPack({
            id: "jsx",
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].dll.[chunkhash].css",
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: path.join(__dirname, '/')
        })
    ],
};