let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
/* commonDB 모듈은 
  SQL쿼리를 실행시키는 
  mysqlRead() 함수를 사용하기 위해
  필수이다*/


/* GET home page. */
router.get('/list', async function(req, res, next) {
  sql = `
        select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate
        from tb_board
        `;
  let results = await commonDB.mysqlRead(sql,[]);
  res.render('board/board_list', {A:results});
});

router.use("/view/:id",  async function(request, response){
  let id = request.params.id;
  sql = `       
         select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate
        from tb_board where id=${id}`;
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
