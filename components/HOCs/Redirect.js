import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { SESSION } from '@/apollo/gql/session.gql'
import { Router } from '@/libs/routes'
import Error from '@/components/Service/Error'

import routesMap from '@/maps/routes'
const adminRoutes = ['/admin']

const Redirect = ({ children, router, data, redirect, statusCode, ...props }) => {

	const doRedirect = redirect ? redirect : Router.pushRoute

	const dirtyRoute = Object.entries(routesMap).find(([_, { filePath }]) => {
		return filePath === router.asPath.substring(1)
	})

	if (dirtyRoute) {
		return <Error statusCode={statusCode || 404} />
	}
	
	const requireAdmin = adminRoutes.includes(/*dirtyRoute ? dirtyRoute[0] : */router.asPath)
	if (requireAdmin) {
		const { loading, getCurrentUser } = data
		if (!loading && (!getCurrentUser || !getCurrentUser.isAdmin)) {
			doRedirect('/login')
			return null
		}
	}

/*	if (dirtyRoute) {
		doRedirect(dirtyRoute[0])
		return null
	}*/

	if (router.route === '/_error') {
		return <Error statusCode={statusCode || 500} />
	}

	const Component = () => children
	return <Component {...props} />
}

Redirect.propTypes = {
	
}

export default compose(
	withRouter,
	graphql(SESSION)
)(Redirect)