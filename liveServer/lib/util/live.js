const fs = require('fs')
const path = require('path')

module.exports = {
  pushVideo(fileName, data) {
    const array = Object.keys(data).map(key =>{
      return data[key]
    })
    const buf = new Uint8Array(array)
    fs.writeFile(
      path.resolve('public/assets/video', fileName + '.webm'),
      buf,
      function(err) {
        if (err) {
          console.log(err)
        }
      }
    )
  }
}
