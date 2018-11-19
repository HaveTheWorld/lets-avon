import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@/libs/routes'
import ButtonRemove from './ButtonRemove'
import css from './CatalogItem.sass'

const CatalogItem = ({ id, name, title, company, count, images }) => {
	const companyName = `${company.number}-${company.year}`

	return (
		<tr>
			<td>
				<Link route={`/catalogs/${companyName}/${name}/${count}-1`} prefetch>
					<a>
						<img
							className={css.thumb}
							src={`/static/${images[0] && images[0].catalogThumbPath}`}
							alt={`Превью ${name} ${companyName}`}
						/>
					</a>
				</Link>
			</td>
			<td>{name}</td>
			<td>{title}</td>
			<td>{company.number} - {company.year}</td>
			<td>{count}</td>
			<td><ButtonRemove catalogId={id} companyId={company.id} /></td>
		</tr>
	)
}

CatalogItem.propTypes = {
	
}

export default CatalogItem