import React from 'react'
import App, { Container } from 'next/app'

import withApolloClient from '@/libs/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import initStore from '@/redux/init-store'

import Router from 'next/router'
import requireAuth from '@/components/HOCs/requireAuth'
import Layout from '@/components/Layout'

const protectedRoutes = ['/admin']

@withApolloClient
@withRedux(initStore)
class MyApp extends App {

	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		if (ctx.res) {
			pageProps.redirect = (path) => ctx.res.redirect(path)
		}

		return { pageProps }
	}

	componentDidMount() {
		if (typeof NProgress !== 'undefined') {
			Router.events.on('routeChangeStart', () => NProgress.start())
			Router.events.on('routeChangeComplete', () => NProgress.done())
			Router.events.on('routeChangeError', () => NProgress.done())
		}
	}

	render () {
		let {Component, pageProps, apolloClient, store, redirect, router} = this.props

		if (protectedRoutes.includes(router.asPath)) {
			Component = requireAuth(Component)
		}

		return (
			<ApolloProvider client={apolloClient}>
				<Provider store={store}>
					<Container>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</Container>
				</Provider>
			</ApolloProvider>
		)
	}
}

export default MyApp