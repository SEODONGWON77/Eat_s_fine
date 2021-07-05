const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//file콜렉션을 만듬
const fileSchema = mongoose.Schema({
  writer : {
    type: Schema.Types.ObjectId, //id값의 모든 정보를 가져올수 있음(User모델의 모든 정보를 가져옴)
    ref:'User' // 불러올곳 User.js모델
  },
  title : {
    type: String,
    maxlength: 50
  },
  description : {
    type: String
  },
  filePath : {
    type: String
  },
  category : {
    type: String
  },
  views : {
    type: Number,
    default: 0
  },
  duration : {
    type : String
  },
  thumbnail : {
    type: String
  },
  extentionType :{
    type : String
  }
}, {timestamps : true})

const File = mongoose.model("file", fileSchema);

module.exports = { File }