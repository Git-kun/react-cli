const webpack = require( 'webpack' );
const AssetsPlugin = require( 'assets-webpack-plugin' );
const path = require( 'path' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

const vendors = [
	'react',
	'react-dom',
	'babel-polyfill',
];

module.exports = {
	output: {
		path: path.resolve( __dirname, '../public/dll' ),
		filename: '[name].dll.[chunkhash].js',
		library: '[name]_[chunkhash]',
	},
	entry: {
		vendor: vendors,
	},
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin( [ path.resolve( __dirname, '../public/dll' ) ] ),
		new webpack.HashedModuleIdsPlugin(), //保持其他包的hash不会变
		new webpack.DllPlugin( {
			path: __dirname + '/manifest.json',
			name: '[name]_[chunkhash]',
			context: __dirname,
		} ),
		new AssetsPlugin( {
			filename: 'bundle-config.json',
			path: path.join( __dirname, '/' )
		} )
	],
};