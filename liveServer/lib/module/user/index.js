const modelDao = require('../../util/modelDao.js');

const model = {
  username: String,
  label: String,
  img: String,
  password: String
};

module.exports = modelDao.getModelDao('User', model)

