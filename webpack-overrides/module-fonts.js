module.exports = (config, isServer) => ({
	test: /\.(eot|woff|woff2|ttf)$/,
	use: [
		{
			loader: 'url-loader',
			options: {
				limit: 100000,
				fallback: 'file-loader',
				publicPath: `${config.assetPrefix}/_next/static/fonts/`,
				outputPath: `${isServer ? '../' : ''}static/fonts/`,
				name: '[name]-[hash].[ext]'
			}
		}
	]
})