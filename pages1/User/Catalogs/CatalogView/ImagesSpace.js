import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Relation } from '@/components/Elements'
import css from './CatalogView.sass'

class ImagesSpace extends React.Component {
	render() {
		const { title, images, index1, index2, double } = this.props
		
		return (
			<div className={cls('animated', 'fadeIn', css.transition)}>
				<Relation id="catalog-view" relationCls={css.relation} ratioCls={css.ratio}>
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
				</Relation>
			</div>
		)
	}
}

ImagesSpace.propTypes = {
	
}

export default ImagesSpace