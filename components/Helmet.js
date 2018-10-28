import React from 'react'
import Head from 'next/head'
import withPageData from '@/components/hocs/withPageData'
import mapSite from '@/maps/site'

const Helmet = ({ title }) => {
	const headTitle = title ? `${mapSite.title} | ${title}` : mapSite.title

	return (
		<Head>
			<title>{headTitle}</title>
		</Head>
	)
}

export default withPageData(Helmet)