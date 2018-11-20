module.exports = {

	// User Routes
	home: {
		asPath: '/',
		filePath: 'User/Home/Home',
		title: 'Главная',
		isHome: true
	},
	catalogsList: {
		asPath: '/catalogs',
		filePath: 'User/Catalogs/CatalogsList/CatalogsList',
		title: 'Каталоги'
	},
	catalogView: {
		asPath: '/catalogs/:company/:name/:page?',
		filePath: 'User/Catalogs/CatalogView/CatalogView',
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
		redirect: '/admin/companies',
		filePath: 'Admin/Home',
		title: 'Админ :: Главная',
		requireRoles: ['editor', 'admin']
	},
	adminCompaniesList: {
		asPath: '/admin/companies',
		filePath: 'Admin/Companies/CompaniesList/CompaniesList',
		title: 'Админ :: Кампании',
		requireRoles: ['editor', 'admin']
	},
	adminAddCompany: {
		asPath: '/admin/companies/add',
		filePath: 'Admin/Companies/AddCompany/AddCompany',
		title: 'Админ :: Новая кампания',
		requireRoles: ['editor', 'admin']
	},
	adminCatalogsList: {
		asPath: '/admin/catalogs',
		filePath: 'Admin/Catalogs/CatalogsList/CatalogsList',
		title: 'Админ :: Каталоги',
		requireRoles: ['editor', 'admin']
	},
	adminAddCatalog: {
		asPath: '/admin/catalogs/add',
		filePath: 'Admin/Catalogs/AddCatalog/AddCatalog',
		title: 'Админ :: Новый каталог',
		requireRoles: ['editor', 'admin']
	},
	adminUsersList: {
		asPath: '/admin/users',
		filePath: 'Admin/Users/UsersList/UsersList',
		title: 'Админ :: Пользователи',
		requireRoles: ['admin']
	},
	adminAddUser: {
		asPath: '/admin/users/add',
		filePath: 'Admin/Users/AddUser/AddUser',
		title: 'Админ :: Новый пользователь',
		requireRoles: ['admin']
	},
	adminEditUser: {
		asPath: '/admin/users/:username',
		filePath: 'Admin/Users/EditUser/EditUser',
		title: 'Админ :: Редактирование пользователя',
		requireRoles: ['admin']
	}
}