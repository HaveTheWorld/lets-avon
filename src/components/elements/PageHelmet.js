import React from 'react'
import PropTypes from 'prop-types'
import { Head, withSiteData } from 'react-static'
import mapHead from '@/maps/head'


const PageHelmet = ({ page, title }) => {
	const head = mapHead[page]

	return (
		<Head>
			<title>{title} | {head.title}</title>
		</Head>
	)
}

PageHelmet.propTypes = {
	
}

export default withSiteData(PageHelmet)