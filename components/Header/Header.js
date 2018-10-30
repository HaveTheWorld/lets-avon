import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import cls from 'classnames'
import withPageData from '@/components/hocs/withPageData'
import Navbar from './Navbar'
import css from './Header.sass'
import bgImage from '@/assets/images/bg-header.jpg'

@withPageData
class Header extends React.Component {
	state = {
		isMounted: false,
		height: null,
		paddingTop: 0,
		showNavbar: false
	}

	static getDerivedStateFromProps({ isHome }) {
		const isClient = typeof window !== 'undefined'
		return {
			height: isClient && isHome ? window.outerHeight : null
		}
	}

	componentDidMount() {
		const navbar = findDOMNode(this.navbar)
		const { height } = navbar.getBoundingClientRect()

		this.setState({ paddingTop: height, isMounted: true }, () => {
			document.getElementById('__next').classList.add('is-ready')
			window.addEventListener('scroll', this.onWindowScroll)
		})
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
		const { height, paddingTop, showNavbar, isMounted } = this.state
		const { isHome, asPath } = this.props
		
		let headerStyles = { paddingTop }

		if (isHome && isMounted) {
			headerStyles['height'] = height
			headerStyles['backgroundImage'] = `url(${bgImage})`
		}

		return (
			<header className={css.header} style={headerStyles}>
				<Navbar ref={ref => this.navbar = ref} isShown={showNavbar} isHome={isHome} asPath={asPath} />
			</header>
		)
	}
}

Header.propTypes = {
	
}

export default Header