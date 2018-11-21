import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql } from 'react-apollo'
import { CatalogsQuery, RemoveCatalogMutation } from '@/apollo/gql/catalogs.gql'
import { handleMutationError } from '@/libs/helpers'
import { Icon, Confirm } from '@/components/Elements'

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
			handleMutationError(error, message => addToast(message, 'danger'))
		}
	}

	render() {
		const { isLoading } = this.state

		return (
			<Confirm title="Удалить каталог?" noWrap onConfirm={this.onDelete}>
				{toggle => (
					<button
						className={cls('button', 'is-danger', 'is-outlined', 'is-small', { 'is-loading': isLoading })}
						onClick={toggle}
					>
						<Icon icon={['fas', 'trash']} />
					</button>
				)}
			</Confirm>
		)
	}
}

ButtonRemove.propTypes = {
	
}

export default ButtonRemove