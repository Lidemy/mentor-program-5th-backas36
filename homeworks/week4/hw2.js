const request = require('request')
const process = require('process')

const url = 'https://lidemy-book-store.herokuapp.com/books'
const action = process.argv[2]
const params = process.argv[3]

const listBook = () => {
  request(`${url}?_limit=20`, (error, response, body) => {
    if (error) {
      return console.log('failed', error)
    }
    let data
    try {
      data = JSON.parse(body)
    } catch (e) {
      console.log(e)
    }
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  })
}

const readBook = (id) => {
  request(`${url}/${id}`, (error, response, body) => {
    if (error) {
      return console.log('failed', error)
    }
    let data
    try {
      data = JSON.parse(body)
    } catch (e) {
      console.log(e)
    }
    console.log(data.name)
  })
}

const deleteBook = (id) => {
  request.delete(`${url}/${id}`, (error, response, body) => {
    if (error) {
      return console.log('delete failed', error)
    }
    console.log('deleted')
  })
}

const createBook = (name) => {
  request.post({
    url,
    form: {
      name
    }
  }, (error, response, body) => {
    if (error) {
      return console.log('create failed', error)
    }
    console.log('Created!')
  })
}

const updateBook = (id, name) => {
  request.patch({
    url: `${url}/${id}`,
    form: {
      name
    }
  }, (error, response, body) => {
    if (error) {
      return console.log('update failed', error)
    }
    console.log('Updated!')
  })
}
switch (action) {
  case 'list':
    listBook()
    break
  case 'read':
    readBook(params)
    break
  case 'delete':
    deleteBook(params)
    break
  case 'create':
    createBook(params)
    break
  case 'update':
    updateBook(params, process.argv[4])
    break
  default:
    console.log('Just accept: list, read, delete, create and update')
}
