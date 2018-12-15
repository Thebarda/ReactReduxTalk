import React, { PureComponent } from 'react'
import TodoListContainer from './TodoListContainer'
import CreateTodo from './CreateTodo'

class Root extends PureComponent {

  render() {
    return (
      <div className="container center-align row">
        <div className='col s3 offset-s3'>
          <CreateTodo />
        </div>
        <div className='col s3'>
          <TodoListContainer />
        </div>
      </div>
    )
  }
}

export default Root
