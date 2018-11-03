const routes = module.exports = require('next-routes')()
const routesMap = require('../maps/routes')

Object.entries(routesMap).forEach(([name, { asPath, filePath }]) => {
	routes.add(name, asPath, filePath)
})