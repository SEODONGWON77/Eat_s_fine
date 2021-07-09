import React, { useEffect, useState } from "react";
import Axios from "axios";
import Subscribe from "./Sections/Subscribe"
import { Link } from "react-router-dom";
// import styled from "styled-components";
//import moment from "moment";

function FileDetail(props) {
  const [File, setFile] = useState([]);
  const fileId = props.match.params.fileId; //props.match.params.fileId는 app.js의 :fileId 부분
  const variable = { fileId: fileId };

  useEffect(() => {
    Axios.post("/api/upload/getFileDetail", variable).then((response) => {
      if (response.data.success) {
        console.log('11111111111',File.writer);
        setFile(response.data.fileDetail);
      } else {
        alert("파일 가져오기 실패");
      }
    });
  },[]);
  if(File.writer) {
    return (
      <div>
        <hr></hr>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${File.filePath}`}
            controls
            autoplay
          />
          <label>등록자</label>
          <p>{File.writer.name}</p>
          <label>영상 제목</label>
          <p>{File.title}</p>
          <label>설명</label>
          <p>{File.description}</p>
        </div>
        <div>{<Subscribe/>}</div>
        {/* Coments */}
      </div>
    );
  } else {
    return (
      <div>loading...</div>
    )
  }
 
}

export default FileDetail;
