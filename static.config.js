import webpackConfig from './config/webpack'
import documentConfig from './config/document'
import axios from 'axios'

const pagesPath = 'src/components/pages'

export default {
	webpack: webpackConfig,
	Document: documentConfig,
	devServer: {
		port: 8080
	},
	getSiteData: () => ({
		title: `Let's AVON`,
	}),
	getRoutes: async () => {
		return [
			{
				path: '/',
				component: `${pagesPath}/Home`,
				getData() {
					return {
						isHome: true
					}
				}
			},
			{
				path: '/catalogs',
				component: `${pagesPath}/Catalogs`
			},
			{
				path: '/actions',
				component: `${pagesPath}/Actions`
			},
			{
				path: '/info',
				component: `${pagesPath}/Info`
			},
			{
				path: '/register',
				component: `${pagesPath}/Register`
			},
			{
				is404: true,
				component: `${pagesPath}/404`
			}
		]
	}
}
