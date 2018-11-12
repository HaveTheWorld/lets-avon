import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql, compose } from 'react-apollo'
import { GET_ALL_COMPANIES } from '@/apollo/gql/companies.gql'
import { UPLOAD_CATALOG_IMAGE } from '@/apollo/gql/images.gql'
import { GET_ALL_CATALOGS, ADD_CATALOG } from '@/apollo/gql/catalogs.gql'
import nprogress from 'nprogress'
import { Router } from '@/libs/routes'
import { sleep } from '@/libs/helpers'
import { Section, FormWrapper } from '@/components/Elements'
import AddCatalogForm from './AddCatalogForm'

nprogress.configure({
	showSpinner: false,
	trickle: false
})

const AdminCatalogs = ({ uploadCatalogImage, addCatalog, addToast, data: { getAllCompanies } }) => {

	const onSubmit = async ({ name, title, companyId, files }) => {
		nprogress.set(0)

		const company = getAllCompanies.find(({ id }) => id === companyId)
		const images = []
		let faceImage = null
		let done = 0
		
		try {
			for (let i = 0; i < files.length; i++) {
				const result = await uploadCatalogImage({
					variables: {
						catalogName: name,
						companyId,
						companyName: `${company.number}-${company.year}`,
						file: files[i],
						index: i
					}
				})

				if (i < files.length - 1) { nprogress.set(++done / files.length) }
				if (!i) { faceImage = result.data.uploadCatalogImage }
				images.push(result.data.uploadCatalogImage.id)

				if (i === files.length - 1) {
					await addCatalog({
						variables: { name, title, companyId, images },
						update: (store, { data: { addCatalog } }) => {
							const { getAllCatalogs } = store.readQuery({ query: GET_ALL_CATALOGS })
							store.writeQuery({
								query: GET_ALL_CATALOGS,
								data: { getAllCatalogs: [...getAllCatalogs, addCatalog] }
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
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
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
	graphql(GET_ALL_COMPANIES),
	graphql(UPLOAD_CATALOG_IMAGE, { name: 'uploadCatalogImage' }),
	graphql(ADD_CATALOG, { name: 'addCatalog' })
)(AdminCatalogs)