
var express = require("express")
var app = express(); 
var ejs = require("ejs");
var fs = require("fs");
app.set("view engine",ejs); 
app.use(express.urlencoded({extended:false}));


app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})