import React from 'react'
import { connect } from 'react-redux'
import { addToast, removeToast } from '@/redux/ducks/toasts'
import css from './ToastsTester.sass'

const bigText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
				+ 'Necessitatibus ea aspernatur enim in aliquid, numquam!'

const ToastsTester = ({ toasts, addToast, removeToast }) => {
	return (
		<ul className={css.tester}>
			<li>
				<button className="button is-small" onClick={() => addToast('Default Toast')}>Default</button>
			</li>
			<li>
				<button className="button is-small is-info" onClick={() => addToast('Info Toast', 'info')}>Info</button>
			</li>
			<li>
				<button className="button is-small is-success" onClick={() => addToast('Success Toast', 'success')}>Success</button>
			</li>
			<li>
				<button className="button is-small is-warning" onClick={() => addToast('Warning Toast', 'warning')}>Warning</button>
			</li>
			<li>
				<button className="button is-small is-danger" onClick={() => addToast('Danger Toast', 'danger')}>Danger</button>
			</li>
			<li>
				<button className="button is-small is-success is-outlined" onClick={() => addToast(bigText, 'success')}>Big Toast</button>
			</li>
			<li>
				<button className="button is-small" onClick={() => {
					toasts.forEach(({ id }) => removeToast(id))
				}}>Close All Toasts</button>
			</li>
		</ul>
	)
}

const mapStateToProps = state => ({
	toasts: state.toasts.items
})

const mapDispatchToProps = {
	addToast,
	removeToast
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastsTester)