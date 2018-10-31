import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

const Burger = ({ isActive, onClick }) => {
	return (
		<span className={cls('navbar-burger', { 'is-active': isActive })} onClick={onClick}>
			<span></span>
			<span></span>
			<span></span>
		</span>
	)
}

Burger.propTypes = {
	
}

export default Burger