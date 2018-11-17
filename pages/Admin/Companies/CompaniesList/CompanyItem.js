import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import siteMap from '@/maps/site'
import ButtonRemove from './ButtonRemove'

const CompanyItem = ({ id, number, year, startDate, finishDate }) => {
	return (
		<tr>
			<td>{number}</td>
			<td>{year}</td>
			<td>{moment(startDate).format(siteMap.dateFormat)}</td>
			<td>{moment(finishDate).format(siteMap.dateFormat)}</td>
			<td>
				<ButtonRemove id={id} />
			</td>
		</tr>
	)
}

CompanyItem.propTypes = {
	
}

export default CompanyItem