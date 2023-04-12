var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');
/* GET home page. */


// http://localhost:9090/hero/list
router.get('/list', async function(req, res, next) {

  let sql=`
	SELECT A.id,A.hero_name,A.hero_desc,DATE_FORMAT(A.wdate, '%Y-%m-%d') wdate
	FROM tb_hero A
  `;
  let results = await commonDB.mysqlRead(sql,[]);
  res.json(results);

  // DB연결 전 데이터 직접 입력했던 부분
  // res.json(
  //   [
  //     {id:1, name:"이순신",descr:"임진왜란승리"},
  //     {id:2, name:"강감찬",descr:"임진왜란승리"},
  //     {id:3, name:"을지문덕",descr:"임진왜란승리"},
  //     {id:4, name:"세종대왕",descr:"임진왜란승리"},
  //     {id:5, name:"문종",descr:"임진왜란승리"},
  //   ]
  // );
});

router.post('/write', async function(req,res,next) {

  try{
    let hero_name= req.body.hero_name;
    let hero_desc= req.body.hero_desc;

    sql =`
            INSERT INTO tb_hero ( hero_name, hero_desc, wdate)
            VALUES (?,?, NOW())
        `;

    let result= await  commonDB.mysqlRead(sql,[hero_name, hero_desc]);
    res.json({"result":"success"});
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"});
  }
});

module.exports = router;


// 같은 서버를 공유할 순 없음 
// node.js의 포트번호를 변경하겠음 
// app.js 가서 라우트 추가 