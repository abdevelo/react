
// Get 방식

var express = require("express")
var app = express(); 

//http://127.0.0.1:4000/add?x=45&y=7

app.get(( "/add"), (req,res)=> {  
  // let add = { x : req.query.x , y : req.query.y};
  // let result = parseInt(add.x)+parseInt(add.y);
  // res.send( result.toString() );
  x = req.query.x;
  y = req.query.y;
  z = parseInt(x)+parseInt(y);
  res.send({ x:x, y:y, z:z});
} )

//http://127.0.0.1:4000/add/45/7

app.get(( "/add/:x/:y"), (req,res)=> {
  // let add = { x : req.params.x , y : req.params.y};
  // let result = parseInt(add.x)+parseInt(add.y);
  // res.send( result.toString() );
  x = req.params.x;
  y = req.params.y;
  z = parseInt(x)+parseInt(y);
  res.send({ x:x, y:y, z:z});
} )


app.use((request,response) => {
  response.writeHead(200, {"Content-type":"text/html"});
  response.end("<h1>Express</h1>");
});

app.listen(4000, ()=> {
  console.log("server start http://127.0.0.1:4000");
})