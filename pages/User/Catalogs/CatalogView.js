import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import Section from '@/components/Elements/Section'
import ImageGallery from 'react-image-gallery'
import css from './CatalogView.sass'

import { graphql, compose } from 'react-apollo'
import { GET_CATALOG } from '@/apollo/gql/catalogs.gql'
import Loader from '@/components/Elements/Loader'

const CatalogView = ({ router, data }) => {
	const { loading, getCatalog } = data

	if (loading) { return <Loader /> }
	
	const host = 'http://localhost:3001'
	const images = getCatalog.originals.map(orig => ({ original: `${host}/${orig.path}` }))

	const renderItem = (item) => {
		const isClient = typeof window !== 'undefined'
		const ratio = 1700 / 1120
		return (
			<div className='image-gallery-image'>
				<img
					src={item.original}
					alt={item.originalAlt}
					srcSet={item.srcSet}
					style={{ maxWidth: isClient ? `${window.outerHeight * ratio}px` : null }}
				/>
				{
					item.description &&
					<span className='image-gallery-description'>
					{item.description}
					</span>
				}
			</div>
		)
	}

	return (
		<Section title={`Каталог ${router.query.name}`}>
			<ImageGallery
				items={images}
				additionalClass={css.gallery}
				showIndex
				showThumbnails={false}
				lazyLoad
				renderItem={renderItem}
			/>
		</Section>
	)
}

CatalogView.propTypes = {
	
}

const getVariables = ({ router }) => {
	const { company, name } = router.query
	return {
		variables: { company, name }
	}
}

export default compose(
	withRouter,
	graphql(GET_CATALOG, { options: getVariables })
)(CatalogView)