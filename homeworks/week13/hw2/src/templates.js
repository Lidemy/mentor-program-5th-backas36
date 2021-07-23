const getLoadMoreButtonTemplate = '<button type="button" class="{className} btn btn-primary">Load more</button>'
const formTemplate = `
    <div class="row ">
      <form class="{className}">
        <div class="mb-3 mt-3">
          <label class="form-label">暱稱</label>
          <input type="text" class="form-control"  name="nickname">
        </div>
        <div class="mb-3">
          <label class="form-label">留言內容</label>
          <textarea class="form-control" rows="5" name="content"></textarea>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary mb-3">送出</button>
        </div>
      </form>
    </div>

    <div class="row {commentsClassName}">
    </div>
    <div class="row d-grid gap-2 col-4 mx-auto {loadFieldClassName}">
      </div>
  `
export const getLoadMoreButton = (className) => {
  getLoadMoreButtonTemplate.replace(/{className}/, className)
}

export const getFormHTML = (className, commentsClassName, loadFieldClassName) => {
  formTemplate.replace(/{className}/, className)
    .replace(/{commentsClassName}/, commentsClassName)
    .replace(/{loadFieldClassName}/, loadFieldClassName)
}