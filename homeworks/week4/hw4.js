const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': 'tm4ra1rlrgu90xwmddp165gfvyzawy',
    // eslint-disable-next-line quote-props
    'Accept': 'application/vnd.twitchtv.v5+json'
  }
}

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body)
    for (let i = 0; i < info.top.length; i++) {
      console.log(`${info.top[i].viewers} ${info.top[i].game.name}`)
    }
  }
}

request(options, callback)
