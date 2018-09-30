const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const bundleConfig = require( "./bundle-config.json" );

module.exports = {
	output: {
		// publicPath: process.env.NODE_ENV === 'production' ? '/' : ''
	},
	devtool: 'source-map',
	mode: 'development',
	devServer: {
		contentBase: path.resolve(__dirname, '../src'),
		historyApiFallback: true, //不跳转
		hot: true, // 热加载
		inline: true, // 自动刷新
		open: true // 打开浏览器
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin(path.resolve(__dirname, '../dist/pubilc/css/[name].[contenthash].css')),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.DllReferencePlugin( {
			context: __dirname,
			manifest: require( './manifest.json' ),
		} ),
		new HtmlWebpackPlugin({
			vendorJsName: bundleConfig.vendor.js,
			favicon:path.resolve(__dirname, '../public/favicon.ico'),
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html'),
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
		new webpack.optimize.SplitChunksPlugin( {
			entry: {},
			output: {},
			module: [],
			plugins: [],
			optimization: {
				splitChunks: {
					chunks: "all",
					minSize: 0,
					name: 'common',
					minChunks: 1,
				}
			}
		} ),
	]
}