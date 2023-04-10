let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* commonDB 모듈은 
  SQL쿼리를 실행시키는 
  mysqlRead() 함수를 사용하기 위해
  필수이다*/

/*
* Q. 아래의 코드들은 라우터인가요?
* A. 아니
*    이건 코드스니펫인데 ...
*        노드제이에스 라우터 객체에서 
*     +  URL 경로가 '/view/:pg' 이고,
*     + GET request 일 때를 위한
*     + 라우트 핸들러야
*/

// Q. 스니펫의 정의는 ? 
// A. 코드의 작은 섹션을 의미
//    주로 다시사용가능한 것들 
//    주로 큰 코드베이스에서 추출해 온
//    특수한 목적이 있는 것
//    --> 미리 작성된 코드를 활용하기 때문에 코드 프로세스의 속도를 높일 수 있음.
//    --> 또한 표준화된 접근으로 에러의 가능성이 감소

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
           // 게시판 테이블 A 에서 회원 테이블 C의 특정 회원이 작성한 글의 전체 갯수를 찾는 테이블
           // 지금은 LEFT OUTER JOIN되는 두 테이블이 없어도 전체 개수 55개가 그대로 출력
           // 향후 검색기능에서 회원 ID만 넣고 찾는 기능을 추가하시기 위해서 이렇게 쿼리를 짜신 것 같음 

  let results = await commonDB.mysqlRead(sql, []);
  // "MySQL DB 쿼리로 작성한 데이터들이 return해오기를 기다리기 위해 await를 사용. commonDB모듈에서 제공된 mysqlRead 함수를 사용"
  // SQL문의 내용을 result에 담기 위해 프라미스를 사용한 부분
  // 프라미스에 await, async function 등을 활용할 수 있음
  // sql 쿼리로 db에서 값을 받아오는 거의 모든 구문에서 사용

  let totalCnt = results[0]["cnt"]
  // results로 담은 배열의 cnt 컬럼 값 중 0 번째 값 
  // 본래 위의 results 통에는 1개의 값인 '55' 만 담겼음 

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

  //위의 쿼리 구문은 SQL 파일에 정리를 대부분 해놓았으니 참고 
  //LIMIT A,B 는 A부터 B개만큼 값을 보여줘라 임
  // ex) 첫번째 pg는 0번째 배열부터 10개 
      // 두번째 pg는 10번째 배열부터 10개

  results = await commonDB.mysqlRead(sql,[]);

  res.render('board/board_list'
              , {session:req.session
                , A:results
                , totalCnt:totalCnt
                , pg:pg
                , paging:commonUtil.getPaging(pg,totalCnt)}); // commonUtil.js 의 함수인 getPaging 을 가져와서 paging에 담는다 
  // GET방식으로 클라이언트에서 받아온 정보를 서버단에서 조작? 후
  // 다시 화면으로 뿌려주기 위해서 res.render을 활용
  // 이렇게 Node.js에서 response를 전달하기 위한 방법은 여러가지있음 
  // ex) res.end(), res.send(), res.render()
  // - res.end() : response절차를 끝마치고 싶을 때 쓰는 메소드
  //               response header와 body가 모두 보내졌다는 신호.
  //               형식 : res.end([data][, encoding])
  // - res.send() : 다양한 데이터 타입을 전송하기 위해 사용
  //                보내지는 데이터의 타입에 따라 적합한 컨텐트 타입 헤더를 자동으로 적용시킴
  //                string이든, object,든 arrays 든...JSON이든 상관 없음
  // - res.render() : 특히 View template이나 HTML file을 보내기 위한 방법
  //                  어떤 템플릿 엔진이든 render할 수 있음
  //                  형식 : res.render ( VIEW , [ ,locals][,callback]  ) FILE의 확장자는 셋업에 따라 붙여도되고 생략해도 되고    
                   // VIEW           : EJS 등 뷰 탬플릿 이름
                   // LOCLAS(선택)   : 데이터를 포함한 객체 
                   // CALLBACK(선택) :  뷰가 렌더된 이후 호출될 함수
                   // ex) res.render( 'index', { title : 'My Website', 
                                            //   user : { name:'John', age:30 },
                                            //   products : [
                                                          // { name: 'Product A', price : 10},
                                                          // { name: 'Product B', price : 20},
                                                          // ]
                                            // });
                   // ex) 뷰 템플릿은 
                   // <h1><%= title %></h1> 
                  //    <ul>
                  //       <% products.forEach(function(product) { %>
                  //        <li> <%= product.name %> - <%= product.price %></li>
                  //       <%})%>
                  //    </ul>.
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
