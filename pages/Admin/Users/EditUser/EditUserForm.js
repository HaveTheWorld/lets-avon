import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import rolesMap from '@/maps/roles'
import { Input, Select, Icon } from '@/components/Elements'
import { required, latinAlpanumeric, minLength, maxLength, confirmPassword } from '@/libs/validate'

const minLength2 = minLength(2)
const maxLength15 = maxLength(15)
const minLength5 = minLength(5, false)
const maxLength32 = maxLength(32, false)

const roles = Object.entries(rolesMap).map(([id, name]) => ({ id, name }))

const EditUserForm = ({ handleSubmit, invalid, submitting }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="username"
				component={Input}
				label="Имя пользователя"
				icon={['fas', 'user-alt']}
				autoFocus
				validate={[required, latinAlpanumeric, minLength2, maxLength15]}
			/>
			<Field
				name="password"
				component={Input}
				type="password"
				label="Новый пароль"
				icon={['fas', 'key']}
				validate={[minLength5, maxLength32]}
			/>
			<Field
				name="confirm"
				component={Input}
				type="password"
				label="Подтвердите пароль"
				icon={['fas', 'key']}
				validate={confirmPassword}
			/>
			<Field
				name="role"
				component={Select}
				label="Роль"
				icon={['fas', 'shield-alt']}
				options={roles}
				validate={required}
			/>
			<button
				className={cls('button', 'is-primary', 'is-outlined', { 'is-loading': submitting })}
				disabled={submitting || invalid}
			>
				<Icon icon={['fas', 'paper-plane']} />
				<span>Изменить пользователя</span>
			</button>
		</form>
	)
}

EditUserForm.propTypes = {
	
}

const mapStateToProps = (state, { user }) => ({
	initialValues: {
		username: user.username,
		role: user.role
	}
})

export default compose(
	connect(mapStateToProps),
	reduxForm({ form: 'edit-user' })
)(EditUserForm)