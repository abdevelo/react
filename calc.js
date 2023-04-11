import React, {useState} from "react";

  function Calc(props) {

    const [nm, setNM] = useState("");
    const [x, setX]=useState(0); //국
    const [y, setY]=useState(0); //영
    const [z, setZ]=useState(0); //수
    const [t, setT]=useState(0); //총점
    const [v, setV]=useState(0); //평균
    
    const nmChange = (e) => { 
      setNM(e.target.value); 
    }; 
    const xChange = (e) => { 
      setX(e.target.value); 
    }; 
    const yChange = (e) => {
      setY(e.target.value); 
    }; 
    const zChange = (e) => {
      setZ(e.target.value); 
    }; 

    const result = ()=> {
     setT(parseInt(x)+parseInt(y)+parseInt(z));
     setV((parseInt(x)+parseInt(y)+parseInt(z))/3);
    };

    const avg = ()=> {

    }

    return(
      <div>
        이름 : <input type="text" onChange={nmChange}/> <br/>
        국어 : <input type="text" onChange={xChange}/> <br/>
        영어 : <input type="text" onChange={yChange}/> <br/>
        수학 : <input type="text" onChange={zChange}/> <br/>
    

        <button type="button" onClick={result}>결과확인</button>

        
        <p>{nm}의 점수는 </p>

        <h1>총점 : {t} 평균 : {v}</h1>
      </div>
    )
  }

export default Calc;