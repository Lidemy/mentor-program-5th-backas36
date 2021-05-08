const request = require('request')
const process = require('process')

const url = 'https://restcountries.eu/rest/v2/name'
const countryName = process.argv[2]

function main() {
  if (!countryName) {
    return console.log('請輸入國家名稱')
  }
  request(`${url}/${countryName}`, (error, response, body) => {
    let data
    try {
      data = JSON.parse(body)
    } catch (e) {
      console.log(e)
    }
    if (data.status === 404) {
      return console.log('找不到這個國家')
    }
    for (let i = 0; i < data.length; i++) {
      console.log('============')
      console.log(
        `國家：${data[i].name}
首都：${data[i].capital}
貨幣：${data[i].currencies[0].code}
國碼：${data[i].callingCodes}`)
    }
  })
}

main()
