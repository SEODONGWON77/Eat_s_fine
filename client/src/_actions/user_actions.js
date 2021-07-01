import axios from 'axios';
import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  REGISTER_USER,
} from './types';

//dispatch요청으로 loginUser() 함수를 액션 
export function loginUser(dataToSubmit){ //dataToSumit 파라미터는 let body의 email과 password 오브젝트를 받아온 것 
  
  //axios로 서버에 요청하고 응답받은 response.data를 request에 저장함
  const request = axios.post('./api/users/login', dataToSubmit)
    .then(response => response.data) 

  //request에 저장이 되면 reducer에 넘겨줌(user_reducer.js)
  return {
    type: LOGIN_USER,  //types.js에서 타입을 가져옴(따로 모아두어서 정리)
    payload: request
  } 
}

export function logoutUser(){
  const request = axios.get('./api/users/logout')
  .then(response => response.data);

  return {
      type: LOGOUT_USER,
      payload: request
  }
}

export function auth(){
  const request = axios.get('./api/users/auth')
  .then(response => response.data);

  return {
      type: AUTH_USER,
      payload: request
  }
}

export function registerUser(dataToSubmit){
  const request = axios.post('./api/users/register', dataToSubmit)
      .then(response => response.data);
  
  return {
      type: REGISTER_USER,
      payload: request
  }
}
