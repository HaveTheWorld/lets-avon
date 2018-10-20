import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { withRouteData } from 'react-static'
import cls from 'classnames'
import Navbar from './Navbar'
import styles from './Header.scss'
import bgImage from '@/assets/images/bg-header.jpg'

@withRouteData
class Header extends React.Component {
	state = {
		height: null,
		paddingTop: 0,
		showNavbar: false
	}

	static getDerivedStateFromProps({ isHome }) {
		return {
			height: isHome ? window.outerHeight : null
		}
	}

	componentDidMount() {
		const navbar = findDOMNode(this.navbar)
		const { height } = navbar.getBoundingClientRect()

		this.setState({ paddingTop: height })

		window.addEventListener('scroll', this.onWindowScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onWindowScroll)
	}

	onWindowScroll = () => {
		const { showNavbar, paddingTop } = this.state

		if (window.scrollY > paddingTop && !showNavbar) {
			document.body.classList.add('is-scrolled')
			this.setState({ showNavbar: true })
		}
		if (window.scrollY <= paddingTop && showNavbar) {
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
		const { height, paddingTop, showNavbar } = this.state
		const { isHome } = this.props
		
		let headerStyles = { paddingTop }

		if (isHome) {
			headerStyles['height'] = height
			headerStyles['backgroundImage'] = `url(${bgImage})`
		}

		return (
			<header className={styles.header} style={headerStyles}>
				<Navbar ref={ref => this.navbar = ref} isShown={showNavbar} isHome={isHome} />
			</header>
		)
	}
}

Header.propTypes = {
	
}

export default Header