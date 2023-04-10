let express = require('express'); // node_modules폴더에 있으면 
let router = express.Router();
let commonDB = require("./commonDB");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('member/member_register', {title: 'Express'});
});

// 아이디 중복체크 
    // (1) 클라이언트로부터 아이디를 받는다
    // (2) 받아온 아이디를 DB에 가서 존재하는지 유무를 확인
    // (3-1) 존재하면 FALSE를 사용자에게 전송
    // (3-2) 존재하지 않아서 사용가능하면 success를 반환
router.use('/idcheck', async function(req, res, next) {
  let userid = req.body.userid; // 사용자단에서 userid 보내라 
  sql = `select count(*) cnt from tb_member where userid='${userid}'`;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];  // rows의 0번째 element 중 cnt 의 요소

  if( cnt == 0 )
    res.json({"result":"success"}); 
  else
    res.json({"result":"fail"});
  res.render('member/member_register', {title: 'Express'});
});

// /member/save
router.use('/save', async function( req, res, next) {
  let userid =req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let nickname = req.body.nickname;

  let sql = `INSERT INTO tb_member( userid, password, username, phone, email, nickname, zipcode, address1, address2, wdate) VALUES (?,?,?,?,?,?,?,?,?,now())
            `;
  console.log(sql);
  try {
  await commonDB.mysqlRead( sql , [userid, password, username, phone, email, nickname, zipcode ,address1, address2]);
  res.json({"result":"success"});
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"});
  }
});


// *********/login 시 login화면 render해주는 것 만들기 *****************//
router.get('/login', async function(req,res,next){
  res.render('member/member_logon', {title: 'Express'}); // login화면띄워주기
} )

// ********* /member/login --> ID 및 비밀번호 일치 여부 확인 *****************//
router.post('/login', async function(req,res,next){
  let userid = req.body.userid;
  let password = req.body.password; 
  let sql = `select * from tb_member where userid='${userid}' `;
  // ${userid} 밖에 '' 따옴표 붙여주지 않으면 null object임 **** 주의 *****
   //userid 칼럼의 값이 ${userid} 인 모든 칼럼을 선택해서 그 결과는 하나 또는 그 이상의 row
   //ex) `select * from tb_member where age=20` ; 이면 나이가 20인 모든 사람을 선택한 rows

  let results = await commonDB.mysqlRead(sql); 


  if ( results.length == 0 )
  // array.length 는 배열 속 요소의 숫자를 반환하는 property다
            // a property is a characteristic or attribute of an object such as size, color or value. = 속성
  // results.length == 0 은 results라는 배열의 요소가 존재하는지 아닌지를 확인하는 조건문
  {
    res.json({"result":"fail", msg:"아이디가 없습니다."});
    return;
  }

  if ( results[0]["password"] != password )
  {
    res.json({"result":"fail", msg:"패스워드가 일치하지 않습니다."});
    return;
  }

  req.session["username"] = results[0]["username"];
  req.session["userid"] = results[0]["userid"];
  req.session["email"] = results[0]["email"];

  console.log(results[0]["username"]); // 값 잘 들어갔는 지 확인하는 용도 
  console.log(results[0]["userid"]);
  console.log(results[0]["email"]);

  res.json({"result":"success", msg:"로그온 성공"}); 
})



router.use('/logincheck', async function( req, res, next) {
  //1. req로 입력된 id, pw 를 받는다
  //2. 입력된 id,pw가 db의 값과 일치하는 지 비교한다 
  //3. 일치하면 success 아니면 fail을 친다 
  let userid =req.body.userid;
  let password = req.body.password;
  console.log(req.body);
  let sql = `SELECT count(*) as cnt FROM tb_member WHERE userid='${userid}' and password='${password}'`;
  console.log(sql);
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];  // rows의 0번째 element 중 cnt 의 요소

  if( cnt == 1 )
    res.json({"result":"success"}); 
  else
    res.json({"result":"fail"});
  // res.send("<h1>로그인 완료되었습니다.<h1>");
});




router.get('/put', async function(req,res, next) {
  let userid = req.query.userid;
  req.session["userid"] = userid;
  console.log(req.session["userid"]);
  //res.redirect("/");
});


router.get('/logout', async function(req,res, next) {
// 첫번째, session자체를 날려버리는 방법
  req.session["userid"]="";   
  req.session["username"]="";
  req.session["email"]="";

  // or 두번째, 파괴 방법

  // req.session.destroy();

  res.redirect("/"); // 로그아웃하고나면 index로 이동하기 
});



module.exports = router;
