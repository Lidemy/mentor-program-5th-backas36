const errorMsg = '系統不穩定，請再試一次'
const prizeAPI = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const prizes = {
  FIRST: {
    title: '恭喜你中頭獎了！日本東京來回雙人遊！',
    className: 'result__bg-first'
  },
  SECOND: {
    title: '二獎！90 吋電視一台！',
    className: 'result__bg-second'
  },
  THIRD: {
    title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
    className: 'result__bg-third'
  },
  NONE: {
    title: '銘謝惠顧',
    className: 'result__bg-none'
  }
}

document.querySelector('.lottery__btn').addEventListener('click', () => {
  getPrize((error, data) => {
    if (error) {
      alert(errorMsg)
      return
    }
    const { className, title } = prizes[data.prize]
    showPrize(className, title)
  })
})
const getPrize = (callback) => {
  const prizeRequest = new XMLHttpRequest()
  prizeRequest.open('GET', prizeAPI, true)
  prizeRequest.onload = function() {
    if (prizeRequest.status >= 200 && prizeRequest.status < 400) {
      let data
      try {
        data = JSON.parse(prizeRequest.response)
        if (!data.prize) {
          callback(errorMsg)
          return
        }
      } catch (error) {
        callback(errorMsg)
        return
      }
      callback(undefined, data)
    } else {
      callback(errorMsg)
    }
  }
  prizeRequest.onerror = function() {
    callback(errorMsg)
  }
  prizeRequest.send()
}

const showPrize = (className, title) => {
  document.querySelector('.lottery__infos').classList.add('lottery-hide')
  document.querySelector('.lottery__result').classList.remove('lottery-hide')
  document.querySelector('.lottery').classList.add(className)
  document.querySelector('.result__title').textContent = title
  if (className === 'result__bg-none') document.querySelector('.result__title').classList.add('result__title-none')
}
