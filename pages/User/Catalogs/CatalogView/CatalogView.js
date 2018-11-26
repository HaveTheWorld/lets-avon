import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'
import { CatalogQuery } from '@/apollo/gql/catalogs.gql'
import { getNestedValue } from '@/libs/helpers'
import { Router } from '@/routes'
import { Section, Loader } from '@/components/Elements'
import Error from '@/components/Service/Error'
import Carousel from './Carousel'
import Preloads from './Preloads'
import NavItem from './NavItem'
import Goto from './Goto'
import css from './CatalogView.sass'

const getOptions = ({ router }) => {
	const { company, name } = router.query
	const [number, year] = company.split('-')
	return {
		variables: { number, year, name }
	}
}

@withRouter
@graphql(CatalogQuery, { options: getOptions })
class CatalogView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isMounted: false,
			mode: null,
			isZoomed: false
		}
		const { page } = props.router.query
		this.state.mode
			= /^\d{1,3}$/.test(page) ? 'single'
			: /^\d{1,3}-\d{1,3}$/.test(page) ? 'double'
			: null
	}	

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

	toggleZoom = bool => {
		this.setState({ isZoomed: bool })
	}

	switchMode = () => {
		if (this.state.isZoomed) { return }

		const bothFound = [this.wrapper, this.relation].every(ref => getNestedValue(ref, 'nodeType') === 1)
		if (!bothFound) { return }

		const wrapperWidth = this.wrapper.getBoundingClientRect().width
		const relationWidth = this.relation.getBoundingClientRect().width

		const { mode } = this.state
		const { name, company, page } = this.props.router.query
		const { count, images } = getNestedValue(this.props.data, 'catalog')

		const { width, height } = this.relation.getBoundingClientRect()
		const ratio = 100 * height / width

		const catalogPath = `/catalogs/${company}/${name}`
		let lastNum = +page.match(/(\d+)$/)[1]

		if (mode === 'double' && wrapperWidth - relationWidth < 10) {
			window.innerWidth < 1700 && Router.pushRoute(`${catalogPath}/${lastNum}`)
		}
		if (mode === 'single' && wrapperWidth - relationWidth * 2 > 10) {
			lastNum = lastNum % 2 === 1 ? lastNum : images[lastNum] ? lastNum + 1 : 1
			const firstNum = images[lastNum - 2] ? lastNum - 1 : count
			Router.pushRoute(`${catalogPath}/${firstNum}-${lastNum}`)
		}
	}

	calcSingleMode() {
		const { page } = this.props.router.query
		const { images, count } = this.props.data.catalog

		const index1 = page - 1

		if (!images[index1]) return { error: true }

		const prev = index1 === 0 ? count : index1
		const next = index1 === count - 1 ? 1 : index1 + 2
		return { index1, next, prev }
	}

	calcDoubleMode() {
		const { page } = this.props.router.query
		const { images, count } = this.props.data.catalog

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
		const { isMounted, mode } = this.state
		const { router, data: { loading, catalog } } = this.props
		if (loading) { return <Loader /> }
		if (!catalog) { return <Error statusCode={404} /> }

		const { title, images, count } = catalog
		let { company, name, page } = router.query
		const catalogUrl = `/catalogs/${company}/${name}`
		
		const { index1, index2, next, prev, error }
			= mode === 'single' ? this.calcSingleMode()
			: mode === 'double' ? this.calcDoubleMode()
			: { error: true }

		if (error) { return <Error statusCode={404} /> }

		return (
			<Section
				title={`Каталог ${title}`}
				rightBlock={() => (
					<Goto count={count} mode={mode} url={catalogUrl} />
				)}
			>
				<div className={css.wrapper} ref={ref => this.wrapper = ref}>
					<NavItem
						target="prev"
						url={catalogUrl}
						next={next}
						prev={prev}
						double={mode === 'double'}
					/>
					<div
						className={cls(css.relation, 'animated', 'fadeIn')}
						ref={ref => this.relation = ref}
					>
						<Carousel
							title={title}
							images={images}
							index1={index1}
							index2={index2}
							double={mode === 'double'}
							toggleZoom={this.toggleZoom}
						/>
					</div>
					<NavItem
						target="next"
						url={catalogUrl}
						next={next}
						prev={prev}
						double={mode === 'double'}
					/>
				</div>
				<Preloads
					preload={isMounted}
					url={catalogUrl}
					next={next}
					prev={prev}
					double={mode === 'double'}
					images={images}
				/>
			</Section>
		)
	}
}

CatalogView.propTypes = {
	
}

export default CatalogView