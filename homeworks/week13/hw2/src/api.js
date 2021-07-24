import $ from 'jquery'

export const getComments = (requestData, callback) => {
  const url = `${requestData.apiUrl}api_comments.php?site_key=${requestData.site_key}&before=${requestData.before}`

  $.ajax({
    type: 'GET',
    url,
    success: (response) => {
      if (!response.ok) {
        callback(response.message)
        return
      }
      callback(undefined, response)
    },
    error: (error) => {
      callback('這邊有錯')
    }
  })
}

export const addComments = (requestData,newCommentData, callback) => {
  const url = `${requestData.apiUrl}/api_add_comments.php`
  $.ajax({
    type: 'POST',
    url,
    data: newCommentData,
    success: (response) => {
      if (!response.ok) {
        callback(response.message)
        return
      }
      callback(undefined, response)
    },
    error: (error) => {
      callback('資料庫連線錯誤')
    }
  })
}
