import { useSelector, useDispatch } from 'react-redux'
import { List, Tooltip, Button } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { toggleTodo, deleteTodo } from '../redux/actions'

const selectTodoById = (state, todoId) => {
  return state.todos.find(todo => todo.id === todoId)
}

const TodoItem = ({ todoId }) => {

  const todo = useSelector(state => selectTodoById(state.todos, todoId))
  const dispatch = useDispatch()

  return (
    < List.Item
      style={todo.completed ? { textDecoration: 'line-through' } : {}}
      actions={[
        <Tooltip title="completed">
          <Button
            type={todo.completed ? "primary" : "ghost"}
            shape="circle"
            icon={<CheckOutlined />}
            size="middle"
            onClick={() => dispatch(toggleTodo(todo.id))}
          />
        </Tooltip>,
        <Tooltip title="delete">
          <Button
            type="ghost"
            shape="circle"
            icon={<DeleteOutlined />}
            size="middle"
            danger={true}
            ghost={true}
            onClick={() => dispatch(deleteTodo(todo.id))}
          />
        </Tooltip>,
      ]}
    >{todo.content}</List.Item>
  )
}

export default TodoItem
