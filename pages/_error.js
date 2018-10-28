import React from 'react'

const Error = ({ statusCode }) => {
	// console.log(process.env.NODE_ENV)
	return (
		<p>
			{`An error ${statusCode} occurred on server`}
		</p>
	)
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err && err.statusCode ? err.statusCode : 500;
	return { statusCode }
}

export default Error