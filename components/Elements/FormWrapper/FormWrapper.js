import React from 'react'
import PropTypes from 'prop-types'

const FormWrapper = ({ children }) => {
	return (
		<div className="column">
			<div className="column is-5-desktop is-7-tablet">
				{children}
			</div>
		</div>
	)
}

FormWrapper.propTypes = {
	
}

export default FormWrapper