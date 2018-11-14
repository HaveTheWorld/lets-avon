import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { withRouter } from 'next/router'
import { graphql, compose } from 'react-apollo'
import { GET_CATALOG } from '@/apollo/gql/catalogs.gql'
import { Section, Loader, Relation } from '@/components/Elements'
import css from './CatalogView.sass'
import { Link } from '@/libs/routes'
import Error from '@/components/Service/Error'

const CatalogView = ({ router, data: { loading, getCatalog } }) => {
	if (loading) { return <Loader /> }
	if (!getCatalog) { return <Error statusCode={404} /> }

	const { title, images } = getCatalog
	const { company, name, page } = router.query
	const catalogUrl = `/catalogs/${company}/${name}`
	const lastIndex = images.length - 1

	if (/^single-\d{1,3}$/.test(page)) {
		const pageNum = +page.split('single-')[1]
		const currentIndex = pageNum - 1

		const isFirst = currentIndex === 0
		const isLast = currentIndex === lastIndex

		const prevIndex = isFirst ? lastIndex : currentIndex - 1
		const nextIndex = isLast ? 0 : currentIndex + 1

		if (!images[currentIndex]) { return <Error statusCode={404} /> }

		return (
			<Section title={`Каталог ${title}`}>
				<Relation relationCls={css.relation} ratioCls={css.ratio}>
					<img
						className={css.image}
						src={`/static/${images[currentIndex].path}`}
						alt={`Каталог ${title}. Страница ${images[currentIndex].catalogIndex}.`}
					/>
				</Relation>
				<div style={{ textAlign: 'center' }}>
					<Link route={`${catalogUrl}/single-${images[prevIndex].catalogIndex}`} prefetch scroll={false}>
						<a>Назад</a>
					</Link>
					<Link route={`${catalogUrl}/single-${images[nextIndex].catalogIndex}`} prefetch scroll={false}>
						<a>Вперёд</a>
					</Link>
				</div>
			</Section>
		)
	} else if (/^\d{1,3}-\d{1,3}$/.test(page)) {
		const [index1, index2] = page.split('-').map(num => +num - 1)
		console.log(index1, index2)

		const isFirst = index1 === lastIndex && index2 === 0
		const isSecond = index1 === 1 && index2 === 2
		const isPreLast = index1 === lastIndex - 2 && index2 === lastIndex - 1
		
		const error = (!isFirst && index2 - index1 !== 1)
						|| index1 % 2 !== 1 || index2 % 2 !== 0
						|| !images[index1] || !images[index2]

		if (error) { return <Error statusCode={404} /> }		

		const prev = isFirst
			? `${images[lastIndex - 2].catalogIndex}-${images[lastIndex - 1].catalogIndex}`
			: isSecond
				? `${images[lastIndex].catalogIndex}-${images[0].catalogIndex}`
				: `${images[index1 - 2].catalogIndex}-${images[index2 - 2].catalogIndex}`

		const next = isFirst
			? `${images[1].catalogIndex}-${images[2].catalogIndex}`
			: isPreLast
				? `${images[lastIndex].catalogIndex}-${images[0].catalogIndex}`
				: `${images[index1 + 2].catalogIndex}-${images[index2 + 2].catalogIndex}`

		return (
			<Section title={`Каталог ${title}`}>
				<Relation relationCls={css.relation} ratioCls={css.ratio}>
					<img
						className={cls(css.image, css.imageDouble)}
						src={`/static/${images[index1].path}`}
						alt={`Каталог ${title}. Страница ${images[index1].catalogIndex}.`}
					/>
					<img
						className={cls(css.image, css.imageDouble)}
						src={`/static/${images[index2].path}`}
						alt={`Каталог ${title}. Страница ${images[index2].catalogIndex}.`}
					/>
				</Relation>
				<div style={{ textAlign: 'center' }}>
					<Link route={`${catalogUrl}/${prev}`} prefetch scroll={false}>
						<a>Назад</a>
					</Link>
					<Link route={`${catalogUrl}/${next}`} prefetch scroll={false}>
						<a>Вперёд</a>
					</Link>
				</div>
			</Section>
		)
	} else {
		return <Error statusCode={404} />
	}

}

CatalogView.propTypes = {
	
}

const getVariables = ({ router }) => {
	const { company, name } = router.query
	const [number, year] = company.split('-')
	return {
		variables: { number, year, name }
	}
}

export default compose(
	withRouter,
	graphql(GET_CATALOG, { options: getVariables })
)(CatalogView)