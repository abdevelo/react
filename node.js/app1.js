
var express = require("express")
var app = express(); // 서버 생성 완료

// Express 모듈은 앞의 방식들을 더 간편하게 사용할 수 있는 방식
// - use,get,post 함수 3개가 있음
//    (1) get : get방식으로 온 것만
//    (2) post : post 방식으로 온 것만
//    (3) use : get이든 post방식이든 상관 없이


app.use("/test", (request, response) => {
  response.writeHead(200, { "Content-type" : "text/html"});
  response.end("<H1>TEST</H1>");
}); // get이든 post이든 다 처리 가능 

app.get("/get", (request, response)=> {
  response.writeHead(200, { "Content-type" : "text/html"});
  response.end("<H1>GET</H1>");
})

app.get("/userinfo", (req, res) => {
  let userinfo = { name : "Tom", "phone": "010-0000-0000"};
  res.send( userinfo ); //send함수를 이용해서 JSON데이터 송신
})
// http://127.0.0.1:4000/userinfo2?name=Jane&phone=01000000000
// url 정보가 이렇게 되는 것은 옛날 방식
// get방식

app.get("/userinfo2", (req, res) => {
  // req.params.name;
  let userinfo = { name : req.query.name, "phone": req.query.phone};
  res.send( userinfo ); //send함수를 이용해서 JSON데이터 송신
})


// http://127.0.0.1:4000/userinfo3/brown/010-0000-0000
// 최근 url 작성법으로 권장되는 방식
// get 방식

app.get("/userinfo3/:username/:phone", (req, res) => {
  // req.params.name;
  let userinfo = { username : req.params.username
                  , phone: req.params.phone};
  res.send( userinfo ); //send함수를 이용해서 JSON데이터 송신
})


app.post("/post", (request, response)=> {
  response.writeHead(200, { "Content-type" : "text/html"});
  response.end("<H1>POST</H1>");
})





// 다른 url 처리가 없을 때 처리
// 따라서, url없는 app.use의 위치는 가장 하단이어야 함
// 그렇지 않고 상단에 있는 경우는 
// 모든 url있는 경우도 이아이가 처리
app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})