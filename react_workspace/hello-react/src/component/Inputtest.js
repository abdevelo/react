import React, {useState} from "react";

//props 사용하던 말던 일단 기본 매개변수로 지정
//향후 필요할 경우 대비


function Inputtest(props) {
  const [name, setName] = useState("홍길동");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  
  // 람다함수 꼭 줘야함
  // onChange={} 안에 람다 넣기에 함수내요이 길 경우
  // 이런식으로 상수로 함수 지정
  // 람다가 아닌 일반함수의 경우생성자에서 바인딩이라는 작업을 해야 함
  // 그런데 함수형 컴포넌트는 생성자가 없기 때문에 일반함수를 줄 수가 없다!
  // 리액트는 온통 람다 

  const nameChange = (e)=> {
    // 인자가 발생한 이벤트에 대한 모든 정보를 가지고 있음
    // console.log( e.target.vlaue ); // 키를 누른 모든 값이 저장되어 있음 
    setName( e.target.value ); // name변수의 값이 위의 useState안의 값에서 새로운 값으로 바뀜

  }
  const ageChange = (e)=> {
    setAge( e.target.value ); 
  }
  const emailChange = (e)=> {
    setEmail( e.target.value ); 
  }

  let mystyle = {
    color : "white", 
    backgroundColor: "blue",
    fontSize : "11pt",
    padding :"10px 5px 10px 5px"
  }
  // 이름에 style 처럼 직접 style작성하려면 {{}} 중괄호 두 개가 필요
  // 그 이유는 아래의 나이에 style 주는 경우처럼 style={ 스타일변수 } 이며
  // 스타일변수 = { 스타일 세부사항 } 으로 구성되어있기에
  // 합치면 style = {{ 스타일세부사항 }}이기 때문이다
    return(
    <div>
      이름 : <input type="text" onChange={ nameChange } 
              style={{color:"blue", backgroundColor:"lightblue"}}></input> <br/>
              {/*background-color -> backgroundColor 의 카멜표기법으로 해야함*/}
      나이 : <input type="text" onChange={ ageChange }
              style={mystyle}></input> <br/>
      이메일 : <input type="text" onChange={ emailChange }></input> <br/>
      <p>{name} {age} {email} </p>
    </div>
  )
}


export default Inputtest;