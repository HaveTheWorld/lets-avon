import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { CompaniesQuery } from '@/apollo/gql/companies.gql'
import { Link } from '@/routes'
import { Section, Loader, Icon } from '@/components/Elements'
import CompanyItem from './CompanyItem'

const CompaniesList = ({ data: { loading, companies } }) => {
	return loading ? <Loader /> : (
		<Section title="Админ / Кампании">
			<table className="table">
				<thead>
					<tr>
						<th>Номер</th>
						<th>Год</th>
						<th>Дата начала</th>
						<th>Дата завершения</th>
						<th>Удалить</th>
					</tr>
				</thead>
				<tbody>
					{companies.map(company => (
						<CompanyItem key={company.id} {...company} />
					))}
				</tbody>
			</table>
			<Link route="/admin/companies/add" prefetch>
				<button className="button is-primary is-outlined">
					<Icon icon={['fas', 'plus']} />
					<span>Добавить</span>
				</button>
			</Link>
		</Section>
	)
}

CompaniesList.propTypes = {
	
}

export default graphql(CompaniesQuery)(CompaniesList)