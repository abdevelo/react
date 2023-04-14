import 'bootstrap/dist/css/bootstrap.min.css'; //부트스트랩 라이브러리 
import React, { useState,useEffect } from 'react'; // 함수기반 컴포넌트 시 기본
import axios from 'axios';
/******************************************************************************/
import { SERVERIP } from '../../CommonUtil';
import { Link, useNavigate, useParams } from 'react-router-dom';
/******************************************************************************/
//아래의 디자인 html파일로 복사해 올 때 수정할 점
// class -> className
// style="" -> style={{ 카멜표기법 : "값"}}
// <col> <input> -> <col/> <input/> 태그 닫기
// <a> -> <Link> 앵커태그 링크 태그로 바꾸고, href없애고, Link import하기
/******************************************************************************/
function HeroWrite (props){

  let {id} = useParams(); // ID값 받아와서 ---> useEffect ?
  let history = useNavigate(); // refresh, redirect처럼 화면의 이동을 보여줌

  const[heroName,setHeroName] = useState("");
  const[heroDesc,setHeroDesc] = useState("");

  useEffect( () => {
    console.log("id",id);
    async function loadData(){
      let results = await axios.get(SERVERIP+"/hero/view/"+id);


      setHeroName(results.data.hero.hero_name);
      setHeroDesc(results.data.hero.hero_desc);

      console.log(results.data.hero.hero_name);
      console.log(results.data.hero.hero_desc);
    }
    if (id !==undefined) loadData(); //write가 아니고 view로 호출할 때 
    // window.load역할
    //BoardWrite 컴포넌트가 /board/write일 때는 undefined가 오고
    // /board/view/1일 때는 id에는 파라미터값이 저장
  },[]);

  const nameChange=(e)=>{
    setHeroName(e.target.value);
  }
  const descChange=(e)=>{
    setHeroDesc(e.target.value);
  }
  // 서버로 입력받은 데이터를 전송하기
  const postData=()=>{
    //데이터를 JSON객체로 묶어 보내야 함
    let data = {"hero_name":heroName, "hero_desc":heroDesc};

    axios.post(SERVERIP+"/hero/write", data)
    .then( (res)=>{
      console.log(res.data); //res 가 response가 아닌result다 
      history("/hero/list"); // redirect에 대응
    }).catch( (error)=>{
      console.log(error);
    });

    // axios.post( LINK, DATA ) : LINK서버로 DATA를 보냄
    // .then( (res)=> {} )      : promise 메소드로 response DATA를 받고 그 이후의 동작을 함
  }

  return(
    <div className='container'>
      <h1>게시판 글쓰기</h1>

      <table className="table table-hover " style={{marginTop:"13px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup>
            <tbody>
              <tr>
                <td>이름</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="title" name="title" value={heroName}
                        placeholder="이름을 입력하세요" onChange={nameChange}/>
                    </div>
                </td>
              </tr>       
              <tr>
                <td>업적</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="writer" name="writer" value={heroDesc}
                        placeholder="업적을 입력하세요" onChange={descChange} />
                    </div>
                </td>
              </tr>               
            </tbody>
          </table>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp;&nbsp;
            <Link className="btn btn-secondary">취소</Link>
          </div>

    </div>
  )
}

export default HeroWrite;