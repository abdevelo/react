
var express = require("express")
var app = express(); 
var ejs = require("ejs");
var fs = require("fs");
app.set("view engine",ejs); 
app.use(express.urlencoded({extended:false})); 

let scoreData = [
  {id:1, name:"홍길동", kor:90, eng:80, mat:100}
];
//url 은 서버 전체에 유일해야 함 /score/list값 처럼 다른 일을 수행하는 함수에 동일 url을 쓸 수 없음
app.get("/score/list", (req,res)=>{
  // views/score/score_list.ejs
  // express frame work가 디자인 파일들을 veiws 폴더에 놓기로 약속되어 있음
  // response 객체에 render라는 함수를 express가 추가
  // 첫번째 매개변수 : html파일
  // 두번째 매개변수 : 데이터를 JSON형태로 전달해야 함
  // 이 두개를 합쳐서 새로운 문서를 만들어 클라이언트로 전송
  res.render( "score/score_list.ejs", {scoreList:scoreData});

});
app.get("/score/view/:id", (req,res)=>{
  let id = req.params.id;
  // filter 는 조건을 모든 데이터 셋을 '배열'로 반환
  // find   는 조건을 만족하는 첫 번 째 데이터만 (배열X)
  let scoreItem = scoreData.find(score => score.id==id);
  res.render("score/score_view.ejs", {score:scoreItem});
});

app.get("/score/write",(req,res)=>{
  res.render("score/score_write.ejs");
})

app.post("/score/save", (req,res)=>{  // 성적은 중요한 내용이므로 post
  let name = req.body.name;
  let kor = parseInt(req.body.kor);
  let eng = parseInt(req.body.eng);
  let mat = parseInt(req.body.mat);
  let id = scoreData[scoreData.length-1].id+1; // 젤 마지막에 있는 데이터의 id + 1 을 해야 함
  
  data = {id:id, name:name, kor:kor, eng:eng, mat:mat};
  scoreData.push(data);

  res.redirect("/score/list");
})

app.use("/", (req,res)=>{
  res.render("index.ejs");
});

app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>404 Error</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})