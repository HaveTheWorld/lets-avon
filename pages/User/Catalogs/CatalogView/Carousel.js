import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Portal } from '@/components/Elements'
import css from './Carousel.sass'

class Carousel extends React.Component {
	state = {
		zoomImage: null
	}

	toggleZoom = bool => e => {
		this.props.toggleZoom(bool)
		this.setState({ zoomImage: bool ? e.target.src : null }, () => {
			this.state.zoomImage && window.scrollTo(0, 0)
		})
	}

	render() {
		const { zoomImage } = this.state
		const { title, images, index1, index2, double } = this.props

		return (
			<Fragment>
				<img
					className={cls(css.image, { [css.imageDouble]: double })}
					src={`/static/${images[index1].path}`}
					alt={`Каталог ${title}. Страница ${images[index1].catalogIndex}.`}
					onClick={this.toggleZoom(true)}
				/>
				{
					double &&
					<img
						className={cls(css.image, css.imageDouble)}
						src={`/static/${images[index2].path}`}
						alt={`Каталог ${title}. Страница ${images[index2].catalogIndex}.`}
						onClick={this.toggleZoom(true)}
					/>
				}
				<Portal>
					<div
						className={cls(css.zoom, { [css.isActive]: zoomImage }, 'animated', 'fadeIn')}
						onClick={this.toggleZoom()}
					>
						<img
							src={zoomImage}
							alt=""
							className={css.zoomImage}
						/>
					</div>
				</Portal>
			</Fragment>
		)
	}
}

Carousel.propTypes = {
	
}

export default Carousel