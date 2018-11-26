import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Link } from '@/routes'
import { Icon } from '@/components/Elements'
import css from './NavItem.sass'

const NavItem = ({ target, url, prev, next, double }) => {
	const prevPath = double ? prev.join('-') : prev
	const nextPath = double ? next.join('-') : next
	const path = target === 'prev' ? prevPath : nextPath
	const direction = target === 'prev' ? 'left' : 'right'

	return (
		<div className={cls(css.nav, css[direction])}>
			<span className={css.navItem}>
				<Link route={`${url}/${path}`} prefetch scroll={false}>
					<a className={cls(css.navButton, css[target])}>
						<Icon icon={['fas', `caret-${direction}`]} />
					</a>
				</Link>
			</span>
		</div>
	)
}

NavItem.propTypes = {
	
}

export default NavItem