import styled from '@emotion/styled'

import { Link } from 'react-router-dom'
import { logout } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const HeaderContainer = styled.header`
  height:64px;
  display:flex;
  justify-content:space-around;
  align-items:center;
  padding:20px 0;
`
const SiteInfo = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`


const SiteName = styled(Link)`
  font-size:32px;
  font-weight:bold;
  color:rgba(0,0,0, 0.6);
  text-decoration:none;
`
const SiteDesc = styled(Link)`
  font-size:18px;
  font-weight:300;
  color:rgba(0,0,0, 0.6);
  margin-top:12px;
  text-decoration:none;

`
const NavbarList = styled.div`
  display:flex;
`
const Nav = styled(Link)`
  font-weight:bold;
  font-size:18px;
  color:rgba(0,0,0, 0.6);
  text-decoration:none;

  &+& {
    margin-left:12px;
  }
`
const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <HeaderContainer>
      <SiteInfo>
        <SiteName to="/">Lidemy Blog</SiteName>
        <SiteDesc to="/about">Welcome to the blog of Lidemy-Yang</SiteDesc>
      </SiteInfo>
      <NavbarList>
        <Nav to="/posts-list">所有文章</Nav>
        {user && <Nav to="/new-post">發佈新文章</Nav>}
        {!user && <Nav to="/login">登入</Nav>}
        {user && <Nav to="/" onClick={handleLogout}>登出</Nav>}
      </NavbarList>
    </HeaderContainer>
  )
}

export default Header