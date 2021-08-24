import React, { useState } from "react";
import styled from "styled-components";
import { useApplicationContext } from "../../../contexts/weatherAndMap_context";
import ChangeMap from "../kakaoMap/ChangeMap";

function ChangeLocationBtn() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const {
    setLocationSearch,
    myLocation,
    setLocation,
    locationSearch,
    setLocationchangeControl,
  } = useApplicationContext();
  function onchangeText(e) {
    setText(e.target.value);
    console.log("inputValue", e.target.value);
  }

  function onclickBtn() {
    setLocationSearch(text);
    console.log("setlocation", locationSearch);
  }

  function openModal() {
    setOpen(true);
    setLocationchangeControl(false);
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <>
      {!open ? (
        <BtnDiv onClick={openModal}>
          <i
            className="material-icons"
            style={{ position: "relative", top: "4px", fontSize:"19px"}}
          >
            my_location
          </i>
          <span style={{fontSize:"16px", fontWeight:"bold"}}> 위치 변경</span>
        </BtnDiv>
      ) : (
        <InputDiv>
          <SearchLocationDiv>
            <input
              type="text"
              placeholder="위치 입력"
              onChange={onchangeText}
              value={text}
            />
            <input type="button" onClick={onclickBtn} value="검색" />
            <input type="button" onClick={closeModal} value="위치변경" />
          </SearchLocationDiv>
          <ChangeMap />
        </InputDiv>
      )}
    </>
  );
}

const SearchLocationDiv = styled.div`
  background-color: gray;
  width: 280px;
  height: 25px;
  z-index: 10;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
`;
const BtnDiv = styled.div`
  cursor: pointer;
  color: white;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 17px;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  text-align: center;
  z-index: 5;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

export default ChangeLocationBtn;
