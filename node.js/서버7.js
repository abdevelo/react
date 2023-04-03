// 렌더링 (feat. ejs 엔진)

let http = require("http");
let fs = require("fs");
let ejs = require("ejs"); //npm install ejs

let server = http.createServer( 
    (request, response) => {
    response.writeHead( 200, {'Content-Type':'text/html;charset=utf-8'});
    
    fs.readFile("./html/test.html", "utf-8", (error, data)=> {
        if (error)
        {
            response.writeHead( 500, {'Content-Type':'text/html;charset=utf-8'});
            response.end("error"); //오류상황임
            return; // error시에 else구문쓰지않고 그대로 return하는 것이 더 간결
        }

        response.writeHead( 200, {'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
            name : "jason",
            age : 23,
            address : "서울시 관악구",
            limit : 10
        }));  // ejs 렌더링

        // ejs 템플릿 엔진을 통해서 html과 nodejs의 데이터를 결합한다
    });

})

server.listen(4000, () => { 
    console.log (" server start http://127.0.0.1:4000");
})

