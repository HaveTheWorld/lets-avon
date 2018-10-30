import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Link } from '@/libs/routes'
import Icon from '@/components/elements/Icon'

const NavLink = ({ to, icon, text, isActive, onClick }) => {
	return (
		<Link prefetch route={to}>
			<a
				className={cls('navbar-item', { 'is-active': isActive })}
				onClick={onClick(isActive)}
			>
				<Icon icon={icon} />
				<span>{text}</span>
			</a>
		</Link>
	)
}

NavLink.propTypes = {
	
}

export default NavLink