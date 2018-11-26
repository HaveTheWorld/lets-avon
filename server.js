const express = require('express')
const proxy = require('express-http-proxy')
const cookieParser = require('cookie-parser')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
app.prepare()
	.then(() => {
		const {
			SERVER_API_ORIGIN,
			STATIC_API_ENDPOINT,
			SERVER_API_CATALOGS,
			STATIC_SSR_ORIGIN,
			SERVER_SSR_PORT,
			SERVER_UPLOAD_LIMIT
		} = process.env
		const server = express()
		const proxyReqOptDecorator = (opts, req) => {
			opts.headers['x-forwarded-host'] = STATIC_SSR_ORIGIN.split('://')[1]
			return opts
		}

		server.use(cookieParser())

		server.use(`/static${SERVER_API_CATALOGS}`, proxy(SERVER_API_ORIGIN, {
			proxyReqOptDecorator,
			proxyReqPathResolver: (req) => `${SERVER_API_CATALOGS}${req.url}`
		}))

		server.use(STATIC_API_ENDPOINT, proxy(SERVER_API_ORIGIN, {
			proxyReqOptDecorator,
			proxyReqPathResolver: () => STATIC_API_ENDPOINT,
			limit: SERVER_UPLOAD_LIMIT
		}))

		server.get('*', (req, res) => handle(req, res))

		server.listen(SERVER_SSR_PORT, (err) => {
			if (err) throw err
			console.log(`> Ready on ${STATIC_SSR_ORIGIN}`)
		})
	})
	.catch(error => {
		console.log(error)
		process.exit(1)
	})