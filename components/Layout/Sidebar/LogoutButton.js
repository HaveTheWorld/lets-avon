import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'
import { graphql } from 'react-apollo'
import { MAIN_QUERY } from '@/apollo/gql/main.gql'
import { sleep } from '@/libs/helpers'
import Icon from '@/components/Elements/Icon'

const mapDispatchToProps = {
	addToast
}

@connect(null, mapDispatchToProps)
@graphql(MAIN_QUERY)
class LogoutButton extends React.Component {
	state = {
		isLoading: false
	}

	onLogout = async () => {
		const { data, addToast } = this.props

		this.setState({ isLoading: true })
		await sleep(300)

		data.updateQuery(() => {
			document.cookie = `token=; path=/; expires=-1`
			return { getCurrentUser: null }
		})
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