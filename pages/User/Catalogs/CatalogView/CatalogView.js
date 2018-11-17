import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'
import { GET_CATALOG } from '@/apollo/gql/catalogs.gql'
import { getValueSafely } from '@/libs/helpers'
import { findDOMNode } from 'react-dom'
import { Router } from '@/libs/routes'
import { Section, Loader } from '@/components/Elements'
import ImagesSpace from './ImagesSpace'
import NavButtons from './NavButtons'
import Preloads from './Preloads'
import Error from '@/components/Service/Error'

const getVariables = ({ router }) => {
	const { company, name } = router.query
	const [number, year] = company.split('-')
	return {
		variables: { number, year, name }
	}
}

@withRouter
@graphql(GET_CATALOG, { options: getVariables })
class CatalogView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isMounted: false,
			isRefetching: false,
			mode: null
		}
		const { page } = props.router.query
		this.state.mode
			= /^\d{1,3}$/.test(page) ? 'single'
			: /^\d{1,3}-\d{1,3}$/.test(page) ? 'double'
			: null
		
		const images = getValueSafely(props.data, 'getCatalog.images')
		if (images.length === 1) {
			this.state.isRefetching = true
			props.data.refetch()
				.then(() => this.setState({ isRefetching: false }))
		}
	}

	ratioBreakPoint = 65.5
	relation

	componentDidMount() {
		this.setState({ isMounted: true })
		window.addEventListener('resize', this.switchMode)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.switchMode)		
	}

	componentDidUpdate(props) {
		this.switchMode()
	}

	switchMode = () => {
		if (getValueSafely(this, 'relation.nodeType') !== 1) {
			this.relation = findDOMNode(this.relationRef)			
		}
		if (!getValueSafely(this, 'relation.getBoundingClientRect')) { return }

		const { mode } = this.state
		const { name, company, page } = this.props.router.query
		const { count, images } = getValueSafely(this.props.data, 'getCatalog')

		const { width, height } = this.relation.getBoundingClientRect()
		const ratio = 100 * height / width

		const catalogPath = `/catalogs/${company}/${name}`
		let lastNum = +page.match(/(\d+)$/)[1]

		if (mode === 'double' && ratio > this.ratioBreakPoint) {
			Router.pushRoute(`${catalogPath}/${lastNum}`)
		}
		if (mode === 'single' && ratio <= this.ratioBreakPoint) {
			lastNum = lastNum % 2 === 1 ? lastNum : images[lastNum] ? lastNum + 1 : 1
			const firstNum = images[lastNum - 2] ? lastNum - 1 : count
			Router.pushRoute(`${catalogPath}/${firstNum}-${lastNum}`)
		}
	}

	calcSingleMode() {
		const { page } = this.props.router.query
		const { images, count } = this.props.data.getCatalog

		const index1 = page - 1

		if (!images[index1]) return { error: true }

		const prev = index1 === 0 ? count : index1
		const next = index1 === count - 1 ? 1 : index1 + 2
		return { index1, next, prev }
	}

	calcDoubleMode() {
		const { page } = this.props.router.query
		const { images, count } = this.props.data.getCatalog

		const [index1, index2] = page.split('-').map(num => num - 1)

		const isFirst = index1 === count - 1 && index2 === 0
		const isSecond = index1 === 1 && index2 === 2
		const isPreLast = index1 === count - 3 && index2 === count - 2

		const error
			= !isFirst && index2 - index1 !== 1 ? true
			: index1 % 2 !== 1 || index2 % 2 !== 0 ? true
			: !images[index1] || !images[index2] ? true
			: false
		if (error) return { error: true }

		const prev = isFirst ? [count - 2, count - 1] : isSecond ? [count, 1] : [index1 - 1, index2 - 1]
		const next = isFirst ? [2, 3] : isPreLast ? [count, 1] : [index1 + 3, index2 + 3]

		return { index1, index2, next, prev }
	}

	render() {
		const { isRefetching, isMounted, mode } = this.state
		const { router, data: { loading, getCatalog } } = this.props
		if (loading || isRefetching) { return <Loader /> }
		if (!getCatalog) { return <Error statusCode={404} /> }

		const { title, images, count } = getCatalog
		let { company, name, page } = router.query
		const catalogUrl = `/catalogs/${company}/${name}`
		
		const { index1, index2, next, prev, error }
			= mode === 'single' ? this.calcSingleMode()
			: mode === 'double' ? this.calcDoubleMode()
			: { error: true }

		if (error) { return <Error statusCode={404} /> }

		return (
			<Section title={`Каталог ${title}`}>
				<ImagesSpace
					ref={ref => this.relationRef = ref}
					title={title}
					images={images}
					index1={index1}
					index2={index2}
					double={mode === 'double'}
				/>
				<Preloads
					preload={isMounted}
					url={catalogUrl}
					next={next}
					prev={prev}
					double={mode === 'double'}
					images={images}
				/>
				<NavButtons
					url={catalogUrl}
					next={next}
					prev={prev}
					double={mode === 'double'}
				/>
			</Section>
		)
	}
}

CatalogView.propTypes = {
	
}

export default CatalogView