import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql, compose } from 'react-apollo'
import { CompaniesQuery, AddCompanyMutation } from '@/apollo/gql/companies.gql'
import { Router } from '@/libs/routes'
import { Section, FormWrapper } from '@/components/Elements'
import AddCompanyForm from './AddCompanyForm'

const AddCompany = ({ mutate, addToast }) => {

	const onSubmit = async input => {
		try {
			await mutate({
				variables: { input },
				update: (store, { data: { company } }) => {
					const { companies } = store.readQuery({ query: CompaniesQuery })
					store.writeQuery({
						query: CompaniesQuery,
						data: { companies: [...companies, company] }
					})
				}
			})
			Router.pushRoute('/admin/companies')
		} catch (error) {
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
		}
	}

	return (
		<Section title="Админ / Новая кампания">
			<FormWrapper>
				<AddCompanyForm onSubmit={onSubmit} />
			</FormWrapper>
		</Section>
	)
}

AddCompany.propTypes = {
	
}

export default compose(
	connect(null, { addToast }),
	graphql(AddCompanyMutation)
)(AddCompany)