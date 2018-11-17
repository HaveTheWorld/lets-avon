import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import { GET_CURRENT_CATALOGS } from '@/apollo/gql/catalogs.gql'
import { Section, Loader } from '@/components/Elements'
import CompanyInfo from './CompanyInfo'
import CatalogFace from './CatalogFace'
import Preloads from './Preloads'

@graphql(GET_CURRENT_CATALOGS)
class CatalogsList extends React.Component {
	state = {
		isMounted: false
	}

	componentDidMount() {
		this.setState({ isMounted: true })
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
						<Preloads preload={this.state.isMounted} catalogs={getAllCatalogs} />
					</Fragment>
				)}			
			</Section>
		)
	}
}

export default CatalogsList