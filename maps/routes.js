module.exports = {

	// User Routes
	home: {
		asPath: '/',
		filePath: 'User/Home/Home',
		title: 'Главная',
		isHome: true
	},
	catalogs: {
		asPath: '/catalogs',
		filePath: 'User/Catalogs/Catalogs',
		title: 'Каталоги'
	},
	catalogView: {
		asPath: '/catalogs/:name',
		filePath: 'User/Catalogs/CatalogView',
		title: 'Просмотр каталога',
		isNavbarAbsolute: true
	},
	actions: {
		asPath: '/actions',
		filePath: 'User/Actions',
		title: 'Акции'
	},
	info: {
		asPath: '/info',
		filePath: 'User/Info',
		title: 'Информация'
	},
	register: {
		asPath: '/register',
		filePath: 'User/Register',
		title: 'Регистрация'
	},

	// Admin Routes
	login: {
		asPath: '/login',
		filePath: 'Admin/Login',
		title: 'Вход'
	},
	adminHome: {
		asPath: '/admin',
		filePath: 'Admin/Home',
		title: 'Админ :: Главная'
	},
	adminCompanies: {
		asPath: '/admin/companies',
		filePath: 'Admin/Companies/Companies',
		title: 'Админ :: Кампании'
	},
	adminCatalogs: {
		asPath: '/admin/catalogs',
		filePath: 'Admin/Catalogs/Catalogs',
		title: 'Админ :: Каталоги'
	}
}