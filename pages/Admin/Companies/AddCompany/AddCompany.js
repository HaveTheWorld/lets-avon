import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql, compose } from 'react-apollo'
import { GET_ALL_COMPANIES, ADD_COMPANY } from '@/apollo/gql/companies.gql'
import { Router } from '@/libs/routes'
import { Section, FormWrapper } from '@/components/Elements'
import AddCompanyForm from './AddCompanyForm'

import moment from 'moment'
const AddCompany = ({ mutate, addToast }) => {

	const onSubmit = async variables => {
		try {
			await mutate({
				variables,
				update: (store, { data: { addCompany } }) => {
					const { getAllCompanies } = store.readQuery({ query: GET_ALL_COMPANIES })
					store.writeQuery({
						query: GET_ALL_COMPANIES,
						data: { getAllCompanies: [...getAllCompanies, addCompany] }
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
	graphql(ADD_COMPANY)
)(AddCompany)