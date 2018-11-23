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

exports.moduleCss = (dev, isServer) => ({
	test: /\.css$/,
	use: [
		...getStyleLoader(dev, isServer),
		getCssLoader(dev, isServer)
	]
})

exports.moduleSass = (dev, isServer, modules) => ({
	test: /\.(sass|scss)$/,
	[modules ? 'include' : 'exclude']: modulesPaths,
	use: [
		...getStyleLoader(dev, isServer),
		getCssLoader(dev, isServer, true, modules),
		'sass-loader',
		sassResourcesLoader
	]
})

function getStyleLoader(dev, isServer) {
	if (isServer) { return [] }
	const loaders = dev ? ['extracted-loader'] : []
	loaders.push(ExtractCssChunksPlugin.loader)
	return loaders
}

function getCssLoader(dev, isServer, sass = false, modules = false) {
	const cssLoader = {
		loader: isServer ? 'css-loader/locals' : 'css-loader',
		options: {
			minimize: !dev,
			sourceMap: dev,
			importLoaders: sass ? 2 : 0
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