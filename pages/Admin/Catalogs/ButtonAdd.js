import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Toggle from '@/components/HOCs/Toggle'
import Icon from '@/components/Elements/Icon'
import Modal from '@/components/Elements/Modal'
import AddCatalog from './AddCatalog'

const ButtonAdd = () => {
	return (
		<Toggle>
			{({ on, toggle }) => (
				<Fragment>
					<button className="button is-primary is-outlined" onClick={toggle}>
						<Icon icon={['fas', 'plus']} />
						<span>Добавить</span>
					</button>
					{on &&
						<Modal title="Добавить каталог" onClose={toggle}>
							<AddCatalog onClose={toggle} />
						</Modal>
					}
				</Fragment>
			)}
		</Toggle>
	)
}

ButtonAdd.propTypes = {
	
}

export default ButtonAdd