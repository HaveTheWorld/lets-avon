import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { reduxForm, Field } from 'redux-form'
import rolesMap from '@/maps/roles'
import { Input, Select, Icon } from '@/components/Elements'
import { required, latinAlpanumeric, minLength, maxLength, confirmPassword } from '@/libs/validate'

const minLength2 = minLength(2)
const minLength5 = minLength(5)
const maxLength15 = maxLength(15)
const maxLength32 = maxLength(32)

const roles = Object.entries(rolesMap).map(([id, name]) => ({ id, name }))

const AddUserForm = ({ handleSubmit, invalid, submitting }) => {
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
				label="Пароль"
				icon={['fas', 'key']}
				validate={[required, minLength5, maxLength32]}
			/>
			<Field
				name="confirm"
				component={Input}
				type="password"
				label="Подтвердите пароля"
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
				<span>Создать пользователя</span>
			</button>
		</form>
	)
}

AddUserForm.propTypes = {
	
}

export default reduxForm({ form: 'add-user' })(AddUserForm)