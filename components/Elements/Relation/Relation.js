import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import css from './Relation.sass'

const Relation = ({ children, relationCls, ratioCls, ratio, ...rest }) => {
	return (
		<div className={cls(css.relation, relationCls)} {...rest}>
			<div
				style={{ paddingTop: ratio && `${ratio}%` }}
				className={cls(css.ratio, { [ratioCls]: !ratio })}
			></div>
			<div className={css.content}>
				{children}
			</div>
		</div>
	)
}

Relation.propTypes = {
	
}

export default Relation