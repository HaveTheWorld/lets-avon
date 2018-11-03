import React from 'react'
import routesMap from '@/maps/routes'
import { withRouter } from 'next/router'

export default WrappedComponent => {
	const WithRouteData = ({ router, ...props }) => {
		const route = Object.values(routesMap).find(({ filePath }) => '/' + filePath === router.route)
		const routeData = { route: router.route, ...route }
		if (router.route === '/_error') { routeData.error = true }
		
		return <WrappedComponent {...routeData} {...props} />
	}

	return withRouter(WithRouteData)
}
