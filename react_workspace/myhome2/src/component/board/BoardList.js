import 'bootstrap/dist/css/bootstrap.min.css'; //부트스트랩 라이브러리 
import React, { useState,useEffect } from 'react'; // 함수기반 컴포넌트 시 기본
import axios from 'axios';
/******************************************************************************/
import { SERVERIP } from '../../CommonUtil';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
/******************************************************************************/
// 위의 3개는 필수 

function BoardList(props) {

    const [boardList, setBoardList ] = useState([]);
    const [totalCnt, setTotalCnt ] = useState(0); //2023/04/14 pagination 위해 추가
    //정수라는 것을 티내기 위해서 useState(0);
    const [pg, setPg] = useState(0); //2023/04/14 pagination 위해 추가
    const [loading, setLoading] = useState(false);
    
    // loadData함수를 메 페이지 열 때마다 쓰기 위해서 
    // 상수로 선언
    const loadData = async (pg)=>{
        const url = SERVERIP+"/rest_board/list/"+pg ;
        console.log(url);
        await axios.get(url)
        .then((res)=>{
          let totalCnt = res.data.totalCnt;
          let pg = res.data.pg;
          let boardList = res.data.boardList;
          console.log("데이터전체개수 : ", totalCnt);
          console.log("현재페이지 : ", pg);
          console.log("데이터 : ", boardList);

          setTotalCnt(totalCnt);
          setPg(pg);
          setBoardList(boardList);

          setLoading(true);
          console.log(res.data);
        }).catch( (error)=>{
          console.log(error);
        })
      }
    
    const goPage = (pg)=>{
      setPg(pg);
      loadData(pg);
    }

    useEffect( ()=> {
      loadData(1); //여기에 2를 넣으면 두번째 페이지부터 자동로드 
    },[])

    /**여기서 ()=>{ async function 함수명(){ } 
     *              함수() 로 함수객체 생성 }*/

    return (
      <div className="container">
        <h1>게시판 목록 {SERVERIP}</h1>

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
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>첨부파일</th>
              </tr>
            </thead>
            <tbody>

                {
                  loading===true?
                  boardList.map( (item, index)=>{
                    return(
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td><Link to={"/board/view/"+item.id}>{item.title}</Link></td>
                        <td>{item.username}</td>
                        <td>{item.wdate}</td>
                        <td> 
                          {
                            item.filelink !=null?
                            <img src={`http://127.0.0.1:9090/${item.filelink}`} 
                                 height="200px" 
                                 width=""
                                 crossOrigin="annonymous"></img>
                            :""
                          } 
                          {/* 파일링크가 없는 경우 빈 공간이 나오도록 null을 추가  */}
                        </td>
                      </tr>
                    )
                  })
                  :""
                }
            </tbody>
          </table>
      
      <Pagination
        activePage={pg} 
        // 현재실행중인 페이지
        itemsCountPerPage={10}
        // 한 페이지에 보여줄 라인 수
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={goPage}
      />
      
      <div>
      <Link className="btn btn-danger" to="/board/write">글쓰기</Link>
      </div>
    </div>  
    );

    
}

export default BoardList;