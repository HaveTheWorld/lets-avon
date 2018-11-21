import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { CurrentUserQuery } from '@/apollo/gql/auth.gql'
import { Router } from '@/routes'
import routesMap from '@/maps/routes'
import Error from '@/components/Service/Error'

const Redirect = ({ children, router, data, redirect, statusCode, ...props }) => {
	if (router.route === '/_error') {
		return <Error statusCode={statusCode || 500} />
	}

	let currentRoute
	const { loading, currentUser } = data
	const doRedirect = redirect ? redirect : Router.pushRoute

	// Return error 404 if requiest done by filepath
	const dirtyRoute = Object.entries(routesMap).find(([_, routeData]) => {
		if (routeData.filePath === router.pathname.substring(1)) {
			currentRoute = routeData
		}
		return routeData.filePath === router.asPath.substring(1)
	})
	if (dirtyRoute) {
		return <Error statusCode={statusCode || 404} />
	}
	
	// Push router config redirect
	if (currentRoute.redirect) {
		doRedirect(currentRoute.redirect)
		return null
	}
	
	// Check user privs by role
	if (currentRoute.requireRoles) {
		if (!currentUser || !currentRoute.requireRoles.includes(currentUser.role)) {
			doRedirect('/login')
			return null
		}
	}

	const Component = () => children
	return <Component {...props} />
}

Redirect.propTypes = {
	
}

export default compose(
	withRouter,
	graphql(CurrentUserQuery)
)(Redirect)