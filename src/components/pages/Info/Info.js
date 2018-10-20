import React, { Fragment } from 'react'
import PageHelmet from '@/components/elements/PageHelmet'
import Section from '@/components/elements/Section'
import PageTitle from '@/components/elements/PageTitle'

const Info = () => {
	return (
		<Fragment>
			<PageHelmet page="info" />
			<Section>
				<h1 className="title">Как заказать</h1>
			</Section>
		</Fragment>
	)
}

export default Info