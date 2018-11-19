import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { reduxForm, Field } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { CompaniesQuery } from '@/apollo/gql/companies.gql'
import { Input, InputFile, Select, Icon } from '@/components/Elements'
import { required, latinNoSpace, alpanumeric } from '@/libs/validate'
import { toLower, toCapitalFirst } from '@/libs/normalize'

const addNameToCompany = company => ({ ...company, name: `${company.number} - ${company.year}` })

const AddCatalogForm = ({ data, handleSubmit, submitting, invalid }) => {
	return (
		<form onSubmit={handleSubmit} autoComplete="off">
			<Field
				name="name"
				component={Input}
				label="Каталог (роут)"
				icon={['fas', 'project-diagram']}
				autoFocus
				validate={[required, latinNoSpace]}
				normalize={toLower}
			/>
			<Field
				name="title"
				component={Input}
				label="Заголовок"
				icon={['fas', 'pen']}
				validate={[required, alpanumeric]}
				normalize={toCapitalFirst}
			/>
			<Field
				name="companyId"
				component={Select}
				label="Кампания"
				icon={['fas', 'calendar-alt']}
				options={data.loading ? [] : data.companies.map(addNameToCompany)}
				validate={required}
			/>
			<Field
				name="files"
				component={InputFile}
				multiple
				validate={required}
			/>
			<button
				className={cls('button', 'is-primary', 'is-outlined', { 'is-loading': submitting })}
				disabled={submitting || invalid}
			>
				<Icon icon={['fas', 'paper-plane']} />
				<span>Создать каталог</span>
			</button>
		</form>
	)
}

AddCatalogForm.propTypes = {
	
}

export default compose(
	reduxForm({ form: 'add-catalog' }),
	graphql(CompaniesQuery)
)(AddCatalogForm)