const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./models/middleware/auth");
const { User } = require("./models/User");

app.use(express.json()); //json 형태로 parsing //application/json
app.use(express.urlencoded({ extended: true })); //application/x-www-form-urlencoded
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, {
    //config폴더의 key.js의 mongoURI 가져옴
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Conneted..."))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use('/uploads_folder', express.static('uploads_folder')); //썸네일 안뜨는경우 해결방법 , client에서  back서버에 있는 static한 파일들을 (이미지, css 파일, javascript 파일) 처리
app.use('/upload/thumbnail', express.static('/upload/thumbnail'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
