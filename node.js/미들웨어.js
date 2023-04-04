
var express = require("express")
var app = express(); 


app.use( (request, response, next) => {
  // request는 (브라우저 --> 서버) 정보를 보낼 때 정보를 가지고 있는 애
  // response는 (서버 --> 브라우저) 
  // next는 다음 함수를 호출한다
          // 안써도 그만 = 없어도 함수가 돌아감
  request.name="홍길동";
  response.name="John";
  console.log("첫번째 미들웨어 ");
  next();
});

app.use( (request, response, next)=> {
  console.log("두번째 미들웨어");
  request.phone="010-0000-0000";
  response.address="서울시 영등포구";
  next();
});

app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
  console.log( request.name );
  console.log( response.name );
  console.log( request.phone );
  console.log( response.address );
  response.write( request.name );
  response.write ( response.name );
  response.write ( request.phone );
  response.write( response.address );
  response.end("<h1>Express</h1>");
});

app.listen(5000, ()=> {
  console.log("server start http://127.0.0.1:5000");
})