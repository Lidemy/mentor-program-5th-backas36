import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, Link } from 'react-router-dom'


import { getLogin, getUser, setErrorMsg } from '../../redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

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

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errorMsg = useSelector(store => store.user.errorMsg)
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(setErrorMsg(null))
  }, [dispatch])

  const handleSubmit = async (e) => {
    dispatch(setErrorMsg(null))
    if (!username || !password) return dispatch(setErrorMsg('請填入完整資料'))

    try {
      const res = await dispatch(getLogin(username, password))
      if (!res.token) return
      const reuslt = await dispatch(getUser())
      if (reuslt.data) {
        history.push('/')
      }
    } catch {
      dispatch(setErrorMsg('請稍後再登入看看'))
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <InputTItle>username
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </InputTItle>
      </div>
      <div>
        <InputTItle>
          password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </InputTItle>
      </div>
      <Button type="submit">Login</Button>
      <Link to="/register">
        <Button type="button">
          Register
        </Button>
      </Link>

      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </FormContainer>
  )
}

export default LoginPage