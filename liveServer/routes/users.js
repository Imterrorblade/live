var express = require('express');
var UserService = require('../lib/service/user')
var router = express.Router();

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
  res.send(User.findAll());
});

router.post('/register', function(req, res, next) {
  UserService.register(req.body).then(data => {
    res.json(data)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
