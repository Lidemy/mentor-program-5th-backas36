const request = require('request')

request({
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': 'tm4ra1rlrgu90xwmddp165gfvyzawy',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}, (err, res, body) => {
  let data
  try {
    data = JSON.parse(body)
  } catch (err) {
    return console.log(err)
  }
  for (let i = 0; i < data.top.length; i++) {
    console.log(`${data.top[i].viewers} ${data.top[i].game.name}`)
  }
})
