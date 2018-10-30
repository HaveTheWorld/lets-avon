import React from 'react'
import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'
import css from './Layout.sass'
import Helmet from './Helmet'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

let GridHelper
const isProd = process.env.NODE_ENV === 'production'
if (!isProd) { GridHelper = require('@/components/elements/GridHelper').default }

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			{!isProd && <GridHelper />}
			<Helmet />
			<Header />
			<main className={`${css.main} container`}>
				<Sidebar />
				{children}
			</main>
			<Footer />
		</React.Fragment>
	)
}

export default Layout