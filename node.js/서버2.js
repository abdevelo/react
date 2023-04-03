let http = require("http");

let server = http.createServer( 
    (request, response) => {
        // 브라우저 http://127.0.0.1:3000 서버로 액세스 요청이 들어오면
        // request 객체 :브라우저에서 요청한 정보를 담아오는 객체 
        // response 객체 : 서버에서 클라이언트로 정보를 보낼 때 여기에 담아 보냄
        // writeHead : 200은 정상코드 
    response.writeHead( 200, {'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>두번째 서버입니다</H1>")
    // 이렇게 h태그로 담아서 직접 작성할 수도 있지만, html 파일을 이곳에 담아서 보냄
})
// charset=utf-8 넣으면 한글로 적어도 번역해줌


server.listen(4000, () => { 
    // 내가 서버로 3000번을 사용하겠다고 지정 listen내의 포트번호와 http주소 :포트번호 가 일치해야..
    console.log (" server start http://127.0.0.1:4000"); // 127.0.0.1 은 본인 컴퓨터
})

//npm install nodemon 을 터미널에 입력 후에
//터미널에서 검색시 node대신 nodemon사용
//아직 적용못하네...다음에 

// 터미널에서 ctrl+c 는 현재 실행 중인 건에 대한 종료
