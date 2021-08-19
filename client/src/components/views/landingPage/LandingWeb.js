import React from "react";
import styled from "styled-components";
import InfoToday from "./InfoToday";
import RecomendBtn from "./RecomendBtn";
import { ApplicationContextProvider } from "../../../contexts/weatherAndMap_context";
import CurrentLocation from "./CurrentLocation";
import MyLocation from "../kakaoMap/MyLocation";
import Weather from "./Weather";
import HashTag from "./HashTag";
import SearchBoxMenu from "./SearchBoxMenu";
import ChangeLocationBtn from "./ChangeLocationBtn";
import InfoWeather from "./InfoWeather";
import MenuList from "./MenuList";

const MainDivStyle = styled.div`
  text-align: center;
`;
function LandingWeb() {
  return (
    <MainDivStyle>
      <InfoWeather />
      <InfoToday />
      <Weather />
      <HashTag />
      <MenuList/>
      <RecomendBtn />
      <SearchBoxMenu />
      <CurrentLocation />
      <MyLocation />
      <ChangeLocationBtn />
    </MainDivStyle>
  );
}
export default LandingWeb;
