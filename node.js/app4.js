var express = require("express")
var app = express(); 
var ejs = require("ejs");
var fs = require("fs");


app.set("view engine",ejs); // 내부 변수에 값을 설정
app.use(express.urlencoded({extended:false})); // 미들웨어 사용

// app.get("/",(req,res)=>{
//   fs.readFile("./html/index.html", "utf-8", (error, data)=>{
//     res.send( data.toString() );
//   });
// });

// http://127.0.0.1:4000/gugu?dan=4

app.get("/gugu",(req,res)=>{
  let dan = req.query.dan;
  let table = '';
  for ( let i=1; i<=10; i++)
  {
    table += `${dan} x ${i} = ${dan * i} <br/>`
  }
  res.set('Content-type', 'text/html');
  res.send( table);
});


app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})

