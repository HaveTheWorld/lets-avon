const moduleGraphql = require('./webpack-overrides/module-graphql')
const moduleImages = require('./webpack-overrides/module-images')
const { moduleCss, moduleSass } = require('./webpack-overrides/module-styles')
const plugins = require('./webpack-overrides/plugins')
const resolve = require('./webpack-overrides/resolve')
const optimization = require('./webpack-overrides/optimization')

module.exports = {
	webpack(config, { dev, isServer }) {
		config.module.rules = [
			...config.module.rules,
			moduleGraphql(),
			moduleImages(config, isServer),
			moduleCss(dev, isServer),
			moduleSass(dev, isServer, false),
			moduleSass(dev, isServer, true)
		]

		config.plugins = [
			...config.plugins,
			...plugins(dev, isServer)
		]

		resolve(config)
		optimization(config, isServer)

		return config
	}
}