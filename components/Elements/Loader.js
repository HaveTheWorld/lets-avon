import React from 'react'
import Portal from '@/components/HOCs/Portal'
import css from './Loader.sass'

const Loader = () => {
	return (
		<Portal selector="#content">
			<div className={css.wrapper}>
				<span className={css.pulse}></span>
				<span className={css.text}>Loading...</span>
			</div>
		</Portal>
	)
}

export default Loader