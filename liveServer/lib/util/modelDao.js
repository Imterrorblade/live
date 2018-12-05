const mongoose = require('../mongodb/index.js')

module.exports = {
  getModelDao (modelName, model) {
    return mongoose.model(modelName, new mongoose.Schema(model))
  }
}
