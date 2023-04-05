var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var guestRouter = require('./routes/guestbook'); // 모듈을 메모리로 가져온다
var ajaxRouter = require('./routes/ajaxtest');


var app = express();

// view engine setup  환경변수설정 1 : ejs 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 환경변수설정 2 : 미들웨어 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static : image, css, js
// node.js 가 언더바 2개 (__) 로 시작하는 변수나 함수는 내장변수나 함수이다. 
// *내장변수 : node.js만들때 같이 포함된 애들
// __dirname : 현재 디렉토리 경로 정보를 갖고 있음
// path.join : path가 전체 디렉토리 경로에 대한 관리를 도와준다. join은 합친다. 
// path.join(__dirname, 'public') // c:temp/public 형태로 전체 경로를 만들어주는 함수
// 직접 하려면 할 수 있지만 경로에 /(슬래시) 등 형식을 맞춰서 만들어 줌 
// 리눅스는 / 슬래시 , 윈도우는 역슬래시 \ 
// 하지만 역슬래시 썼을 때 문제는 \ 를 tab키로 인식함 그래서 역슬래시를 두 번 써줘야 함
// ex) c:\\temp\\public 
// 하지만 귀찮음 
// os중 가장 오래 된건 유닉스(60~70년대) -> 비슷하게 리눅스 -> 
// 유닉스는 서버 전용 컴퓨터만 가능
// 리눅스는 개인용 pc에도 가능
// 등등...... 
// 후에 MS office라는 소프트웨어로 마이크로소프트의 윈도우가 부흥 
// 등등 .....


console.log( __dirname ); //추가
console.log( path.join( __dirname, 'public')); //추가

app.use(express.static(path.join(__dirname, 'public')));//추가

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/guestbook', guestRouter); // url이 /guestbook으로 시작할 경우 guestRouter가 처리
app.use('/ajax',ajaxRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// npm install -g nodemon 
// nodemon start // 하면 수정 후에도 자동으로 반영. 매번 서버를 껐다 킬 필요가 없음. 수정하면 자동으로 서버를 불러와줌. 실제 운영시에는 못쓰고 개발시에 ㅇㅇ
// powershell 창은 보안이 강화되어 있어서 nodemon을 읽지 못할 때가 있으니 command창으로 바꿔준 후 처리한다 