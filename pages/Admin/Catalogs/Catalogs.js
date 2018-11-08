import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { graphql } from 'react-apollo'
import { GET_COMPANIES_LIST } from '@/apollo/gql/companies.gql'
import { UPLOAD_CATALOG } from '@/apollo/gql/catalogs.gql'
import Section from '@/components/Elements/Section'
import Input from '@/components/Elements/Input'
import InputFile from '@/components/Elements/InputFile'
import Select from '@/components/Elements/Select'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'

const initialState = {
	fields: {
		catalog: { value: '', isValid: false },
		title: { value: '', isValid: false },
		company: { value: '', isValid: false }
	},
	files: [],
	isLoading: false,
	isFormValid: false
}

@connect(null, { addToast })
@graphql(GET_COMPANIES_LIST)
@graphql(UPLOAD_CATALOG)
class AdminCatalogs extends React.Component {
	state = initialState

	checkFormValid(fields, files) {
		return Object.values(fields).every(({ isValid }) => isValid) && files.length
	}

	onInputChange = name => (value, isValid) => {
		const { fields, files } = this.state

		const newFields = {
			...fields,
			[name]: { value, isValid }
		}
		const newState = { fields: newFields }

		if (newFields[name].isValid !== fields[name].isValid) {
			newState.isFormValid = this.checkFormValid(newFields, files)
		}
		this.setState(newState)
	}

	onFileChange = e => {
		const { files, fields } = this.state
		const { files: newFiles } = e.target
		
		const newState = { files: newFiles }

		if (files.length !== newFiles.length) {
			newState.isFormValid = this.checkFormValid(fields, newFiles)
		}

		this.setState(newState)
	}

	onSubmit = async e => {
		e.preventDefault()
		const { isFormValid, fields, files, isLoading } = this.state
		const { mutate, addToast, data } = this.props

		if (!isFormValid || isLoading) { return }

		const company = data.companiesList.find(({ id }) => id === fields.company.value)
		const companyInput = Object.entries(company).reduce((acc, [key, value]) => {
			if (['id', 'name'].includes(key)) {
				acc[key] = value
			}
			return acc
		}, {})

		this.setState({ isLoading: true })
		try {
			await mutate({ variables: {
				catalog: fields.catalog.value,
				title: fields.title.value,
				company: companyInput,
				files
			} })
			addToast('Каталог успешно загружен', 'success')
		
			this.setState(initialState)
		} catch (error) {
			this.setState({ isLoading: false })
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
		}
		
	}

	render() {
		const { fields, files, isLoading, isFormValid } = this.state
		const { catalog, title, company } = fields
		const { companiesList, loading } = this.props.data

		return (
			<Section title="Админ / Каталоги">
				<div className="columns">
					<form onSubmit={this.onSubmit} className="column is-6-widescreen is-8-desktop is-9-tablet">
						<Input
							name="catalog"
							label="Каталог (роут)"
							icon={['fas', 'project-diagram']}
							value={catalog.value}
							onChange={this.onInputChange('catalog')}
							pattern={/^[a-z]+$/}
							errorText="Формат: только строчные латинские буквы без пробелов. Обязательное поле."
						/>
						<Input
							name="title"
							label="Заголовок"
							icon={['fas', 'pen']}
							value={title.value}
							onChange={this.onInputChange('title')}
							pattern={/^[A-Za-zА-Яа-я ]+$/}
							errorText="Формат: только русские буквы и пробелы. Обязательное поле."
						/>						
						<Select
							label="Кампания"
							icon={['fas', 'calendar-alt']}
							options={loading ? [] : companiesList}
							value={company.value}
							onChange={this.onInputChange('company')}
							isRequired
						/>
						<InputFile
							files={files}
							onChange={this.onFileChange}
							isRequired
						/>
						<button
							className={cls('button', 'is-primary', 'is-outlined', { 'is-loading': isLoading })}
							disabled={!isFormValid}
						>
							Submit
						</button>
					</form>
				</div>
			</Section>
		)
	}
}

AdminCatalogs.propTypes = {
	
}

export default AdminCatalogs