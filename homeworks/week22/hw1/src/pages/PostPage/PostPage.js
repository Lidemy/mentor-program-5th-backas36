import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import { useParams } from "react-router";
import { getSinglePost } from "../../WebAPI";

const PostWrapper = styled.div`
  max-width:960px;
  min-height:70vh;
  margin:30px auto;
  padding:10px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%);
  padding:30px ;
  background:#fff;
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

const PostPage = () => {
  let { id } = useParams()
  const [post, setPost] = useState([])
  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await getSinglePost(id)
      setPost(postData)
    }
    fetchPostData()
  }, [id])

  return (
    <>
      <PostWrapper>
        <PostTitle>{post.title}</PostTitle>
        <PostCreated>
          <PostAuthor>user01</PostAuthor>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </PostCreated>
        <PostBody>{post.body}</PostBody>
      </PostWrapper>
    </>
  )
}

export default PostPage