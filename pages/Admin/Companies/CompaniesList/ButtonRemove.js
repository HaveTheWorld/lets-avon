import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql } from 'react-apollo'
import { CompaniesQuery, RemoveCompanyMutation } from '@/apollo/gql/companies.gql'
import Icon from '@/components/Elements/Icon'

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
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
		}
	}

	render() {
		const { isLoading } = this.state

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