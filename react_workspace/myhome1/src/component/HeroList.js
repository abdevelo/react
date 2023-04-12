// HeroList.js 백앤드서버로부터 데이터를 가져온다
// axios 설치 필요 : npm install axios

import React, { useState, useEffect } from "react";
import axios from 'axios';

function HeroList (props){
  const[heroList, setHeroList] = useState([]);
  const[loading,setLoading] = useState(false); // 데이터를 수신하면 true로 바뀜


  useEffect( ()=>{
    // 서버에서 데이터를 불러온다
  //   console.log("나 호출된다.");
  //   setHeroList( heroList.concat([
  //     {id:1, name:"이순신", descr:"임진왜란승리"},
  //     {id:2, name:"을지문덕", descr:"살수대첩"},
  //     {id:3, name:"세종대왕", descr:"한글창제"},
  //   ]))
      //promis기반 컴포넌트라서
      axios.get("http://localhost:9090/hero/list")
      .then( (res)=> {
        console.log(res);
        setHeroList(res.data);
        setLoading(true);
      })
      .catch( (res,status, error)=> {
        console.log(status);
      })
  }, []);
  
  return(
    <div>
      <table>
        <tbody>
        {
        loading===true?
        heroList.map( (item, index)=> {
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.hero_name}</td>
              <td>{item.hero_desc}</td>
              <td>{item.wdate}</td>
            </tr>

          )
        })
        :""
      }
        </tbody>
      </table>
    </div>
  )
}

export default HeroList;


// Hook 239p
// 객체가 만들어지고 소멸되는 것을 라이프사이클이라고 함
// window.onload를  함수가 자동으로 시작되게 하고 싶을 때 썼던 것 처럼
// 함수안에서 마운트 할 때처럼.. (?)
// effect Hook 을 쓴다 
// state Hook은 
// 여태까지 사용했던 useState는 데이터 값을 반환하는 함수임
// useState함수가 값을 초기화해주면  like const[heroList,setHeroList]=useState([]);
// 해당 값을 저장할 변수와 해당값을 변경하는 함수를 반환. "배열형태"
// Effect Hook
    // stateHook에서 비교적 간단한 라이프사이클을 위해 useEffect를 추가
    // useEffect( (A)=>{B}, [C]);
    // A : 호출되는 함수, mount , update, unmount 될 때 호출
    // C : 변수가 변경될 때 호출



// Q. Mounting ? 
        //A. 리액트 컴포넌트를 만들어서 DOM에 올리는 것
          // 컴포넌트를 초기화하고, 최초의 state,props를 세팅하고, DOM에 렌더링한다