import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { Router, Link } from 'react-static'
import Routes from 'react-static-routes'
import '@/assets/scss/main.scss'
import NProgress from '@/components/elements/NProgress'


const App = () => {
	return (
		<Router>
			<Fragment>
				<NProgress />
				<div id="content">
					<Routes />
				</div>
			</Fragment>
		</Router>
	)
}

export default hot(module)(App)
