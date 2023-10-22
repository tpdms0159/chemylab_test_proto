import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function BalancePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((res) => {
        setData(res.balance.find((item) => item.id === parseInt(id, 10)));
        setAllData(res.balance);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!data || !allData)
    return (
      <div>
        <Link to="/value">
          {/* value 화면으로 넘어가는 page 만들기 */}


          <button>Value</button>
        </Link>
      </div>
    );

  const next = parseInt(id, 10) + 1;

  if (next == 12) {
    return (<Link to="/balance/loading"></Link>)
  }

  const BalanceData = (value) => {

    console.log(value);
    axios.post("http://localhost:8000/balance", { value }, {
      headers: {
        Authorization: `Bearer ${token}` // 헤더에 토큰 포함해서 요청 보내기
      }
    })
    .then(response => console.log(response))
    .catch(error => console.error("There was an error!", error));
  };

  return (
    <div className="mainview" >
      <div className="titleAlign" style={{height: '800px', padding: '50px 0' }}>
      <img alt="progress" src={`/icons/progress${id}.png`} 
      style={{
        width: '190px',
        height: '34px',
      }
      } />

      <h2 className="midtitle" >우린 얼마나 잘 맞을까?</h2>
      <h4 className="subtitle">둘 중 더 선호하는 것을 골라보세요!</h4>
     
      
      <div className="buttonBox">
      {next === 11 ? 
        <>
        
          <Link
            className="selectButton"
            to={`/balance/loading`}
            onClick={() => BalanceData(1)}
          >
            <div>{data.optionFirst}</div>
          </Link>
          <Link
            className="selectButton"
            to={`/balance/loading`}
            onClick={() => BalanceData(2)}
          >
            <div>{data.optionTwo}</div>
          </Link>
        </> : 
         <>
        
         <Link
           className="selectButton"
           to={`/balance/${next}`}
           onClick={() => BalanceData(1)}
         >
           <div>{data.optionFirst}</div>
         </Link>
         <Link
           className="selectButton"
           to={`/balance/${next}`}
           onClick={() => BalanceData(2)}
         >
           <div>{data.optionTwo}</div>
         </Link>
       </>
       
}
      </div>
      </div>
    </div>
  );
}
