import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { CurrentUserQuery } from '@/apollo/gql/auth.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
// import { Router } from '@/libs/routes'
// import { sleep } from '@/libs/helpers'
import { Section, FormWrapper } from '@/components/Elements'
import LoginForm from './LoginForm'

const LoginPage = ({ addToast, data: { refetch } }) => {

	const onSubmit = async variables => {
		try {
			const response = await fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(variables)
			})
			const { token, expires, error } = await response.json()

			if (error) { return addToast(error.message, 'danger') }
			
			document.cookie = `token=${token}; path=/; expires=${new Date(expires)}`
			const { data: { currentUser } }  = await refetch()
			console.log(currentUser)
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
	graphql(CurrentUserQuery)
)(LoginPage)