import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { reduxForm, Field } from 'redux-form'
import { Input, Icon } from '@/components/Elements'
import { required } from '@/libs/validate'

const LoginForm = ({ handleSubmit, invalid, submitting }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="username"
				component={Input}
				label="Имя пользователя"
				icon={['fas', 'user-alt']}
				autoFocus
				validate={required}
			/>
			<Field
				name="password"
				component={Input}
				type="password"
				label="Пароль"
				icon={['fas', 'key']}
				validate={required}
			/>
			<button
				className={cls('button', 'is-primary', 'is-outlined', { 'is-loading': submitting })}
				disabled={invalid || submitting}
			>
				<Icon icon={['fas', 'sign-in-alt']} />
				<span>Войти</span>
			</button>
		</form>
	)
}

LoginForm.propTypes = {
	
}

export default reduxForm({ form: 'login' })(LoginForm)