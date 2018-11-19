import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { CurrentUserQuery, LoginUserMutation } from '@/apollo/gql/auth.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { Router } from '@/libs/routes'
import { sleep } from '@/libs/helpers'
import { Section, FormWrapper } from '@/components/Elements'
import LoginForm from './LoginForm'
import { setCookie, deleteCookie } from '@/libs/helpers'

const LoginPage = ({ addToast, mutate }) => {

	const onSubmit = async variables => {
		deleteCookie('token')
		try {
			await mutate({
				variables,
				update: (store, { data: { loginUser } }) => {
					setCookie('token', loginUser.token, { expires: loginUser.expires })
					store.writeQuery({
						query: CurrentUserQuery,
						data: { currentUser: loginUser.user }
					})					
				}
			})
			Router.pushRoute('/admin')
			await sleep(10)
			addToast(`Вход выполнен успешно.\nПривет, ${variables.username}!`, 'success')
		} catch (error) {
			addToast(error.message, 'danger')
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
	graphql(LoginUserMutation)
)(LoginPage)