import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function MovePage(props) {
  const [data, setData] = useState([]);
  // const [getData, setGetData] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(res => {
        setData(res.loading); 
      })
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <>
    { data.length === 3 && <div className='mainview'> 
      <h1 className='title'> {data[props.index].title} </h1>
      <p className='subtitle' > {data[props.index].exp} </p>
      <Link to={props.link}><img alt="image" src={data[props.index].src} style={{
        width: 'auto',
        height: '300px'
      }}/></Link>

   </div> }
   </>
    
  );

}

export default MovePage;
