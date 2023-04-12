import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import HelloComponent from './component/HelloComponent';
import Calc from './component/calc';
import Iftest1 from './component/Iftest1';
import Fortest1 from './component/Fortest1';
import Fortest2 from './component/Fortest2';
import Hero from './component/Hero';
import Gugudan from './component/Gugudan';
import HeroList from './component/HeroList';

function App() {
  return (
    <div className="App">
      <h1 className="title">위인목록</h1>
      {/* <Calc/> */}

      {/* <Iftest1/> */}
      {/* <Fortest1/> */}
      {/* <Fortest2/> */}
      {/* <Hero/> */}
      {/* <Gugudan/> */}
      {/* <HeroList/> */}
      <HeroWrite/>
    </div>
  );
}

export default App;
