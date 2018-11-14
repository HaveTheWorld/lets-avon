import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import { GET_CURRENT_CATALOGS } from '@/apollo/gql/catalogs.gql'
import { Section, Loader } from '@/components/Elements'
import CompanyInfo from './CompanyInfo'
import CatalogFace from './CatalogFace'

@graphql(GET_CURRENT_CATALOGS)
class Catalogs extends React.Component {
	componentDidMount() {
		this.props.data.refetch()
	}

	render() {
		const { loading, getAllCatalogs } = this.props.data
		const company = !loading && getAllCatalogs.length && getAllCatalogs[0].company

		return (
			<Section title="Текущие каталоги">
				{loading ? <Loader /> : (
					<Fragment>
						<CompanyInfo company={company} />
						<div className="columns is-multiline">
							{getAllCatalogs.map((catalog) => (
								<CatalogFace key={catalog.id} {...catalog} />
							))}
						</div>
					</Fragment>
				)}			
			</Section>
		)
	}
}

export default Catalogs