import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import jwt from 'jsonwebtoken'
import { graphql, compose } from 'react-apollo'
import { SESSION } from '@/apollo/gql/session.gql'
import { LOGIN_USER } from '@/apollo/gql/auth.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { Router } from '@/libs/routes'
import { sleep } from '@/libs/helpers'
import { Section, FormWrapper } from '@/components/Elements'
import LoginForm from './LoginForm'

const LoginPage = ({ mutate, addToast }) => {

	const onSubmit = async variables => {
		try {
			await mutate({
				variables,
				update: (store, { data: { loginUser } }) => {
					const { exp, ...user } = jwt.decode(loginUser.token)
					document.cookie = `token=${loginUser.token}; path=/; expires=${new Date(exp * 1000)}`

					const { getCurrentUser } = store.readQuery({ query: SESSION })
					store.writeQuery({
						query: SESSION,
						data: { getCurrentUser: user }
					})
				}
			})

			addToast(`Вход выполнен успешно. Привет, ${variables.username}!`, 'success')
			await sleep(10)
			Router.pushRoute('/admin')
		} catch (error) {
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
		}
	}

	return (
		<Section title="Авторизация">
			<FormWrapper>
				<LoginForm onSubmit={onSubmit} />
			</FormWrapper>
		</Section>
	)
}

LoginPage.propTypes = {
	
}

export default compose(
	connect(null, { addToast }),
	graphql(LOGIN_USER)
)(LoginPage)