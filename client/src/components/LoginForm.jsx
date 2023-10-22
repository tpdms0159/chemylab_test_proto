import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PageMoveButton from "./Button/PageMoveButton";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userData = (e) => {
    e.preventDefault();

    console.log('userdata');

    const user = {
      userId: id,
      userPassword: password,
    };
    // 로그인 정보 api
    axios
      .post("http://localhost:8000/login", user)
      .then((res) => {
        console.log(res);
        if (res.data.isLogin === "True") {
          localStorage.setItem('accessToken', res.data.accessToken);
          navigate(`/main/${id}`);
        } else {
          alert(res.data.isLogin);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      });
  };


 
  return (
    <div className="mainview">
      <img alt="logo" src="../icons/logo.png" 
      style={{
        width: '170px',
        height: '170px'
      }}/>
      <form onSubmit={userData}>
        <input
          className="login"
          type="text"
          placeholder="아이디"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          className="login"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
   
        <button className="moveButton" type="submit" style={{width: '283px', height: '60px', fontSize : '20px'}}> 로그인하고 케미 확인하기 </button>
        <br />
        <Link to="/signup" className="signBox">
        <p style={{
          'width' : '143px',
           height: '40px', 
           fontSize: '16px', 
           color : 'black', 
           margin: '7px'
           }}> 아직 계정이 없다면? </p> 
        <button className="moveButton" style={{
          width: '100px',
          height: '37px',
          padding: '11px 21px',
          fontSize: '15px',
          }}
       > 회원가입 </button>
        </Link>
        
      </form>
      
    </div>
  );
};

export default LoginForm;
