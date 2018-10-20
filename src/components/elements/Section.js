import React from 'react'
import PropTypes from 'prop-types'

const Section = ({ children }) => {
	return (
		<section className="section">
			<div className="container">
				{children}
			</div>
		</section>
	)
}

Section.propTypes = {
	
}

export default Section