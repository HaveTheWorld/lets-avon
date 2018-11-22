import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import onClickOutside from 'react-onclickoutside'
import css from './Confirm.sass'

@onClickOutside
class Confirm extends React.Component {
	state = {
		isActive: false,
		isUp: false,
		isRight: false
	}

	componentDidMount() {
		this.switchMode()
	}

	componentDidUpdate(props, state) {
		state.isActive !== this.state.isActive && this.switchMode()
	}

	switchMode = () => {
		const { isUp, isRight } = this.state
		const { height, width, top, left } = this.menu.getBoundingClientRect()
		const newState = {}	

		if (!isUp && window.innerHeight <= height + top) { newState.isUp = true }
		if (isUp && window.innerHeight > height + top) { newState.isUp = false }
		if (!isRight && window.innerWidth <= width + left) { newState.isRight = true }
		if (isRight && window.innerWidth > width + left) { newState.isRight = false }

		Object.keys(newState).length && this.setState(newState)
	}

	handleClickOutside = () => {
		this.setState({ isActive: false })
	}

	toggle = () => {
		this.setState({ isActive: !this.state.isActive })
	}

	onClick = () => {
		this.toggle()
		this.props.onConfirm()
	}

	render() {
		const { isUp, isRight, isActive } = this.state
		const { children, title, noWrap } = this.props

		return (
			<div className={cls('dropdown', { 'is-up': isUp }, { 'is-right': isRight }, { 'is-active': isActive })}>
				<div className="dropdown-trigger">
					{children(this.toggle)}
				</div>
				<div
					ref={ref => this.menu = ref}
					className={cls('dropdown-menu', css.menu, 'animated', 'zoomIn')}
					onClick={this.toggle}
				>
					<div className={cls('dropdown-content', css.content)}>
						<div className={cls('dropdown-item', { [css.nowrap]: noWrap })}>{title}</div>
						<div className="dropdown-item">
							<div className={css.buttons}>
								<button
									className="button is-primary is-outlined is-small"
									onClick={this.onClick}
								>
									Да
								</button>
								<button className="button is-small">Нет</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Confirm.propTypes = {
	
}

export default Confirm