import { GET_TODOS, ADD_TODO } from '../actions/todosActionsCreators'
import * as Status from '../actions/status'

const initialState = {
  todos: [],
  pending: false,
  pendingCreate: false,
  error: null,
  errorCreate: null
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
            error: null
          }
        case Status.SUCCESS:
          return {
            ...state,
            pending: false,
            todos: payload,
            error: null
          }
        case Status.ERROR:
          return {
            ...state,
            pending: false,
            error: payload
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
          errorCreate: null
        }
      case Status.SUCCESS:
        return {
          ...state,
          pendingCreate: false,
          errorCreate: null
        }
      case Status.ERROR:
        return {
          ...state,
          pendingCreate: false,
          errorCreate: payload
        }
      default:
        return state
    }
    default:
      return state
  }
}

export default todos