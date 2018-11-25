import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Link } from '@/routes'
import { Icon } from '@/components/Elements'
import css from './SideLink.sass'

const SideLink = ({ to, icon, text, isActive }) => {
	const onClick = e => {
		isActive && e.preventDefault()
	}

	return (
		<Link prefetch route={to}>
			<a className={cls(css.link, { [css.isActive]: isActive })} onClick={onClick}>
				<Icon icon={icon} fw />
				<span>{text}</span>
			</a>
		</Link>	
	)
}

SideLink.propTypes = {
	
}

export default SideLink