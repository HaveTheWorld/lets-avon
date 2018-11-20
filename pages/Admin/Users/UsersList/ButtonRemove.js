import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql } from 'react-apollo'
import { UsersQuery, RemoveUserMutation } from '@/apollo/gql/users.gql'
import { handleMutationError } from '@/libs/helpers'
import { Icon } from '@/components/Elements'

@graphql(RemoveUserMutation)
@connect(null, { addToast })
class ButtonRemove extends React.Component {
	state = {
		isLoading: false
	}

	onClick = async () => {
		const { id, mutate, addToast } = this.props
		
		this.setState({ isLoading: true })
		try {
			await mutate({
				variables: { id },
				update: store => {
					const { users } = store.readQuery({ query: UsersQuery })
					store.writeQuery({
						query: UsersQuery,
						data: { users: users.filter(user => user.id !== id) }
					})
				}
			})
		} catch (error) {
			this.setState({ isLoading: false })
			handleMutationError(error, message => addToast(message, 'danger'))
		}
	}

	render() {
		const { isLoading } = this.state

		return (
			<button
				className={cls('button', 'is-danger', 'is-outlined', 'is-small', { 'is-loading': isLoading })}
				onClick={this.onClick}
			>
				<Icon icon={['fas', 'trash']} />
			</button>
		)
	}
}

ButtonRemove.propTypes = {
	
}

export default ButtonRemove