const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const bundleConfig = require( "./bundle-config.json" );

// const os = require( 'os' );
// const HappyPack = require( 'happypack' );
// const HappyThreadPool = HappyPack.ThreadPool( { size: os.cpus().length } ); // 启动线程池});


const path = require('path');

console.log('当前目录',__dirname)

module.exports = {
	output: {
		// publicPath: process.env.NODE_ENV === 'production' ? '/' : ''
	},
	devtool: false,
	mode: "production",
	plugins: [
		// new HappyPack( {
		// 	id: 'jsx',
		// 	threadPool: HappyThreadPool,
		// 	loaders: [ 'babel-loader' ]
		// } ),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.DllReferencePlugin( {
			context: __dirname,
			manifest: require( './manifest.json' ),
		} ),
		new ExtractTextPlugin(path.resolve(__dirname, '../dist/pubilc/css/[name].[contenthash].css')),
		new HtmlWebpackPlugin({
			vendorJsName: bundleConfig.vendor.js,
			favicon: path.resolve(__dirname, '../public/favicon.ico'),
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
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, "../public"),
			to: path.resolve(__dirname, "../dist/public"),
			ignore: ['favicon.ico', 'index.html']
		}]),
		new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
		// new UglifyJSPlugin({
		//   uglifyOptions: {
		//     ie8: false,
		//     ecma: 8,
		//     mangle: true,
		//     output: {
		//       comments: false //去掉注释
		//     },
		//     compress: {
		//       warnings: false  //忽略警告
		//     }
		//   },
		//   sourceMap: true,
		//   cache: true,
		// }),
		new CompressionWebpackPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp('\\.(js|css)$'),
			threshold: 10240,
			minRatio: 0.8
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