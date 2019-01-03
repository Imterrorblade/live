<template>
  <div>
    <mt-header fixed title="我的直播"></mt-header>
    <video ref="video" width="100%"></video>
    <footer-bar>
      <div slot="bar">
        <mt-button v-if="!isLiving" @click.native="startLive" type="primary" size="large">开始直播</mt-button>
        <mt-button v-else @click.native="stopLive" type="primary" size="large">停止直播</mt-button>
      </div>
    </footer-bar>
  </div>
</template>
<script>
import FooterBar from '@/views/contain/footerBar'
import io from 'socket.io-client'
export default {
  data () {
    return {
      isLiving: false,
      stream: '',
      socket: '',
      mediaRecorder: '',
      chunks: []
    }
  },
  methods: {
    init () {
      this.getWs()
    },
    startLive () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      if (navigator.getUserMedia) {
        this.media = navigator.getUserMedia({
          video: true
        }, stream => {
          this.stream = stream
          this.startRecording(stream)
          const video = this.$refs.video
          // video.src = window.URL.createObjectURL(stream)
          video.srcObject = stream
          video.play()
          this.isLiving = true
        }, err => {
          this.$messageBox.alert(err.message)
        })
      }
      console.log(this.media)
    },
    stopLive () {
      this.stream.getTracks().map(track => {
        track.stop()
      })
      this.isLiving = false
    },
    startRecording (stream) {
      console.log('start recording ...')
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        var options
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
          options = {mimeType: 'video/webm;codecs=h264'}
        } else if (MediaRecorder.isTypeSupported('video/webm;codecd=h264')) {
          options = {mimeType: 'video/webm;codecs=h264'}
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
          options = {mimeType: 'video/webm;codecs=vp8'}
        }
        console.log('using ' + options.mimeType)
        this.mediaRecorder = new MediaRecorder(stream, options)
      } else {
        console.log('isTypeSuported is not supported ,using default codecs for browser')
        this.mediaRecorder = new MediaRecorder(stream)
      }
      this.mediaRecorder.start(10)
      this.watchMediaRecorder()
    },
    watchMediaRecorder () {
      this.mediaRecorder.ondataavailable = (e) => {
        // const _self = this
        this.chunks.push(e.data)
        const reader = new FileReader()
        reader.addEventListener('loadend', () => {
          // const buf = new Uint8Array(reader.result)
          // if (reader.result.byteLength > 0) {
          //   this.socket.emit('pushVideo', {
          //     username: 'player_test',
          //     data: buf
          //   })
          // }
        })
        reader.readAsArrayBuffer(e.data)
      }
      // this.socket.emit('pushStream', {
      //   username: 'player_test'
      // })
      this.mediaRecorder.onerror = e => {
        console.log('error ' + e)
      }
      this.mediaRecorder.onstart = () => {
        console.log('started & state = ' + this.mediaRecorder.state)
      }
      this.mediaRecorder.onstop = () => {
        console.log('stopped & state = ' + this.mediaRecorder.state)
      }
    },
    getWs () {
      this.socket = io.connect('http://localhost:3000/live')
      this.socket.on('connect', (message) => {
        console.log('live socketio connected')
      })
      this.socket.on('message', data => {
        console.log(data)
      })
    }
  },
  mounted () {
    this.init()
  },
  components: {
    FooterBar
  }
}
</script>
