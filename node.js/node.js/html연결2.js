
var express = require("express")
var app = express(); 
var fs = require("fs");
var ejs = require("ejs");

app.use(express.urlencoded({extended:false}));

app.get( "/addform",(request,response) => {
  fs.readFile("./html/addform.html", "utf-8",(err,data)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end(ejs.render(data));
  });
});

app.get("/add",(request,response) => {

  let x = parseInt(request.query.x);
  let y = parseInt(request.query.y);

  response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
  response.end(`${x}+ ${y} = ${x+y}`);
});

app.get( "/calcform",(request,response) => {
  fs.readFile("./html/calcform.html", "utf-8",(err,data)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end(ejs.render(data));
  });
});


app.get("/calc",(request,response) => {

  let x = parseInt(request.query.x);
  let y = parseInt(request.query.y);
  let operator = request.query.operator;

  if ( operator == "1")
    response.send(`${x} + ${y} = ${x+y}`);
  else if ( operator == "2")
    response.send(`${x} - ${y} = ${x-y}`);
  else if ( operator == "3")
    response.send(`${x} * ${y} = ${x*y}`);
  else ( operator =="4")
    response.send(`${x} / ${y} = ${x/y}`);

  // response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
});

app.get("/guguform", (request,response)=> {

  fs.readFile("./html/gugu2.html", "utf-8", (err,data)=> {
    response.writeHead(200, {"Content-type":"text/html"});
    response.end(ejs.render(data));
  })
});

app.get("/gugushow", (request,response)=>{

  let x = parseInt(request.query.x);
  let operator = request.query.operator;
  let table = '';
    for (let y=1; y<10; y++)
    {
      table += `<p style="color:blue;font-size:14pt"> ${x} * ${y} = ${x*y} </p>`;
    }
  response.send(table);
})

app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})