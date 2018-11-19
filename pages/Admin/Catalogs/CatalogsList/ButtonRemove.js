import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Icon from '@/components/Elements/Icon'
import { graphql } from 'react-apollo'
import { CatalogsQuery, RemoveCatalogMutation } from '@/apollo/gql/catalogs.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'

@connect(null, { addToast })
@graphql(RemoveCatalogMutation)
class ButtonRemove extends React.Component {
	state = {
		isLoading: false
	}

	onDelete = async () => {
		const { catalogId, companyId, mutate, addToast } = this.props

		this.setState({ isLoading: true })

		try {
			await mutate({
				variables: { catalogId, companyId },
				update: store => {
					const { catalogs } = store.readQuery({ query: CatalogsQuery })
					store.writeQuery({
						query: CatalogsQuery,
						data: { catalogs: catalogs.filter(catalog => catalog.id !== catalogId) }
					})
				}
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