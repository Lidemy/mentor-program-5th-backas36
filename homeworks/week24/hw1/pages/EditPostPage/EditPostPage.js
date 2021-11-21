import React, { useEffect, useState } from "react";
import styled from "@emotion/styled"
import { useParams } from "react-router";
import { getPost, patchPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"


const FormWrapper = styled.form`
  max-width:960px;
  margin:30px auto;
  box-shadow:0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%);
  padding:30px 20px;
  background-color:#fff;
  text-align:center;

  & div + div {
    margin:40px auto;
  }
`

const Button = styled.button`
  margin-top:60px;
  padding:8px 24px;
  border:1px solid #ccc;
  cursor:pointer;
  background-color:#fff;
  border-radius:4px;
  font-weight:bold;
  font-size:18px;
  color:rgba(0,0,0, 0.6);
  transition:background-color 0.2s;
  
  & + & {
    margin-left:20px;
  }

  &:hover {
    background-color:#ccc;
  }
`
const InputTItle = styled.label`
  font-weight:bold;
  font-size:18px;
  color:rgba(0,0,0, 0.6);
  
  & input{
    display:block;
    margin:20px  auto;
    width:80%;
  }

  & textarea{
    display:block;
    margin:20px auto;
    width:80%;
  }
`
const ButtonWrapper = styled.div`
  text-align: center;
`
const ErrorMsg = styled.div`
  margin-top:20px;
  color:#ef4a52;
`

const EditPostPage = () => {
  const [errorMsg, setErrorMsg] = useState()
  const [editedTitle, setEditedTitle] = useState('')
  const [editedBody, setEditedBody] = useState('')

  const history = useHistory()
  let { id } = useParams()
  const dispatch = useDispatch()

  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const post = useSelector(store => store.posts.post)



  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  const handleSubmit = async () => {
    setErrorMsg(null)
    if (!editedTitle || !editedBody) return setErrorMsg('請填入完整內容')
    try {
      const result = await dispatch(patchPost(id, { editedTitle, editedBody }))
      history.push('/posts/' + result.id)
    } catch {
      setErrorMsg('請稍後再試試看')
    }
  }

  const handleCleanClick = () => {
    setEditedTitle('')
    setEditedBody('')
    setErrorMsg('')
  }
  return (
    <>
      {isLoading ? <div>Loading...</div> : (
        <FormWrapper onSubmit={handleSubmit}>
          <div>
            <InputTItle>文章標題
              <input
                value={editedTitle}
                onChange={e => setEditedTitle(e.target.value)}
                placeholder={post.title}
              />
            </InputTItle>
          </div>
          <div>
            <InputTItle>
              文章內容
              <textarea
                value={editedBody}
                rows={'10'}
                onChange={e => setEditedBody(e.target.value)}
                placeholder={post.body}
              />
            </InputTItle>
          </div>
          <ButtonWrapper>
            <Button type="submit">確定修改</Button>
            <Button type="button" onClick={handleCleanClick}>重新填寫</Button>
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
          </ButtonWrapper>
        </FormWrapper>
      )
      }
    </>
  )
}

export default EditPostPage