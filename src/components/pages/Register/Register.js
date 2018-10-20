import React, { Fragment } from 'react'
import PageHelmet from '@/components/elements/PageHelmet'
import Section from '@/components/elements/Section'
import PageTitle from '@/components/elements/PageTitle'

const Register = () => {
	return (
		<Fragment>
			<PageHelmet page="register" />
			<Section>
				<h1 className="title">Анкета представителя</h1>
			</Section>
		</Fragment>
	)
}

export default Register