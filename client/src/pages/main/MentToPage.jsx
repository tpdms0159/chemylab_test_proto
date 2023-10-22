import axios from 'axios';
import React,{useState} from 'react'
import { Link } from "react-router-dom";
import PageMoveButton from '../../components/Button/PageMoveButton';

export default function MentToPage() {
  const [text, setText] = useState("");
  const token = localStorage.getItem("accessToken");

  function generateRandomNumber() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber.toString();
  }
  

  const coMent = () => {
    const randomNum = generateRandomNumber();
    axios.post("http://localhost:8000/ment", {text : text, randomNum:randomNum},                {
      headers: {
          'Authorization': `Bearer ${token}`  // Include the token here
      }
  })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
  }


  return (
    <div className='mainview'>
      <img alt="상대물약4" src="/icons/finishMy.png" />
        <p className='greyFont' style={{marginBottom: 0}}>거의 제조가 끝나가요!</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <p>상대에게 전할 한마디</p>
        <p className='greyFont'>를 적어주세요</p>
      </div>
     


     
      <input type="text" placeholder='마지막 한마디 적기' onChange={(e)=>setText(e.target.value)} />
      {text.length != 0 ? <Link to='/ment/loading' onClick={coMent}><img alt='blueArrow' src='/icons/blueArrow.png' className='arrow'/></Link>
        : ""}
      


    </div>
  )
}

