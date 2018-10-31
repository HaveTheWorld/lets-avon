import React from 'react'
import PropTypes from 'prop-types'
import Section from '@/components/Elements/Section'
import css from './Section.sass'

import faker from 'faker/locale/ru'

const Section2 = () => {
	const title = faker.lorem.words().replace(/(^|\s)\w/g, l => l.toUpperCase())
	const paragraphs = faker.lorem.paragraphs(5).split('\n')

	return (
		<Section title={title} className={css.section}>
			{paragraphs.map((p, index) => (
				<p key={index} className={css.paragraph}>{p}</p>
			))}
		</Section>
	)
}

Section2.propTypes = {
	
}

export default Section2