var express = require('express');
var UserDao = require('../lib/module/user/index.js')
var router = express.Router();

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
  res.send(User.findAll());
});

module.exports = router;
