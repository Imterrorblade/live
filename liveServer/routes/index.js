var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  res.sendFile(path.resolve(__dirname, '../index.html'))
});
module.exports = router;