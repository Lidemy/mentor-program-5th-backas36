import { createSlice } from '@reduxjs/toolkit'
import { login, getMe, register as registerAPI } from '../../WebAPI'
import { setAuthToken } from '../../utils'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
    errorMsg: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },

    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload
    },

  },
})


export const { setUser, setErrorMsg } = userReducer.actions

export const getLogin = (username, password) => (dispatch) => {
  return login(username, password)
    .then(res => {
      if (res.ok === 0) return dispatch(setErrorMsg(res.message))
      setAuthToken(res.token)
      return res
    })
    .catch(err => {
      dispatch(setErrorMsg(err))
    })
}

export const getUser = () => (dispatch) => {
  return getMe()
    .then(res => {
      if (res.ok !== 1) {
        setAuthToken(null)
        return dispatch(setErrorMsg(res.message))
      }
      dispatch(setUser(res.data))
      return res
    })
    .catch(err => {
      dispatch(setErrorMsg(err))
    })
}

export const logout = () => (dispatch) => {
  setAuthToken('')
  dispatch(setUser(null))
}

export const register = (username, nickname, password) => (dispatch) => {
  return registerAPI(username, nickname, password)
    .then(res => {
      if (res.ok !== 1) return dispatch(setErrorMsg(res.message))
      setAuthToken(res.token)
      return res
    })
    .catch(err => {
      dispatch(setErrorMsg(err))
    })
}

export default userReducer.reducer