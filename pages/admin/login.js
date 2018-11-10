import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import jwt from 'jsonwebtoken'
import { graphql } from 'react-apollo'
import { SESSION } from '@/apollo/gql/session.gql'
import { LOGIN_USER } from '@/apollo/gql/auth.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { Router } from '@/libs/routes'
import { sleep } from '@/libs/helpers'
import Section from '@/components/Elements/Section'
import Input from '@/components/Elements/Input'
import Icon from '@/components/Elements/Icon'

@connect(null, { addToast })
@graphql(LOGIN_USER)
class Login extends React.Component {
	state = {
		fields: {
			username: { value: '', isValid: '' },
			password: { value: '', isValid: '' },
		},
		isLoading: false,
		isFormValid: false
	}

	checkFormValid(fields) {
		return Object.values(fields).every(({ isValid }) => isValid)
	}

	onSubmit = async e => {
		e.preventDefault()
		const { isFormValid, fields, isLoading } = this.state
		const { mutate, addToast } = this.props

		if (!isFormValid || isLoading) { return }

		this.setState({ isLoading: true })

		try {
			await mutate({
				variables: {
					username: fields.username.value,
					password: fields.password.value
				},
				update: (store, { data: { loginUser } }) => {
					const { exp, ...user } = jwt.decode(loginUser.token)
					document.cookie = `token=${loginUser.token}; path=/; expires=${new Date(exp * 1000)}`

					const { getCurrentUser } = store.readQuery({ query: SESSION })
					store.writeQuery({
						query: SESSION,
						data: { getCurrentUser: user }
					})

					addToast(`Вход выполнен успешно. Привет, ${user.username}!`, 'success')
				}
			})
			await sleep(10)
			Router.pushRoute('/admin')
		} catch (error) {
			this.setState({ isLoading: false })
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
		}
	}

	onInputChange = name => (value, isValid) => {
		const { fields } = this.state

		const newFields = {
			...fields,
			[name]: { value, isValid }
		}
		const newState = { fields: newFields }

		if (newFields[name].isValid !== fields[name].isValid) {
			newState.isFormValid = this.checkFormValid(newFields)
		}
		this.setState(newState)
	}

	render() {
		const { fields, isLoading, isFormValid } = this.state

		return (
			<Section title="Авторизация">
				<div className="columns">
					<form onSubmit={this.onSubmit} className="column is-5-desktop is-7-tablet">
						<Input
							name="username"
							label="Имя пользователя"
							icon={['fas', 'user-alt']}
							value={fields.username.value}
							onChange={this.onInputChange('username')}
							pattern={/.+/}
							errorText="Обязательное поле."
							autoFocus
						/>
						<Input
							type="password"
							name="password"
							label="Пароль"
							icon={['fas', 'key']}
							value={fields.password.value}
							onChange={this.onInputChange('password')}
							pattern={/.+/}
							errorText="Обязательное поле."
						/>
						<button
							className={cls('button', 'is-primary', 'is-outlined', { 'is-loading': isLoading })}
							disabled={!isFormValid}
							onClick={e => e.target.blur()}
						>
							<Icon icon={['fas', 'sign-in-alt']} />
							<span>Войти</span>
						</button>
					</form>
				</div>
			</Section>
		)
	}
}

Login.propTypes = {
	
}

export default Login