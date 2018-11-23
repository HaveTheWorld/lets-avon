module.exports = (config, isServer) => {
	if (!isServer) {
		config.optimization.splitChunks.cacheGroups.styles = {
			name: 'styles',
			test: new RegExp(`\\.+(${['css', 'sass', 'scss'].join('|')})$`),
			chunks: 'all',
			enforce: true
		}
	}
}