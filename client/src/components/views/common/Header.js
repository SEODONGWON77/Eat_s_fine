import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosMenu } from "react-icons/io";

const StyledHeaderDiv = styled.div`
  max-width: 1200px;
  margin: auto;
`;
const StyleRight = styled.div`

  float: left;
  justify-content: flex-start;
  height: 60px;
  line-height: 60px;
  padding-left: 30px;
  font-size: 22px;
  @media screen and (max-width: 512px) {
    font-size: 40px;
    padding-left: 40px;
    padding-right: 60px;
  }
`;
const Styledleft = styled.div`
  justify-content: flex-end;
  background-color: white;
  display: flex;
  height: 60px;
  @media screen and (max-width: 512px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const StyledBox = styled.div`
background-color: white;
  display: flex;
  @media screen and (max-width: 512px) {
    z-index: 1;
    padding-top: 60px;
    flex-direction: column;
    align-items: flex-end;
    display: ${({ menu }) => {
      return menu === false ? "none" : "flex";
    }};
  }
`;
//react-router-dom의 Link를 상속
const StyledLink = styled(Link)`
  align-items: flex-end;
  color: black;
  font-size: 16px;
  text-decoration: none;
  line-height: 60px;
  margin-right: 10px;
  padding-right: 10px;
  &:hover {
    color: red;
  }
`;

const StyledHambuger = styled.a`
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  font-size: 40px;
  color: green;
  position: absolute;
  margin-right: 20px;
  height: 60px;
  line-height: 60px;
  &:hover {
    color: lightsalmon;
  }
  @media screen and (min-width: 512px) {
    display: none;
  }
`;

function Header() {
  const user = useSelector((state) => state.user);
  const [menu, setmenu] = useState(false);
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
        <StyleRight>PortFolio</StyleRight>
        <Styledleft>
          <StyledBox menu={menu}>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">로그인</StyledLink>
            <StyledLink to="/register">회원가입</StyledLink>
          </StyledBox>
          <StyledHambuger
            onClick={() => {
              setmenu(!menu);
            }}
          >
            <IoIosMenu></IoIosMenu>
          </StyledHambuger>
        </Styledleft>
      </StyledHeaderDiv>
    );
  } else {
    return (
      <StyledHeaderDiv>
        <StyleRight>PortFolio</StyleRight>
        <Styledleft>
          <StyledBox menu={menu}>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/upload">업로드</StyledLink>
            <StyledLink onClick={logoutHandler}>로그아웃</StyledLink>
          </StyledBox>
          <StyledHambuger
            onClick={() => {
              setmenu(!menu);
            }}
          >
            <IoIosMenu></IoIosMenu>
          </StyledHambuger>
        </Styledleft>
      </StyledHeaderDiv>
    );
  }
}

export default Header;
