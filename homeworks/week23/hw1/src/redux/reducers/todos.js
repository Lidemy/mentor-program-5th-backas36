import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, DELETE_COMPLETED_TODO } from '../actions/actionTypes'

const initialState = {
  todos: []
}

const TodosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload
      return {
        todos: [...state.todos,
        {
          id,
          content,
          completed: false
        }
        ],
      }
    }
    case TOGGLE_TODO: {
      const { id } = action.payload
      return {
        todos: state.todos.map(todo => {
          if (todo.id !== id) {
            return todo
          }
          return {
            ...todo,
            completed: !todo.completed
          }
        })
      }
    }
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        todos: state.todos.filter(todo => todo.id !== id)
      }
    }

    case DELETE_COMPLETED_TODO: {
      return {
        todos: state.todos.filter(todo => !todo.completed)
      }
    }

    default:
      return state
  }
}

export default TodosReducer