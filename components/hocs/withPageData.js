import React from 'react'
import pagesMap from '@/maps/pages'
import { withRouter } from 'next/router'

export default WrappedComponent => {
	const WithPageData = ({ router }) => {
		const pageData = { asPath: router.asPath, ...pagesMap[router.asPath] }
		
		return <WrappedComponent {...pageData} />
	}

	return withRouter(WithPageData)
}
