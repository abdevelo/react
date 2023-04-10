let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* commonDB 모듈은 
  SQL쿼리를 실행시키는 
  mysqlRead() 함수를 사용하기 위해
  필수이다*/


/* GET home page. */
router.get('/list/:pg', async function(req, res, next) {

  let pg = parseInt(req.params.pg);
  // pg = 1일 때 게시물 번호 0부터 시작
  // pg = 2일 때             10부터 시작
  // 페이지번호가 pg일 때 , 게시물번호는 (pg-1)*10
  // --> 이 값으로 limit의 시작 값을 지정
  let sql = `
            SELECT count(*) cnt
            FROM tb_board A
            LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
            LEFT OUTER JOIN tb_member C ON A.writer=C.userid
          `;

  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"]

      sql = `
              SELECT A.id, A.title, A.writer, A.num, A.username
                      , date_format(A.wdate, '%Y-%m-%d') wdate 
              FROM 
              (
              SELECT A.id, A.title, A.writer, A.wdate, C.username
              , @rownum:=@rownum+1 num
              FROM tb_board A
                LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
                LEFT OUTER JOIN tb_member C ON A.writer=C.userid
              ORDER BY id DESC
              ) A
              LIMIT ${(pg-1)*10},10;
            `;

  results = await commonDB.mysqlRead(sql,[]);

  res.render('board/board_list'
              , {session:req.session
                , A:results
                , totalCnt:totalCnt
                , pg:pg
                , paging:commonUtil.getPaging(pg,totalCnt)}); // commonUtil.js 의 함수인 getPaging 을 가져와서 paging에 담는다 
});


router.use("/view/:id",  async function(request, response){
  let id = request.params.id;
  sql = `       
         select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate
        from tb_board where id=${id}`;

        // select * from tablename where id=${id}   ------- (sql,[])
        // select * from tablename where id=?       ------- (sql,[id])
  let results = await commonDB.mysqlRead(sql, []);
  let item = results.filter(dog=>dog.id==id); // 필터가 배열로 가져오기에 
  response.render("board/board_view.ejs", {item:item[0]}); // 0번째로 지정
});

router.use("/write", (request, response)=>{
  response.render("board/board_write.ejs", {item:item[0]}); // 0번째로 지정
});

router.use("/save", async (request, response)=>{
  let title = request.body.title;
  let contents = request.body.contents;
  let writer = request.body.writer;
  // let id = results.length+1;
  sql = `       
        INSERT INTO tb_board( title, writer, contents, wdate)
        VALUES(${title},${writer},${contents},${wdate})`;
  let results = await commonDB.mysqlRead(sql, []);
  results.push({id:id, title:title, contents:contents, writer:writer, wdate:wdate});
  response.redirect("/list"); 
});

module.exports = router;
