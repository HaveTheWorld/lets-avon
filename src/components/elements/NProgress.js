import React from 'react'
import PropTypes from 'prop-types'
import { withLoading } from 'react-static'
import { sleep } from '@/utils/helpers'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import 'nprogress/nprogress.js'

nprogress.configure({ parent: '#content', showSpinner: false })

@withLoading
class NProgress extends React.Component {

	componentDidMount() {
		nprogress.start()
		window.addEventListener('load', async () => {
			await sleep(300)
			nprogress.done()
		})
	}

	async componentDidUpdate({ loading: oldLoading }) {
		const newLoading = this.props.loading

		if (!oldLoading && newLoading) {
			nprogress.start()
		} else if (oldLoading && !newLoading) {
			await sleep(300)
			nprogress.done()
		}
	}

	render() {
		return null
	}
}

NProgress.propTypes = {
	
}

export default NProgress