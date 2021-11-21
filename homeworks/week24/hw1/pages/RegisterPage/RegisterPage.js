import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useHistory } from "react-router-dom"

import { register, setErrorMsg, getUser } from '../../redux/reducers/userReducer'
import { useDispatch, useSelector } from "react-redux"


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
const InputTItle = styled.label`
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
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const errorMsg = useSelector(store => store.user.errorMsg)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    return () => dispatch(setErrorMsg(null))
  }, [dispatch])


  const handleSubmit = async (e) => {
    if (!username || !nickname || !password || !password2) return dispatch(setErrorMsg('請填入完整資料'))

    if (password !== password2) return dispatch(setErrorMsg('請確認兩次密碼是否相符'))
    try {
      const registerRes = await dispatch(register(username, nickname, password))
      const getUserRes = await dispatch(getUser())
      console.log(registerRes.ok === 1 && getUserRes.ok === 1)
      if (registerRes.ok === 1 && getUserRes.ok === 1) {
        history.push('/')
      }
    } catch {
      dispatch(setErrorMsg('請稍後再登入看看'))
    }
  }

  const handleResetClick = () => {
    dispatch(setErrorMsg(null))
    setUsername('')
    setNickname('')
    setPassword('')
    setPassword2('')
  }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <InputTItle>username
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </InputTItle>
      </div>
      <div>
        <InputTItle>nickname
          <input value={nickname} onChange={e => setNickname(e.target.value)} />
        </InputTItle>
      </div>
      <div>
        <InputTItle>
          password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </InputTItle>
      </div>
      <div>
        <InputTItle>
          comfirm password
          <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
        </InputTItle>
      </div>
      <Button type="reset" onClick={handleResetClick}>Reset</Button>
      <Button type="submit">Register</Button>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

    </FormContainer>
  )
}

export default RegisterPage