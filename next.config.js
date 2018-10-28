const path = require('path')
const withSass = require('@zeit/next-sass')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

module.exports = withSass({
	webpack(config, { dev, isServer }) {
		config.module.rules = config.module.rules.filter(({ test }) => String(test) !== String(/\.scss$/))

		const sass = config.module.rules.find(({ test }) => String(test) === String(/\.sass$/))
		
		const cssLoaderIndex = sass.use.findIndex(({ loader }) => loader === 'css-loader')
		sass.use = sass.use.slice(0, cssLoaderIndex)

		const sassModules = {...sass  }
		sassModules.use = [...sass.use]


		config.module.rules.push(sassModules)

		const componentsPath = path.resolve(__dirname, 'components')
		sass.exclude = componentsPath
		sassModules.include = componentsPath

		const cssLoader = {
			loader: isServer ? 'css-loader/locals' : 'css-loader',
			options: {
				minimize: !dev,
				sourceMap: dev,
				importLoaders: 1
			}
		}

		const sassResourcesLoader = {
			loader: 'sass-resources-loader',
			options: {
				resources: [
					path.resolve(__dirname, 'assets/sass/variables.sass')
				]
			}
		}

		sass.use = [
			...sass.use,
			cssLoader,
			'sass-loader',
			sassResourcesLoader
		]
		sassModules.use = [
			...sassModules.use,
			{
				...cssLoader,
				options: {
					...cssLoader.options,
					modules: true,
					camelCase: true,
					localIdentName: '[local]___[hash:base64:5]'
				}
			},
			'sass-loader',
			sassResourcesLoader
		]

		config.module.rules.push({
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
		
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader'
		})
		
		config.resolve.alias['@'] = __dirname

		if (!config.resolve.plugins) {
			config.resolve.plugins = []
		}

		config.resolve.plugins.push(
			new DirectoryNamedWebpackPlugin({
				honorIndex: true,
				exclude: /node_modules/
			})
		)

		return config
	}
})