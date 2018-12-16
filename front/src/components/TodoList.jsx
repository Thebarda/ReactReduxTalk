import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class TodoList extends PureComponent {
	static propTypes = {
		todos: PropTypes.instanceOf(Array).isRequired,
		onChangeCompleteTodo: PropTypes.func.isRequired,
		onDeleteTodo: PropTypes.func.isRequired,
	}

	render() {
		const { todos, onChangeCompleteTodo, onDeleteTodo } = this.props
		return (
			<div className="left-align">
				<h2>Todo List</h2>

				{todos.map(todo => (
					<div key={todo.id}>
						<form action="#">
							<p>
								<label>
									<input
										type="checkbox"
										className="filled-in"
										checked={todo.is_completed}
										onChange={e => onChangeCompleteTodo(e.target.checked, todo.id)}
									/>
									<span>{todo.todo}</span>
									<a href="#" onClick={() => onDeleteTodo(todo.id)}>
										<i style={{ marginLeft: '0.2rem' }} className="material-icons">
											delete
										</i>
									</a>
								</label>
							</p>
						</form>
					</div>
				))}
			</div>
		)
	}
}
