import React from 'react'
import PropTypes from 'prop-types'
import Section from '@/components/Elements/Section'
import css from './Section.sass'

import faker from 'faker/locale/ru'

const Section1 = () => {
	const title = faker.lorem.words().replace(/(^|\s)\w/g, l => l.toUpperCase())
	const paragraphs = faker.lorem.paragraphs(5).split('\n')

	return (
		<Section title={title} addCls={css.section}>
			{paragraphs.map((p, index) => (
				<p key={index} className={css.paragraph}>{p}</p>
			))}
		</Section>
	)
}

Section1.propTypes = {
	
}

export default Section1