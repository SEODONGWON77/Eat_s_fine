import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApplicationContext } from "../../../contexts/weatherAndMap_context";

function Weather() {
  const [text, setText] = useState("현재위치");
  const [weatherData, setWeatherData] = useState([]);
  const { locationSearch, longitude, latitude, latlngValue } =
    useApplicationContext();

  let latData = latitude;
  let lonData = longitude;

  if (locationSearch !== "") {
    latData = latlngValue.Ma;
    lonData = latlngValue.La;
  }

  async function test() {
    await axios({
      method: "post",
      url: "./api/weathers/today",
      data: {
        lat: latData,
        lon: lonData,
      },
    }).then(function (response) {
      console.log("서버에서 프론트로 돌려받음", response.data);
      setWeatherData(response.data);
    });
  }
  useEffect(() => {
    test();
  }, [latData, lonData, locationSearch]);

  let tmp = "";
  let sky = "";

  if (weatherData.length !== 0) {
    tmp = weatherData[0].wea_val;
    sky = weatherData[5].wea_val;

    if (weatherData[5].wea_val === "1") sky = "맑음";
    else if (weatherData[5].wea_val === "3") sky = "구름많음";
    else sky = "흐림";
  }

  return (
    <div>
      <p>위도: {latData}</p>
      <p>경도: {lonData}</p>
      <p>
        {text} 날씨정보, 온도 : {tmp}, 기상상태 : {sky}
      </p>
    </div>
  );
}

export default Weather;