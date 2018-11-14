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
		asPath: '/catalogs/:company/:name/:page?',
		filePath: 'User/CatalogView/CatalogView',
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
		filePath: 'Admin/LoginPage/LoginPage',
		title: 'Вход'
	},
	adminHome: {
		asPath: '/admin',
		filePath: 'Admin/Home',
		title: 'Админ :: Главная'
	},
	adminCompaniesList: {
		asPath: '/admin/companies',
		filePath: 'Admin/Companies/CompaniesList/CompaniesList',
		title: 'Админ :: Кампании'
	},
	adminAddCompany: {
		asPath: '/admin/companies/add',
		filePath: 'Admin/Companies/AddCompany/AddCompany',
		title: 'Админ :: Новая кампания'
	},
	adminCatalogsList: {
		asPath: '/admin/catalogs',
		filePath: 'Admin/Catalogs/CatalogsList/CatalogsList',
		title: 'Админ :: Каталоги'
	},
	adminAddCatalog: {
		asPath: '/admin/catalogs/add',
		filePath: 'Admin/Catalogs/AddCatalog/AddCatalog',
		title: 'Админ :: Новый каталог'
	},
}