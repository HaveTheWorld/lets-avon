import React from 'react'
import PropTypes from 'prop-types'

class Toggle extends React.Component {
	state = {
		on: false
	}

	toggle = () => {
		this.setState({ on: !this.state.on })
	}

	render() {
		return this.props.children({
			on: this.state.on,
			toggle: this.toggle
		})
	}
}

Toggle.propTypes = {
	
}

export default Toggle