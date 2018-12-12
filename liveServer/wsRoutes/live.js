var liveUtil = require('../lib/util/live.js')

module.exports = function initLiveWS(io) {
  io.of('/live').on('connection', function(socket) {
    console.log('new live connected')
    socket.on('pushStream', function(data) {
      liveUtil.pushStream(data.username)
    })
    socket.on('pushVideo', function(data) {
      liveUtil.pushVideo(data.username, data.data)
    })
    socket.emit('message', 'hello')
  })
}
