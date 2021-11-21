import { createSlice } from '@reduxjs/toolkit'
import {
  getSinglePost,
  postNewPost,
  delelePostAPI,
  getPosts as getPostsAPI,
  patchPostAPI,
  getLast5Posts
} from '../../WebAPI'

export const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoadingPost: true,
    post: [],
    newPostResponse: null,
    posts: [],
    postErrorMsg: null,
    patchPostResponse: null,
    currentPageNum: 1
  },
  reducers: {
    setIsLoginPost: (state, action) => {
      state.isLoadingPost = action.payload
    },
    setPost: (state, action) => {
      state.post = action.payload
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload
    },
    setAllPosts: (state, action) => {
      state.posts = action.payload
    },
    setPostErrorMsg: (state, action) => {
      state.postErrorMsg = action.payload
    },
    setPatchPostResponse: (state, action) => {
      state.patchPostResponse = action.payload
    },
    setCurrentPageNum: (state, action) => {
      state.currentPageNum = action.payload
    }
  },
})


export const {
  setIsLoginPost,
  setPost,
  setNewPostResponse,
  setAllPosts,
  setPostErrorMsg,
  setPatchPostResponse,
  setCurrentPageNum
} = postReducer.actions

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoginPost(true))
  getSinglePost(id)
    .then(res => {
      dispatch(setPost(res))
      dispatch(setIsLoginPost(false))
    })
    .catch(err => {
      dispatch(setIsLoginPost(false))
      console.log(err)
    })
}
export const newPost = (title, body) => dispatch => {
  return postNewPost(title, body)
    .then(res => {
      dispatch(setNewPostResponse(res))
      return res
    })
}
export const getAllPosts = () => dispatch => {
  dispatch(setIsLoginPost(true))
  getPostsAPI()
    .then(res => {
      dispatch(setAllPosts(res))
      dispatch(setIsLoginPost(false))
    })
    .catch(err => {
      dispatch(setIsLoginPost(false))
      console.log(err)
    })

}
export const deletePost = (id) => dispatch => {
  return delelePostAPI(id)
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })
}

export const patchPost = (id, data) => dispatch => {
  dispatch(setIsLoginPost(true))
  return patchPostAPI(id, data)
    .then(res => {
      dispatch(setPatchPostResponse(res))
      dispatch(setIsLoginPost(false))
      return res
    })
    .catch(err => {
      dispatch(setIsLoginPost(false))
      console.log(err)
    })
}

export const getSelectedPosts = (pageNum, eachPageAmount) => dispatch => {
  dispatch(setIsLoginPost(true))
  getLast5Posts(pageNum, eachPageAmount)
    .then(res => {
      dispatch(setAllPosts(res))
      dispatch(setIsLoginPost(false))
    })
    .catch(err => {
      dispatch(setIsLoginPost(false))
      console.log(err)
    })
}

export default postReducer.reducer