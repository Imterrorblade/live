<template>
  <div>
    <mt-header fixed title="直播">
      <mt-button fixed icon="more" slot="right" @click.native="startLive"></mt-button>
    </mt-header>
    <contain-com>
      <h5 v-for="(live, index) in lives" :key="index">
        <img :src="live.img" />
      </h5>
    </contain-com>
  </div>
</template>
<script>
import api from '@/api/live.js'
import ContainCom from '@/views/contain'
export default {
  data () {
    return {
      lives: []
    }
  },
  methods: {
    init () {
      // this.ping()
    },
    startLive () {
      this.$router.push({
        path: '/live/live'
      })
    },
    getLives () {},
    ping () {
      api
        .ping()
        .then(() => {
          alert('成功')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  },
  components: {
    ContainCom
  }
}
</script>
