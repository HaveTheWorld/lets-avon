import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cls from 'classnames'
import { removeToast, pauseToastTimer, resumeToastTimer } from '@/redux/ducks/toasts'
import css from './Toast.sass'
import Icon from '@/components/Elements/Icon'

const Toast = (props) => {
	const { id, type, message, removeToast, pauseToastTimer, resumeToastTimer } = props

	const getToastIcon = () => {
		switch (type) {
			case 'info': return ['fas', 'info']
			case 'success': return ['fas', 'check']
			case 'warning': return ['fas', 'exclamation']
			case 'danger': return ['fas', 'times']
			case 'default': return ['far', 'comment']
		}
	}

	return (
		<div
			className={cls(css.toast, css[type])}
			onClick={() => removeToast(id)}
			onMouseEnter={() => pauseToastTimer(id)}
			onMouseLeave={() => resumeToastTimer(id)}
		>
			<div className={css.inner}>
				<div className={css.icon}>
					{/*<span className={getToastIcon()}></span>*/}
					<Icon icon={getToastIcon()} fw />
				</div>
				<div className={css.content}>{message}</div>
			</div>
		</div>
	)
}

Toast.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	removeToast: PropTypes.func.isRequired,
	pauseToastTimer: PropTypes.func.isRequired,
	resumeToastTimer: PropTypes.func.isRequired
}

const mapDispatchToProps = {
	removeToast,
	pauseToastTimer,
	resumeToastTimer
}

export default connect(null, mapDispatchToProps)(Toast)