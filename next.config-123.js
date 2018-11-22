const path = require('path')
const withSass = require('@zeit/next-sass')

const resolve = require('./webpack/resolve')
const moduleGraphql = require('./webpack/module-graphql')
const moduleImages = require('./webpack/module-images')

module.exports = withSass({
	webpack(config, { dev, isServer }) {
		config.module.rules = config.module.rules.filter(({ test }) => String(test) !== String(/\.scss$/))

		const sass = config.module.rules.find(({ test }) => String(test) === String(/\.sass$/))
		sass.test = /\.(sass|scss)$/
		
		const cssLoaderIndex = sass.use.findIndex(({ loader }) => loader === 'css-loader')
		sass.use = sass.use.slice(0, cssLoaderIndex)

		const sassModules = {...sass  }
		sassModules.use = [...sass.use]


		config.module.rules.push(sassModules)

		const modulesPaths = [
			path.resolve(__dirname, 'components'),
			path.resolve(__dirname, 'pages/User'),
			path.resolve(__dirname, 'pages/Admin')
		]
		sass.exclude = modulesPaths
		sassModules.include = modulesPaths

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

		config.module.rules.push({
			test: /\.css$/,
			use: [
				...sass.use,
				cssLoader
			]
		})

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
					localIdentName: dev ? '[local]___[hash:base64:5]' : '[hash:base64]'
				}
			},
			'sass-loader',
			sassResourcesLoader
		]		
		
		moduleImages(config, isServer)
		moduleGraphql(config)
		resolve(config)

		return config
	}
})