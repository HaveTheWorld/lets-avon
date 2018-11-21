import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@/routes'
import css from './CatalogsList.sass'

const CatalogFace = ({ name, title, count, images, company }) => {
	return (
		<div className="column is-10-mobile is-offset-1-mobile is-4-tablet is-3-desktop">
			<h3 className="subtitle">{title}</h3>
			<Link route={`/catalogs/${company.number}-${company.year}/${name}/${count}-1`}>
				<a className={css.face}>
					<img
						src={`/static/${images[0] && images[0].catalogFacePath}`}
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