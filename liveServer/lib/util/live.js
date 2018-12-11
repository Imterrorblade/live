const fs = require('fs')
const path = require('path')

module.exports = {
  pushVideo(fileName, data){
    fs.writeFileSync(path.resolve('../../public/assets/liveVideo', fileName + '.mp4'))
  }
}