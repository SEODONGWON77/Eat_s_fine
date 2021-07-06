import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import moment from "moment";

const StyledContainer = styled.div`
  text-align: center;
  max-width: 1200px;
  position: relative;
  float: left;
  width: 25%;
`;

const StyledItemHover = styled.div`
  .caption {
    background-color: rgba(0, 0, 0, 0.65);
    position: absolute;
    top: 0;
    color: #fff;
    padding-top: 40px;
    padding-bottom: 30px;
    opacity: 0;
    transition: 0.5s;
    height: 100%;
  }
  .items {
    text-align: center;
    margin: 0 auto;
    font-size: 100%;
  }
  .item {
    display: inline-block;
    border: 1px solid #ddd;
    position: relative;
    vertical-align: middle;
  }
  .item:hover .caption {
    opacity: 1;
  }
`;

const StyledDuration = styled.div`
  top: 1px;
  right: 0;
  position: absolute;
  margin: 4px;
  color: #fff;
  background-color: rgba(17, 17, 17, 0.8);
  opacity: 0.8;
  padding: 2px 4px;
  border-radius: 2px;
  letter-spacing: 0.5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
`;

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
        <Link to={`/video/${fileInfo._id}`}>
          <StyledContainer>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${fileInfo.thumbnail}`}
              alt=""
            />
            <StyledDuration>
              <span>{` ${minutes} : ${seconds}`}</span>
            </StyledDuration>
            <div>
              <h2>Rirakuma doll 25cm</h2>
              <p>
                The owner of the most popular and cute looks Rilakkuma ~!
                Rilakkuma giant - It is size sale to small size.
              </p>
              <p>
                Price : <s>$12</s> → $10
              </p>
            </div>
          </StyledContainer>
        </Link>
      );
    }
  });

  const renderImages = File.map((fileInfo, index) => {
    if (fileInfo.extentionType === "jpg" || fileInfo.extentionType === "png") {
      return (
        <Link to={"/image/" + fileInfo._id}>
          <StyledContainer>
            <StyledItemHover>
              <div class="items">
                <div class="item">
                  <img
                    style={{ width: "100%" }}
                    src={`http://localhost:5000/${fileInfo.thumbnail}`}
                    alt=""
                  />
                  <StyledDuration>
                    <span>이미지</span>
                  </StyledDuration>
                  <div class="caption">
                    <p>
                      The owner of the most popular and cute looks Rilakkuma ~!
                      Rilakkuma giant -
                    </p>
                  </div>
                </div>
              </div>
            </StyledItemHover>
          </StyledContainer>
        </Link>
      );
    }
  });

  return (
    <>
      <div
        className="responseDiv"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: " 80px",
        }}
      >
        <div
          style={{ position: "relative", textAlign: "center", width: "1200px" }}
        >
          <div>
            <h1>비디오</h1>
            {renderVideos}
          </div>
          <div style={{ clear: "both" }}></div>
          <br />
          <div>
            <h1>이미지</h1>
            {renderImages}
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </>
  );
}

export default Landing;
