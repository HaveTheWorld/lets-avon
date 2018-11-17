import React from 'react'
import PropTypes from 'prop-types'
import css from './CatalogView.sass'

const Preloads = ({ preload, next, prev, double, url, images }) => {
	if (!preload) { return null }
	
	const indexes = double ? [...prev, ...next] : [prev, next]

	return indexes
		.filter((item, index, array) => {
			return array.indexOf(item) === index
		})
		.map(pageNum => (
		<img
			key={images[pageNum - 1].id}
			src={`/static/${images[pageNum - 1].path}`}
			alt={`Preload ${url}/${pageNum + 1}`}
			className={css.preloaded}
		/>
	))
}

Preloads.propTypes = {
	
}

export default Preloads