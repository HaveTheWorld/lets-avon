import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import css from './Section.sass'

const Section = ({ children, title, leftAlign, rightBlock: RightBlock }) => {
	return (
		<section className={cls('section', css.section, { [css.leftAlign]: leftAlign })}>
			{
				title &&
				<div className={cls(css.level, { [css.withRight]: RightBlock })}>
					<h2 className={cls('subtitle', 'is-3', css.title)}>{title}</h2>
					{RightBlock ? <RightBlock /> : <span></span>}
				</div>
			}
			{children}
		</section>
	)
}

Section.propTypes = {
	
}

export default Section