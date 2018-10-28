import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import Layout from '@/components/Layout'

if (typeof NProgress !== 'undefined') {
	Router.events.on('routeChangeStart', () => NProgress.start())
	Router.events.on('routeChangeComplete', () => NProgress.done())
	Router.events.on('routeChangeError', () => NProgress.done())
}

class MyApp extends App {

	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	render () {
		const { Component, pageProps } = this.props

		return (
			<Container>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Container>
		)
	}
}

export default MyApp