import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import onClickOutside from 'react-onclickoutside'
import { Link } from '@/libs/routes'
import navMap from '@/maps/header-nav'
import css from './Navbar.sass'
import Burger from './Burger'
import Icon from '@/components/elements/Icon'

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
		const { asPath } = this.props

		return Object.entries(navMap).map(([to, { icon, text }]) => {
			const isActive = to === asPath
			return (
				<Link key={to} prefetch route={to}>
					<a
						className={cls('navbar-item', { 'is-active': isActive })}
						onClick={e => {
							this.closeMenu()
							isActive && e.preventDefault()
						}}
					>
						<Icon icon={icon} />
						<span>{text}</span>
					</a>
				</Link>
			)
		})
	}

	render() {
		const { isMenuActive } = this.state
		const { isShown, isHome } = this.props
		const isProd = process.env.NODE_ENV === 'production'

		const navbarCls = cls(
			'navbar',
			css.navbar,
			{ [css.isShown]: isShown },
			{ [css.isHome]: isHome }
		)

		return (
			<nav id="navbar" className={navbarCls}>
				<div className="container">
					<div className="navbar-brand">
						<Link prefetch route="/">
							<a className="navbar-item">
								<span className={cls('title', 'is-size-4', css.brand)}>Let's AVON</span>
							</a>
						</Link>
						<Burger isActive={isMenuActive} onClick={this.toggleMenu} />
					</div>
					<div className={cls('navbar-menu', css.menu, { 'is-active': isMenuActive })} onClick={this.closeMenu}>
						{!isProd &&
						<div className="navbar-start">
							<Link prefetch route="/login">
								<a className="navbar-item">
									<Icon icon={['fas', 'unlock']} />
									<span>Вход</span>
								</a>
							</Link>
						</div>}
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