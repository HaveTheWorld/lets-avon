const routes = module.exports = require('next-routes')()
const routesMap = require('../maps/routes')

Object.entries(routesMap).forEach(([asPath, { filePath }]) => {
	routes.add(asPath, filePath)
})