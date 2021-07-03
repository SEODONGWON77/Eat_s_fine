const express = require("express");
const router = express.Router();
const { auth } = require("../models/middleware/auth");
//const { Upload } = require('../models/Upload');
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const sharp = require("sharp");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads_folder/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname); // extention 확장자
    if (extention !== ".mp4" || extention !== ".jpg" || extention !== ".png") {
      return cb(
        res.status(400).end("jpg, png, mp3, mp4 만 업로드 가능합니다."),
        false
      );
    }
    cb(null, true);
  },
});

const uploadContents = multer({ storage: storage }).single("file");

router.post("/contents", (req, res) => {
  //onDrop한 비디오를 서버에 저장
  uploadContents(req, res, (err) => {
    if (err) {
      return res.json({ success: false }, err);
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  const fileName = req.body.fileName;
  const fileNameLength = fileName.length;
  const fileNameLastDot = fileName.lastIndexOf(".");
  const fileExtension = fileName.substring(fileNameLastDot + 1, fileNameLength);

  if (fileExtension !== "mp4") {
    //sharp 이미지 리사이징
    sharp(req.body.url)
      .resize({ width: 320, height: 240 })
      .toFile("uploads_folder/thumbnails/thumbnail_" + fileName, function(){
        console.log("썸네일을 찍음");
        return res.json({
          success: true,
          url: "uploads_folder/thumbnails/thumbnail_" + fileName
        });
      });
  } else {
    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
      console.log(metadata);
      console.log(metadata.format.duration);
      fileDuration = metadata.format.duration;
    });
    //비디오파일 썸네일 생성
    ffmpeg(req.body.url) //uploads_folder에서 file의 url을 가져옴
      .on("filenames", function (filenames) {
        //썸네일 이름을 생성
        filePath = "uploads_folder/thumbnails/" + filenames[0];
      })
      .on("end", function () {
        //썸네일을 생성하고 무엇을 하는지
        console.log("스크린샷을 찍음");
        return res.json({
          success: true,
          url: filePath,
          fileDuration: fileDuration,
        });
      })
      .on("error", function (err) {
        console.error(err);
        return res.json({ success: false }, err);
      })
      .screenshot({
        count: 3,
        folder: "uploads_folder/thumbnails",
        size: "320x240",
        filename: "thumbnail_%b.png",
      });
  }
});

module.exports = router;
