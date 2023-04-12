//Iftest1.js

import React, { useState } from 'react';

function Iftest1(props){
  const [flag,setFlag]=useState(true);
  const changeFlag= ()=>{
    setFlag( !flag ); 
    // flag=true --> !flag (true->false)
    // true 가 접은 것, false가 열은 것 console.log(flag);로 확인
  }
  return(
    <div>
      <h1> if 테스트 {flag} </h1>
      <button type="button" onClick={changeFlag}>토글</button>
      <p>{flag?'이 문구가 보입니다.':''}</p>
    </div>
  )
}

export default Iftest1;

//function 형식 컴포넌트는 
