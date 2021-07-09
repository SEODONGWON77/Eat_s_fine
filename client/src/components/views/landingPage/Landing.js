import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import moment from "moment";

const StyledItemHover = styled.div`
  .caption {
    background-color: rgba(0, 0, 0, 0.65);
    position: absolute;
    top: 0;
    color: #fff;
    opacity: 0;
    transition: 0.5s;
    width: 100%;
    height: 100%;
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

// 그리드레이아웃
const StyledGridContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1200px 1fr;
  @media screen and (max-width: 512px) {
    grid-template-columns: 1fr;
  }
`;
const StyledAsideLeftDiv = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 512px) {
    display: none;
  }
`;
const StyledArticleDiv = styled.div``;

const StyledAsideRightDiv = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 512px) {
    display: none;
  }
`;

//text-overflow
const StyledTextOverFlow = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  text-align: center;
  max-width: 1200px;
  .contents_img {
    width: 100%;
  }
  @media screen and (max-width: 512px) {
    grid-template-columns: 1fr;
  }
`;

function Landing() {
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

  const OnclickChangeAll = () => {
    setAllFiles(renderAllFiles);
  };
  const OnclickChangeVideos = () => {
    setAllFiles(renderVideos);
  };
  const OnclickChangeImages = () => {
    setAllFiles(renderImages);
  };

  const renderAllFiles = File.map((fileInfo, index) => {
    var minutes = Math.floor(fileInfo.duration / 60);
    var seconds = Math.floor(fileInfo.duration - minutes * 60);

    if (fileInfo.extentionType === "mp4") {
      return (
        <Link to={`/video/${fileInfo._id}`}>
          <StyledItemHover>
            <div class="item">
              <img
                className="contents_img"
                src={`http://localhost:5000/${fileInfo.thumbnail}`}
                alt=""
              />
              <StyledDuration>
                <span>{` ${minutes} : ${seconds}`}</span>
              </StyledDuration>
              <div>
                <div class="caption">
                  <h2>{fileInfo.title}</h2>
                  <StyledTextOverFlow>
                    {fileInfo.description}
                  </StyledTextOverFlow>
                  <p>{fileInfo.writer.name}</p>
                </div>
              </div>
            </div>
          </StyledItemHover>
        </Link>
      );
    } else {
      return (
        <Link to={"/image/" + fileInfo._id}>
          <StyledItemHover>
            <div class="item">
              <img
                className="contents_img"
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
          </StyledItemHover>
        </Link>
      );
    }
  });

  const [AllFiles, setAllFiles] = useState(() => {
    return;
  });
  const renderVideos = File.map((fileInfo, index) => {
    var minutes = Math.floor(fileInfo.duration / 60);
    var seconds = Math.floor(fileInfo.duration - minutes * 60);

    if (fileInfo.extentionType === "mp4") {
      return (
        <Link to={`/video/${fileInfo._id}`}>
          <StyledItemHover>
            <div class="item">
              <img
                className="contents_img"
                src={`http://localhost:5000/${fileInfo.thumbnail}`}
                alt=""
              />
              <StyledDuration>
                <span>{` ${minutes} : ${seconds}`}</span>
              </StyledDuration>
              <div>
                <div class="caption">
                  <h2>{fileInfo.title}</h2>
                  <StyledTextOverFlow>
                    {fileInfo.description}
                  </StyledTextOverFlow>
                  <p>{fileInfo.writer.name}</p>
                </div>
              </div>
            </div>
          </StyledItemHover>
        </Link>
      );
    }
  });

  const renderImages = File.map((fileInfo, index) => {
    if (fileInfo.extentionType === "png" || fileInfo.extentionType === "jpg") {
      return (
        <Link to={"/image/" + fileInfo._id}>
          <StyledItemHover>
            <div class="item">
              <img
                className="contents_img"
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
          </StyledItemHover>
        </Link>
      );
    }
  });

  return (
    <StyledGridContainerDiv>
      <StyledAsideLeftDiv>Menu</StyledAsideLeftDiv>
      <StyledArticleDiv>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul style={{ marginTop: "40px", listStyle: "none" }}>
            <li
              style={{ float: "left", marginRight: "20px" }}
              onClick={OnclickChangeAll}
            >
              All
            </li>
            <li
              style={{ float: "left", marginRight: "20px" }}
              onClick={OnclickChangeVideos}
            >
              Video
            </li>
            <li
              style={{ float: "left", marginRight: "20px" }}
              onClick={OnclickChangeImages}
            >
              Image
            </li>
            <li style={{ float: "left", marginRight: "20px" }}>Developer</li>
          </ul>
        </div>
        <br />
        <StyledContainer>
          {AllFiles === undefined ? renderAllFiles : AllFiles}
        </StyledContainer>
      </StyledArticleDiv>
      <StyledAsideRightDiv>Aside</StyledAsideRightDiv>
    </StyledGridContainerDiv>
  );
}

export default Landing;
