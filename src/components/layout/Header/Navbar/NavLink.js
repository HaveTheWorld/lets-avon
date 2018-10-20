import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import Icon from '@/components/elements/Icon'
import { findDOMNode } from 'react-dom'

class NavLink extends React.Component {
	onClick = (e) => {
		const link = findDOMNode(this)
		const isActive = link.classList.contains('active')
		if (isActive) e.preventDefault()
		this.props.onClick()
	}

	render() {
		const { exact, to, text, icon } = this.props
		return (
			<Link
				ref={ref => this.link = ref}
				exact={exact}
				to={to}
				className="navbar-item"
				onClick={this.onClick}
			>
				<Icon icon={icon} />
				<span>{text}</span>
			</Link>
		)
	}
}

NavLink.propTypes = {
	
}

export default NavLink