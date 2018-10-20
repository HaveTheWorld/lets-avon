import React, { Fragment } from 'react'
import PageHelmet from '@/components/elements/PageHelmet'
import Section from '@/components/elements/Section'
import PageTitle from '@/components/elements/PageTitle'

const Actions = () => {
	return (
		<Fragment>
			<PageHelmet page="actions" />
			<Section>
				<h1 className="title">Акции</h1>
			</Section>
		</Fragment>
	)
}

export default Actions