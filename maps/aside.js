export default {
	'/admin/companies': {
		text: 'Кампании',
		icon: ['far', 'calendar-alt'],
		requireRoles: ['editor', 'admin']
	},
	'/admin/catalogs': {
		text: 'Каталоги',
		icon: ['fas', 'images'],
		requireRoles: ['editor', 'admin']
	},
	'/admin/users': {
		text: 'Пользователи',
		icon: ['fas', 'user-cog'],
		requireRoles: ['admin']
	}
}