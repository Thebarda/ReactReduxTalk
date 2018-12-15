import * as Status from './status'
import { setRequest } from './config'

export const GET_TODOS = 'GET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

const endpoint = 'todo'

export const getTodos = (pending = true) => {
  return dispatch => {
    if (pending) {
      dispatch({
        type: GET_TODOS,
        status: Status.PENDING
      })
    }

    const request = setRequest(endpoint)
      
    request.then(res => {
        dispatch({
          type: GET_TODOS,
          status: Status.SUCCESS,
          payload: res.data
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: GET_TODOS,
          status: Status.ERROR,
          payload: { statusText: 'Can not retrieve todos' }
        })
    })
  }
}

export const addTodo = todo => {
  return dispatch => {
    dispatch({
      type: ADD_TODO,
      status: Status.PENDING
    })

    const request = setRequest(endpoint, 'POST', { todo, is_completed: false })
    return request.then(res => {
      dispatch({
        type: ADD_TODO,
        status: Status.SUCCESS
      })
    })
    .catch(error => {
      dispatch({
        type: ADD_TODO,
        status: Status.ERROR,
        payload: { status: error.response.status, error: error.response.data }
      })
  })
  }
}

export const updateTodo = (id, complete) => {
  return dispatch => {
    const request = setRequest(endpoint, 'PATCH', { id, is_completed: complete })
    return request.then(() => {
      dispatch({
        type: UPDATE_TODO,
        status: Status.SUCCESS,
        payload: {id, complete}
      })
    })
    .catch(error => {
      dispatch({
        type: UPDATE_TODO,
        status: Status.ERROR,
        payload: { status: error.response.status, statusText: error.response.statusText }
      })
  })
  }
}