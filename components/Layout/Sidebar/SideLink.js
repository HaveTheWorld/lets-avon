import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@/libs/routes'
import Icon from '@/components/Elements/Icon'
import css from './SideLink.sass'

const SideLink = ({ to, icon, text }) => {
	return (
		<Link prefetch route={to}>
			<a className={css.link}>
				<Icon icon={icon} fw />
				<span>{text}</span>
			</a>
		</Link>	
	)
}

SideLink.propTypes = {
	
}

export default SideLink