import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { GET_ALL_CATALOGS } from '@/apollo/gql/catalogs.gql'
import Section from '@/components/Elements/Section'
import Loader from '@/components/Elements/Loader'
import ButtonAdd from './ButtonAdd'
import ButtonRemove from './ButtonRemove'
import css from './Catalogs.sass'

const AdminCatalogs = ({ data }) => {
	const { loading, getAllCatalogs } = data

	const renderTable = () => {
		if (loading) { return null }

		return (
			<Fragment>
				<table className="table">
					<thead>
						<tr>
							<th>Обложка</th>
							<th>Название</th>
							<th>Кампания</th>
							<th>Удалить</th>
						</tr>
					</thead>
					<tbody>
						{renderCatalogs()}
					</tbody>
				</table>
				<ButtonAdd />
			</Fragment>
		)
	}

	const renderCatalogs = () => {
		if (loading) { return null }

		return getAllCatalogs.map(({ id, name, title, company, face }) => (
			<tr key={id}>
				<td>
					<img
						className={css.face}
						src={`http://localhost:3001/${face.path}`}
						alt={`${name}-${company.name}-face`}
					/>
				</td>
				<td>{title}</td>
				<td>{company.name}</td>
				<td><ButtonRemove id={id} /></td>
			</tr>
		))
	}

	return (
		<Section title="Админ / Каталоги">
			{loading && <Loader />}
			{renderTable()}
		</Section>
	)
}

AdminCatalogs.propTypes = {
	
}

export default graphql(GET_ALL_CATALOGS)(AdminCatalogs)