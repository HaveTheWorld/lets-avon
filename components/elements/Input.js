import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { sleep } from '@/libs/helpers'
import Icon from '@/components/Elements/Icon'

class Input extends React.Component {
	state = {
		isTouched: false,
		isActivated: false,
		isValid: false
	}

	async componentDidMount() {
		const { autoFocus } = this.props
		if (autoFocus) {
			await sleep(100)
			this.input && this.input.focus()
		}
	}

	onBlur = e => {
		const { isTouched, isActivated } = this.state
		const { value } = e.target

		!isActivated && (isTouched || value) && this.setState({ isActivated: true })
	}

	onInput = e => {
		const { isActivated } = this.state
		const { pattern, onChange } = this.props
		const { value } = e.target
		
		const isValid = pattern ? pattern.test(value) : null
		const newState = { isValid }
		if (!isActivated && (!value || isValid !== this.state.isValid)) {
			newState.isActivated = true
		}
		if (!isActivated && !value) {
			newState.isTouched = true
		}
		this.setState(newState)

		onChange(value, isValid)
	}

	render() {
		const { isActivated, isValid } = this.state
		const { type = 'text', name, label, icon, value, errorText, pattern } = this.props
		const error = pattern && isActivated && !isValid

		return (
			<div className="field">
				<div className={cls('control', { 'has-icons-left': icon })}>
					{!icon && <label className="label" htmlFor={name}>{label}:</label>}
					<input
						type={type}
						id={icon ? null : name}
						className={cls('input', { 'is-danger': error })}
						value={value}
						onChange={this.onInput}
						onBlur={this.onBlur}
						placeholder={icon ? label : null}
						ref={ref => this.input = ref}
					/>
					{icon && <Icon icon={icon} isLeft />}
					{error && <span className="has-text-danger">{errorText}</span>}
				</div>
			</div>
		)
	}
}

Input.propTypes = {
	
}

export default Input