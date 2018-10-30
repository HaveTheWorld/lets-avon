import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { graphql } from 'react-apollo'
import { GET_CURRENT_USER } from '@/graphql/auth.gql'
import { sleep } from '@/libs/helpers'
import Icon from '@/components/elements/Icon'

@graphql(GET_CURRENT_USER)
class LogoutButton extends React.Component {
	state = {
		isLoading: false
	}

	onLogout = async () => {
		const { updateQuery } = this.props.data
		this.setState({ isLoading: true })
		await sleep(300)
		updateQuery(() => {
			document.cookie = `token=; expires=-1`
			return { user: null }
		})
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