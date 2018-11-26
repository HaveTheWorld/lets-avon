import React, { Fragment } from 'react'
import cls from 'classnames'
import errorsMap from '@/maps/errors'
import { Helmet } from '@/components/Elements'
import css from './Error.sass'

const Error = ({ statusCode }) =>  {
	const status = statusCode || 500
	const message = errorsMap[statusCode] || 'Неизвестная ошибка'

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