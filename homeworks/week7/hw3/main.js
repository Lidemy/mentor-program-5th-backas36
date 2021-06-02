const todoInput = document.querySelector('.todo-input')
const addBtn = document.querySelector('.add-btn')
const todoListUl = document.querySelector('.todo-list-ul')

// eventListener
document.addEventListener('DOMContentLoaded', showTodos)
addBtn.addEventListener('click', addTodo)
todoListUl.addEventListener('click', removeTodo)

// function
function addTodo(event) {
  event.preventDefault()
  if (!todoInput.value) {
    alert('不能空白唷 😏 ！！')
    return
  }
  const todoLi = document.createElement('li')
  const newTodo = document.createElement('span')
  newTodo.textContent = todoInput.value
  newTodo.classList.add('todo-item')
  todoLi.appendChild(newTodo)

  saveLocalTodos(todoInput.value)

  const completedBtn = document.createElement('button')
  completedBtn.innerHTML = '<i class="fas fa-check "></i>'
  completedBtn.classList.add('completed-btn')
  todoLi.appendChild(completedBtn)

  const trashBtn = document.createElement('button')
  trashBtn.innerHTML = '<i class="fas fa-trash "></i>'
  trashBtn.classList.add('trash-btn')
  todoLi.appendChild(trashBtn)

  todoListUl.appendChild(todoLi)

  todoInput.value = ''
}

function removeTodo(event) {
  const item = event.target
  if (item.classList[0] === 'trash-btn') {
    removeLocalTodos(item.parentElement)
    item.parentElement.remove()
  }
  if (item.classList[0] === 'completed-btn') {
    item.previousElementSibling.classList.toggle('completed')
  }
}

function getTodoArr() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  return todos
}

function saveLocalTodos(todo) {
  const todos = getTodoArr()
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function showTodos() {
  const todos = getTodoArr()
  todos.forEach((todo) => {
    const todoLi = document.createElement('li')
    const newTodo = document.createElement('span')
    newTodo.textContent = todo
    newTodo.classList.add('todo-item')
    todoLi.appendChild(newTodo)

    const completedBtn = document.createElement('button')
    completedBtn.innerHTML = '<i class="fas fa-check "></i>'
    completedBtn.classList.add('completed-btn')
    todoLi.appendChild(completedBtn)

    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<i class="fas fa-trash "></i>'
    trashBtn.classList.add('trash-btn')
    todoLi.appendChild(trashBtn)

    todoListUl.appendChild(todoLi)
  })
}

function removeLocalTodos(todo) {
  const todos = getTodoArr()
  const todoStr = todo.childNodes[0].textContent
  todos.splice(todos.indexOf(todoStr), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}
