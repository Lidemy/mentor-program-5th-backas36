import { useSelector, shallowEqual } from 'react-redux';
import { List, Divider } from 'antd';

import TodoItem from './TodoItem';

const selectTodoIds = state => {
  const { todos } = state
  return todos.todos.map(todo => todo.id)
}



const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  return (
    <>
      <Divider orientation="left">TodoList</Divider>
      {todoIds && todoIds.length ? (
        <List
          size="large"
          bordered
          style={{ fontSize: '1rem' }}
          dataSource={todoIds}
        >
          {todoIds.map(todoId => <TodoItem key={`todo-item-${todoId}`} todoId={todoId} />)}
        </List>
      ) : <div>No todo yet !</div>}

    </>
  )
}


export default TodoList