import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import css from './CatalogView.sass'

const Carousel = ({ title, images, index1, index2, double }) => {
	return (
		<Fragment>
			<img
				className={cls(css.image, { [css.imageDouble]: double })}
				src={`/static/${images[index1].path}`}
				alt={`Каталог ${title}. Страница ${images[index1].catalogIndex}.`}
			/>
			{
				double &&
				<img
					className={cls(css.image, css.imageDouble)}
					src={`/static/${images[index2].path}`}
					alt={`Каталог ${title}. Страница ${images[index2].catalogIndex}.`}
				/>
			}
		</Fragment>
	)
}

Carousel.propTypes = {
	
}

export default Carousel