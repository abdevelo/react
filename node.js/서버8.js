// 렌더링 (feat. ejs 엔진)

let http = require("http");
let fs = require("fs");
let ejs = require("ejs"); //npm install ejs

let boardList = [
                {id:1, title:"제목1",writer:"작성자1", wdate:"2023-04-03"},
                {id:2, title:"제목2",writer:"작성자2", wdate:"2023-04-04"},
                {id:3, title:"제목3",writer:"작성자3", wdate:"2023-04-03"},
                {id:4, title:"제목4",writer:"작성자4", wdate:"2023-04-05"},
                {id:5, title:"제목5",writer:"작성자5", wdate:"2023-04-03"},
];

let server = http.createServer( 
    (request, response) => {
    response.writeHead( 200, {'Content-Type':'text/html;charset=utf-8'});
    
    fs.readFile("./html/test2.html", "utf-8", (error, data)=> {
        if (error)
        {
            response.writeHead( 500, {'Content-Type':'text/html;charset=utf-8'});
            response.end("error"); //오류상황임
            return; // error시에 else구문쓰지않고 그대로 return하는 것이 더 간결
        }

        response.writeHead( 200, {'Content-Type':'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
            boardList:boardList
        }));  // ejs 렌더링

        // ejs 템플릿 엔진을 통해서 html과 nodejs의 데이터를 결합한다
    });

})

server.listen(4000, () => { 
    console.log (" server start http://127.0.0.1:4000");
})

