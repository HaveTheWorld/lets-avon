import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { UsersQuery, UserQuery, EditUserMutation } from '@/apollo/gql/users.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { Router } from '@/routes'
import { sleep, handleMutationError } from '@/libs/helpers'
import { Section, FormWrapper, Loader } from '@/components/Elements'
import Error from '@/components/Service/Error'
import EditUserForm from './EditUserForm'

const EditUser = ({ addToast, mutate, data: { loading, user } }) => {

	const onSubmit = async variables => {
		try {
			await mutate({
				variables: { ...variables, id: user.id },
				update: (store, { data: { user } }) => {
					try {
						var { users } = store.readQuery({ query: UsersQuery })
					} catch (error) {
						// Handle error
					}
					users && store.writeQuery({
						query: UsersQuery,
						data: { users: users.map(oldUser => oldUser.id === user.id ? user : oldUser) }
					})
					store.writeQuery({
						query: UserQuery,
						variables: { id: user.id },
						data: { user }
					})
				}
			})

			Router.pushRoute('/admin/users')
			await sleep(10)
			addToast('Пользователь изменён успешно.', 'success')
		} catch (error) {
			handleMutationError(error, message => addToast(message, 'danger'))
		}
	}
	
	if (loading) { return <Loader /> }
	if (!user) { return <Error statusCode={404} /> }

	return (
		<Section title="Админ / Редактирование пользователя">
			<FormWrapper>
				<EditUserForm onSubmit={onSubmit} user={user} />
			</FormWrapper>
		</Section>
	)
}

EditUser.propTypes = {
	
}

const getOptions = ({ router }) => ({
	variables: { username: router.query.username },
	fetchPolicy: 'cache-and-network'
})

export default compose(
	withRouter,
	connect(null, { addToast }),
	graphql(UserQuery, { options: getOptions }),
	graphql(EditUserMutation)
)(EditUser)