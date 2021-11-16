import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getSelectedPosts, setCurrentPageNum } from '../../redux/reducers/postReducer'



const PostsWrapper = styled.main`
  max-width:960px;
  margin:30px auto;
`
const PostWrapper = styled.div`
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%);
  padding:30px ;
  background:#fff;
  & + & {
    margin-top:20px;
  }
  position:relative;
`

const PostTitle = styled(Link)`
  font-size:28px;
  color:#000;
  text-decoration:none;
  overflow: hidden;
    white-space: nowrap;
    width: 80%;
    text-overflow: ellipsis;
    display: block;
`
const PostCreated = styled.div`
  display:flex;
  margin-top:12px;
`
const PostAuthor = styled.div`
  margin-right:12px;
`

const PostDate = styled.div`
  font-weight:300;
  color:rgba(0,0,0,0.6);
  font-size:16px;
`
const PostBody = styled.div`
  margin-top:30px;
  font-size:18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const LinkToPost = styled(Link)`
  margin-top:30px;
  display:inline-block;
  color:rgba(0,0,0,0.6);
  text-decoration:none;
  border:1px solid #ccc;
  padding:8px 24px;
  background:#fff;
  cursor:pointer;
  transition: background 0.2s;
  &:hover{
    background:#ccc;
  }
  & + & {
    margin-left:8px;
  }
`
const CurrentPage = styled.div`
  font-size:18px;
`

const PaginateWrapper = styled.div`
  display:flex;
  align-items:center;
  margin-bottom:40px;
  justify-content:center;
`
const PaginateBtn = styled.button`
  border:0;
  text-decoration:underline;
  margin:0 12px;
  cursor:pointer;
  opacity:0.5;
  transition: opacity .5s;
  &:hover{
    opacity:1;
  }
`

const PostActions = styled.div`
  position:absolute;
  right: 30px;
  bottom: 30px;
`
const PostActionBtn = styled.button`
  margin-top:30px;
  margin-left:8px;
  display:inline-block;
  color:rgba(0,0,0,0.6);
  text-decoration:none;
  border:1px solid #ccc;
  padding:8px 24px;
  background:#fff;
  cursor:pointer;
  transition: background 0.2s;
  &:hover{
    background:#ccc;
  }
  
`




const HomePage = () => {
  const dispatch = useDispatch()

  const posts = useSelector(store => store.posts.posts)
  const currentPageNum = useSelector(store => store.posts.currentPageNum)
  const isLoading = useSelector(store => store.posts.isLoadingPost)

  const eachPageAmount = 10

  useEffect(() => {
    dispatch(getSelectedPosts(currentPageNum, eachPageAmount))
  }, [dispatch, currentPageNum])

  const handleClickDecrementBtn = () => {
    if (currentPageNum > 1) {
      dispatch(setCurrentPageNum(currentPageNum - 1))
    }
  }

  const handleClickIncrementBtn = () => {
    dispatch(setCurrentPageNum(currentPageNum + 1))
  }

  const Post = ({ post }) => {
    const { title, createdAt, id, body, userId } = post
    const user = useSelector(store => store.user.user)

    const handleDelClick = (id) => {
      dispatch(deletePost(id))
        .then(res => dispatch(getSelectedPosts(currentPageNum, eachPageAmount)))
    }

    return (
      <>
        <PostWrapper>
          <PostTitle to={`/posts/${id}`}>{title}</PostTitle>
          <PostCreated>
            <PostAuthor>{post.user.nickname}</PostAuthor>

            <PostDate>{new Date(createdAt).toLocaleString()}</PostDate>
          </PostCreated>
          <PostBody>{body}</PostBody>
          <LinkToPost to={`/posts/${id}`}>Read More</LinkToPost>
          {user && user.id === userId && (
            <PostActions>
              <Link to={`/edit-post/${id}`}>
                <PostActionBtn>
                  Edit
                </PostActionBtn>
              </Link>
              <PostActionBtn onClick={() => handleDelClick(id)}>Delete</PostActionBtn>
            </PostActions>
          )}
        </PostWrapper>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>Loading...</div> : (
        <>
          <PostsWrapper>
            {posts.map(post => (
              <Post post={post} key={post.id} />
            ))}
          </PostsWrapper>
          <PaginateWrapper>
            {currentPageNum > 1 && (
              <PaginateBtn onClick={handleClickDecrementBtn}>pre</PaginateBtn>
            )}
            <CurrentPage>{currentPageNum}</CurrentPage>
            {posts.length === eachPageAmount && (
              <PaginateBtn onClick={handleClickIncrementBtn}>next</PaginateBtn>
            )}
          </PaginateWrapper>
        </>
      )}

    </>
  )
}

export default HomePage