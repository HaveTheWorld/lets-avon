import React from 'react'
import Head from 'next/head'
import withPageData from '@/components/HOCs/withPageData'
import mapSite from '@/maps/site'

const Helmet = ({ title, error }) => {
	let headTitle = title ? `${mapSite.title} | ${title}` : mapSite.title
	if (error) { headTitle = `${mapSite.title} | Ошибка` }

	return (
		<Head>
			<title>{headTitle}</title>
		</Head>
	)
}

export default withPageData(Helmet)