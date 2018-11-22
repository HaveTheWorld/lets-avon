import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql } from 'react-apollo'
import { CompaniesQuery, RemoveCompanyMutation } from '@/apollo/gql/companies.gql'
import { handleMutationError } from '@/libs/helpers'
import { Icon, Confirm } from '@/components/Elements'

@connect(null, { addToast })
@graphql(RemoveCompanyMutation)
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
					const { companies } = store.readQuery({ query: CompaniesQuery })
					store.writeQuery({
						query: CompaniesQuery,
						data: { companies: companies.filter(company => company.id !== id) }
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
			<Confirm title="Удалить кампанию?" noWrap onConfirm={this.onDelete}>
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