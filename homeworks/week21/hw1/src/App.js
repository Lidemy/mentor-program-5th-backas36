import styled from 'styled-components';
import { useState, useRef } from 'react';

import TodoItem from './TodoItem';
import './App.css';

const TodosWrapper = styled.div`
  padding: 20px;
  background-color: #f1faee;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  width: 400px;
  border-radius: 8px;
  margin: 80px 15px;
  & .title{
    font-weight: 800;
  text-align: center;
  font-size: 2.5rem;
  color: #264653;
  }
`

const AddTodoWrapper = styled.div`
  margin: 25px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;

  & input[type=text]{
    border:1px solid rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 80%;
    border-radius: 4px;
    padding:0px 10px;
    font-size: 1.2rem;
    box-sizing: border-box;
    transform: all .3s;
    &:hover{
      border:3px solid rgba(0, 0, 0, 0.3);
      border-color:#264653;
    }
  }

  & .add-btn{
    height: 100%;
    width: 10%;
    background-color: #264653;
    color: #f1faee;
    border: none;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s;

    &:hover{
       opacity: 1;
    }
  }
`
const TodoList = styled.div`
  margin: 0;
  padding: 0;
  & ul {
    padding:0;
    margin:0;
  }
`

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: 'todo1',
      isCompleted: false
    },
    {
      id: 2,
      content: 'todo2',
      isCompleted: true
    }
  ])

  const [value, setValue] = useState('')
  const id = useRef(3)

  const handleButtonClick = () => {
    setTodos([
      ...todos, {
        id: id.current,
        content: value,
        isDone: false,
      }]
    )
    setValue('')

    id.current++
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleIsCompleted = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isCompleted: !todo.isCompleted
      }
    }))
  }



  return (
    <div className="App">
      <TodosWrapper className="wrapper">
        <h2 className="title">Todo List App</h2>
        <AddTodoWrapper>
          <input type="text" className="todo-input" placeholder="Enter a task." onChange={handleInputChange} value={value} />
          <button className="add-btn" type="submit" onClick={handleButtonClick}><i className="fas fa-plus"></i></button>
        </AddTodoWrapper>
        <TodoList className="todo-list">
          <ul className="todo-list-ul">
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsCompleted={handleToggleIsCompleted} />)}
          </ul>

        </TodoList>
      </TodosWrapper>
    </div>
  );
}

export default App;
