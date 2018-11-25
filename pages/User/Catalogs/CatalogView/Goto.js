import React from 'react'
import cls from 'classnames'
import { Icon } from '@/components/Elements'
import css from './Goto.sass'

const Goto = () => {
	const label = 'Перейти на страницу'

	return (
		<div className={css.goto} title={label}>
			<span className={css.label}>{label}:</span>
			<button className={cls('button', 'is-small', 'is-primary', 'is-outlined', css.buttonSide)}>1</button>
			<div className={cls('field', 'has-addons', css.field)}>
				<div className="control">
					<input
						type="text"
						className={cls('input', 'is-small', css.input)}
						placeholder="№ стр."
					/>
				</div>
				<div className="control">
					<button className={cls('button', 'is-small', 'is-primary', 'is-outlined', css.buttonGo)}>
						<Icon icon={['fas', 'caret-right']} />
					</button>
				</div>
			</div>
			<button className={cls('button', 'is-small', 'is-primary', 'is-outlined', css.buttonSide)}>123</button>
		</div>
	)
}

Goto.propTypes = {
	
}

export default Goto