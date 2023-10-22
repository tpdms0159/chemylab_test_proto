import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignupForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const userData = (e) => {
    e.preventDefault();

    const user = {
      userId: id,
      userPassword: password,
      userPassword2: password2,
    };

    axios
      .post("http://localhost:8000/signup", user)
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess === "True") {
          alert("회원가입이 완료되었습니다.!");
          navigate("/login");
        } else {
          alert(res.data.isSuccess);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className='mainview'>
      <img alt="logo" src="../icons/logo.png" style={{
        width: '50vw',
        height: 'auto'
      }}/>
      <form onSubmit={userData}>
        <input
          className="login"
          type="text"
          placeholder="아이디"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
        <br />
        <input
          className="login"
          type="password"
          placeholder="비밀번호"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <br />
        <input
          className="login"
          type="password"
          placeholder="비밀번호 확인"
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
        />
        <br />
        <br />

        <button className="moveButton" style={{}} type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm;
