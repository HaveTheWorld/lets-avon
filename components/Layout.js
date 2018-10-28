import React from 'react'
import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'
import css from './Layout.sass'
import Helmet from './Helmet'
import Header from './Header'
import Footer from './Footer'

let GridHelper
const isProd = process.env.NODE_ENV === 'production'
if (!isProd) { GridHelper = require('@/components/elements/GridHelper').default }

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			{!isProd && <GridHelper />}
			<Helmet />
			<Header />
			<main className={css.main}>
				<div className="container">
					{children}
				</div>
			</main>
			<Footer />
		</React.Fragment>
	)
}

export default Layout