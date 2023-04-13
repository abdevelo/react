import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Layout from './layout/Layout.js'
import Home from './component/Home.js'
import BoardList from './component/board/BoardList.js';
import BoardWrite from './component/board/BoardWrite.js';
import ScoreList from './component/score/ScoreList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Layout/>}>
          <Route index element = {<Home/>}/>

          <Route path="/score/list" element = {<ScoreList/>}/>
          
          {/* ***************************************************** */}
          {/* <Route path="/board/list" element = {<BoardList/>}/> path를 붙이면 평소엔 없다가 url이 그 내용일때만 보여줌 */}
          {/* <Route path="/board/update" element = {<BoardWrite/>}/>  */}
          {/* <Route path="/board/view/:id" element = {<BoardWrite/>}/> */}
          {/* *****************************************************

          {/* <Route path="about" element = {<About/>}/>
          <Route path="for1" element = {<Fortest1/>}/>
          <Route path="for2" element = {<Fortest2/>}/>
          <Route path="gugu" element = {<Gugudan/>}/> */}
        </Route>
      </Routes>

    </div>
  );
}

export default App;
