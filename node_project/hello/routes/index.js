var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); // index.ejs 에서 ejs확장자를 생략함
});

module.exports = router;

// CODEGPT says...
// index.js 는 typically 웹어플리케이션의 특정부분을 위한 routes를 정의하기 위해 사용
//          보통 router를 exports하는데 이 것은 http request와 response를 특정한 URL 에서 다룬다. 