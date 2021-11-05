import { useState, useContext } from "react"
import styled from "@emotion/styled"
import { useHistory } from "react-router-dom"

import { register, getMe } from '../../WebAPI'
import { setAuthToken } from '../../utils'
import { AuthContext } from "../../contexts"


const FormContainer = styled.form`
  max-width:960px;
  margin:30px auto;
  box-shadow:0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%);
  text-align:center;
  padding:30px 0;
  background-color:#fff;

  & div + div {
    margin-top:20px;
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
  margin-left:20px;
  
  &:hover {
    background-color:#ccc;
  }

`
const InputTitle = styled.label`
  font-weight:bold;
  font-size:18px;
  color:rgba(0,0,0, 0.6);
  & input{
    margin:0 12px;
  }
`
const ErrorMsg = styled.div`
  margin-top:20px;
  color:#ef4a52;
`


const RegisterPage = () => {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [errorMsg, setErrorMsg] = useState()
  const history = useHistory()

  const handleSubmit = async (e) => {
    setErrorMsg(null)
    if (!username || !nickname || !password || !password2) return setErrorMsg('請填入完整資料')

    if (password !== password2) return setErrorMsg('請確認兩次密碼是否相符')

    const registerResult = await register(username, nickname, password)
    try {
      if (registerResult.ok !== 1) return setErrorMsg(registerResult.message)

      setAuthToken(registerResult.token)
      const getUserData = await getMe()
      if (getUserData.ok !== 1) {
        setAuthToken(null)
        return setErrorMsg(getUserData.toString())
      }
      setUser(getUserData.data)
      history.push('/')
    } catch {
      setErrorMsg('請稍後再登入看看')
    }
  }

  const handleResetClick = () => {
    setErrorMsg(null)
    setUsername('')
    setNickname('')
    setPassword('')
    setPassword2('')
  }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <InputTitle>username
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </InputTitle>
      </div>
      <div>
        <InputTitle>nickname
          <input value={nickname} onChange={e => setNickname(e.target.value)} />
        </InputTitle>
      </div>
      <div>
        <InputTitle>
          password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </InputTitle>
      </div>
      <div>
        <InputTitle>
          comfirm password
          <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
        </InputTitle>
      </div>
      <Button type="reset" onClick={handleResetClick}>Reset</Button>
      <Button type="submit">Register</Button>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

    </FormContainer>
  )
}

export default RegisterPage