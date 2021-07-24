import $ from 'jquery'
import { getComments, addComments } from './api'
import appendCommentToDOM from './utils'
import { getFormHTML, getLoadMoreButton } from './templates'

export const init = (requestCustomData) => {
  let commentsDOM = null
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector
  let loadFieldClassName
  let loadFieldSelector

  const requestData = {
    site_key: '',
    before: 0,
    lastId: null,
    isEnd: false,
    apiUrl: '',
    containerSelector: null
  }

  requestData.site_key = requestCustomData.site_key
  requestData.apiUrl = requestCustomData.apiUrl
  requestData.containerSelector = requestCustomData.containerSelector

  

  formClassName = `${requestData.site_key}-add__comment__form`
  formSelector = '.' + formClassName

  commentsClassName = `${requestData.site_key}-comments`
  commentsSelector = '.' + commentsClassName

  loadMoreClassName = `${requestData.site_key}-load__btn`
 
  loadFieldClassName = `${requestData.site_key}-load__field`
  loadFieldSelector = '.' + loadFieldClassName

  const containerElement = $(requestData.containerSelector)
  containerElement.append(getFormHTML(formClassName,commentsClassName, loadFieldClassName))

  
  commentsDOM = $(commentsSelector)


  const getNewComments = (requestData) => {
    $(loadFieldSelector).empty()

    if (requestData.isEnd) {
      return
    }
    getComments(requestData, (error, response) => {
      if (error) {
        alert(error)
        return
      }

      const comments = response.discussions
      const commentsLength = comments.length

      comments.forEach(comment => {
        appendCommentToDOM(commentsDOM, comment)
      })
      if (commentsLength === 0) {
        requestData.isEnd = true
        return
      } else {
        requestData.lastId = comments[comments.length - 1].id
        requestData.before = requestData.lastId
        const loadMoreButtomHTML = getLoadMoreButton(loadMoreClassName)
        $(loadFieldSelector).html(loadMoreButtomHTML)
      }
    })
  }

  getNewComments(requestData)

  $(loadFieldSelector).on('click', $(`.${loadMoreClassName}`), () => {
    getNewComments(requestData)
  })


  const addCommentCb = (requestData, newCommentData) => {
    addComments(requestData, newCommentData, (error, response) => {
      if (error) {
        alert(error)
        return
      }

      alert('留言新增成功')
      commentsDOM.empty()
      requestData.before = 0
      requestData.lastId = null
      requestData.isEnd = false
      getNewComments(requestData)

      
    })
  }

  $(formSelector).on('submit', (event) => {
    event.preventDefault()
    const nicknameDOM =  $(`${formSelector} input[name=nickname]`)
    const cotentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key:requestData.site_key, 
      nickname: nicknameDOM.val(),
      content: cotentDOM.val()
    }
    addCommentCb(requestData, newCommentData)

    nicknameDOM.val('')
    cotentDOM.val('')
  })
}
