import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { Router, Link } from 'react-static'
import Routes from 'react-static-routes'
import '@/assets/scss/main.scss'
import NProgress from '@/components/elements/NProgress'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import GridHelper from '@/components/elements/GridHelper'

const App = () => {
	return (
		<Router>
			<Fragment>
				<GridHelper />
				<NProgress />
				<Header />
				<main id="page-content">
					<Routes />
				</main>
				<Footer />
			</Fragment>
		</Router>
	)
}

export default hot(module)(App)
