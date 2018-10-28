import React from 'react'
import PropTypes from 'prop-types'
import css from './Footer.sass'

const Footer = () => {
	return (
		<footer className={css.footer}>
			<div className="container">
				<h3>Footer</h3>
			</div>
		</footer>
	)
}

Footer.propTypes = {
	
}

export default Footer