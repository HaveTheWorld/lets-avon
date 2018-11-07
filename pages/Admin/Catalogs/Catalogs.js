import React from 'react'
import PropTypes from 'prop-types'
import Section from '@/components/Elements/Section'
import Input from '@/components/Elements/Input'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
const UPLOAD_CATALOG = gql`
	mutation UPLOAD_CATALOG($fields: CatalogInput, $files: [Upload!]!) {
		uploadCatalog(fields: $fields, files: $files)
	}
`

@graphql(UPLOAD_CATALOG)
class AdminCatalogs extends React.Component {
	state = {
		fields: {
			catalog: '',
			title: '',
			company: ''
		},
		files: []
	}

	onInputChange = name => value => {
		this.setState({
			fields: {
				...this.state.fields,
				[name]: value
			}
		})
	}

	onFileChange = e => {
		const { files } = e.target
		this.setState({ files })
	}

	onSubmit = async e => {
		e.preventDefault()
		const { fields, files } = this.state
		const { mutate } = this.props
		try {
			await mutate({
				variables: { fields, files }
			})
			alert('OK')
		} catch (error) {
			// Handle error
			alert(error.message)
		}
		
	}

	render() {
		const { catalog, title, company } = this.state.fields
		return (
			<Section title="Админ / Каталоги">
				<form onSubmit={this.onSubmit}>
					<Input
						name="catalog"
						label="Каталог"
						value={catalog}
						onChange={this.onInputChange('catalog')}
					/>
					<Input
						name="title"
						label="Заголовок"
						value={title}
						onChange={this.onInputChange('title')}
					/>
					<Input
						name="company"
						label="Кампания"
						value={company}
						onChange={this.onInputChange('company')}
					/>
					<div className="field">
						<div className="control">
							<input
								type="file"
								multiple
								onChange={this.onFileChange}
							/>
						</div>
					</div>
					<button className="button">Submit</button>
				</form>
			</Section>
		)
	}
}

AdminCatalogs.propTypes = {
	
}

export default AdminCatalogs