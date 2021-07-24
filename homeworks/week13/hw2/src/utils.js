const escapeOutput = (toOutput) => {
  toOutput.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27')
    .replace(/\//g, '&#x2F')
}

const appendCommentToDOM = (targetDOM, comment) => {
  const html = `
    <div class="card comment mb-3">
      <div class="card-body">
        <h5 class="card-title">${escapeOutput(comment.nickname)}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${escapeOutput(comment.created_at)}</h6>
        <p class="card-text">${escapeOutput(comment.content)}</p>
      </div>
    </div>
    `
  targetDOM.append(html)
}

export { appendCommentToDOM as default }
