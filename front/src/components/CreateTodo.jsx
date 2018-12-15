import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import rootActions from '../actions/'

class CreateTodo extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      addTodo: PropTypes.func.isRequired,
      getTodos: PropTypes.func.isRequired
    }).isRequired,
    pending: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  state = {
    todo: ''
  }

  onAddTodo = () => {
    const { todo } = this.state
    const { actions } = this.props
    actions.addTodo(todo).then(res => {
      if (todo) {
        actions.getTodos(false)
        this.setState({ todo: '' })
      }
    })
  }

  handleTodoInput = e => {
    this.setState({ todo: e.target.value })
  }

  render() {
    const { pending, error } = this.props
    const { todo } = this.state
    return (
      <div>
        <h2>Add todo</h2>
        <div className="input-field">
          <input placeholder="Enter a todo" id="todo" type="text" className="validate" onChange={this.handleTodoInput} value={todo} />
          <label htmlFor="todo">Todo</label>
        </div>
        <button className={`waves-effect btn wave-light ${pending ? 'disabled' : ''}`} onClick={this.onAddTodo}>
          {pending ? <i className="material-icons left">refresh</i> : null }
          Add
        </button>
        {error ? <p className="red-text">{error.error.todo}</p> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pending: state.todos.pendingCreate,
    error: state.todos.errorCreate
  }
}

export default connect(
  mapStateToProps,
  rootActions
)(CreateTodo)
