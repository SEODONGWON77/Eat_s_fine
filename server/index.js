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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
