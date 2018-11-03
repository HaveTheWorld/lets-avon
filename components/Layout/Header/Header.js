import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import cls from 'classnames'
import withPageData from '@/components/HOCs/withPageData'
import Navbar from './Navbar'
import css from './Header.sass'
import bgImage from '@/assets/images/bg-header.jpg'

@withPageData
class Header extends React.Component {
	state = {
		isMounted: false,
		flexBasis: null,
		paddingTop: 0,
		showNavbar: false
	}

	timer

	static getDerivedStateFromProps({ isHome }) {
		const isClient = typeof window !== 'undefined'
		return {
			flexBasis: isClient && isHome ? window.outerHeight : null
		}
	}

	componentDidMount() {
		const { isNavbarAbsolute, route } = this.props
		const navbar = findDOMNode(this.navbar)
		isNavbarAbsolute && navbar.classList.add('is-absolute')
		const { height } = navbar.getBoundingClientRect()

		this.setState({ paddingTop: height, isMounted: true }, () => {
			document.getElementById('__next').classList.add('is-ready')
			window.addEventListener('resize', this.onWindowResize)
			window.addEventListener('scroll', this.onWindowScroll)
		})
	}

	componentDidUpdate(props) {
		const { isNavbarAbsolute, route } = this.props
		if (route !== props.route) {
			const navbar = findDOMNode(this.navbar)
			isNavbarAbsolute && navbar.classList.add('is-absolute')
			!isNavbarAbsolute && navbar.classList.remove('is-absolute')
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize)
		window.removeEventListener('scroll', this.onWindowScroll)
	}

	onWindowResize = () => {
		if (this.timer) { clearTimeout(this.timer) }

		this.timer = setTimeout(() => {
			const { flexBasis } = this.state
			const { isHome } = this.props
			if (isHome && flexBasis !== window.outerHeight) {
				this.setState({ flexBasis: window.outerHeight })
			}
		}, 100)		
	}

	onWindowScroll = () => {
		const { showNavbar, paddingTop } = this.state
		const { isNavbarAbsolute } = this.props

		if (isNavbarAbsolute) {
			this.setState({ showNavbar: false })
			return
		}

		if (window.scrollY > /*paddingTop*/0 && !showNavbar) {
			document.body.classList.add('is-scrolled')
			this.setState({ showNavbar: true })
		}
		if (window.scrollY <= /*paddingTop*/0 && showNavbar) {
			document.body.classList.remove('is-scrolled')
			this.setState({ showNavbar: false })
		}
	}

	onLinkClick(e) {
		if (this.classList.contains('active')) {
			e.preventDefault()
		}
	}

	render() {
		const { flexBasis, paddingTop, showNavbar, isMounted } = this.state
		const { isHome, asPath } = this.props
		
		let headerStyles = { paddingTop }

		if (isHome && isMounted) {
			headerStyles['flexBasis'] = flexBasis
			headerStyles['backgroundImage'] = `url(${bgImage})`
		}

		return (
			<header className={css.header} style={headerStyles}>
				<Navbar
					ref={ref => this.navbar = ref}
					isShown={showNavbar}
					isHome={isHome}
					asPath={asPath}
				/>				
			</header>
		)
	}
}

Header.propTypes = {
	
}

export default Header