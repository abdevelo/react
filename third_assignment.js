
var express = require("express")
var app = express(); 
var fs = require("fs");
var ejs = require("ejs");

// /scoreform : 성적 입력 받는 화면 부르기
// /score : 성적의 합계와 평균 구하기 

app.get("/scoreform", (request,response) => {
  fs.readFile("./html/third_assignment.html", "utf-8", (err,data)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end(ejs.render(data));
  })
});

app.get("/score", (request,response) => {

  let name = request.query.name;
  let kor = parseInt(request.query.kor);
  let eng = parseInt(request.query.eng);
  let mat = parseInt(request.query.mat);

  let total = kor + eng + mat ;
  let result = `${name}의 총점은 ${total}이고 평균은 ${total/3}입니다.`

  response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
  response.end(result);
});


app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})