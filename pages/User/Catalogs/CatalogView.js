import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import Section from '@/components/Elements/Section'
import ImageGallery from 'react-image-gallery'
import css from './CatalogView.sass'

const CatalogView = ({ router }) => {
	const imagesPath = `/static/images/catalogs/${router.query.name}`

	const images = [
		{ original: `${imagesPath}/1.jpg`, thumbnail: `${imagesPath}/1.jpg` },
		{ original: `${imagesPath}/2.jpg`, thumbnail: `${imagesPath}/2.jpg` },
		{ original: `${imagesPath}/3.jpg`, thumbnail: `${imagesPath}/3.jpg` },
		{ original: `${imagesPath}/4.jpg`, thumbnail: `${imagesPath}/4.jpg` },
		{ original: `${imagesPath}/5.jpg`, thumbnail: `${imagesPath}/5.jpg` },
		{ original: `${imagesPath}/6.jpg`, thumbnail: `${imagesPath}/6.jpg` },
		{ original: `${imagesPath}/7.jpg`, thumbnail: `${imagesPath}/7.jpg` },
		{ original: `${imagesPath}/8.jpg`, thumbnail: `${imagesPath}/8.jpg` },
	]

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
				lazyLoad
				renderItem={renderItem}
			/>
		</Section>
	)
}

CatalogView.propTypes = {
	
}

export default withRouter(CatalogView)