import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

const Icon = ({ icon, fw, isLeft, isRight }) => {
	const wrapperCls = cls(
		'icon',
		{ 'is-left': isLeft },
		{ 'is-right': isRight }
	)

	const iconCls = cls(
		icon[0],
		`fa-${icon[1]}`,
		{ 'fa-fw': fw }
	)

	return (
		<span className={wrapperCls}>
			<span className={iconCls}></span>
		</span>
	)
}

Icon.propTypes = {
	
}

export default Icon