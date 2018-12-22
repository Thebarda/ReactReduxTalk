import * as Status from './status'
import { setRequest } from './config'

export const GET_TODOS = 'GET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const START_EDIT_TODO = 'START_EDIT_TODO'

const endpoint = 'todo'

export const getTodos = (pending = true) => {
	return dispatch => {
		if (pending) {
			dispatch({
				type: GET_TODOS,
				status: Status.PENDING,
			})
		}

		const request = setRequest(endpoint)

		request
			.then(res => {
				dispatch({
					type: GET_TODOS,
					status: Status.SUCCESS,
					payload: res.data,
				})
			})
			.catch(error => {
				dispatch({
					type: GET_TODOS,
					status: Status.ERROR,
					payload: { statusText: 'Can not retrieve todos' },
				})
			})
	}
}

export const addTodo = (todo, editTodo = null) => {
	return dispatch => {
		dispatch({
			type: ADD_TODO,
			status: Status.PENDING,
		})

		let request
		if (!editTodo) {
			request = setRequest(endpoint, 'POST', { todo, is_completed: false })
		} else {
			request = setRequest(endpoint, 'PATCH', { id: editTodo.id, todo })
		}

		return request
			.then(res => {
				dispatch({
					type: ADD_TODO,
					status: Status.SUCCESS,
				})
			})
			.catch(error => {
				dispatch({
					type: ADD_TODO,
					status: Status.ERROR,
					payload: { status: error.response.status, error: error.response.data },
				})
			})
	}
}

export const updateTodo = (id, complete) => {
	return dispatch => {
		const request = setRequest(endpoint, 'PATCH', { id, is_completed: complete })
		return request
			.then(() => {
				dispatch({
					type: UPDATE_TODO,
					status: Status.SUCCESS,
				})
			})
			.catch(error => {
				dispatch({
					type: UPDATE_TODO,
					status: Status.ERROR,
					payload: { status: error.response.status, statusText: error.response.statusText },
				})
			})
	}
}

export const deleteTodo = id => {
	return dispatch => {
		const request = setRequest(endpoint, 'DELETE', { id })
		return request
			.then(() => {
				dispatch({
					type: DELETE_TODO,
					status: Status.SUCCESS,
				})
			})
			.catch(error => {
				dispatch({
					type: DELETE_TODO,
					status: Status.ERROR,
					payload: { status: error.response.status, statusText: error.response.statusText },
				})
			})
	}
}

export const startEditTodo = todo => {
	return {
		type: START_EDIT_TODO,
		payload: {
			todo,
		},
	}
}
