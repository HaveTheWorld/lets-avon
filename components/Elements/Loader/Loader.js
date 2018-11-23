import React from 'react'
import cls from 'classnames'
import Portal from '@/components/HOCs/Portal'
import css from './Loader.sass'

const Loader = ({ text = 'Загрузка', initial }) => {
	const element = (
		<div id="loader" className={cls(css.wrapper, 'animated', 'fadeIn')}>
			<span className={css.pulse}></span>
			<span className={css.text}>{text}...</span>
		</div>
	)

	return initial ? element : (
		<Portal selector="#content">
			{element}
		</Portal>
	)
}

export default Loader