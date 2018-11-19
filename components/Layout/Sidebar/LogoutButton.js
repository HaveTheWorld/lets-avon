import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql } from 'react-apollo'
import { CurrentUserQuery } from '@/apollo/gql/auth.gql'
import { sleep, deleteCookie } from '@/libs/helpers'
import Icon from '@/components/Elements/Icon'

@connect(null, { addToast })
@graphql(CurrentUserQuery)
class LogoutButton extends React.Component {
	state = {
		isLoading: false
	}

	onLogout = async () => {
		const { data, addToast } = this.props

		this.setState({ isLoading: true })
		await sleep(300)

		deleteCookie('token')
		data.updateQuery(() => ({ currentUser: null }))
		
		await sleep(10)
		addToast('Сессия успешно завершена.', 'success')
	}

	render() {
		const { isLoading } = this.state

		return (
			<button
				className={cls('button', 'is-primary', 'is-outlined', { 'is-loading': isLoading })}
				onClick={this.onLogout}
			>
				<Icon icon={['fas', 'sign-out-alt']} />
				<span>Выход</span>
			</button>
		)
	}
}

LogoutButton.propTypes = {
	
}

export default LogoutButton