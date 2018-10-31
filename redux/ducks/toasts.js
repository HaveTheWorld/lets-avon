/* ===== Constants ===== */
export const moduleName = 'toasts'

export const ADD_TOAST = `${moduleName}/ADD_TOAST`
export const REMOVE_TOAST = `${moduleName}/REMOVE_TOAST`
export const PAUSE_TOAST_TIMER = `${moduleName}/PAUSE_TOAST_TIMER`
export const RESUME_TOAST_TIMER = `${moduleName}/RESUME_TOAST_TIMER`

/* ===== Initial state ===== */
const initialState = {
	counter: 0,
	items: []
}

/* ===== Reducer ===== */
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_TOAST:
			return {
				counter: payload.id,
				items: [...state.items, payload]
			}
		case REMOVE_TOAST:
			return { ...state, items: payload }
		default:
			return state
	}
}

/* ===== Action creators ===== */
export const addToast = (message, type = null) => ({ type: ADD_TOAST, payload: { message, type: type || 'default' } })
export const removeToast = id =>  ({ type: REMOVE_TOAST, payload: id })
export const pauseToastTimer = id => ({ type: PAUSE_TOAST_TIMER, payload: id })
export const resumeToastTimer = id => ({ type: RESUME_TOAST_TIMER, payload: id })