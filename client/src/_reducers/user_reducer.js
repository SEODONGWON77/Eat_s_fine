import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  REGISTER_USER,
} from "../_actions/types";

//state에 초기값에 {} 비어있는 오브젝트
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
