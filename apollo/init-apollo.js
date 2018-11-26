import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { createUploadLink } from 'apollo-upload-client'
import fetch from 'isomorphic-unfetch'

let apolloClient = null
let token = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch
}

function create (initialState) {
	token = initialState.token

	const authLink = new ApolloLink((operation, forward) => {
		token && operation.setContext({
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		return forward(operation)
	})
	// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
	return new ApolloClient({
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		link: ApolloLink.from([
			authLink,
			createUploadLink({
				uri: `${process.env.STATIC_SSR_ORIGIN}${process.env.STATIC_API_ENDPOINT}`,
				credentials: 'same-origin'
			})
		]),
		cache: new InMemoryCache().restore(initialState || {})
	})
}

export default function initApollo (initialState) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create(initialState)
	}

	// Reuse client on the client-side
	if (!apolloClient || token !== initialState.token) {
		apolloClient = create(initialState)
	}

	return apolloClient
}