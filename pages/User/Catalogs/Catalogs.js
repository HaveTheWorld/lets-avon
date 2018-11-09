import React, { Fragment } from 'react'
import Section from '@/components/Elements/Section'
import { formatDate } from '@/libs/helpers'
import { graphql } from 'react-apollo'
import { GET_CURRENT_CATALOGS } from '@/apollo/gql/catalogs.gql'
import { Link } from '@/libs/routes'
import Loader from '@/components/Elements/Loader'
import css from './Catalogs.sass'

const Catalogs = ({ data }) => {
	const { loading, getAllCatalogs } = data
	
	const renderCompanyInfo = () => {
		if (loading) { return null }

		const { name, startDate, finishDate } = getAllCatalogs[0].company
		const [num, year] = name.split('-')

		return (
			<div className={css.info}>
				Кампания&nbsp;
				<span className="has-text-weight-semibold">№{num}</span>
				. Действует с&nbsp;
				<span className="has-text-weight-semibold">{formatDate(startDate)}</span>
				&nbsp;по&nbsp; 
				<span className="has-text-weight-semibold">{formatDate(finishDate)}</span>
				.
			</div>
		)
	}

	const renderCatalogs = () => {
		if (loading) { return null }
		
		return getAllCatalogs.map(({ id, name, title, company, face }) => (
			<div key={id} className="column is-10-mobile is-offset-1-mobile is-4-tablet is-3-desktop">
				<h3 className="subtitle">{title}</h3>
				<Link route={`/catalogs/${company.name}/${name}`}>
					<a className={css.face}>
						<img src={`http://localhost:3001/${face.path}`} alt={`Обложка каталога ${title}`} />
					</a>
				</Link>
			</div>
		))
	}

	return (
		<Section title="Текущие каталоги">
			{loading && <Loader />}
			{renderCompanyInfo()}
			<div className="columns is-multiline">
				{renderCatalogs()}
			</div>
		</Section>
	)
}

export default graphql(GET_CURRENT_CATALOGS)(Catalogs)