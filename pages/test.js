import React from 'react'
import PropTypes from 'prop-types'
import 'bulma/bulma.sass'
import '@/assets/test.sass'
import '@/assets/1.css'
import A from '@/components/test/A'
import B from '@/components/test/B'

const Test = () => {
	return (
		<div>
			<h3 className="subtitle">Test</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
			<A />
			<B />
			<div className="has-text-danger">123</div>
		</div>
	)
}

Test.propTypes = {
	
}

export default Test