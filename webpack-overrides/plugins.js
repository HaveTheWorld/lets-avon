const webpack = require('webpack')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (dev, isServer) => {	
	const plugins = isServer ? [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	] : [
		new ExtractCssChunksPlugin({
			filename: dev
				? 'static/css/[name].css'
				: 'static/css/[name].[contenthash:8].css',
			chunkFilename: dev
				? 'static/css/[name].chunk.css'
				: 'static/css/[name].[contenthash:8].chunk.css',
			orderWarning: false
		})
	]
	
	!dev && !isServer && plugins.push(
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComment: { removeAll: true, canPrint: true }
			}
		})
	)

	return plugins
}