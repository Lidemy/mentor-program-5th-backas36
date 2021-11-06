import { useSelector, useDispatch } from 'react-redux';
import { List, Divider, Tooltip, Button } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { toggleTodo, deleteTodo } from '../redux/actions'
import { getTodosByFilter } from '../redux/selector'

const TodoList = () => {
  const todos = useSelector(state => getTodosByFilter(state))
  const dispatch = useDispatch()

  return (
    <>
      <Divider orientation="left">TodoList</Divider>
      {todos && todos.length ? (
        <List
          size="large"
          bordered

          style={{ fontSize: '1rem' }}
          dataSource={todos}
          renderItem={todo => (
            < List.Item
              style={todo.completed ? { textDecoration: 'line-through' } : {}}
              actions={[
                <Tooltip title="completed">
                  <Button
                    type="ghost"
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
          )}
        />
      ) : <div>No todo yet !</div>}

    </>
  )
}


export default TodoList