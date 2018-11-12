import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { GET_ALL_CATALOGS } from '@/apollo/gql/catalogs.gql'
import { Link } from '@/libs/routes'
import { Section, Loader, Icon } from '@/components/Elements'
import CatalogItem from './CatalogItem'

const CatalogsList = ({ data: { loading, getAllCatalogs } }) => {
	return (
		<Section title="Админ / Каталоги">
			{loading ? <Loader /> : (
				<Fragment>
					<table className="table">
						<thead>
							<tr>
								<th>Обложка</th>
								<th>Роут</th>
								<th>Название</th>
								<th>Кампания</th>
								<th>Удалить</th>
							</tr>
						</thead>
						<tbody>
							{getAllCatalogs.map(catalog => (
								<CatalogItem key={catalog.id} {...catalog} />
							))}
						</tbody>
					</table>
					<Link route="/admin/catalogs/add" prefetch>
						<button className="button is-primary is-outlined">
							<Icon icon={['fas', 'plus']} />
							<span>Добавить</span>
						</button>
					</Link>
				</Fragment>
			)}
		</Section>
	)
}

CatalogsList.propTypes = {
	
}

export default graphql(GET_ALL_CATALOGS)(CatalogsList)