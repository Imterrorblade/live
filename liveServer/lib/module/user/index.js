const User = require('./model.js')
const modelDao = require('../util/modelDao.js')

module.exports = {
  modelDao: modelDao.getModelDao('User', User)
}