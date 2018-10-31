import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import toastsMiddleware from '@/redux/middleware/toasts'

import toasts from '@/redux/ducks/toasts'

const reducer = combineReducers({
	toasts
})

const enhancer = composeWithDevTools(
	applyMiddleware(
		thunkMiddleware,
		toastsMiddleware
	)
)

export default () => createStore(reducer, undefined, enhancer)