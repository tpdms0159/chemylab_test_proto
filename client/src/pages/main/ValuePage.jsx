import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function ValuePage() {
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const token = localStorage.getItem("accessToken");

  let words = [];

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(res => {
        setData(res.value); 
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleClick = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else if (selectedIds.length < 5) {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const submitValues = () => {
    axios.post("http://localhost:8000/values", 
                { values: selectedIds }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Include the token here
                    }
                })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
  };
  
  
  return (
    <div className="mainview">
      
        <p className="midtitle cntText" >{selectedIds.length} / 5</p>
        <div className="titleAlign">
          <h2 className='subtitle' style={{fontSize: '20px', marginTop: '70px', color: 'black'}}>내가 그 사람을 떠올리면...</h2>
          <p className="subtitle" style={{
            height: "30px"
          }}> 
          내 인생에서 중요하게 여기는
              <br/>
              가치들을 골라보세요!
    
          </p>
      </div>

      <div style={{marginTop : '150px'}}>
        {data.map((data, index) => {          
          words = [...words, data];
          return(
            <div >
            { parseInt(index % 3) === 2 ? 
            
            <div className="showBtn"> 
              {words.map((words) => {
                const isSelected = selectedIds.includes(words.id);
                return(
                  <button className="valueBtn" onClick={() => handleClick(words.id)}
                  style={{ background: isSelected ? '#3688FF' : '#FF6CD9', color: 'white' }} >  
                  {words.word}
                    </button>
                )
              })}
              {words = []}
              </div> 
            : null}
            </div>
          );
        }
        )
      }
      </div>

       
      {selectedIds.length === 5 && (
        <Link to='/value/finish' className="valuenext" onClick={submitValues}>
          <img alt="blueArrow" src="/icons/blueArrow.png" className="blueArrow"/>
        </Link>
      )}
    </div>
  );
}
