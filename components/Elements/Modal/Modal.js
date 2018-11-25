import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { Portal } from '@/components/Elements'
import css from './Modal.sass'

const Modal = ({ title, onClose, children }) => {
	return (
		<Portal>
			<div className="modal is-active">
				<div className={cls('modal-background', css.background)} onClick={onClose}></div>
				<div className={cls('modal-card', css.card)}>
					<div id="modal-head" className={cls('modal-card-head', css.head)}>
						<p className={cls('modal-card-title', css.title)}>{title}</p>
						<button className="delete" onClick={onClose}></button>
					</div>
					{children}
				</div>
			</div>
		</Portal>
	)
}

Modal.propTypes = {
	
}

export default Modal