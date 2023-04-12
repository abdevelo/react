/*Fortest1.js*/

import React, { useState } from 'react';

function Fortest1(props) {

  const[fruitList] = useState(["사과","배","포도","수박","머루"]);

  const goSelect=(index)=>{
    alert(fruitList[index]);
  }

  return(
    <div>
      <ul>
      {
        fruitList.map( (item, index)=> {
          return(
            <li key={index}>
              <a href="#none" onClick={(e)=>{goSelect(index)}}>{item}</a>  {/*1st*/}
              {/* <div>{item}</div> */} {/*2nd*/}
               {/* 1st : 배열내부의 각 요소 클릭하면 alert창 띄워주기 */}
               {/* 2nd : 배열에서 각 요소를 꺼내서 list up 해주기  */}
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default Fortest1;

// map
// map 함수 앞의 요소가 element 고 뒤의 요소가 index인데 index는 잘 생략함. 근데 VScode에서 넣어주길 원함.
// 앵커태그 눌렀을 때 화면 이동 막으려면 href="#none" 써줘라 <a href="#none">
// 리액트에서 함수에 파라미터를 넣으려면 무조건 ()=>{함수(파라미터)} 로 람다함수 안에 넣어주어야 한다 
// goSelect(index) 로 바로는 안되고 ()=>{goSelect(index)}는 된다. ??


// ***주의 : 함수를 직접호출할 수 없다***//
// 만약 onclick={goSelect(index)} 처럼 
// 람다 없이 호출하는 경우는 alert창이 닫기를 눌러도 배열내의 요소를 계속 돌림
// alert (사과) -> 닫기 -> alert(배) -> .....