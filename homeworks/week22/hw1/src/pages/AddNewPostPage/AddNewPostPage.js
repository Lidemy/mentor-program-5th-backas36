import { useState } from "react"
import styled from "@emotion/styled"
import { postNewPost } from '../../WebAPI'
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



const AddNewPostPage = () => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [errorMsg, setErrorMsg] = useState()
  const history = useHistory()

  const handleSubmit = async (e) => {
    console.log(postTitle, postBody)
    setErrorMsg(null)
    if (!postTitle || !postBody) return setErrorMsg('請填入完整內容')
    const result = await postNewPost(postTitle, postBody)
    try {
      if (result.ok === 0) return setErrorMsg(result.message)
      history.push('/')
    } catch {
      setErrorMsg('請稍後再試試看')
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div>
        <InputTItle>文章標題
          <input value={postTitle} onChange={e => setPostTitle(e.target.value)} />
        </InputTItle>
      </div>
      <div>
        <InputTItle>
          文章內容
          <textarea value={postBody} rows={'10'} onChange={e => setPostBody(e.target.value)} />
        </InputTItle>
      </div>
      <ButtonWrapper>
        <Button type="submit">新增文章</Button>
        <Button>重新填寫</Button>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </ButtonWrapper>
    </FormWrapper>
  )
}

export default AddNewPostPage