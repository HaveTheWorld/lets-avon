import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { CurrentUserQuery } from '@/apollo/gql/auth.gql'
import Section from '@/components/Elements/Section'
import SideLink from './SideLink'
import LogoutButton from './LogoutButton'
import css from './Sidebar.sass'

const Sidebar = ({ router, data: { loading, currentUser } }) => {
	if (!/^\/admin(\/|$)/.test(router.asPath) || router.route === '/_error') { return null }	

	return (
		<aside className={css.sidebar}>
			<Section>
				<div className={css.menu}>
					<SideLink to="/admin/companies" icon={['far', 'calendar-alt']} text="Кампании" />
					<SideLink to="/admin/catalogs" icon={['fas', 'images']} text="Каталоги" />
					{
						currentUser && currentUser.role === 'admin' &&
						<SideLink to="/admin/users" icon={['fas', 'user-cog']} text="Пользователи" />
					}
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