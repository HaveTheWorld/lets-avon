import React from 'react'
import PropTypes from 'prop-types'
import Section from '@/components/elements/Section'
import Input from '@/components/elements/Input'
import Icon from '@/components/elements/Icon'

class Login extends React.Component {
	state = {
		username: '',
		password: ''
	}

	onSubmit = e => {
		e.preventDefault()
	}

	onInputChange = name => e => {
		this.setState({ [name]: e.target.value })
	}

	render() {
		const { username, password } = this.state

		return (
			<Section title="Авторизация">
				<div className="columns">
					<form onSubmit={this.onSubmit} className="column is-6-desktop is-7-tablet">
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
							<Icon icon={['fas', 'unlock']} />
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