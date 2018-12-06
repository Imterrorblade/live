<template>
  <contain-com></contain-com>
</template>
<script>
import api from '@/api/live.js'
import ContainCom from '@/views/contain'
export default {
  data () {
    return {}
  },
  methods: {
    init () {
      // this.ping()
    },
    ping () {
      api.ping().then(() => {
        alert('成功')
      }).catch(err => {
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
