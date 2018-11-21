import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql, compose } from 'react-apollo'
import { CompaniesQuery } from '@/apollo/gql/companies.gql'
import { UploadCatalogImageMutation } from '@/apollo/gql/images.gql'
import { CatalogsQuery, AddCatalogMutation } from '@/apollo/gql/catalogs.gql'
import nprogress from 'nprogress'
import { Router } from '@/routes'
import { sleep, handleMutationError } from '@/libs/helpers'
import { Section, FormWrapper } from '@/components/Elements'
import AddCatalogForm from './AddCatalogForm'

nprogress.configure({
	showSpinner: false,
	trickle: false
})

const AdminCatalogs = ({ uploadCatalogImage, addCatalog, addToast, data: { companies } }) => {

	const onSubmit = async ({ name, title, companyId, files }) => {
		nprogress.set(0)

		const company = companies.find(({ id }) => id === companyId)
		let images = []
		let done = 0
		
		try {
			for (let i = 0; i < files.length; i++) {
				const { data } = await uploadCatalogImage({
					variables: {
						input: {
							catalogName: name,
							companyId,
							companyName: `${company.number}-${company.year}`,
							file: files[i],
							index: i,
							length: files.length
						}
					}
				})

				images = images.concat(data.image)
				
				if (i < files.length - 1) {
					nprogress.set(++done / files.length)
				} else {
					images.sort((a, b) => a.catalogIndex - b.catalogIndex)

					await addCatalog({
						variables: {
							input: { name, title, companyId, imagesIds: images.map(({ id }) => id) }
						},
						update: (store, { data: { catalog } }) => {
							try {
								var { catalogs } = store.readQuery({ query: CatalogsQuery })
							} catch (error) {
								return
							}
							store.writeQuery({
								query: CatalogsQuery,
								data: { catalogs: [...catalogs, catalog] }
							})
						}
					})

					nprogress.done()
					await sleep(500)
					Router.pushRoute('/admin/catalogs')
					await sleep(10)
					addToast('Каталог успешно создан.', 'success')
				}
			}
		} catch (error) {
			handleMutationError(error, message => addToast(message, 'danger'))
			nprogress.done()
		}		
	}

	return (
		<Section title="Админ / Новый каталог">
			<FormWrapper>
				<AddCatalogForm onSubmit={onSubmit} />
			</FormWrapper>
		</Section>
	)
}

AdminCatalogs.propTypes = {
	
}

export default compose(
	connect(null, { addToast }),
	graphql(CompaniesQuery),
	graphql(UploadCatalogImageMutation, { name: 'uploadCatalogImage' }),
	graphql(AddCatalogMutation, { name: 'addCatalog' })
)(AdminCatalogs)