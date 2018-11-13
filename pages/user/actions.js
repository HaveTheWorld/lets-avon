import React from 'react'
import Section from '@/components/Elements/Section'

import css from './Relation.sass'

const Actions = () => {
	return (
		<Section title="Акции и спец. предложения">
			<div className={css.relation}>
				<div className={css.ratio}></div>
				<div className={css.content}>
					<img className={css.image} src="/static/catalogs/avon-13-2018/131.jpg" alt=""/>
					<img className={css.image} src="/static/catalogs/avon-13-2018/1.jpg" alt=""/>
				</div>
			</div>
		</Section>
	)
}

export default Actions