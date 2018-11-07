import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import Section from '@/components/Elements/Section'
import SideLink from './SideLink'
import LogoutButton from './LogoutButton'
import css from './Sidebar.sass'


const Sidebar = ({ router }) => {
	if (!/^\/admin(\/|$)/.test(router.asPath) || router.route === '/_error') { return null }	

	return (
		<aside className={css.sidebar}>
			<Section>
				<div className={css.menu}>
					<SideLink to="/admin" icon={['fas', 'wrench']} text="Главная" />
					<SideLink to="/admin/catalogs" icon={['fas', 'images']} text="Каталоги" />
				</div>
				<LogoutButton />
			</Section>
		</aside>
	)
}

Sidebar.propTypes = {
	
}

export default withRouter(Sidebar)