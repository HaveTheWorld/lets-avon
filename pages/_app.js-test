import React from 'react'
import App, { Container } from 'next/app'

import withApolloClient from '@/apollo/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import initStore from '@/redux/init-store'

import Router from 'next/router'
import Redirect from '@/components/HOCs/Redirect'
import Layout from '@/components/Layout'

@withApolloClient
@withRedux(initStore)
class MyApp extends App {

	static async getInitialProps({ Component, ctx }) {
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
		let {Component, pageProps, apolloClient, store, redirect} = this.props

		return (
			<ApolloProvider client={apolloClient}>
				<Provider store={store}>
					<Container>
						<Layout>
							<Redirect {...pageProps}>
								<Component />
							</Redirect>
						</Layout>
					</Container>
				</Provider>
			</ApolloProvider>
		)
	}
}

export default MyApp