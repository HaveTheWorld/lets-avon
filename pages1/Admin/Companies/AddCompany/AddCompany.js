import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql, compose } from 'react-apollo'
import { CompaniesQuery, AddCompanyMutation } from '@/apollo/gql/companies.gql'
import { Router } from '@/routes'
import { sleep, handleMutationError } from '@/libs/helpers'
import { Section, FormWrapper } from '@/components/Elements'
import AddCompanyForm from './AddCompanyForm'

const AddCompany = ({ mutate, addToast }) => {

	const onSubmit = async input => {
		try {
			await mutate({
				variables: { input },
				update: (store, { data: { company } }) => {
					try {
						var { companies } = store.readQuery({ query: CompaniesQuery })
					} catch (error) {
						return
					}
					store.writeQuery({
						query: CompaniesQuery,
						data: { companies: [...companies, company] }
					})
				}
			})
			Router.pushRoute('/admin/companies')
			await sleep(10)
			addToast(`Кампания успешно создана.`, 'success')
		} catch (error) {
			handleMutationError(error, message => addToast(message, 'danger'))
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