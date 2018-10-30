import React from 'react'
import { graphql } from 'react-apollo'
import { GET_CURRENT_USER } from '@/graphql/auth.gql'
import { Router } from '@/libs/routes'

export default WrappedComponent => {

	const ReauireAuth = ({ redirect, data, ...props }) => {
		if (!data.loading && !data.user) {
			redirect('/login')
			return null
		}
		return <WrappedComponent {...props} />
	}

	return graphql(GET_CURRENT_USER)(ReauireAuth)
}