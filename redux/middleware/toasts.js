import { ADD_TOAST, REMOVE_TOAST, PAUSE_TOAST_TIMER, RESUME_TOAST_TIMER, removeToast } from '@/redux/ducks/toasts'

const toastTimeout = 5000/* * 20 * 60 * 24*/
const toastInterval = 1000

const toastsTimers = {}

const setTimer = (dispatch, id) => setInterval(() => {
	toastsTimers[id].timeLeft -= toastInterval
	if (toastsTimers[id].timeLeft <= 0) dispatch(removeToast(id))
}, toastInterval)


export default ({ dispatch, getState }) => next => ({ type, payload }) => {
	switch (type) {
		
		case ADD_TOAST: {
			// payload: { message, type }
			const id = getState().toasts.counter + 1
			payload.id = id
			toastsTimers[id] = { timeLeft: toastTimeout, timer: setTimer(dispatch, id) }
			return next({ type, payload })
		}

		case REMOVE_TOAST: {
			// payload: id
			clearInterval(toastsTimers[payload].timer)
			delete toastsTimers[payload]
			const restToasts = getState().toasts.items.filter(toast => toast.id !== payload)
			return next({ type, payload: restToasts })
		}

		case PAUSE_TOAST_TIMER: {
			// payload: id
			if (toastsTimers[payload]) clearInterval(toastsTimers[payload].timer)
			return next({ type, payload })
		}

		case RESUME_TOAST_TIMER: {
			// payload: id
			if (toastsTimers[payload]) toastsTimers[payload].timer = setTimer(dispatch, payload)
			return next({ type, payload })
		}

		default:
			next({ type, payload })
	}
}