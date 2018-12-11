var liveUtil = require('../lib/util/live.js')

module.exports = function initLiveWS(io) {
  io.of('/live').on('connection', function (socket) {
    socket.on('pushStream', function (data) {
      liveUtil.pushVideo(data.username, data.stream)
    })
  })
}