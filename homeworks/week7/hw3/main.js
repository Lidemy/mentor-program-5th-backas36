document.addEventListener('DOMContentLoaded', () => {
  // common variables
  const todoListUl = document.querySelector('.todo-list-ul')
  const addBtn = document.querySelector('.add-btn')
  const todos = getLocalTodoArr()

  todos.forEach((todo) => {
    makeTodoElement(todo)
  })

  // eventListeners
  addBtn.addEventListener('click', addTodo)
  todoListUl.addEventListener('click', todoStatus)

  // functions
  function getLocalTodoArr() {
    let todos
    if (localStorage.getItem('todos') === null) {
      todos = []
    } else {
      todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
  }

  function makeTodoElement(todoValue) {
    const todoLi = document.createElement('li')
    todoLi.innerHTML = `<span class="todo-item">${todoValue}</span>
        <button class="completed-btn"><i class="fas fa-check "></i></button>
        <button class="trash-btn"><i class="fas fa-trash "></i></button>`
    todoListUl.appendChild(todoLi)
  }

  function addTodo(event) {
    event.preventDefault()
    const todoInput = document.querySelector('.todo-input')
    if (!todoInput.value) {
      alert('不能空白唷 😏 ！！')
      return
    }
    makeTodoElement(todoInput.value)
    saveLocalTodos(todoInput.value)
    todoInput.value = ''
  }

  function saveLocalTodos(todo) {
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function todoStatus(event) {
    const item = event.target
    if (item.classList[0] === 'trash-btn') {
      removeLocalTodos(item.parentElement)
      item.parentElement.remove()
    }
    if (item.classList[0] === 'completed-btn') {
      item.previousElementSibling.classList.toggle('completed')
    }
  }

  function removeLocalTodos(todo) {
    const todoStr = todo.childNodes[0].textContent
    todos.splice(todos.indexOf(todoStr), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
  }
})
