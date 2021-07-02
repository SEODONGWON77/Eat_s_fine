import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';

function Register(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');

  const onEmailHandler = (e) => setEmail(e.currentTarget.value);
  const onNameHandler = (e) => setName(e.currentTarget.value);
  const onPasswordHandler = (e) => setPassword(e.currentTarget.value);
  const onPasswordConfirmHandler = (e) =>
    setPasswordConfirm(e.currentTarget.value);

  const onSubmitHandler = (e) => {
    e.preventDefault(); //login버튼 클릭했을때 페이지가 refresh 되는것을 막음

    if (Password !== PasswordConfirm) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let data = {
      email: Email,
      password: Password,
      name: Name,
    };

    //axios.post('/api/users/register', body)

    dispatch(registerUser(data)) //dispatch로 액션을 요청(user_action.js의 loginUser() 함수 호출)
      .then((response) => {
        //reducer 리턴 후 분기
        if (response.payload.success) {
          alert('회원가입 성공')
          props.history.push('/login');
        } else {
          alert('회원가입 실패');
        }
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%,',
        height: '50vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <lable>Email</lable>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <lable>Name</lable>
        <input type="text" value={Name} onChange={onNameHandler} />

        <lable>Password</lable>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <lable>Password Confirm</lable>
        <input
          type="password"
          value={PasswordConfirm}
          onChange={onPasswordConfirmHandler}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;
