import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Icon from '@/components/Elements/Icon'

class Select extends React.Component {
	state = {
		isActivated: false,
		isValid: false
	}

	onBlur = () => {
		const { isActivated } = this.state
		!isActivated && this.setState({ isActivated: true })
	}

	onChange = e => {
		const { onChange } = this.props
		const { value } = e.target
		const isValid = Boolean(value)
		this.setState({ isValid })
		onChange(value, isValid)
	}

	render() {
		const { isActivated, isValid } = this.state
		const { label, icon, options, value, onChange, isRequired } = this.props
		const error = isRequired && isActivated && !isValid

		return (
			<div className="field">
				<div className="control has-icons-left">
					<div className="select">
						<select
							className={cls({ 'is-empty': !value }, { 'is-danger': error })}
							value={value}
							onChange={this.onChange}
							onBlur={this.onBlur}
						>
							<option className="is-placeholder" value="">{label}</option>
							{options.map(({ id, name, startDate, finishDate }) => (
								<option key={id} value={name}>{name}</option>
							))}
						</select>
						{icon && <Icon icon={icon} isLeft />}
					</div>
					{error && <span className="has-text-danger input-error">Обязательное поле.</span>}
				</div>
			</div>
		)
	}
}

Select.propTypes = {
	
}

export default Select