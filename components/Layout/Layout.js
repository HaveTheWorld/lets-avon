import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'
import '@/assets/sass/animate.sass'
import React, { Fragment } from 'react'
import cls from 'classnames'
import { withRouter } from 'next/router'
import Helmet from './Helmet'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import ToastsContainer from '@/components/Service/ToastsContainer'
import css from './Layout.sass'

let DevHelper
const isProd = process.env.NODE_ENV === 'production'
if (!isProd) { DevHelper = require('@/components/Service/DevHelper').default }

const Layout = ({ children, router }) => {
	return (
		<Fragment>
			<Helmet />
			<Header />
			<div className={css.body}>
				<div className="container">
					<Sidebar />
					<main id="content" className={css.main}>
						<div key={router.asPath} className={cls('animated', 'fadeIn', css.transition)}>
							{children}
						</div>
					</main>
				</div>
			</div>
			<Footer />
			{!isProd && <DevHelper />}
			<ToastsContainer />
		</Fragment>
	)
}

export default withRouter(Layout)