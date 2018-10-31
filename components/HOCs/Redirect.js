import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { GET_CURRENT_USER } from '@/apollo/gql/auth.gql'
import { Router } from '@/libs/routes'

import routesMap from '@/maps/routes'
const adminRoutes = ['/admin']

const Redirect = ({ children, router, data, redirect, ...props }) => {

	const doRedirect = redirect ? redirect : Router.pushRoute

	const dirtyRoute = Object.entries(routesMap).find(([_, { filePath }]) => {
		return filePath === router.asPath.substring(1)
	})
	
	const requireAdmin = adminRoutes.includes(dirtyRoute ? dirtyRoute[0] : router.asPath)
	if (requireAdmin) {
		const { loading, user } = data
		if (!loading && (!user || !user.isAdmin)) {
			doRedirect('/login')
			return null
		}
	}

	if (dirtyRoute) {
		doRedirect(dirtyRoute[0])
		return null
	}

	const Component = () => children
	return <Component {...props} />
}

Redirect.propTypes = {
	
}

export default compose(
	withRouter,
	graphql(GET_CURRENT_USER)
)(Redirect)