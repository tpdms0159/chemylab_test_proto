import React from 'react'
import { Link } from "react-router-dom";
import PageMoveButton from '../../components/Button/PageMoveButton';

const HomePage = () => {
  return (
    <div className='mainview'>
       <img alt='logo' src='../icons/logo.png' />
       <div style={{ fontWeight: 900}}>
       <PageMoveButton path="/login" text="회원가입 및 로그인하기" />
       </div>
    </div>
  )
}

export default HomePage
