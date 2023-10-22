import React from 'react'
import PageMoveButton from '../../components/Button/PageMoveButton'

export default function StartPage() {
  return (
    <div className='mainview'>
    <img alt='startMedicine' src='../icons/startIcon.png' className='img3' />
    <div style={{margin: '20px'}}>
    <div className='linebox' style={{height: '10px'}}>
      <p>나의 물약을 제조</p>
      <p className='greyFont'>한 후</p>
    </div>

    <p className='greyFont'>상대와 섞어</p>

    <div className='linebox' style={{height: '10px'}}>
      <p >케미</p>
      <p className='greyFont'>를 확인해보세요!</p>
      </div>
   

  </div>
  <PageMoveButton path="/start/loading" text="나의 물약 제조하기" />
  </div>
  )
}
