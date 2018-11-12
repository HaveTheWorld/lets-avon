import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '@/libs/helpers'
import ButtonRemove from './ButtonRemove'

const CompanyItem = ({ id, number, year, startDate, finishDate }) => {
	return (
		<tr>
			<td>{number}</td>
			<td>{year}</td>
			<td>{formatDate(startDate)}</td>
			<td>{formatDate(finishDate)}</td>
			<td>
				<ButtonRemove id={id} />
			</td>
		</tr>
	)
}

CompanyItem.propTypes = {
	
}

export default CompanyItem