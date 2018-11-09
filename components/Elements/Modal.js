import React from 'react'
import PropTypes from 'prop-types'
import Portal from '@/components/HOCs/Portal'

const Modal = ({ title, onClose, children }) => {
	return (
		<Portal>
			<div className="modal is-active">
				<div className="modal-background" onClick={onClose}></div>
				<div className="modal-card">
					<div id="modal-head" className="modal-card-head">
						<p className="modal-card-title">{title}</p>
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