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
function BoardWrite (props){

  // let {id} = useParams(); // ID값 받아와서 ---> useEffect ?
  let history = useNavigate(); // refresh, redirect처럼 화면의 이동을 보여줌
  
  //변수 4개를 하나의 JSON객체로 저장
  // 필드가 많을 때 변수 하나씩 만들면 힘들다
  const[inputs, setInputs]=useState({
    title:'', writer:'',contents:'',filename:''
  });

  // 아래처럼 각각 받아오는 것을 위의 하나로 통일 20230417
  // const[title,setTitle]=useState(""); 
  // const[writer,setWriter] = useState(""); 
  // const[contents,setContents] = useState("");
  


  //일단 useEffect 생략해봐 파일 올리는 거에서 20230417
  useEffect( () => {
    /*async function loadData(){
      let results = await axios.get(SERVERIP+"/board/view/"+);

      setTitle(results.data.rest_board.title);
      setWriter(results.data.rest_board.writer);
      setContents(results.data.rest_board.contents);
    }
    if (writer !==undefined) loadData(); //write가 아니고 view로 호출할 때 
    // window.load역할
    //BoardWrite 컴포넌트가 /board/write일 때는 undefined가 오고
    // /board/view/1일 때는 id에는 파라미터값이 저장
  */    },[]);
  

  //모든 필드의 이벤트를 여기서 처리한다 
  const onChange=(e)=>{
    const{value, name} = e.target; // 입력 객체로부터 값과 이름을 가져온다
    console.log(value, name);
    setInputs({...inputs, [name]:value }); // {...inputs} 점점점 인풋츠 json객체를 복사 
  };

  /*
  let temp = inputs;
  temp[name] = value;
  setInputs(temp);
  */

  // 아래 3개의 change를 위의 onChange로 대체 20230417
  // const titleChange=(e)=>{
  //   setTitle(e.target.value);
  // }
  // const writerChange=(e)=>{
  //   setWriter(e.target.value);
  // }
  // const contentsChange=(e)=>{
  //   setContents(e.target.value);
  // }




  // 서버로 입력받은 데이터를 전송하기
  const postData= ()=>{
    //데이터를 JSON객체로 묶어 보내야 함
    let frmData = new FormData(); //파일을 전송할 때 반드시 이 객체로 보내야 함
    frmData.append("title", inputs.title);
    frmData.append("writer",inputs.writer);
    frmData.append("contents", inputs.contents);
    frmData.append("file", window.document.myform.file.files[0]);
    //파일 첨부 시에 자바스크립트가 파일이 여러개 첨부하는 거로 처리한다
    // 그래서 무조건 배열 형태
    // document.폼이름.file태그의name속성. files[0];
    // 여러 개 추가할 수도 있다. 

    // 아래 줄 대체해서 파일 버전으로 위에 작성 20230417
    // let data = {title:title, writer:writer,contens:contents}
    axios.post(SERVERIP+"/rest_board/save", frmData)
    .then( (res)=>{
      console.log(res.data)
      if(res.data.result==="success"){
        alert("등록이 완료되었습니다.");
        history("/board/list"); // redirect에 대응
      }
      else {alert("작성명을 확인하세요")}
    }).catch( (error)=>{
      console.log(error);
    });

    // 아래의 코드를 위로 변경 20230417
    // axios.post(SERVERIP+"/rest_board/write", data)
    // .then( (res)=>{
    //   console.log(res.data)
    //   if(res.data.result=="success"){
    //     alert("등록이 완료되었습니다.");
    //     history("/board/list"); // redirect에 대응
    //   }
    //   else {alert("작성명을 확인하세요")}
    // }).catch( (error)=>{
    //   console.log(error);
    // });

    // axios.post( LINK, DATA ) : LINK서버로 DATA를 보냄
    // .then( (res)=> {} )      : promise 메소드로 response DATA를 받고 그 이후의 동작을 함
  }

  // JSON을 각개 변수로 해체 ( Destruction )
  const {title, writer, contents, file} = inputs;






  return(
    <div className='container'>
    <form name = "myform"encType='multipart/form-data'>
      {/* 위의 폼을 추가 
         제일 상위 div안으로 form태그 위치 2023 04 17  */}

      <h1>게시판 글쓰기</h1>

      <table className="table table-hover " style={{marginTop:"13px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup>
            <tbody>
              <tr>
                <td>제목</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="title" name="title" value={title} onChange={onChange}
                        placeholder="제목을 입력하세요"/>
                    </div>
                </td>
              </tr>   
              <tr>
                <td>작성자</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="writer" name="writer" value={writer} onChange={onChange}
                        placeholder="작성자를 입력하세요"/>
                    </div>
                </td>
              </tr>    
              <tr>
                <td>내용</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="contents" name="contents" value={contents} onChange={onChange}
                        placeholder="내용을 입력하세요"/>
                    </div>
                </td>
              </tr>     
              <tr>
                <td>파일</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="file" className="form-control" id="contents" name="contents" value={file} onChange={onChange}
                        placeholder="내용을 입력하세요"/>
                    </div>
                </td>
              </tr>            
            </tbody>
          </table>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp;&nbsp;
            <Link className="btn btn-secondary">취소</Link>
          </div>
        </form>
    </div>

  )

}

export default BoardWrite;