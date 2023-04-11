let http = require("http");
let fs = require("fs"); // 파일 읽기
let url = require("url"); //url분석을 위한 라이블러

// http:127.0.0.1:4000?name=Tom&age=17 

let server = http.createServer( (request, response) => {

    //console.log( request );
    console.log( request.url); // 전송 URL
    console.log( request.method); // 전송방식

    let rurl = request.url; 
    let query = url.parse(rurl, true).query; // parsing : string분석 후 json객체로 전환'
    // console.log ( query );


    if ( query.name!= "")
    {
        response.writeHead(200, { 'Content-Type':'text/html; charset=utf-8'});
        response.end(`이름 : ${query.name} 나이${query.age}`);
    }

})
// charset=utf-8 넣으면 한글로 적어도 번역해줌


server.listen(4000, () => { 
    // 내가 서버로 3000번을 사용하겠다고 지정 listen내의 포트번호와 http주소 :포트번호 가 일치해야..
    console.log (" server start http://127.0.0.1:4000"); // 127.0.0.1 은 본인 컴퓨터
})