// common variable
const navMenu = document.querySelector('.nav__menu')
const toggleMenu = document.querySelector('.toggle__menu')
const logo = document.querySelector('.logo')

const errMsg = `Opps, There have something wrong ...,
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
  try {
    if (response.ok) {
      const data = await response.json()
      return data
    }
    throw new Error(errMsg)
  } catch (error) {
    alert(errMsg + error)
  }
}

(async() => {
  const data = await getTopGamesFromServer()
  const topGames = data.top
  renderNavbar(topGames)
})()

const renderNavbar = (topGames) => {
  topGames.forEach((topGame) => {
    const element = document.createElement('li')
    element.classList.add('menu__item')
    element.textContent = topGame.game.name
    navMenu.appendChild(element)
  })
  renderStreamsCards(topGames[0].game.name)
}

const renderStreamsCards = (gameName) => {
  document.querySelector('.game__title').textContent = gameName
  document.querySelector('.streams').innerHTML = '';

  // getStreams Promise
  (async() => {
    const data = await getStreamsFromServer(gameName)
    const { streams } = data
    streams.forEach((stream) => appendStream(stream))
  })()

  appendEmpty()
  appendEmpty()

  navMenu.querySelectorAll('li').forEach((li) => {
    li.classList.remove('link--active')
    if (li.textContent === gameName) {
      li.classList.add('link--active')
    }
  })
}

const getStreamsFromServer = async(gameName) => {
  const endPoint = `/streams/?game=${encodeURIComponent(gameName)}&limit=20`
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
  try {
    if (response.ok) {
      const data = await response.json()
      return data
    }
    throw new Error(errMsg)
  } catch (error) {
    alert(errMsg + error)
  }
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
