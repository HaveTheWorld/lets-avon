import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Icon from '@/components/Elements/Icon'

moment.locale('ru')

class InputDate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			date: null,
			isActivated: false,
			isValid: false
		}
	}

	onChange = date => {
		const { onChange, isRequired } = this.props
		const { isActivated } = this.state

		const newState = { date, isActivated: true }

		const timestamp = date ? Date.parse(date.toString()) : ''
		const isValid = /^\d+$/.test(timestamp)
		newState.isValid = isValid

		this.setState(newState)
		onChange(timestamp, isValid)
	}

	onBlur = () => {
		const { isActivated } = this.state
		!isActivated && this.setState({ isActivated: true })
	}

	render() {
		const { date, isActivated, isValid } = this.state
		const { name, label, icon, isRequired } = this.props
		const error = isRequired && isActivated && !isValid

		return (
			<div className="field">
				<div className={cls('control', { 'has-icons-left': icon })}>
					{!icon && <label className="label" htmlFor={name}>{label}:</label>}
					<DatePicker
						id={icon ? null : name}
						selected={date}
						className={cls('input', { 'is-danger': error })}
						placeholderText={icon ? label : null}
						onChange={this.onChange}
						onBlur={this.onBlur}
						disabledKeyboardNavigation
					/>
					{icon && <Icon icon={icon} isLeft />}
					{error && <span className="has-text-danger">Поле обязательно для заполнения</span>}
				</div>
			</div>
		)
	}
}

InputDate.propTypes = {
	
}

export default InputDate