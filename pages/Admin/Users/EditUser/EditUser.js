import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { CurrentUserQuery } from '@/apollo/gql/auth.gql'
import { UsersQuery, UserQuery, EditUserMutation } from '@/apollo/gql/users.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { Router } from '@/routes'
import { sleep, handleMutationError, getNestedValue } from '@/libs/helpers'
import { Section, Loader } from '@/components/Elements'
import Error from '@/components/Service/Error'
import EditUserForm from './EditUserForm'

const EditUser = ({ addToast, mutate, data: { loading, user }, auth: { currentUser } }) => {	

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
	if (user.isRootAdmin && !getNestedValue(currentUser, 'isRootAdmin')) {
		return <Error statusCode={401} />
	}

	return (
		<Section title="Админ / Редактирование пользователя" leftAlign>
			<EditUserForm onSubmit={onSubmit} user={user} />
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
	graphql(CurrentUserQuery, { name: 'auth' }),
	graphql(UserQuery, { options: getOptions }),
	graphql(EditUserMutation)
)(EditUser)