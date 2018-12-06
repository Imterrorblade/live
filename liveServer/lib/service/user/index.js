const UserDao = require('../../module/user')

module.exports = {
  findAll() {
    return UserDao.findAll()
  },
  findOne(data) {
    return UserDao.findOne(data)
  },
  findByUserName(userName) {
    return UserDao.findOne({
      username: userName
    })
  },
  register(data) {
    if (this.findByUserName(data.username)) {
      throw new Error('用户名已存在')
    } else {
      return UserDao.save(data)
    }
  }
}
