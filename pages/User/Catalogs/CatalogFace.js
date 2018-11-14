import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@/libs/routes'
import css from './CatalogFace.sass'

const CatalogFace = ({ name, title, company, images }) => {
	return (
		<div className="column is-10-mobile is-offset-1-mobile is-4-tablet is-3-desktop">
			<h3 className="subtitle">{title}</h3>
			<Link route={`/catalogs/${company.number}-${company.year}/${name}`}>
				<a className={css.face}>
					<img
						src={`http://localhost:3001/${images[0] && images[0].catalogFacePath}`}
						alt={`Обложка каталога ${title}`}
					/>
				</a>
			</Link>
		</div>
	)
}

CatalogFace.propTypes = {
	
}

export default CatalogFace