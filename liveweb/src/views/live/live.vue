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
export default {
  data () {
    return {
      isLiving: false,
      stream: ''
    }
  },
  methods: {
    init () {},
    startLive () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      if (navigator.getUserMedia) {
        this.media = navigator.getUserMedia({
          video: true
        }, stream => {
          this.stream = stream
          const video = this.$refs.video
          video.src = window.URL.createObjectURL(stream)
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
    }
  },
  components: {
    FooterBar
  }
}
</script>
