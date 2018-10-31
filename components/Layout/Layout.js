import React from 'react'
import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'
import css from './Layout.sass'
import Helmet from './Helmet'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import ToastsContainer from '@/components/Service/ToastsContainer'

let DevHelper
const isProd = process.env.NODE_ENV === 'production'
if (!isProd) { DevHelper = require('@/components/Service/DevHelper').default }

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Helmet />
			<Header />
			<div className={css.body}>
				<div className="container">
					<Sidebar />
					<main className={css.main}>
						{children}
					</main>
				</div>
			</div>
			<Footer />
			{!isProd && <DevHelper />}
			<ToastsContainer />
		</React.Fragment>
	)
}

export default Layout