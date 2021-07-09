const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//file콜렉션을 만듬
const Subscriberschema = mongoose.Schema(
  {
    userTo: {
      //id값의 모든 정보를 가져올수 있음(User모델의 모든 정보를 가져옴)
      type: Schema.Types.ObjectId,
      ref: "User", // 불러올곳 User.js모델
    },
    userForm: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", Subscriberschema);

module.exports = { Subscriber };
