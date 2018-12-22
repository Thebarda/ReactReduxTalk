import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO, START_EDIT_TODO } from '../actions/todosActionsCreators'
import * as Status from '../actions/status'

const initialState = {
	todos: [],
	edit: null,
	pending: false,
	pendingCreate: false,
	error: null,
	errorCreate: null,
}

const todos = (state = initialState, action) => {
	const { type, status, payload } = action
	switch (type) {
		case GET_TODOS:
			switch (status) {
				case Status.PENDING:
					return {
						...state,
						pending: true,
						error: null,
					}
				case Status.SUCCESS:
					return {
						...state,
						pending: false,
						todos: payload,
						error: null,
					}
				case Status.ERROR:
					return {
						...state,
						pending: false,
						error: payload,
					}
				default:
					return state
			}
		case ADD_TODO:
			switch (status) {
				case Status.PENDING:
					return {
						...state,
						pendingCreate: true,
						errorCreate: null,
					}
				case Status.SUCCESS:
					return {
						...state,
						pendingCreate: false,
						errorCreate: null,
						edit: null,
					}
				case Status.ERROR:
					return {
						...state,
						pendingCreate: false,
						errorCreate: payload,
						edit: null,
					}
				default:
					return state
			}
		case UPDATE_TODO:
			switch (status) {
				case Status.ERROR:
					return {
						...state,
						error: payload,
						edit: null,
					}
				case Status.SUCCESS:
					return {
						...state,
						edit: null,
					}
				default:
					return state
			}
		case DELETE_TODO:
			switch (status) {
				case Status.ERROR:
					return {
						...state,
						error: payload,
					}
				default:
					return state
			}
		case START_EDIT_TODO:
			return {
				...state,
				edit: payload.todo,
			}
		default:
			return state
	}
}

export default todos
