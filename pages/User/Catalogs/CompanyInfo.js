import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import siteMap from '@/maps/site'
import css from './CompanyInfo.sass'

const CompanyInfo = ({ company }) => {
	if (!company) {
		return <div>Для текукей кампании нет активных каталогов.</div>
	}

	return (
		<div className={css.info}>
			Кампания <strong>№{company.number}</strong>
			. Действует с <strong>{moment(company.startDate).format(siteMap.dateFormat)}</strong>
			&nbsp;по <strong>{moment(company.finishDate).format(siteMap.dateFormat)}</strong>.
		</div>
	)
}

CompanyInfo.propTypes = {
	
}

export default CompanyInfo