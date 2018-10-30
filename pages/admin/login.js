import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Section from '@/components/elements/Section'
import Input from '@/components/elements/Input'
import Icon from '@/components/elements/Icon'

import { graphql } from 'react-apollo'
import { LOGIN, GET_CURRENT_USER } from '@/graphql/auth.gql'
import jwt from 'jsonwebtoken'
import { Router } from '@/libs/routes'

const fields = ['username', 'password']

@graphql(LOGIN)
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			fields: {},
			isLoading: false,
			isFormValid: false
		}
		fields.forEach(field => this.state.fields[field] = { value: '', isValid: false })
	}

	checkFormValid(fields) {
		return Object.values(fields).every(({ isValid }) => isValid)
	}

	onSubmit = async e => {
		e.preventDefault()
		const { isFormValid, fields } = this.state
		const { mutate } = this.props

		if (!isFormValid) { return }

		const variables = Object.entries(fields).reduce((acc, [name, field]) => {
			acc[name] = field.value
			return acc
		}, {})

		this.setState({ isLoading: true })

		try {
			await mutate({
				variables,
					username: username.value,
					password: password.value
				},
				update: (store, { data: { login: token } }) => {
					const { exp, iat, ...user } = jwt.decode(token)
					document.cookie = `token=${token}; expires=${new Date(exp * 1000)}`
					const data = store.readQuery({ query: GET_CURRENT_USER })
					user.__typename = 'UserType'
					store.writeQuery({ query: GET_CURRENT_USER, data: { ...data, user } })
				}
			})

			this.setState({ isLoading: false })
			Router.pushRoute('/admin')
		} catch (error) {
			// Handle error
			this.setState({ isLoading: false })
			console.log(error.message)
		}
	}

	onInputChange = name => ({ value, isValid }) => {
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
							errorText="Поле обязательно для заполнения"
						/>
						<Input
							type="password"
							name="password"
							label="Пароль"
							icon={['fas', 'key']}
							value={fields.password.value}
							onChange={this.onInputChange('password')}
							pattern={/.+/}
							errorText="Поле обязательно для заполнения"
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