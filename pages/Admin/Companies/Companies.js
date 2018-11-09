import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { GET_ALL_COMPANIES } from '@/apollo/gql/companies.gql'
import { formatDate } from '@/libs/helpers'
import Section from '@/components/Elements/Section'
import ButtonAdd from './ButtonAdd'
import ButtonRemove from './ButtonRemove'

const AdminCompanies = ({ data }) => {
	const { loading, getAllCompanies } = data

	if (loading) return null

	return (
		<Section title="Админ / Кампании">
			<table className="table is-bordered">
				<thead>
					<tr>
						<th>Капмания</th>
						<th>Дата начала</th>
						<th>Дата завершения</th>
						<th>Удалить</th>
					</tr>
				</thead>
				<tbody>
					{getAllCompanies.map(({ id, name, startDate, finishDate }) => {
						return (
							<tr key={id}>
								<td>{name}</td>
								<td>{formatDate(startDate)}</td>
								<td>{formatDate(finishDate)}</td>
								<td>
									<ButtonRemove id={id} />
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<ButtonAdd />
		</Section>
	)
}

AdminCompanies.propTypes = {
	
}

export default graphql(GET_ALL_COMPANIES)(AdminCompanies)