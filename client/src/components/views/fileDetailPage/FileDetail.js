import React, { useEffect, useState } from "react";
import Axios from "axios";
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
        setFile(response.data.fileDetail);
      } else {
        alert("파일 가져오기 실패");
      }
    });
  });
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
      </div>
      {/* Coments */}
    </div>
  );
}

export default FileDetail;
