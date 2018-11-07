import React from 'react'
import PropTypes from 'prop-types'
import Section from '@/components/Elements/Section'
import Input from '@/components/Elements/Input'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
const UPLOAD_IMAGE = gql`
	mutation UPLOAD_IMAGE($file: Upload!) {
		uploadImage(file: $file)
	}
`

const AdminCatalogs = () => {
	return (
		<Section title="Админ / Каталоги">
			<Mutation mutation={UPLOAD_IMAGE}>
				{mutate => (
					<input
						type="file"
						onChange={async ({ target: { files: [file] } }) => {
							try {
								await mutate({ variables: { file } })
								alert('OK')
							} catch (error) {
								// Handle error
								alert(error.message)
							}
						}}
					/>
				)}
			</Mutation>
		</Section>
	)
}

AdminCatalogs.propTypes = {
	
}

export default AdminCatalogs