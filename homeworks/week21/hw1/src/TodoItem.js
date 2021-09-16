import './App.css'
import styled from 'styled-components'

const TodoItemLi = styled.li`
  display: flex;
  height: 100%;
  border-radius: 8px;
  margin: 8px 0;
  padding: 6px;
  border: 1px solid #264653;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 1px 9px rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  flex-wrap:wrap;

  &+&{
    margin-top: 15px;
  }

  &:hover .completed-btn,
  &:hover .trash-btn {
    display: inline-block;
  }
`

const TodoItemSpan = styled.span`
  color: #264653;
  flex: 1;
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 35px;

  ${props => props.$isCompleted && `
      opacity: 0.5;
      text-decoration: line-through;
  `
  }
`

const Button = styled.button`
background-color: #4F6A72;
color: #f1faee;
border: none;
padding: 0.3rem;
margin-left: 10px;
border-radius: 4px;
cursor: pointer;
opacity: 0.8;
transition: opacity .3s ease;
display: none;
  
  &.trash-btn {
  background-color: #ca6702;
  right: 2 %;
}
  &:hover{
  display: inline-block;
}
`

const TodoActionIcon = styled.i`
pointer - events: none;
`

export default function TodoItem({ todo, handleDeleteTodo, handleToggleIsCompleted }) {

  return (

    <TodoItemLi data-todo-id={todo.id}>
      <TodoItemSpan $isCompleted={todo.isCompleted}>{todo.content}</TodoItemSpan>

      <Button className="completed-btn" onClick={() => { handleToggleIsCompleted(todo.id) }}><TodoActionIcon className="fas fa-check "></TodoActionIcon></Button>
      <Button className="trash-btn" onClick={() => { handleDeleteTodo(todo.id) }}><TodoActionIcon className="fas fa-trash "></TodoActionIcon></Button>
    </TodoItemLi>

  )
}