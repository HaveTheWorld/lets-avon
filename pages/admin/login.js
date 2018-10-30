import React from 'react'
import PropTypes from 'prop-types'
import Section from '@/components/elements/Section'
import Input from '@/components/elements/Input'
import Icon from '@/components/elements/Icon'

import { graphql } from 'react-apollo'
import { LOGIN, GET_CURRENT_USER } from '@/graphql/auth.gql'
import jwt from 'jsonwebtoken'
import { Router } from '@/libs/routes'

@graphql(LOGIN)
class Login extends React.Component {
	state = {
		username: '',
		password: ''
	}

	onSubmit = async e => {
		e.preventDefault()
		const { username, password } = this.state
		const { mutate } = this.props
		try {
			const { data } = await mutate({
				variables: { username, password },
				update: (store, { data: { login: token } }) => {
					const { exp, iat, ...user } = jwt.decode(token)
					document.cookie = `token=${token}; expires=${new Date(exp * 1000)}`
					const data = store.readQuery({ query: GET_CURRENT_USER })
					user.__typename = 'UserType'
					store.writeQuery({ query: GET_CURRENT_USER, data: { ...data, user } })
				}
			})
			Router.pushRoute('/admin')
		} catch (error) {
			// Handle error
			alert(error.message)
		}
	}

	onInputChange = name => e => {
		this.setState({ [name]: e.target.value })
	}

	render() {
		const { username, password } = this.state

		return (
			<Section title="Авторизация">
				<div className="columns">
					<form onSubmit={this.onSubmit} className="column is-5-desktop is-7-tablet">
						<Input
							name="username"
							label="Имя пользователя"
							value={username}
							onChange={this.onInputChange('username')}
						/>
						<Input
							type="password"
							name="password"
							label="Пароль"
							value={password}
							onChange={this.onInputChange('password')}
						/>
						<button className="button is-primary is-outlined">
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