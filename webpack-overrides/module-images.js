module.exports = (config, isServer) => ({
	test: /\.(jpe?g|png|svg|gif|ico)$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				limit: config.inlineImageLimit,
				fallback: 'file-loader',
				publicPath: `${config.assetPrefix}/_next/static/images/`,
				outputPath: `${isServer ? '../' : ''}static/images/`,
				name: '[name]-[hash].[ext]'
			}
		}
	]
})