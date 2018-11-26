import React, { Fragment } from 'react'
import cls from 'classnames'
import { Helmet } from '@/components/Elements'
import css from './Error.sass'

const errors = {
	404: 'Страница не найдена',
	500: 'Произошла ошибка на сервере'
}

const Error = ({ statusCode }) =>  {
	const status = statusCode || 500
	const message = errors[statusCode] || 'Неизвестная ошибка'

	return (
		<Fragment>
			<Helmet error />
			<div className={css.error}>
				<span className={cls(css.status, 'title')}>{status}</span>
				<span className={cls(css.message, 'subtitle')}>{message}</span>
			</div>
		</Fragment>
	)
}

export default Error