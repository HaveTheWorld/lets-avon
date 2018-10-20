import React, { Fragment } from 'react'
import PageHelmet from '@/components/elements/PageHelmet'
import Section from '@/components/elements/Section'
import PageTitle from '@/components/elements/PageTitle'

const Catalogs = () => {
	return (
		<Fragment>
			<PageHelmet page="catalogs" />
			<Section>
				<h1 className="title">Каталоги</h1>
			</Section>
		</Fragment>
	)
}

export default Catalogs