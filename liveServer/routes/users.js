var express = require('express')
var UserService = require('../lib/service/user')
var router = express.Router()

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
  res.send(User.findAll())
})

router.post('/register', function(req, res, next) {
  const resData = UserService.register(req.body)
    .then(resData => {
      res.json({
        success: true, 
        data: resData
      })
    })
    .catch(err => {
      res.json({
        success: false,
        message: err.message
      })
    })
})

router.post('/login', function(req, res, next){
  UserService.login(req.body).then(data => {
    res.json({
      success: true,
      data
    })
  }).catch(err => {
    res.json({
       success: false,
        message: err.message
    })
  })
})

module.exports = router
