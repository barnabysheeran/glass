const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

// Define Application Version
const webpack = require('webpack');
const packageJson = require('../package.json');

const applicationVersion = packageJson.version;

module.exports = {
	mode: 'production',
	devtool: false,

	entry: './src/js/index.js',

	output: {
		path: path.resolve(__dirname, `../dist`),
		filename: 'application.min.[contenthash].js',
		libraryTarget: 'umd',
		globalObject: 'this',
		library: 'Application',
	},

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({ extractComments: false, parallel: true })],
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: [path.resolve(__dirname, '../src')],
				use: { loader: 'babel-loader' },
			},

			{
				test: /\.(svg|png|gif|jpg|ico)$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						context: '',
					},
				},
			},

			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
				],
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin(),

		new webpack.DefinePlugin({
			APPLICATION_VERSION: JSON.stringify(applicationVersion),
		}),

		new HtmlWebpackPlugin({
			template: 'src/html/index.html',
			filename: './index.html',
			inject: true,
			minify: true,
			hash: true,
		}),

		new CopyWebpackPlugin({
			patterns: [{ from: './src/asset', to: './asset' }],
		}),

		new MiniCssExtractPlugin({
			filename: './bb-application.[contenthash].css',
		}),
	],
};
