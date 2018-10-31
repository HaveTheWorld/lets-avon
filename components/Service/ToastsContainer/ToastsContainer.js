import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Toast from './Toast'
import css from './ToastsContainer.sass'

let ToastsTester
const isProd = process.env.NODE_ENV === 'production'
if (!isProd) { ToastsTester = require('./ToastsTester').default }

const ToastsContainer = ({ toasts }) => {
	return (
		<Fragment>
			<div className={css.container}>
				<TransitionGroup component={null} exit={true} >
					{toasts.reverse().map(toast => (
						<CSSTransition key={toast.id} timeout={750} classNames='toast-transition'>
							<Toast {...toast} />
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
			{!isProd && <ToastsTester />}
		</Fragment>
	)
}

ToastsContainer.propTypes = {
	toasts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	toasts: state.toasts.items
})

export default connect(mapStateToProps)(ToastsContainer)