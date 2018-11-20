import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { UsersQuery } from '@/apollo/gql/users.gql'
import { Link } from '@/libs/routes'
import { Section, Loader, Icon } from '@/components/Elements'
import UserItem from './UserItem'

const UsersList = ({ data: { loading, users } }) => {
	return (
		<Section title="Админ / Пользователи">
			{loading ? <Loader /> : (
				<Fragment>
					<table className="table is-bordered">
						<thead>
							<tr>
								<th>Имя пользователя</th>
								<th>Роль</th>
								<th>Изменить</th>
								<th>Удалить</th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
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
				</Fragment>
			)}
		</Section>
	)
}

UsersList.propTypes = {
	
}

export default graphql(UsersQuery)(UsersList)