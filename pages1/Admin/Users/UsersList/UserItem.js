import React from 'react'
import PropTypes from 'prop-types'
import rolesMap from '@/maps/roles'
import { Link } from '@/routes'
import { Icon } from '@/components/Elements'
import ButtonRemove from './ButtonRemove'

const UserItem = ({ id, username, role, canBeRemoved }) => {
	return (
		<tr>
			<td>{username}</td>
			<td>{rolesMap[role]}</td>
			<td>
				<Link route={`/admin/users/${username}`} prefetch>
					<button className="button is-link is-outlined is-small">
						<Icon icon={['fas', 'pencil-alt']} />
					</button>
				</Link>
			</td>
			<td>
				{canBeRemoved && <ButtonRemove id={id} />}
			</td>
		</tr>
	)
}

UserItem.propTypes = {
	
}

export default UserItem