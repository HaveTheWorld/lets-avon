const path = require('path')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

module.exports = config => {
	config.resolve.alias['@'] = path.resolve(__dirname, '..')

	if (!config.resolve.plugins) {
		config.resolve.plugins = []
	}

	config.resolve.plugins.push(
		new DirectoryNamedWebpackPlugin({
			honorIndex: true,
			exclude: /node_modules/
		})
	)
}