const express = require('express')
const proxy = require('express-http-proxy')
const cookieParser = require('cookie-parser')
const next = require('next')
const routes = require('./libs/routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

let authHeader

app.prepare()
	.then(() => {
		const server = express()
		server.use(cookieParser())

		server.use('/static/catalogs', (req, res) => {
			res.redirect(`http://localhost:3001/catalogs${req.url}`)
		})

		server.use('/graphql', proxy('http://localhost:3001', {
			proxyReqOptDecorator(opts) {
				opts.headers['x-forwarded-host'] = 'localhost:3000'

				if (authHeader) {
					opts.headers['authorization'] = authHeader					
				}

				if (opts.headers.cookie) {
					opts.headers.cookie = opts.headers.cookie.split('; ').filter(cookie => {
						const [key, value] = cookie.split('=')
						const isTokenCookie = key === 'token'
						if (isTokenCookie && !authHeader) {
							opts.headers['authorization'] = `Bearer ${value}`
						}
						return !isTokenCookie
					}).join('; ')
					
					delete opts.headers.cookie
				}
				console.log(opts.headers['authorization'] && opts.headers['authorization'].length)

				return opts
			},
			proxyReqPathResolver() {
				return '/graphql'
			},
			limit: '2mb'
		}))

		server.use((req, res, next) => {
			authHeader = req.cookies['token'] ? `Bearer ${req.cookies['token']}` : null
			next()
		})

		server.get('*', (req, res) => handle(req, res))

		server.listen(port, (err) => {
			if (err) throw err
			console.log(`> Ready on http://localhost:${port}`)
		})
	})
	.catch(error => {
		console.log(error.message)
		process.exit(1)
	})