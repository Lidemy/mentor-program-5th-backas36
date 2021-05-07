const request = require('request')

request('https://lidemy-book-store.herokuapp.com/books?_limit=10', (error, response, body) => {
  const data = JSON.parse(body)
  for (let i = 0; i < 10; i++) {
    console.log(`${data[i].id} ${data[i].name}`)
  }
})
