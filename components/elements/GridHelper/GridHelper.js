import React from 'react'
import PropTypes from 'prop-types'
import css from './GridHelper.sass'

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

		return (
			<div className={css.sizer}>
				<span>{width} px</span>
			</div>
		)
	}
}

GridHelper.propTypes = {
	
}

export default GridHelper