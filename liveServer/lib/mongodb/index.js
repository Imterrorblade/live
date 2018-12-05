var mongoose = require('mongoose')

var config = require('./config.js')

//连接数据库
mongoose.connect(config.url)

//获取数据连接
const connect = mongoose.connection


//监听数据库连接
connect.on('error',err => {
  console.log(err)
})

connect.on('connected', () => {
  console.log('mongodb 已连接')
})

connect.on('disconnected', () => {
  console.log('mongodb 断开连接')
})

connect.on('open', ()=> {
  console.log('mongodb 打开')
})

module.exports = mongoose