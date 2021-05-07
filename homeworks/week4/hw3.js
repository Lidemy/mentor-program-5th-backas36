const request = require('request')
const process = require('process')

request(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => {
    const data = JSON.parse(body)
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
      console.log(
        `國家：${data[i].name}
首都：${data[i].capital}
貨幣：${data[i].currencies[0].code}
國碼：${data[i].callingCodes}
        `
      )
    }
  })
