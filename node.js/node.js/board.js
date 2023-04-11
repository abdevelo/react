
var express = require("express")
var app = express(); 
var fs = require("fs");
var ejs = require("ejs");

// ejs 엔진은 views폴더 아래서 파일을 검색한다
app.set("view engine", ejs); 
app.use(express.urlencoded({extended:false}));

let boardList = [
  {id:1, title:"제목1",writer:"작성자1",wdate:"2023-04-04"},
  {id:2, title:"제목2",writer:"작성자2",wdate:"2023-04-05"},
  {id:3, title:"제목3",writer:"작성자3",wdate:"2023-04-06"},
  {id:4, title:"제목4",writer:"작성자4",wdate:"2023-04-07"},
  {id:5, title:"제목5",writer:"작성자5",wdate:"2023-04-08"},
]

app.use("/board/list", (request, response)=>{
    response.render("board/board_list.ejs", {A:boardList});
});

app.use("/board/view/:id", (request, response)=>{
  let id = request.params.id; // 보드리스트에서 id에 해당하는거 찾아서 넘겨주려고 
  let item = boardList.filter(dog=>dog.id==id); // 필터가 배열로 가져오기에 
  response.render("board/board_view.ejs", {item:item[0]}); // 0번째로 지정
});

//페이지만 이동한다. board_write.ejs로 이동만한다
//
app.use("/board/write", (request, response)=>{
  response.render("board/board_write.ejs", {item:item[0]}); // 0번째로 지정
});

//열린 페이지를 저장하기 
app.use("/board/save", (request, response)=>{
  let title = request.body.title;
  let contents = request.body.contents;
  let writer = request.body.writer;
  let id = boardList.length+1;

  boardList.push({id:id, title:title, contents:contents, writer:writer});

  response.redirect("/board/list"); 
  // 함수를 직접 호출하면 안 됌, 호출하기까지 내부적으로 호출하는 프레임워크가 많기에. 호출할 방법도 없음. redirect는 페이지 강제이동. 
  // 언어불문. 정해져 있음. 
  // redirect는 중간단계 거치면서 해야 하는 것들을 알아서 처리해줌
  // 프레임 워크라는 것은 우리가 모르는 코드들이 숨어있기 때문에 redirect를 통해서 해야 함

});

app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})