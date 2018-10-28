import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

const Icon = ({ icon, fw }) => {
	const iconCls = cls(
		icon[0],
		`fa-${icon[1]}`,
		{ 'fa-fw': fw }
	)

	return (
		<span className="icon">
			<span className={iconCls}></span>
		</span>
	)
}

Icon.propTypes = {
	
}

export default Icon