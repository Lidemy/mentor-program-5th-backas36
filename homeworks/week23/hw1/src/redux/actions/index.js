import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, DELETE_COMPLETED_TODO, SET_FILTER } from "./actionTypes";

let todoId = 0

export const addTodo = content => {
  return {
    type: ADD_TODO,
    payload: {
      id: todoId++,
      content
    }
  }
}

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id
    }
  }
}
export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: { id }
})

export const deleteCompletedTodo = () => ({
  type: DELETE_COMPLETED_TODO
})

export const setFilter = selectedFilter => (
  {
    type: SET_FILTER,
    payload: {
      filter: selectedFilter
    }
  }
);