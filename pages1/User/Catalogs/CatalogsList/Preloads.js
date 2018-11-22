import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import css from './CatalogsList.sass'

const Preloads = ({ preload, catalogs }) => {
	if (!preload || !catalogs) { return null }

	return catalogs.map(({ id, company, name, count, images: [image] }) => {
		const path = image.catalogFacePath.split('/').slice(0, -1).join('/')
		const mime = image.catalogFacePath.match(/\.(\w+)$/)[1]
		return (
			<Fragment key={id}>
				<img
					className={css.preloaded}
					src={`/static/${path}/1.${mime}`}
					alt={`Preload ${path}/1`}
				/>
				<img
					className={css.preloaded}
					src={`/static/${path}/${count}.${mime}`}
					alt={`Preload ${path}/${count}`}
				/>
			</Fragment>
		)
	})
}

Preloads.propTypes = {
	
}

export default Preloads