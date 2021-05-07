const request = require('request')
const process = require('process')

if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20', (error, response, body) => {
    const data = JSON.parse(body)
    for (let i = 0; i < 20; i++) {
      console.log(`${data[i].id} ${data[i].name}`)
    }
  })
}
if (process.argv[2] === 'read') {
  request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`, (error, response, body) => {
    const data = JSON.parse(body)
    console.log(data.name)
  })
}
if (process.argv[2] === 'delete') {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`, (error, response, body) => {
      console.log(response.statusCode)
    })
}
if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form:
      {
        name: process.argv[3]
      }
    },
    (error, response, body) => {
      console.log(response.statusCode)
    })
}
if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form:
      {
        name: process.argv[4]
      }
    },
    (error, response, body) => {
      console.log(response.statusCode)
    })
}
