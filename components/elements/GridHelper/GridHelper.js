import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import css from './GridHelper.sass'

function getBreakpoint(width) {
	if (width <= 768) return 'mobile'
	if (width <= 1023) return 'tablet'
	if (width <= 1215) return 'desktop'
	if (width <= 1407) return 'widescreen'
	return 'full-hd'
}

class GridHelper extends React.Component {
	state = {
		width: 0
	}

	componentDidMount() {
		this.setState({ width: window.innerWidth })
		window.addEventListener('resize', this.onResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}

	onResize = () => {
		this.setState({ width: window.innerWidth })
	}

	render() {
		const { width } = this.state

		if (!width) { return null }

		const breakpoint = getBreakpoint(width)
		const colorCls = cls(css[breakpoint])

		return (
			<div className={cls(css.sizer, colorCls)}>
				<span className={css.breakpoint}>{breakpoint}:</span>
				<span>{width} px</span>
			</div>
		)
	}
}

GridHelper.propTypes = {
	
}

export default GridHelper