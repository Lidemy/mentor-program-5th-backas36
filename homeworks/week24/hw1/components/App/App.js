import React, { useEffect } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Header from '../Header'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import About from '../../pages/AboutPage'
import { getAuthToken } from '../../utils'
import PostPage from '../../pages/PostPage'
import AddNewPostPage from '../../pages/AddNewPostPage'
import RegisterPage from '../../pages/RegisterPage'
import PostsListPage from '../../pages/PostsListPage/AllPostsPage'
import EditPostPage from '../../pages/EditPostPage'
import { useDispatch } from 'react-redux'
import { getUser } from '../../redux/reducers/userReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getUser())
    }
  }, [dispatch])

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/posts/:id" children={<PostPage />} />
        <Route path="/posts-list">
          <PostsListPage />
        </Route>
        <Route path="/new-post">
          <AddNewPostPage />
        </Route>
        <Route path="/edit-post/:id" children={<EditPostPage />} />
        <Route path="/register">
          <RegisterPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App