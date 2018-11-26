import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { CurrentUserQuery } from '@/apollo/gql/auth.gql'
import rolesMap from '@/maps/roles'
import { getNestedValue } from '@/libs/helpers'
import { Link } from '@/routes'
import { Icon } from '@/components/Elements'
import ButtonRemove from './ButtonRemove'

const UserItem = ({ id, username, role, isRootAdmin, data: { currentUser } }) => {
	const editable = !isRootAdmin || getNestedValue(currentUser, 'isRootAdmin')
	const removable = isRootAdmin ? false : id !== getNestedValue(currentUser, 'id')

	return (
		<tr>
			<td>{username}</td>
			<td>{rolesMap[role]}</td>
			<td>
				{
					editable &&
					<Link route={`/admin/users/${username}`} prefetch>
						<button className="button is-link is-outlined is-small">
							<Icon icon={['fas', 'pencil-alt']} />
						</button>
					</Link>
				}
			</td>
			<td>
				{removable && <ButtonRemove id={id} />}
			</td>
		</tr>
	)
}

UserItem.propTypes = {
	
}

export default graphql(CurrentUserQuery)(UserItem)