import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { getPosts } from "../../WebAPI"


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
`

const Post = ({ post }) => {
  const { title, createdAt, id, body } = post
  return (
    <>
      <PostWrapper>
        <PostTitle to={`/posts/${id}`}>{title}</PostTitle>
        <PostCreated>
          <PostDate>{new Date(createdAt).toLocaleString()}</PostDate>
        </PostCreated>
        <PostBody>{body}</PostBody>
        <LinkToPost to={`/posts/${id}`}>Read More</LinkToPost>
      </PostWrapper>
    </>
  )
}

const PostsListPage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPostsData = async () => {
      const postsData = await getPosts()
      setPosts(postsData)
    }
    fetchPostsData()
  }, [])

  return (
    <>
      <PostsWrapper>
        {posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </PostsWrapper>
    </>
  )
}

export default PostsListPage