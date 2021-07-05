const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

//auth라는 미들웨어 : 요청(get)받았을 때 콜백함수 하기전에 중간에서 실행
router.get("/auth", auth, (req, res) => {
  //미들웨어를 통과하면 이하 작업을 실행(Authentication이 true)
  res.status(200).json({
    // auth.js에서 user를 req에 넣었기 때문에 가능(req.user = user)
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //0 일반, 1 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});


router.post("/register", (req, res) => {
  const user = new User(req.body); //req.body로 json형식으로 파싱

  user.save((err, rslt) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

router.post("/login", (req, res) => {
  //요청(입력)한 이메일이 디비에 있는지 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력한 이메일에 해당하는 유저가 존재하지 않음",
      });
    }
    //요청한 이메일이 디비에 있다면 요청한 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      } else {
        //비밀번호도 맞는게 확인되면 토큰 생성
        user.createToken((err, user) => {
          if (err) return res.status(400).send(err);

          //쿠키에 토큰 저장
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userID: user._id });
        });
      }
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).send({ logoutSuccess: true });
  });
});

module.exports = router;