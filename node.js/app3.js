
// Post 방식

var express = require("express")
var app = express(); 

// bodyParser 모듈이 있는데 모듈을 설치하고 => express 자체적으로 
// body에 데이터를 가져옴
app.use(express.urlencoded({extended:false}));
// 미들웨어
//          부르기 전에 맨 위에서 한번만 써도 됨
//          App객체 만들고 다른 URL처리하기 전에 호출
app.post("/add", (req, res) => {
  let x = req.body.x;
  let y = req.body.y;
  let z = parseInt(x)+parseInt(y);

  res.send( {x:x, y:y, z:z});
});

app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})


// Get 방식의 경우 ?x=4&y=5 request.query.x
// Get 방식의 경우 /4/5     request.params.x
// Post 방식은 
// app.use(express.urlencoded({extended:false})); 
// 가 필수적으로 선행
// 그 후 request.body.x 로 처리
