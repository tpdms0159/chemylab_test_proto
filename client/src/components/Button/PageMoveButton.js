import React from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'

export default function PageMoveButton(props) {
  

  return (
    <button className={`moveButton ${props.className}`} onClick={props.onClick}>
        <Link to={props.path} className='fontStyle'> {props.text} </Link>
    </button>
  );
  PageMoveButton.defaultProps = {
    onClick : () => {console.log('defaul props')}
  }
}
