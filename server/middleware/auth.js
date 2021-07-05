const { User } = require('../models/User');


let auth = (req, res, next) => {
  //인증처리를 하는 부분

  //client에서 토큰을 가져옴
  let token = req.cookies.x_auth;
  
  //토큰을 복호화(decode)하고 유저를 찾음
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({isAuth: false, error: true});

    req.token = token; //req에 넣는 이유는 index.js에서 요청(req) 받을때 req.token을 바로 사용가능 
    req.user = user;
    next(); //미들웨어 끝나면 다음(콜백)으로 갈수 있게
  })
}

module.exports = { auth };