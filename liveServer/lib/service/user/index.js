const UserDao = require('../../module/user')

module.exports = {
  async findAll() {
    return new Promise((resolve, reject) => {
      return UserDao.findAll((err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  },
  async findOne(data) {
    return new Promise((resolve, reject) => {
      UserDao.findOne(data, (err, resData) => {
        if (err) {
          reject(err)
        }
        resolve(resData)
      })
    })
  },
  async findByUserName(userName) {
    return new Promise((resolve, reject) => {
      UserDao.findOne({
        username: userName
      }, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  },
  async register(data) {
    return new Promise((resolve, reject) => {
      this.findByUserName(data.username).then(person => {
        if(person){
          reject(new Error('用户名已存在'))
        }
        UserDao.create(data, (err, data)=> {
          if(err){
            reject(err)
          }
          resolve(data)
        })
      })
    })
  },
  login(data){
    return new Promise((resolve, reject)=> {
      this.findOne(data).then(data => {
        if(data){
          resolve(data)
        } else {
          throw new Error('用户或密码错误')
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}