import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import HelloComponent from './component/HelloComponent';
import Calc from './component/calc';


function App() {
  return (
    <div className="App">
      <h1 className="title">시험성적 계산기</h1>
      <Calc/>
    </div>
  );
}

export default App;
