import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import onClickOutside from 'react-onclickoutside'
import { Link } from 'react-static'
import navMap from '@/maps/header-nav'
import styles from './Navbar.scss'
import Burger from './Burger'
import NavLink from './NavLink'

@onClickOutside
class Navbar extends React.Component {
	state = {
		isMenuActive: false
	}

	componentDidMount() {
		window.addEventListener('resize', this.closeMenu)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.closeMenu)
	}

	toggleMenu = () => {
		this.setState({ isMenuActive: !this.state.isMenuActive })
	}

	closeMenu = () => {
		this.state.isMenuActive && this.setState({ isMenuActive: false })
	}

	handleClickOutside() {
		this.setState({ isMenuActive: false })
	}

	renderMenu() {
		return Object.entries(navMap).map(([to, link]) => (
			<NavLink key="to" to={to} {...link} onClick={this.closeMenu} />
		))
	}

	render() {
		const { isMenuActive } = this.state
		const { isShown, isHome } = this.props

		const navbarCls = cls(
			'navbar',
			styles.navbar,
			{ [styles.isShown]: isShown },
			{ [styles.isHome]: isHome }
		)

		return (
			<nav id="navbar" className={navbarCls}>
				<div className="container">
					<div className="navbar-brand">
						<Link exact to="/" className="navbar-item">
							<span className={cls('title', 'is-size-4', styles.brand)}>Let's AVON</span>
						</Link>
						<Burger isActive={isMenuActive} onClick={this.toggleMenu} />
					</div>
					<div className={cls('navbar-menu', { 'is-active': isMenuActive })}>
						<div className="navbar-end">
							{this.renderMenu()}
						</div>
					</div>
				</div>
			</nav>
		)
	}
}

Navbar.propTypes = {
	
}

export default Navbar