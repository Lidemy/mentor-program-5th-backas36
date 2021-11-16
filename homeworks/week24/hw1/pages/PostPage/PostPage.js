import React, { useEffect } from "react";
import styled from '@emotion/styled'
import { Link, useHistory } from "react-router-dom"
import { useParams } from "react-router";
import { getPost, deletePost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

const PostWrapper = styled.div`
  max-width:960px;
  min-height:60vh;
  margin:30px auto;
  padding:10px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%);
  padding:30px ;
  background:#fff;

  position:relative;
`
const PostTitle = styled.h2``
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
  margin-top:80px;
  font-size:18px;
  padding:20px;
  line-height:2em;
`
const PostActions = styled.div`
  position:absolute;
  right: 10px;
  bottom: 10px;
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

const PostPage = () => {
  let { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const post = useSelector(store => store.posts.post)
  const user = useSelector(store => store.user.user)
  const { title, body, createdAt, userId } = post

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  const handleDelClick = () => {
    dispatch(deletePost(id))
    history.push('/posts-list')
  }
  return (
    <>
      {isLoading ? <div>loading ...</div> : (
        <>
          <PostWrapper>
            <PostTitle>{title}</PostTitle>
            <PostCreated>
              <PostAuthor>{post.user.nickname}</PostAuthor>
              <PostDate>{new Date(createdAt).toLocaleString()}</PostDate>
            </PostCreated>
            <PostBody>{body}</PostBody>
            {user && user.id === userId && (
              <PostActions>
                <Link to={`/edit-post/${id}`}>
                  <PostActionBtn>
                    Edit
                  </PostActionBtn>
                </Link>
                <PostActionBtn onClick={handleDelClick}>Delete</PostActionBtn>
              </PostActions>
            )}

          </PostWrapper>

        </>
      )}
    </>
  )
}

export default PostPage