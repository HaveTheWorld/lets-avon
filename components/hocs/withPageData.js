import React from 'react'
import pagesMap from '@/maps/pages'
import { withRouter } from 'next/router'

export default WrappedComponent => {
	const WithPageData = ({ router, ...props }) => {
		const pageData = { asPath: router.asPath, ...pagesMap[router.asPath] }
		
		return <WrappedComponent {...pageData} {...props} />
	}

	return withRouter(WithPageData)
}
