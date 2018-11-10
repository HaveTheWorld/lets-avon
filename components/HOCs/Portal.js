import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

const Portal = ({ children, selector }) =>  {
	if (typeof document === 'undefined') { return null }

	const target = selector ? document.querySelector(selector) : document.body

	if (!target) { return null }

	return createPortal(children, target)
}

Portal.propTypes = {
	
}

export default Portal