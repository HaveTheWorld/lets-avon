import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Icon from '@/components/Elements/Icon'
import { graphql } from 'react-apollo'
import { GET_ALL_CATALOGS, GET_CURRENT_CATALOGS, REMOVE_CATALOG } from '@/apollo/gql/catalogs.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'

@connect(null, { addToast })
@graphql(REMOVE_CATALOG)
class ButtonRemove extends React.Component {
	state = {
		isLoading: false
	}

	onDelete = async () => {
		const { id, mutate, addToast } = this.props

		this.setState({ isLoading: true })

		try {
			await mutate({
				variables: { id },
				update: store => {
					const data = store.readQuery({ query: GET_ALL_CATALOGS })
					const getAllCatalogs = data.getAllCatalogs.filter(catalog => catalog.id !== id)
					store.writeQuery({ query: GET_ALL_CATALOGS, data: { ...data, getAllCatalogs } })
				},
				refetchQueries: [{ query: GET_CURRENT_CATALOGS }]
			})
		} catch (error) {
			this.setState({ isLoading: false })
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
		}
	}

	render() {
		const { isLoading } = this.state
		const { id } = this.props

		return (
			<button
				className={cls('button', 'is-danger', 'is-small', 'is-outlined', { 'is-loading': isLoading })}
				onClick={this.onDelete}
			>
				<Icon icon={['fas', 'trash']} />
			</button>
		)
	}
}

ButtonRemove.propTypes = {
	
}

export default ButtonRemove