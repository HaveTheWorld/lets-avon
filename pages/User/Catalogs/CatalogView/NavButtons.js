import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@/routes'
import css from './CatalogView.sass'

const NavButtons = ({ url, prev, next, double }) => {
	const prevPath = double ? prev.join('-') : prev
	const nextPath = double ? next.join('-') : next
	
	return (
		<div className={css.navButtons}>
			<Link route={`${url}/${prevPath}`} prefetch scroll={false}>
				<a>Назад</a>
			</Link>
			<Link route={`${url}/${nextPath}`} prefetch scroll={false}>
				<a>Вперёд</a>
			</Link>
		</div>
	)
}

NavButtons.propTypes = {
	
}

export default NavButtons