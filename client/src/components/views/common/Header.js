import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeaderDiv = styled.div`
  display: flex;
  height: 80px;
  background-color: black;
  ul {
    list-style: none;
  }
  display: flex;
  justify-content: flex-end;
`;
const StyledHeaderLink = styled(Link)`
  //react-router-dom의 Link를 상속
  color: white;
  font-size: 20px;
  text-decoration: none;
  line-height: 80px;
  padding-right: 10px;
  &:hover{
    color: red;
  }
`;

function Header(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response.data);
      if (response.data.logoutSuccess) {
        window.location.replace("/");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <StyledHeaderDiv>
        <StyledHeaderLink to="/">Home</StyledHeaderLink>
        <StyledHeaderLink to="/login">로그인</StyledHeaderLink>
        <StyledHeaderLink to="/register">회원가입</StyledHeaderLink>
      </StyledHeaderDiv>
    );
  } else {
    return (
      <StyledHeaderDiv>
        <StyledHeaderLink to="/">Home</StyledHeaderLink>
        <StyledHeaderLink to="/upload">업로드</StyledHeaderLink>
        <StyledHeaderLink onClick={logoutHandler}>로그아웃</StyledHeaderLink>
      </StyledHeaderDiv>
    );
  }
}

export default Header;
