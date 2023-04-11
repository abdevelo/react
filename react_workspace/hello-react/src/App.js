import logo from './logo.svg';
import './App.css';
import Mycomponent1 from './component/mycomponent1';
import { Component } from 'react';
import Appclass from './component/Appclass';
import Appclass2 from './component/Appclass2';
import Inputtest from './component/Inputtest'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <Mycomponent1/>
    {/* <Appclass address="서울시 강동구" title="자기소개"/>  */}
        {/*위처럼 props를 사용해서 parent-> child 값 보내는 방법 */}
    {/* <Appclass2 address="서울시 관악구" title="자기소개2"/> */}
    <Inputtest/>
    </div>
  );
}

export default App;




//아래 내용이 header안에 있었는데 삭제함 
/*
 *         <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
*/