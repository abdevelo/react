let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser'); // 미들웨어, 쿠키에 접근 및 조작이 가능하도록
let logger = require('morgan'); // 미들웨어, 어플리케이션 동작에 대한 인사이트를 얻는다 ex) URL 이 접속되고 있는지 여부, 응답코드가 돌아왔는지, 프로세스에 걸리는 시간 등
let app = express();
const session = require('express-session');
const MYSQLSTORE = require('express-mysql-session')(session)
const DBInfo = require("./routes/commonDB") // 디비 정보를 줘야 함
const cors = require('cors'); // 2023 04 12 npm install cors 후 

/*******************라우터*****************/
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let boardRouter = require('./routes/board');
let memberRouter = require('./routes/member');
let heroRouter = require('./routes/hero'); // 2023/04/12 추가

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 : 모든 웹 상의 요청이 거쳐간다
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// console.log(DBInfo.DBInfo); // 디버깅은 한 줄 한 줄 씩 실행
let sessionStore = new MYSQLSTORE(DBInfo.DBInfo);
app.use( session({
  key: "session_key",
  secret: "rmsiddkanrjsk", // 그냥 아무거나 대충 복잡한 거 씀. 암호화할 때 사용할 것
  store:sessionStore,
  resave : false,
  saveUninitialized : false
})); // 미들웨어를 거치는 동안 req.session 에 붙는 것(?)
app.use(cors()); 

/*******************URL 라우터**********************/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter); //boardRouter에 정의된 베이스 URL 이다
app.use('/member', memberRouter);
app.use('/hero',heroRouter); // 2023/04/12 추가

// cors 추가 2023/04/12
// 원래는 보다 정밀하게 받는 방법을 찾아서 작성해야 하지만
// 현재는 아무데서나 요청해오면 다 받는 것으로 진행

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
