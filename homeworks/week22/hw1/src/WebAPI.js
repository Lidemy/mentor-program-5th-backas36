import { getAuthToken } from "./utils"
const BASE_URL = 'https://student-json-api.lidemy.me'
const paginateLimit = 5

export const getPosts = async () => {
  const result = await fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
  return await result.json()
}

export const getLast5Posts = async (pageNum) => {
  const result = await fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${pageNum}&_limit=${paginateLimit}`)
  return await result.json()
}

export const getSinglePost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`).then(res => res.json())
}

export const login = async (username, password) => {
  const reuslt = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  return await reuslt.json()
}

export const getMe = async () => {
  const token = getAuthToken()
  const result = await fetch(`${BASE_URL}/me`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
  return await result.json()
}

export const postNewPost = async (title, body) => {
  const token = getAuthToken()
  const result = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      body
    })
  })
  return await result.json()
}

export const register = async (username, nickname, password) => {
  const result = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      nickname,
      password
    })
  })
  return await result.json()
}

// 目前沒用到，以後可能會用到的 api
export const getUserNickname = async (userId) => {
  const result = await fetch(`${BASE_URL}/users/${userId}`)
  return await result.json()
}