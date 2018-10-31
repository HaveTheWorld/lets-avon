import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const Section1 = dynamic(() => import('./Section1'))
const Section2 = dynamic(() => import('./Section2'))
const Section3 = dynamic(() => import('./Section3'))

const Home = () => {
	return (
		<Fragment>
			<Section1 />
			<Section2 />
			<Section3 />
		</Fragment>
	)
}

export default Home