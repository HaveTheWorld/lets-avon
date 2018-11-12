import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Input, InputDate, Icon } from '@/components/Elements'
import { required, digits1to2, digits4 } from '@/libs/validate'
import { toNumber } from '@/libs/normalize'

const AddCompanyForm = ({ handleSubmit, invalid, submitting }) => {
	return (
		<form onSubmit={handleSubmit} autoComplete="off">
			<Field
				name="number"
				component={Input}
				label="Номер кампании"
				icon={['fas', 'hashtag']}
				autoFocus
				validate={[required, digits1to2]}
				parse={toNumber}
			/>
			<Field
				name="year"
				component={Input}
				label="Год кампании"
				icon={['fas', 'calendar-alt']}
				validate={[required, digits4]}
				parse={toNumber}
			/>
			<Field
				name="startDate"
				component={InputDate}
				label="Дата начала"
				icon={['fas', 'calendar-alt']}
				validate={[required]}
			/>
			<Field
				name="finishDate"
				component={InputDate}
				label="Дата завершения"
				icon={['fas', 'calendar-alt']}
				validate={[required]}
			/>
			<button
				className={cls('button', 'is-primary', 'is-outlined', { 'is-loading': submitting })}
				disabled={invalid || submitting}
			>
				<Icon icon={['fas', 'paper-plane']} />
				<span>Создать кампанию</span>
			</button>
		</form>
	)
}

AddCompanyForm.propTypes = {
	
}

const mapStateToProps = state => ({
	initialValues: {
		year: new Date().getFullYear()
	}
})

export default compose(
	connect(mapStateToProps),
	reduxForm({ form: 'add-company' })
)(AddCompanyForm)