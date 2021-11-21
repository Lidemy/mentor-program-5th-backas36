import { useSelector, useDispatch } from 'react-redux';

import 'antd/dist/antd.css'
import { Layout, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import { deleteCompletedTodo } from './redux/actions';

const { Header, Content } = Layout;

function TodoApp() {
  const { todos } = useSelector(state => state.todos)
  const dispatch = useDispatch()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff", fontSize: "20px" }}>
        Use React, Redux, and Antd Design build Todo APP
      </Header>
      <Content style={{ textAlign: "center", padding: "30px", margin: "0 auto", minWidth: "70vw" }}>
        <AddTodo />
        <TodoFilters />
        <TodoList />
        {todos.length ? (
          <Button
            icon={<ReloadOutlined />}
            type="primary"
            size="large"
            ghost
            style={{ marginTop: "60px" }}
            onClick={() => dispatch(deleteCompletedTodo())}
          >
            Clean Completed
          </Button>
        ) : ''}

      </Content>

    </Layout>
  );
}

export default TodoApp;
