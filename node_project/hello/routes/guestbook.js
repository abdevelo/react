var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("<h1>guestbook</h1>");
  // res.render('guestbook/list');
});

module.exports = router;
