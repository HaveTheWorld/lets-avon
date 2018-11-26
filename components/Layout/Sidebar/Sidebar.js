import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { CurrentUserQuery } from '@/apollo/gql/auth.gql'
import asideMap from '@/maps/aside'
import { Section } from '@/components/Elements'
import SideLink from './SideLink'
import LogoutButton from './LogoutButton'
import css from './Sidebar.sass'

const Sidebar = ({ router, data: { loading, currentUser } }) => {
	if (!currentUser || !['editor', 'admin'].includes(currentUser.role)) { return null }
	if (!/^\/admin(\/|$)/.test(router.asPath) || router.route === '/_error') { return null }	

	return (
		<aside className={css.sidebar}>
			<Section leftAlign>
				<div className={css.menu}>
					{Object.entries(asideMap).map(([to, { text, icon, requireRoles }]) => {
						if (!requireRoles.includes(currentUser.role)) { return null }
						const isActive = to === router.asPath
						return (
							<SideLink key={to} to={to} text={text} icon={icon} isActive={isActive} />
						)
					})}
				</div>
				<LogoutButton />
			</Section>
		</aside>
	)
}

Sidebar.propTypes = {
	
}

export default compose(
	withRouter,
	graphql(CurrentUserQuery)
)(Sidebar)