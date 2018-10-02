const path = require('path');
module.exports = {
	entry: {
		// './public/js/polyfill': 'babel-polyfill',
		'./public/js/index': path.resolve(__dirname, '../src/main.tsx')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, "../dist"),
		// publicPath: process.env.NODE_ENV === 'production' ? '/' : ''
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
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
					name: '../public/img/[name].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name:  '../public/img/[name].[ext]'
				}
			}
		]
	}
}
