const { NodeMediaServer } = require('node-media-server')

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 3001,
    allow_origin: '*'
  }
}

const nms = new NodeMediaServer(config)
nms.run()
console.log('流媒体服务启动成功')