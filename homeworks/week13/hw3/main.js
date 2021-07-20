// common variable
const navMenu = document.querySelector('.nav__menu')
const toggleMenu = document.querySelector('.toggle__menu')
const logo = document.querySelector('.logo')

const errMsg = `Server have something wrong ...,
plz try later`

const STREAM_TEMPLATE = `<div class="stream">
          <div class="preview">
            <img src="$preview">
          </div>
          <div class="stream__body">
            <div class="stream__logo">
              <img src="$logo">
            </div>
            <div class="stream__info">
              <div class="stream__status">
                $status
              </div>
              <div class="stream__name">
                $display_name
              </div>
            </div>
          </div>
        </div>`

// mobile btn
toggleMenu.addEventListener('click', () => {
  navMenu.classList.toggle('menu_active')
})
logo.addEventListener('click', () => {
  const gameName = navMenu.querySelector('li').textContent
  renderStreamsCards(gameName)
})
navMenu.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'li') {
    const gameName = event.target.textContent
    renderStreamsCards(gameName)
  }
})
const setRequest = (endPoint, callback) => {
  const request = new XMLHttpRequest()
  const API_URL = 'https://api.twitch.tv/kraken'
  const CLIENT_ID = 'tm4ra1rlrgu90xwmddp165gfvyzawy'
  const ACCEPT = 'application/vnd.twitchtv.v5+json'

  request.open('GET', API_URL + endPoint, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', ACCEPT)
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      let data
      try {
        data = JSON.parse(this.response)
        if (!data) {
          alert(errMsg)
          return
        }
      } catch (error) {
        alert(errMsg)
        return
      }
      callback(undefined, data)
    } else {
      alert(errMsg)
    }
  }
  request.onerror = function() {
    alert(errMsg)
  }
  request.send()
}
const renderNavbar = (topGames) => {
  topGames.forEach((topGame) => {
    const element = document.createElement('li')
    element.classList.add('menu_item')
    element.textContent = topGame.game.name
    navMenu.appendChild(element)
  })
  renderStreamsCards(topGames[0].game.name)
}

const getTopGamesFromServer = async() => {
  const endPoint = '/games/top?limit=5'
  const API_URL = 'https://api.twitch.tv/kraken'
  const CLIENT_ID = 'tm4ra1rlrgu90xwmddp165gfvyzawy'
  const ACCEPT = 'application/vnd.twitchtv.v5+json'

  const response = await fetch(API_URL + endPoint, {
    method: 'GET',
    headers: new Headers({
      'Client-ID': CLIENT_ID,
      Accept: ACCEPT
    })
  })
  if (response.status !== 200) {
    throw new Error('resource API something wron.. QQ')
  }
  const data = await response.json()
  return data
}

getTopGamesFromServer()
  .then((data) => {
    const topGames = data.top
    renderNavbar(topGames)
  })
  .catch((error) => {
    alert(`something wrong... ${error.message}`)
  })

const getStreams = (gameName, callback) => {
  const endPoint = `/streams/?game=${encodeURIComponent(gameName)}&limit=20`
  setRequest(endPoint, callback)
}

const appendEmpty = () => {
  const element = document.createElement('div')
  element.classList.add('stream--empty')
  document.querySelector('.streams').appendChild(element)
}
const appendStream = (stream) => {
  const element = document.createElement('div')
  document.querySelector('.streams').appendChild(element)
  element.outerHTML = STREAM_TEMPLATE
    .replace('$preview', stream.preview.large)
    .replace('$logo', stream.channel.logo)
    .replace('$status', stream.channel.status)
    .replace('$display_name', stream.channel.display_name)
}

const renderStreamsCards = (gameName) => {
  document.querySelector('.game__title').textContent = gameName
  document.querySelector('.streams').innerHTML = ''
  getStreams(gameName, (error, streams) => {
    if (error) {
      alert(errMsg)
    }
    streams.streams.forEach((stream) => appendStream(stream))
    appendEmpty()
    appendEmpty()
    navMenu.querySelectorAll('li').forEach((li) => {
      li.classList.remove('link--active')
      if (li.textContent === gameName) {
        li.classList.add('link--active')
      }
    })
  })
}
