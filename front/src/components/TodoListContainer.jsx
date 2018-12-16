import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import rootActions from '../actions/'
import TodoList from './TodoList'

class TodoListContainer extends PureComponent {
	static propTypes = {
		actions: PropTypes.shape({
			getTodos: PropTypes.func.isRequired,
			updateTodo: PropTypes.func.isRequired,
			deleteTodo: PropTypes.func.isRequired,
		}).isRequired,
		pending: PropTypes.bool.isRequired,
		todos: PropTypes.instanceOf(Array).isRequired,
		error: PropTypes.object,
	}

	componentDidMount() {
		this.props.actions.getTodos()
	}

	onChangeCompleteTodoInner = (complete, todoId) => {
		const { actions } = this.props
		console.log('udate')
		actions.updateTodo(todoId, complete).then(() => {
			actions.getTodos(false)
		})
	}

	onDeleteTodoInner = todoId => {
		const { actions } = this.props

		actions.deleteTodo(todoId).then(() => {
			actions.getTodos(false)
		})
	}

	render() {
		const { pending, error, todos } = this.props
		let render = null
		if (pending) {
			render = (
				<div className="preloader-wrapper small active">
					<div className="spinner-layer spinner-green-only">
						<div className="circle-clipper left">
							<div className="circle" />
						</div>
						<div className="gap-patch">
							<div className="circle" />
						</div>
						<div className="circle-clipper right">
							<div className="circle" />
						</div>
					</div>
				</div>
			)
		} else if (error) {
			render = <p className="red-text">Could not fetch todos :(</p>
		} else {
			render = (
				<TodoList
					todos={todos}
					onChangeCompleteTodo={this.onChangeCompleteTodoInner}
					onDeleteTodo={this.onDeleteTodoInner}
				/>
			)
		}
		return <div>{render}</div>
	}
}

const mapStateToProps = state => {
	return {
		pending: state.todos.pending,
		todos: state.todos.todos,
		error: state.todos.error,
	}
}

export default connect(
	mapStateToProps,
	rootActions
)(TodoListContainer)
