import React, { useState } from 'react';

// 함수의 경우에는 생성자가 아니라 매개변수를 통한다
// 부모가 자식한테 값을 보낼 때 매개변수를 통해서 보낸다
// props-> JSON객체 

// 주로 클래스 컴포넌트를 많이 써왔지만(2023) 최근에는 함수기반컴포넌트가 핫함

function Appclass2(props) {
  // useState 변수의 초깃값
  const [ name, setName ] = useState("홍길동");
  const [age , setAge] = useState(23);
  const {title,address} = props; //this.props; 는 안 됌 왜임?
  return(
    <div>
      <h1> {title} </h1>
      <h3> 이름 : {name} </h3>
      <h3> 나이 : {age} </h3>
      <h3> 주소 : {address} </h3>
    </div>
  )
}

export default Appclass2;