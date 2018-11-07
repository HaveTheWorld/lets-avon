import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Icon from '@/components/Elements/Icon'
import { graphql } from 'react-apollo'
import { GET_COMPANIES_LIST, REMOVE_COMPANY } from '@/apollo/gql/companies.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'

@connect(null, { addToast })
@graphql(REMOVE_COMPANY)
class RemoveButton extends React.Component {
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
					const data = store.readQuery({ query: GET_COMPANIES_LIST })
					const companiesList = data.companiesList.filter(company => company.id !== id)
					store.writeQuery({ query: GET_COMPANIES_LIST, data: { ...data, companiesList } })
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

RemoveButton.propTypes = {
	
}

export default RemoveButton