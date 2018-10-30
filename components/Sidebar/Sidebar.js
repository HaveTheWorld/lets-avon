import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { GET_CURRENT_USER } from '@/graphql/auth.gql'
import Section from '@/components/elements/Section'
import Icon from '@/components/elements/Icon'
import SideLink from './SideLink'
import css from './Sidebar.sass'


const Sidebar = ({ router, data }) => {
	if (!/^\/admin(\/|$)/.test(router.asPath)) { return null }

	const onLogout = () => {
		data.updateQuery(() => {
			document.cookie = `token=; expires=-1`
			return { user: null }
		})
	}

	return (
		<aside className={css.sidebar}>
			<Section>
				<div className={css.menu}>
					<SideLink to="/admin" icon={['fas', 'wrench']} text="Sidebar Link 1" />
					<SideLink to="/admin" icon={['fas', 'wrench']} text="Sidebar Link 2" />
					<SideLink to="/admin" icon={['fas', 'wrench']} text="Sidebar Link 3" />
				</div>
				<button className="button is-primary is-outlined" onClick={onLogout}>
					<Icon icon={['fas', 'sign-out-alt']} />
					<span>Выход</span>
				</button>
			</Section>
		</aside>
	)
}

Sidebar.propTypes = {
	
}

export default compose(
	withRouter,
	graphql(GET_CURRENT_USER)
)(Sidebar)