import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webpack from 'webpack';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(
	fs.readFileSync(new URL('../package.json', import.meta.url)),
);
const applicationVersion = pkg.version;

export default {
	mode: 'development',
	devtool: 'eval-source-map',

	entry: './src/js/index.js',

	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'application.min.js',
		libraryTarget: 'umd',
		globalObject: 'this',
		library: 'Application',
	},

	devServer: {
		open: true,
		hot: true,
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
		}),

		new CopyWebpackPlugin({
			patterns: [{ from: './src/asset', to: './asset' }],
		}),

		new MiniCssExtractPlugin({ filename: './bb-application.css' }),
	],
};
