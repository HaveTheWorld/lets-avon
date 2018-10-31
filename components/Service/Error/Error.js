import React from 'react'
import cls from 'classnames'
import css from './Error.sass'

const errors = {
	404: 'Страница не найдена',
	500: 'Произошла ошибка на сервере'
}

const Error = ({ statusCode }) =>  {
	const status = statusCode || 500
	const message = errors[statusCode] || 'Неизвестная ошибка'

	return (
		<div className={css.error}>
			<span className={cls(css.status, 'title')}>{status}</span>
			<span className={cls(css.message, 'subtitle')}>{message}</span>
		</div>
	)
}

export default Error