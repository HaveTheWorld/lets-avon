import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { UsersQuery, AddUserMutation } from '@/apollo/gql/users.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { Router } from '@/routes'
import { sleep, handleMutationError } from '@/libs/helpers'
import { Section, FormWrapper } from '@/components/Elements'
import AddUserForm from './AddUserForm'

const AddUser = ({ mutate, addToast/*, data: { users }*/ }) => {

	const onSubmit = async variables => {
		try {
			await mutate({
				variables,
				update: (store, { data: { user } }) => {
					try {
						var { users } = store.readQuery({ query: UsersQuery })
					} catch (error) {
						return
					}
					store.writeQuery({
						query: UsersQuery,
						data: { users: [...users, user] }
					})
				}				
			})

			Router.pushRoute('/admin/users')
			await sleep(10)
			addToast(`Пользователь успешно создан.`, 'success')
		} catch (error) {
			handleMutationError(error, message => addToast(message, 'danger'))
		}
	}

	return (
		<Section title="Админ / Новый пользователь">
			<FormWrapper>
				<AddUserForm onSubmit={onSubmit} />
			</FormWrapper>
		</Section>
	)
}

AddUser.propTypes = {
	
}

export default compose(
	// graphql(UsersQuery),
	graphql(AddUserMutation),
	connect(null, { addToast })
)(AddUser)