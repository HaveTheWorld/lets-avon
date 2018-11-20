import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import { CurrentCompanyQuery } from '@/apollo/gql/companies.gql'
import { Section, Loader } from '@/components/Elements'
import CompanyInfo from './CompanyInfo'
import CatalogFace from './CatalogFace'
import Preloads from './Preloads'
import css from './CatalogsList.sass'

@graphql(CurrentCompanyQuery)
class CatalogsList extends React.Component {
	state = {
		isMounted: false
	}

	componentDidMount() {
		this.setState({ isMounted: true })
		// this.props.data.refetch()
	}

	render() {
		const { loading, company } = this.props.data

		return (
			<Section title="Текущие каталоги" addClass={css.section}>
				{loading ? <Loader /> : (
					<Fragment>
						<CompanyInfo company={company} />
						{
							company &&
							<Fragment>
								<div className="columns is-multiline">
									{company.catalogs.map(catalog => (
										<CatalogFace key={catalog.id} {...catalog} company={company} />
									))}
								</div>
								<Preloads preload={this.state.isMounted} catalogs={company.catalogs} />
							</Fragment>
						}
					</Fragment>
				)}			
			</Section>
		)
	}
}

export default CatalogsList