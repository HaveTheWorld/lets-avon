const path = require('path')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')

const modulesPaths = [
	path.resolve(__dirname, '../components'),
	path.resolve(__dirname, '../pages')
]

const sassResourcesLoader = {
	loader: 'sass-resources-loader',
	options: {
		resources: [
			path.resolve(__dirname, '../assets/sass/variables.sass')
		]
	}
}

exports.moduleCss = (dev, isServer) => {
	const rule = {
		test: /\.css$/,
		use: [
			getCssLoader(dev, isServer)
		]
	}

	!isServer && rule.use.unshift(ExtractCssChunksPlugin.loader)

	dev && rule.use.unshift('extracted-loader')

	return rule
}

exports.moduleSass = (dev, isServer, modules) => {
	const rule = {
		test: /\.(sass|scss)$/,
		[modules ? 'include' : 'exclude']: modulesPaths,
		use: [
			getCssLoader(dev, isServer, modules),
			'sass-loader',
			sassResourcesLoader
		]
	}
	
	!isServer && rule.use.unshift(ExtractCssChunksPlugin.loader)

	dev && rule.use.unshift('extracted-loader')

	return rule
}

function getCssLoader(dev, isServer, modules = false) {
	const cssLoader = {
		loader: isServer ? 'css-loader/locals' : 'css-loader',
		options: {
			minimize: !dev,
			sourceMap: dev,
			importLoaders: 1
		}
	}
	if (modules) {
		cssLoader.options = {
			...cssLoader.options,
			modules: true,
			camelCase: true,
			localIdentName: dev ? '[local]___[hash:base64:5]' : '[hash:base64]'
		}
	}
	return cssLoader
}