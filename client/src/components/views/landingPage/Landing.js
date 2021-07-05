import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
//import moment from "moment";
function Landing(props) {
  const [File, setFile] = useState([]);

  useEffect(() => {
    Axios.get("/api/upload/getFiles").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFile(response.data.files);
      } else {
        alert("파일 가져오기 실패");
      }
    });
  }, []);

  const renderVideos = File.map((fileInfo, index) => {
    var minutes = Math.floor(fileInfo.duration / 60);
    var seconds = Math.floor(fileInfo.duration - minutes * 60);

    if (fileInfo.extentionType === "mp4") {
      return (
        <Link to={"/file/" + fileInfo._id}>
          <div className="explain-container">
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${fileInfo.thumbnail}`}
              alt=""
            />
            <div className="duration">
              <span>{` ${minutes} : ${seconds}`}</span>
            </div>
          </div>
        </Link>
      );
    }
  });

  const renderImages = File.map((fileInfo, index) => {
    if (fileInfo.extentionType === "jpg" || fileInfo.extentionType === "png") {
      return (
        <Link to={"/file/" + fileInfo._id}>
          <div className="explain-container">
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${fileInfo.thumbnail}`}
              alt=""
            />
            <div className="duration">
              <span>이미지</span>
            </div>
          </div>
        </Link>
      );
    }
  });

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <div style={{ textAlign: "center", width: "1200px" }}>
        <h2>비디오</h2>
        <div style={{ display: "block" }}>{renderVideos}</div>
        <div style={{ clear: "both" }}></div>
        <br />
        <h2>이미지</h2>
        <div style={{ display: "block" }}>{renderImages}</div>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
}

export default Landing;
