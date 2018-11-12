import React from 'react'
import PropTypes from 'prop-types'
import ButtonRemove from './ButtonRemove'
import css from './CatalogItem.sass'

const CatalogItem = ({ id, name, title, company, images }) => {
	return (
		<tr>
			<td>
				<img
					className={css.face}
					src={`/static/${images[0].catalogThumbPath}`}
					alt={`Превью ${name} ${company.number}-${company.year}`}
				/>
			</td>
			<td>{name}</td>
			<td>{title}</td>
			<td>{company.number} - {company.year}</td>
			<td><ButtonRemove catalogId={id} companyId={company.id} /></td>
		</tr>
	)
}

CatalogItem.propTypes = {
	
}

export default CatalogItem