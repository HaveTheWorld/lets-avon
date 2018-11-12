import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { GET_ALL_COMPANIES } from '@/apollo/gql/companies.gql'
import { Link } from '@/libs/routes'
import { Section, Loader, Icon } from '@/components/Elements'
import CompanyItem from './CompanyItem'

const CompaniesList = ({ data: { loading, getAllCompanies } }) => {
	return (
		<Section title="Админ / Кампании">
			{loading ? <Loader /> : (
				<Fragment>
					<table className="table is-bordered">
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
							{getAllCompanies.map(company => (
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
				</Fragment>
			)}
		</Section>
	)
}

CompaniesList.propTypes = {
	
}

export default graphql(GET_ALL_COMPANIES)(CompaniesList)