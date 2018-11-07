import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

class Portal extends React.Component {
	render() {
		return createPortal(
			this.props.children,
			document.body
		)
	}
}

Portal.propTypes = {
	
}

export default Portal