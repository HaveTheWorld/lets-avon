import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import moment from 'moment'
import siteMap from '@/maps/site'
import DatePicker from 'react-datepicker'
import { Icon } from '@/components/Elements'

moment.locale('ru')

const InputDate = ({ input, meta, label, icon }) => {
	const showError = meta.touched && meta.error

	const formattedValue = !input.value
		? ''
		: typeof input.value === 'number'
			? moment(input.value).format(siteMap.dateFormat)
			: input.value

	const selectedValue = !input.value
		? null
		: typeof input.value === 'number'
			? moment(input.value)
			: moment(input.value, siteMap.dateFormat)

	const onChange = date => {
		const value = date ? moment(date).valueOf() : null
		input.onChange(value)
	}

	const onBlur = event => {
		!event && input.onBlur(event)
	}

	return (
		<div className="field" title={label}>
			<div className={cls('control', { 'has-icons-left': icon })}>
				{!icon && <label className="label" htmlFor={input.name}>{label}:</label>}
				<DatePicker
					{...{...input, value: formattedValue }}
					id={icon ? null : input.name}
					className={cls('input', { 'is-danger': showError })}
					placeholderText={icon ? label : null}
					disabledKeyboardNavigation
					selected={selectedValue}
					onChange={onChange}
					onBlur={onBlur}
				/>
				{icon && <Icon icon={icon} isLeft />}
				{showError && <span className="has-text-danger">{meta.error}</span>}
			</div>
		</div>
	)
}

InputDate.propTypes = {
	
}

export default InputDate