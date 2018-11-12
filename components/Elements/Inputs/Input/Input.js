import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { sleep } from '@/libs/helpers'
import Icon from '@/components/Elements/Icon'

class Input extends React.Component {
	async componentDidMount() {
		const { autoFocus } = this.props
		if (autoFocus) {
			await sleep(100)
			this.input && this.input.focus()
		}
	}
	
	render() {
		const { input, meta, type, label, icon, defaultValue } = this.props
		const showError = meta.touched && meta.invalid

		return (
			<div className="field" title={label}>
				<div className={cls('control', { 'has-icons-left': icon })}>
					{!icon && <label className="label" htmlFor={input.name}>{label}:</label>}
					<input
						{...input}
						type={type}
						id={icon ? null : input.name}
						className={cls('input', { 'is-danger': showError })}
						placeholder={icon ? label : null}
						ref={ref => this.input = ref}
					/>
					{icon && <Icon icon={icon} isLeft />}
					{showError && <span className="has-text-danger">{meta.error}</span>}
				</div>
			</div>
		)
	}
}

Input.propTypes = {
	
}

export default Input