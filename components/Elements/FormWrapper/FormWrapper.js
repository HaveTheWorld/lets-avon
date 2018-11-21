import React from 'react'
import PropTypes from 'prop-types'

const FormWrapper = ({ children, tablet, desktop }) => {
	return (
		<div className="columns">
			<div className={`column is-${tablet || 8}-tablet is-${desktop || 7}-desktop`}>
				{children}
			</div>
		</div>
	)
}

FormWrapper.propTypes = {
	
}

export default FormWrapper