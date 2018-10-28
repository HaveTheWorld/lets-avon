import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {
	state = {
		isValid: false
	}

	render() {
		const { type = 'text', name, label, value, onChange } = this.props

		return (
			<div className="field">
				<div className="control">
					<label className="label" htmlFor={name}>{label}:</label>
					<input
						type={type}
						id={name}
						className="input"
						value={value}
						onChange={onChange}
					/>
				</div>
			</div>
		)
	}
}

Input.propTypes = {
	
}

export default Input