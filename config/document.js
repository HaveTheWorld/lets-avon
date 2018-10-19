import React from 'react'

export default ({ Html, Head, Body, children, siteData }) => (
	<Html lang="en">
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<link rel="icon" type="image/png" href="/favicon.png?v=2" />
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css" />
			<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
			<title>{siteData.title}</title>
		</Head>
		<Body>{children}</Body>
	</Html>
)