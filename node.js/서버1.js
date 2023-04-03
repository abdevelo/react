let http = require("http");

http.createServer( (request, response) => {
    response.writeHead( 200, {'Content-Type':'text/html'});
    response.end("<H1>Hello my first world</H1>")
}).listen(4000, () => { 
    // 내가 서버로 3000번을 사용하겠다고 지정 listen내의 포트번호와 http주소 :포트번호 가 일치해야..
    console.log (" server start http://127.0.0.1:4000"); // 127.0.0.1 은 본인 컴퓨터
})

//npm install nodemon 을 터미널에 입력 후에
//터미널에서 검색시 node대신 nodemon사용
//아직 적용못하네...다음에 


