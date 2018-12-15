import { bindActionCreators } from 'redux'

import * as TodosActionsCreators from './todosActionsCreators'

const rootActions = dispatch => {
  return {
    actions: bindActionCreators({
      ...TodosActionsCreators
    },
    dispatch
    )
  }
}

export default rootActions