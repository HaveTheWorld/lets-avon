import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { CatalogsQuery } from '@/apollo/gql/catalogs.gql'
import { Link } from '@/routes'
import { Section, Loader, Icon } from '@/components/Elements'
import CatalogItem from './CatalogItem'

const CatalogsList = ({ data: { loading, catalogs } }) => {
	return loading ? <Loader /> : (
		<Section title="Админ / Каталоги">
			<table className="table">
				<thead>
					<tr>
						<th>Обложка</th>
						<th>Роут</th>
						<th>Заголовок</th>
						<th>Кампания</th>
						<th>Число страниц</th>
						<th>Удалить</th>
					</tr>
				</thead>
				<tbody>
					{catalogs.map(catalog => (
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
		</Section>
	)
}

CatalogsList.propTypes = {
	
}

export default graphql(CatalogsQuery)(CatalogsList)