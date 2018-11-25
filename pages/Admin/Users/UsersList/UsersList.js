import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { UsersQuery } from '@/apollo/gql/users.gql'
import { Link } from '@/routes'
import { Section, Loader, Icon } from '@/components/Elements'
import UserItem from './UserItem'

const UsersList = ({ data: { loading, users } }) => {
	return loading ? <Loader /> : (
		<Section title="Админ / Пользователи" leftAlign>
			<table className="table">
				<thead>
					<tr>
						<th>Имя пользователя</th>
						<th>Роль</th>
						<th>Изменить</th>
						<th>Удалить</th>
					</tr>
				</thead>
				<tbody>
					{users && users.map(user => (
						<UserItem key={user.id} {...user} />
					))}
				</tbody>
			</table>
			<Link route="/admin/users/add" prefetch>
				<button className="button is-primary is-outlined">
					<Icon icon={['fas', 'plus']} />
					<span>Добавить</span>
				</button>
			</Link>
		</Section>
	)
}

UsersList.propTypes = {
	
}

export default graphql(UsersQuery)(UsersList)