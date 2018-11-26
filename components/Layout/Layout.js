import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'
import '@/assets/sass/animate.sass'
import React, { Fragment } from 'react'
import cls from 'classnames'
import { withRouter } from 'next/router'
import withPageData from '@/components/Hocs/withPageData'
import { Helmet } from '@/components/Elements'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import ToastsContainer from '@/components/Service/ToastsContainer'
import css from './Layout.sass'

let DevHelper
const isProd = process.env.NODE_ENV === 'production'
if (!isProd) { DevHelper = require('@/components/Service/DevHelper').default }

const Layout = ({ children, router, disableTransition }) => {
	return (
		<Fragment>
			<Helmet />
			<Header />
			<div className={css.body}>
				<div className="container">
					<Sidebar />
					<main id="content" className={css.main}>
						<div
							key={router.asPath}
							className={disableTransition ? null : cls('animated', 'fadeIn', css.transition)}
						>
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

export default withPageData(withRouter(Layout))