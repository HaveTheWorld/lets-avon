import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql } from 'react-apollo'
import { GET_ALL_COMPANIES } from '@/apollo/gql/companies.gql'
import { UPLOAD_CATALOG_IMAGE } from '@/apollo/gql/images.gql'
import { GET_ALL_CATALOGS, ADD_CATALOG } from '@/apollo/gql/catalogs.gql'
import { reduceObject } from '@/libs/helpers'
import Input from '@/components/Elements/Input'
import InputFile from '@/components/Elements/InputFile'
import Select from '@/components/Elements/Select'
import nprogress from 'nprogress'
import { sleep } from '@/libs/helpers'

nprogress.configure({
	showSpinner: false,
	trickle: false,
	parent: '#modal-head'
})

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
@graphql(GET_ALL_COMPANIES)
@graphql(UPLOAD_CATALOG_IMAGE, { name: 'uploadCatalogImage' })
@graphql(ADD_CATALOG, { name: 'addCatalog' })
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
		const { uploadCatalogImage, addCatalog, addToast, onClose, data } = this.props

		if (!isFormValid || isLoading) { return }

		this.setState({ isLoading: true })
		nprogress.set(0)

		const company = data.getAllCompanies.find(({ id }) => id === fields.company.value)
		const companyInput = reduceObject(['id', 'name'], company)
		const images = { face: null, originals: [], thumbnails: [] }
		let done = 0
		let facePath = ''
		
		try {
			for (let i = 0; i < files.length; i++) {
				const result = await uploadCatalogImage({
					variables: {
						catalog: fields.catalog.value,
						company: companyInput,
						file: files[i],
						withFace: !i
					}
				})

				if (i < files.length - 1) { nprogress.set(++done / files.length) }

				const { original, thumbnail, face } = result.data.uploadCatalogImage
				images.originals.push(original.id)
				images.thumbnails.push(thumbnail.id)
				if (face) {
					images.face = face.id
					facePath = face.path
				}

				if (i === files.length - 1) {
					await addCatalog({
						variables: {
							catalog: fields.catalog.value,
							title: fields.title.value,
							company: companyInput,
							images
						},
						update: (store, { data: { addCatalog } }) => {
							const data = store.readQuery({ query: GET_ALL_CATALOGS })
							const newCatalog = {
								...addCatalog,
								company: {
									name: companyInput.name,
									__typename: 'CompanyType'
								},
								face: {
									path: facePath,
									__typename: 'ImageType'
								}
							}
							const getAllCatalogs = [...data.getAllCatalogs, newCatalog]							
							store.writeQuery({ query: GET_ALL_CATALOGS, data: { ...data, getAllCatalogs } })
						}
					})

					nprogress.done()
					await sleep(500)
					addToast('Каталог успешно создан.', 'success')
					onClose()
				}
			}
		} catch (error) {
			this.setState({ isLoading: false })
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
			nprogress.done()
		}		
	}

	render() {
		const { fields, files, isLoading, isFormValid } = this.state
		const { catalog, title, company } = fields
		const { getAllCompanies, loading } = this.props.data

		return (
			<Fragment>
				<div className="modal-card-body">
					<form onSubmit={this.onSubmit}>
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
							options={loading ? [] : getAllCompanies}
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
							Добавить
						</button>
					</form>
				</div>
			</Fragment>
		)
	}
}

AdminCatalogs.propTypes = {
	
}

export default AdminCatalogs