const routes = module.exports = require('next-routes')()
 
routes
	.add('/', 'user/home')
	.add('/catalogs', 'user/catalogs')
	.add('/actions', 'user/actions')
	.add('/info', 'user/info')
	.add('/register', 'user/register')

	.add('/login', 'admin/login')
	.add('/admin', 'admin/home')