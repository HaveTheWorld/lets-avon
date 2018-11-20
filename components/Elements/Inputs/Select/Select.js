import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Icon } from '@/components/Elements'

const Select = ({ input, meta, label, icon, options }) => {
	const showError = meta.touched && meta.invalid

	return (
		<div className="field">
			<div className="control has-icons-left">
				<div className="select">
					<select
						{...input}
						className={cls({ 'is-empty': !input.value }, { 'is-danger': showError })}
						 title={label}
					>
						<option className="is-placeholder" value="">{label}</option>
						{options.map(({ id, name }) => (
							<option key={id} value={id}>{name}</option>
						))}
					</select>
					{icon && <Icon icon={icon} isLeft />}
				</div>
				{showError && <span className="has-text-danger input-error">{meta.error}</span>}
			</div>
		</div>
	)
}

Select.propTypes = {
	
}

export default Select