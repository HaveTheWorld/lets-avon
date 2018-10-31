import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

const Section = ({ children, title, addCls }) => {
	return (
		<section className={cls('section', addCls)}>
			{title && <h2 className="subtitle is-3">{title}</h2>}
			{children}
		</section>
	)
}

Section.propTypes = {
	
}

export default Section