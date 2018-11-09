import React from 'react'
import css from './Loader.sass'

const Loader = () => {
	return (
		<div className={css.wrapper}>
			<span className={css.pulse}></span>
			<span className={css.text}>Loading...</span>
		</div>
	)
}

export default Loader