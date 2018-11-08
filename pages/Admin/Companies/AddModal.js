import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Input from '@/components/Elements/Input'
import InputDate from '@/components/Elements/InputDate'
import { graphql } from 'react-apollo'
import { GET_COMPANIES_LIST, ADD_COMPANY } from '@/apollo/gql/companies.gql'
import { connect } from 'react-redux'
import { addToast } from '@/redux/ducks/toasts'

@connect(null, { addToast })
@graphql(ADD_COMPANY)
class AddModal extends React.Component {
	state = {
		fields: {
			name: { value: '', isValid: false },
			startDate: { value: '', isValid: false },
			finishDate: { value: '', isValid: false }
		},
		isLoading: false,
		isFormValid: false
	}

	checkFormValid(fields) {
		return Object.values(fields).every(({ isValid }) => isValid)
	}

	onChange = name => (value, isValid) => {
		const { fields } = this.state

		const newFields = {
			...fields,
			[name]: { value, isValid }
		}
		const newState = { fields: newFields }

		if (newFields[name].isValid !== fields[name].isValid) {
			newState.isFormValid = this.checkFormValid(newFields)
		}
		this.setState(newState)
	}

	onSubmit = async e => {
		e.preventDefault()
		const { isFormValid, fields, isLoading } = this.state
		const { mutate, addToast, onClose } = this.props

		if (!isFormValid || isLoading) { return }

		const variables = Object.entries(fields).reduce((acc, [name, field]) => {
			acc[name] = field.value
			return acc
		}, {})

		this.setState({ isLoading: true })

		try {
			await mutate({
				variables,
				update: (store, { data: { addCompany } }) => {
					const data = store.readQuery({ query: GET_COMPANIES_LIST })
					const companiesList = [...data.companiesList, addCompany]
					store.writeQuery({ query: GET_COMPANIES_LIST, data: { ...data, companiesList } })
				}
			})
			onClose()
		} catch (error) {
			this.setState({ isLoading: false })
			addToast(error.message.replace('GraphQL error: ', ''), 'danger')
		}
	}

	render() {
		const { fields, isLoading, isFormValid } = this.state
		const { name, startDate, finishDate } = fields

		return (
			<Fragment>
				<div className="modal-card-body">
					<form onSubmit={this.onSubmit}>
						<Input
							label="Кампания"
							icon={['fas', 'pen-alt']}
							value={name.value}
							onChange={this.onChange('name')}
							autoFocus
							pattern={/^\d{2}-20\d{2}$/}
							errorText="Формат: 12-2017. Обязательное поле."
						/>
						<InputDate
							label="Дата начала"
							icon={['fas', 'calendar-alt']}
							onChange={this.onChange('startDate')}
							isRequired
						/>
						<InputDate
							label="Дата завершения"
							icon={['fas', 'calendar-alt']}
							onChange={this.onChange('finishDate')}
							isRequired
						/>
						<button
							className={cls('button', 'is-primary', { 'is-loading': isLoading })}
							disabled={!isFormValid}
						>
							Добавить
						</button>
					</form>
				</div>
			</Fragment>
		)
	}
}

AddModal.propTypes = {
	
}

export default AddModal