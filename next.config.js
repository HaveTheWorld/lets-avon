const moduleGraphql = require('./webpack-overrides/module-graphql')
const moduleImages = require('./webpack-overrides/module-images')
const moduleFonts = require('./webpack-overrides/module-fonts')
const { moduleCss, moduleSass } = require('./webpack-overrides/module-styles')
const plugins = require('./webpack-overrides/plugins')
const resolve = require('./webpack-overrides/resolve')
const optimization = require('./webpack-overrides/optimization')

const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

dotenvLoad()
const withNextEnv = nextEnv({
	staticPrefix: 'STATIC_',
	publicPrefix: 'PUBLIC_',
	serverPrefix: 'SERVER_'
})

module.exports = withNextEnv({
	webpack(config, { dev, isServer }) {
		config.module.rules = [
			...config.module.rules,
			moduleGraphql(),
			moduleImages(config, isServer),
			moduleFonts(config, isServer),
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
})