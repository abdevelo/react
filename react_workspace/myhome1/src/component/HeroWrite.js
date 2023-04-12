import React ,{useState} from "react";
import axios from 'axios';

function HeroWrite(prop)
{
  const [hero_name,setHeroName]=useState(""); //useState 함수가 문자열 변수를 만들고
  const [hero_desc,setHeroDesc]=useState(""); //


  // input태그에 값이 바뀌면 이 함수가 호출
  const heroNameChange=(e)=>{
    setHeroName(e.target.value);
  }

  const heroDescChange=(e)=>{
    setHeroDesc(e.target.value);
  }

  //form 태그를 사용해서 서버로 전송 시
  //<button>태그에 type="button"속성이 없으면
  // 버튼을 누를 때 submit()함수가 호출이 된다.
  //submit함수가 호출이 되면 form태그에 
  //onSubmit이벤트핸들러가 호출된다.
  //이때 잡아채서 서버에 전송하는 처리를 한다. 
  //onSubmit함수의 경우 무조건 서버로 전송을한다. 
  //이걸 막기 위해서 preventDefault()함수를 호출한다. 



  const onSubmit=()=>{
    e.preventDefault(); 
    // form태그를 통해 서버에 정보를 전송전에 호출 
    // 버튼의 기본 기능을 정지시킴. 
    // submit버튼의 submit기능을 막고, 별도의 처리를 한다.
    // Spring은 데이터를 문자열 받아와야 한다
    // axios는 데이터를 JSON으로 주고받음.
    axios.post("http://localhost:9090/hero/list",
            {hero_name:hero_name, hero_desc:hero_desc})
    .then( (res)=>{
      console.log(res.data.result); // 리액트는 꼭!!!data로 가공해서 들어옴!! result만 보내는데 받을 땐 data로 받아야 함
    })
    .catch( (error)=>{
      console.log(err);
    })
  }
  return
  (
    <div>
      <form onSubmit={onSubmit}>
        <h3>영웅</h3>
        이름 : <input type="text" onChange={heroNameChange}></input><br/>
        업적 : <input type="text" onChange={heroDescChange}></input><br/>

        <button>추가</button>
      </form>
    </div>
  )
}

export default HeroWrite;