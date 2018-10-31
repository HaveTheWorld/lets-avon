import React from 'react'
import PropTypes from 'prop-types'

const Section = ({ title, children }) => {
	return (
		<section className="section">
			{title && <h2 className="subtitle is-3">{title}</h2>}
			{children}
		</section>
	)
}

Section.propTypes = {
	
}

export default Section