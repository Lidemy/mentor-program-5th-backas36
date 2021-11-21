
export const getTodosState = store => store.todos

export const getTodosByFilter = (state) => {
  const selectedFilter = state.showFilter
  const { todos } = state.todos
  switch (selectedFilter) {
    case '已完成':
      return todos.filter(todo => todo.completed)
    case '未完成':
      return todos.filter(todo => !todo.completed)
    case 'all':
    default:
      return todos
  }
}

