import path from 'path'
import DirectoryNamedWebpackPlugin from 'directory-named-webpack-plugin'

export default [
	// Resolve Alias
	config => {
		config.resolve.alias = {
			'@': path.resolve(__dirname, '../src')
		}
		return config
	},
	// Resolve Plugins
	config => {
		config.resolve.plugins = [
			new DirectoryNamedWebpackPlugin({
				honorIndex: true,
				exclude: /node_modules/
			})
		]
		return config
	},
	// Module Rules
	(config, { defaultLoaders, stage }) => {
		const isDev = stage !== 'prod'
		const isNode = stage === 'node'
		
		const styleLoader = { loader: 'style-loader' }
		const cssLoader = !isNode ? 'css-loader' : 'css-loader/locals'
		const sassLoader = { loader: 'sass-loader', options: { sourceMap: isDev } }
		const resourcesLoader = {
			loader: 'sass-resources-loader',
			options: { resources: path.resolve(__dirname, '../src/assets/scss/variables.scss') }
		}

		config.module.rules = [
			{
				oneOf: [
					// Main Styles
					{
						test: /\.(sass|scss)$/,
						include: [
							path.resolve(__dirname, '../node_modules'),
							path.resolve(__dirname, '../src/assets/scss')
						],
						use: [
							styleLoader,
							{
								loader: cssLoader,
								options: { sourceMap: isDev }
							},
							sassLoader,
							resourcesLoader
						]
					},
					// CSS Modules
					{
						test: /\.(sass|scss)$/,
						include: [
							path.resolve(__dirname, '../src/components'),
						],
						use: [
							styleLoader,
							{
								loader: cssLoader,
								options: {
									modules: true,
									camelCase: true,
									localIdentName: isDev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64]',
									sourceMap: isDev
								}
							},
							sassLoader,
							resourcesLoader
						]
					},
					defaultLoaders.cssLoader,
					defaultLoaders.jsLoader,
					defaultLoaders.fileLoader,
				],
			},
		]

		return config
	}
]