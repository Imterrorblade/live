const initLiveWs = require('./live.js')


const initWS = function(io) {
  initLiveWs(io)
  // io.sockets.on('connection', function(socket){
  //   console.log('new user connected')
  //   socket.emit('message', '你好')
  //   socket.on('message', data => {
  //     console.log(data)
  //   })
  // })
}

module.exports = initWS