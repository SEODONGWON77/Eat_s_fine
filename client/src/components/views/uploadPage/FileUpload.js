import React, { useState } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useSelector } from "react-redux";

const StyledIconDiv = styled.div`
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: skyblue;
    border: 2px solid skyblue;
  }
`;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function FileUpload(props) {
  const user = useSelector((state) => state.user); //redux를 이용하여 state에서 user의 모든 정보를 가져옴
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState("Private");
  const [Category, setCategory] = useState("Film & animation");
  const [Icon, setIcon] = useState(faFileUpload);
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const [ExtentionType, setExtentionType] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onChangePrivate = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "contnet-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);
    console.log("업로드한것 : ", files);

    Axios.post("/api/upload/contents", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          //서버에서 받은(response.data) 경로, 파일이름
          url: response.data.url,
          fileName: response.data.fileName,
        };

        const fileName = response.data.url;
        const fileNameLength = fileName.length;
        const fileNameLastDot = fileName.lastIndexOf(".");
        const fileExtension = fileName.substring(
          fileNameLastDot + 1,
          fileNameLength
        );
        setExtentionType(fileExtension);

        setFilePath(response.data.url);

        Axios.post("/api/upload/thumbnail", variable).then((response) => {
          if (response.data.success) {
            console.log("11111", response.data);

            setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
          } else {
            alert("썸네일 생성 실패");
          }
        });
      } else {
        alert("업로드 실패");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      writer: user.userData._id,
      title: Title,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
      extentionType: ExtentionType,
    };
    Axios.post("/api/upload/file", variable).then((response) => {
      if (response.data.success) {
        alert("성공적으로 업로드 되었습니다.");
        props.history.push("/");
        // setTimeout(() => {
        //   props.history.push("/");
        // }, 3000);
      } else {
        alert("파일 업로드 실패");
      }
    });
  };

  return (
    <div>
      <h1>파일 업로드</h1>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop zone */}

          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <StyledIconDiv {...getRootProps()}>
                <input {...getInputProps()} />
                <FontAwesomeIcon icon={Icon} style={{ fontSize: "3rem" }} />
              </StyledIconDiv>
            )}
          </Dropzone>

          {/* Thumbnail */}
          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>
        <label>Type</label>
        <div>{ExtentionType !== "mp4" ? <p>이미지</p> : <p>비디오</p>}</div>
        <br />
        <br />
        <label>Title</label>
        <br />
        <input onChange={onChangeTitle} value={Title}></input>
        <br />
        <br />
        <label>Description</label>
        <br />
        <textarea onChange={onChangeDescription} value={Description}></textarea>
        <br />
        <br />
        <select onChange={onChangePrivate}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onChangeCategory}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
