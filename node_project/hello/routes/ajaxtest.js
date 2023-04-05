var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("ajaxtest");
});

// http://127.0.0.1:3000/ajax/ajaxtest1
router.get('/ajaxtest1', function(req, res, next) {
  res.render("ajax/ajaxtest1");
});

//send함수가 적당히 알아서 데이터만 보냄
router.get('/result1', function(req, res, next) {
  res.send("data만 보낸다.");
});

router.get('/ajaxtest2', function(req, res, next) {
  res.render("ajax/ajaxtest2");
});

//send함수가 적당히 알아서 데이터만 보냄
//http://127.0.0.1:3000/ajax/add?x=5&y=8
router.get('/add', function(req, res, next) {

  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x+y;
  res.json({result:z});
  // 여기 render파트가 없이 따로 독립해서 나감 --> 그걸 react로 구현
});


router.get('/sub', function(req, res, next) {

  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x-y;
  res.json({result:z});
  // 여기 render파트가 없이 따로 독립해서 나감 --> 그걸 react로 구현
});

router.get('/Mul', function(req, res, next) {

  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x*y;
  res.json({result:z});
  // 여기 render파트가 없이 따로 독립해서 나감 --> 그걸 react로 구현
});

router.get('/Div', function(req, res, next) {

  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x/y;
  res.json({result:z});
  // 여기 render파트가 없이 따로 독립해서 나감 --> 그걸 react로 구현
});

module.exports = router;
