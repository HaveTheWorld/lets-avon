import React from 'react'
import cls from 'classnames'
import { Link, Router } from '@/routes'
import { Icon } from '@/components/Elements'
import css from './Goto.sass'

class Goto extends React.Component {
	state = {
		gotoPage: ''
	}

	onInputChange = e => {
		let { value } = e.target;
		if (value === '0' || !/^\d{0,3}$/.test(value)) { return }

		const { count } = this.props

		if (value.length >= count.toString().length && +value > count) {
			value = count
		}
		this.setState({ gotoPage: value })
	}

	onSubmit = e => {
		e.preventDefault()
		const gotoPage = +this.state.gotoPage
		const { count, mode, url } = this.props

		if (!gotoPage) { return }

		const double = mode === 'double'
		const even = gotoPage % 2 === 0
		const page = double
			? even
				? gotoPage === count
					? `${gotoPage}-1`
					: `${gotoPage}-${gotoPage + 1}`
				: gotoPage === 1
					? `${count}-${gotoPage}`
					: `${gotoPage - 1}-${gotoPage}`
			: gotoPage		
		const gotoPath = `${url}/${page}`
		
		Router.pushRoute(gotoPath)
	}

	getSidePath() {
		const { count, mode, url } = this.props
		const double = mode === 'double'		

		const firstPath = `${url}/${double ? count + '-' : ''}1`
		const lastPath = `${url}/${count}${double ? '-1' : ''}`		

		return { firstPath, lastPath }
	}

	render() {
		const { gotoPage } = this.state
		const { count } = this.props
		const label = 'Перейти на страницу'
		const buttonClasses = ['button', 'is-small', 'is-primary', 'is-outlined']

		const { firstPath, lastPath } = this.getSidePath()		

		return (
			<div className={css.goto} title={label}>

				<span className={css.label}>{label}:</span>

				<Link route={firstPath} prefetch>
					<button className={cls(...buttonClasses, css.buttonSide)}>1</button>
				</Link>

				<form onSubmit={this.onSubmit}>
					<div className={cls('field', 'has-addons', css.field)}>
						<div className="control">
							<input
								type="text"
								className={cls('input', 'is-small', css.input)}
								placeholder="№ стр."
								value={gotoPage}
								onChange={this.onInputChange}
							/>
						</div>
						<div className="control">
							<button
								className={cls(...buttonClasses, css.buttonGo)}
								disabled={!gotoPage}
							>
								<Icon icon={['fas', 'caret-right']} />
							</button>
						</div>
					</div>
				</form>

				<Link route={lastPath} prefetch>
					<button className={cls(...buttonClasses, css.buttonSide)}>{count}</button>
				</Link>

			</div>
		)
	}
}

Goto.propTypes = {
	
}

export default Goto