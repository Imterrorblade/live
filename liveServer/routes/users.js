var express = require('express');
var UserService = require('../lib/service/user')
var router = express.Router();

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
  res.send(User.findAll());
});

router.post('/register', function(req, res, next) {
  res.json(UserService.register(req.body))
})

module.exports = router;
