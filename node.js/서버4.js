// GET방식으로 보내기 (feat.URL)

let http = require("http");
let fs = require("fs"); // 파일 읽기
let url = require("url"); //url분석을 위한 라이블러

// http:127.0.0.1:4000/add?x=4&y=5 
// http:127.0.0.1:4000/sub?x=4&y=5
// http:127.0.0.1:4000/userinfo?userid=test&username=Tom  

let server = http.createServer( (request, response) => {

    //console.log( request );
    // console.log( request.url); // 전송 URL
    console.log( request.method); // 전송방식

    let rurl = request.url; 
    let pathname = url.parse(rurl, true).pathname; //  /add
    let query = url.parse(rurl, true).query; // {x:'4', y:'5'}
    console.log ( query );
    console.log ( pathname );
    console.log ( typeof(query));

    let x = parseInt(query.x);
    let y = parseInt(query.y);
    if ( pathname=="/add" ) 
    {
        response.writeHead(200, { 'Content-Type':'text/html; charset=utf-8'});
        let z = x+y;
        response.end(`${x} + ${y} = ${z}`); // 4+5 =9
    }
    else if ( pathname=="/sub" ) 
    {
        response.writeHead(200, { 'Content-Type':'text/html; charset=utf-8'}); //여기 200 그대로?
        let w = x-y;
        response.end(`${x} - ${y} = ${w}`);
    }
    else if ( pathname=="/userinfo" )
    {
        response.writeHead(200, { 'Content-Type':'text/html; charset=utf-8'}); //여기 200 그대로?
        let userid = query.userid;
        let username = query.username;
        response.end(`userid : ${userid} <br> username: ${username}`)
    }
    else
    {
        response.writeHead(404, { 'Content-Type':'text/html; charset=utf-8'});
        response.end("<h1>존재하지 않는 url입니다.</h1>")
    }

})
// charset=utf-8 넣으면 한글로 적어도 번역해줌


server.listen(4000, () => { 
    // 내가 서버로 3000번을 사용하겠다고 지정 listen내의 포트번호와 http주소 :포트번호 가 일치해야..
    console.log (" server start http://127.0.0.1:4000"); // 127.0.0.1 은 본인 컴퓨터
})