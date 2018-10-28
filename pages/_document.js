import Document, { Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<html lang="en">
				<Head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<link rel="icon" type="image/png" sizes="192x192"  href="/static/android-icon-192x192.png?v=2" />
					<link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png?v=2" />
					<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png?v=2" />
					<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png?v=2" />
					<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
					<script src="/static/nprogress.js" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}

export default MyDocument