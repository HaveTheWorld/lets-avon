import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Link } from '@/routes'
import { Icon } from '@/components/Elements'

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