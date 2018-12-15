import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import rootActions from '../actions/'
import TodoList from './TodoList'

class TodoListContainer extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      getTodos: PropTypes.func.isRequired,
      updateTodo: PropTypes.func.isRequired
    }).isRequired,
    pending: PropTypes.bool.isRequired,
    todos: PropTypes.instanceOf(Array).isRequired,
    error: PropTypes.object
  }

  componentDidMount() {
    this.props.actions.getTodos()
  }

  onChangeCompleteTodoInner = (complete, todoId) => {
    const { actions } = this.props
    actions.updateTodo(todoId, complete).then(() => {
      actions.getTodos(false)
    })
  }

  render() {
    const { pending, error, todos } = this.props
    let render = null
    if (pending) {
      render = (
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      )
    } else if (error) {
      render = <p className="red-text">Could not fetch todos :(</p>
    } else {
      render = <TodoList todos={todos} onChangeCompleteTodo={this.onChangeCompleteTodoInner} />
    }
    return (
      <div>
        {render}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pending: state.todos.pending,
    todos: state.todos.todos,
    error: state.todos.error
  }
}

export default connect(
  mapStateToProps,
  rootActions
)(TodoListContainer)
