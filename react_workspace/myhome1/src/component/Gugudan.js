import React, { useState } from 'react';

function Gugudan (props) {

  const [dan,setDan] = useState("");// 단  Q.임의값?
  const[iList]= useState([1,2,3,4,5,6,7,8,9]);
  const[ show,setShow ] = useState(false); //show가 true일 때만 화면에 구구단 출력
  
  const danChange=(e)=>{
    setShow(false); // show를 false로 해서 화면에 출력을 막음
    setDan(e.target.value); // 단 값 넣고
  }

  const goConfirm=()=>{
    setShow(true); //확인버튼 누르면 show->true로 바꿔서 화면에 출력
  }

  //
  return(

    //인풋 :단의 값 받아오기
    //버튼 : 구구단 아래 출력하도록 

    <div>
      단 : <input type="text" onChange={danChange}></input><br/>
      <button type="text" onClick={ goConfirm }>확인</button>
      <br/><br/>
      <ul>

          {
          show?
          iList.map( (item,index)=>{
            return(
              <li key={index}>
                {dan} X {item} = {dan*item}
              </li>
            );
          }):""
        }
      </ul>
    </div>
  )

}

export default Gugudan;