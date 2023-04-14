import 'bootstrap/dist/css/bootstrap.min.css'; //부트스트랩 라이브러리 
import React, { useState,useEffect } from 'react'; // 함수기반 컴포넌트 시 기본
import axios from 'axios';
/******************************************************************************/
import { SERVERIP } from '../../CommonUtil';
import { Link } from 'react-router-dom';
/******************************************************************************/
// 위의 3개는 필수 

function ScoreList(props) {

    const [scoreList, setScoreList ] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( ()=> {
      async function loadData() {
        const url = SERVERIP+"/score/list/";
        await axios.get(url)

        .then((res)=>{
          setLoading(true);
        }).catch( (error)=>{
          console.log(error);
        })
      }

      loadData();

    },[])

    /**여기서 ()=>{ async function 함수명(){ } 
     *              함수() 로 함수객체 생성 }*/

    return (
      <div className="container">
        <h1>성적 게시판</h1>

        <div className="input-group mb-3" style={{marginTop:"20px"}}>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                선택하세요
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">제목</a></li>
              <li><a className="dropdown-item" href="#">내용</a></li>
              <li><a className="dropdown-item" href="#">제목+내용</a></li>
            </ul>
            <input type="text" className="form-control" placeholder="Search"/>
            <button className="btn btn-secondary" type="submit">Go</button>
          </div>

        <table className="table table-hover ">
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th>학생 이름</th>
                <th>국어</th>
                <th>영어</th>
                <th>수학</th>
                <th>총점</th>
                <th>평균</th>
              </tr>
            </thead>
            <tbody>
                {
                  loading===true?
                  scoreList.map( (item, index)=>{
                    return(
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td><Link to={"/socre/view/"+item.id}>{item.std_name}</Link></td>
                        <td>{item.kor}</td>
                        <td>{item.eng}</td>
                        <td>{item.mat}</td>
                        <td>{item.kor+item.eng+item.mat}</td>
                        <td>{Math.floor((item.kor+item.eng+item.mat)/3)}</td>
                      </tr>
                    )
                  })
                  :""
                }
            </tbody>
          </table>
          
      <div>
      <Link className="btn btn-danger" to="/score/update">성적입력</Link>
      </div>

    </div>  


    );
}

export default ScoreList;